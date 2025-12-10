/*
  # Add Address Fields to Orders Table

  This migration adds structured address fields to the orders table to properly store delivery address information.

  ## Changes

  1. New Columns in `orders` table:
    - `address_id` (uuid, nullable) - References user_addresses table for saved addresses
    - `delivery_street` (text) - Street address for delivery
    - `delivery_city` (text) - City for delivery
    - `delivery_state` (text) - State/province for delivery
    - `delivery_zip_code` (text) - Postal code for delivery

  2. Indexes:
    - Add index on address_id for faster queries

  ## Notes
  - The existing `delivery_address` field is kept as a formatted fallback
  - New orders should populate both the structured fields and the formatted text field
  - address_id links to saved addresses when user selects from their profile
*/

-- Add address fields to orders table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'address_id'
  ) THEN
    ALTER TABLE orders ADD COLUMN address_id uuid REFERENCES user_addresses(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'delivery_street'
  ) THEN
    ALTER TABLE orders ADD COLUMN delivery_street text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'delivery_city'
  ) THEN
    ALTER TABLE orders ADD COLUMN delivery_city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'delivery_state'
  ) THEN
    ALTER TABLE orders ADD COLUMN delivery_state text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'delivery_zip_code'
  ) THEN
    ALTER TABLE orders ADD COLUMN delivery_zip_code text;
  END IF;
END $$;

-- Create index for address_id
CREATE INDEX IF NOT EXISTS idx_orders_address_id ON orders(address_id) WHERE address_id IS NOT NULL;