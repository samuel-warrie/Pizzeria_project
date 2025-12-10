/*
  # Create Avatars Storage Bucket

  This migration creates a storage bucket for user profile avatars and sets up
  the necessary policies to allow users to upload and manage their own avatars.

  ## New Storage Bucket

  ### `avatars`
  - Public bucket for user profile pictures
  - Users can upload their own avatars
  - File size limited to 2MB (enforced in application)
  - Supported formats: JPG, PNG, WEBP

  ## Security

  Storage policies allow:
  - Anyone to view avatars (public read)
  - Authenticated users to upload their own avatars
  - Authenticated users to update their own avatars
  - Authenticated users to delete their own avatars
*/

-- Create avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist (to avoid conflicts)
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
  DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;
END $$;

-- Allow public read access to avatars
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their own avatars
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to update their own avatars
CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to delete their own avatars
CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
