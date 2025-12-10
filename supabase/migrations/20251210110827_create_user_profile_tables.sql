/*
  # Create User Profile Tables

  This migration creates tables to support user profile features including:
  - User profiles (personal information, avatar)
  - Saved delivery addresses
  - User preferences (notifications, theme, language)
  - Favorite menu items

  ## New Tables

  ### `user_profiles`
  - `id` (uuid, primary key) - References auth.users.id
  - `full_name` (text) - User's full name
  - `phone` (text) - Phone number
  - `avatar_url` (text, nullable) - Profile picture URL
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `user_addresses`
  - `id` (uuid, primary key) - Unique address identifier
  - `user_id` (uuid) - References auth.users.id
  - `label` (text) - Address label (Home, Work, etc.)
  - `street` (text) - Street address
  - `city` (text) - City name
  - `state` (text) - State/province
  - `zip_code` (text) - Postal code
  - `is_default` (boolean) - Whether this is the default address
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `user_preferences`
  - `id` (uuid, primary key) - References auth.users.id
  - `email_notifications` (boolean) - Email notification preference
  - `sms_notifications` (boolean) - SMS notification preference
  - `marketing_emails` (boolean) - Marketing email preference
  - `theme` (text) - UI theme preference (light, dark, auto)
  - `language` (text) - Language preference
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `favorites`
  - `id` (uuid, primary key) - Unique favorite identifier
  - `user_id` (uuid) - References auth.users.id
  - `item_id` (text) - Menu item identifier
  - `item_name` (text) - Menu item name
  - `item_price` (numeric) - Menu item price
  - `created_at` (timestamptz) - Creation timestamp

  ## Security

  All tables have Row Level Security (RLS) enabled with policies that:
  - Allow authenticated users to read their own data
  - Allow authenticated users to insert their own data
  - Allow authenticated users to update their own data
  - Allow authenticated users to delete their own data
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create user_addresses table
CREATE TABLE IF NOT EXISTS user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own addresses"
  ON user_addresses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON user_addresses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON user_addresses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON user_addresses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications boolean DEFAULT true,
  sms_notifications boolean DEFAULT false,
  marketing_emails boolean DEFAULT false,
  theme text DEFAULT 'light',
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id text NOT NULL,
  item_name text NOT NULL,
  item_price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
