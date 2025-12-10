/*
  # Link Stripe Orders with Orders and Create Unified Order History View

  ## Overview
  This migration creates a comprehensive view for order history that combines data from stripe_orders, orders, and order_items tables.

  ## Changes

  1. **Add order_id to stripe_orders table**
     - `order_id` (uuid) - Foreign key linking to orders table
     - This creates a direct relationship between Stripe payment records and order records

  2. **Create order_history_view**
     - Unified view combining stripe_orders, orders, and order_items
     - Shows complete order information including:
       - Order details (customer info, address, totals)
       - Payment information (from Stripe)
       - Order items (what was purchased)
       - Order status and timestamps

  3. **Indexes**
     - Add index on stripe_orders.order_id for faster joins
     - Add index on stripe_orders.payment_intent_id for matching with orders

  ## Security
  - View uses security invoker to respect RLS policies
  - Users can only see their own order history through existing RLS policies

  ## Usage
  The order_history_view can be queried directly to get complete order information with all related data in a single query.
*/

-- Add order_id to stripe_orders table to link with orders table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stripe_orders' AND column_name = 'order_id'
  ) THEN
    ALTER TABLE stripe_orders ADD COLUMN order_id uuid REFERENCES orders(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stripe_orders_order_id ON stripe_orders(order_id) WHERE order_id IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_stripe_orders_payment_intent ON stripe_orders(payment_intent_id) WHERE deleted_at IS NULL;

-- Create a comprehensive view for order history
CREATE OR REPLACE VIEW order_history_view 
WITH (security_invoker = true) AS
SELECT
  o.id as order_id,
  o.user_id,
  o.customer_name,
  o.customer_email,
  o.customer_phone,
  o.delivery_address,
  o.delivery_street,
  o.delivery_city,
  o.delivery_state,
  o.delivery_zip_code,
  o.order_notes,
  o.subtotal,
  o.tax,
  o.delivery_fee,
  o.total,
  o.status as order_status,
  o.payment_status,
  o.stripe_payment_intent_id,
  o.created_at as order_date,
  o.updated_at,
  so.id as stripe_order_id,
  so.checkout_session_id,
  so.payment_intent_id,
  so.amount_subtotal as stripe_amount_subtotal,
  so.amount_total as stripe_amount_total,
  so.currency,
  so.payment_status as stripe_payment_status,
  so.status as stripe_order_status,
  json_agg(
    json_build_object(
      'id', oi.id,
      'menu_item_id', oi.menu_item_id,
      'item_name', oi.item_name,
      'item_price', oi.item_price,
      'quantity', oi.quantity,
      'special_instructions', oi.special_instructions
    ) ORDER BY oi.created_at
  ) FILTER (WHERE oi.id IS NOT NULL) as order_items
FROM orders o
LEFT JOIN stripe_orders so ON o.stripe_payment_intent_id = so.payment_intent_id AND so.deleted_at IS NULL
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY 
  o.id, o.user_id, o.customer_name, o.customer_email, o.customer_phone,
  o.delivery_address, o.delivery_street, o.delivery_city, o.delivery_state,
  o.delivery_zip_code, o.order_notes, o.subtotal, o.tax, o.delivery_fee,
  o.total, o.status, o.payment_status, o.stripe_payment_intent_id,
  o.created_at, o.updated_at, so.id, so.checkout_session_id, so.payment_intent_id,
  so.amount_subtotal, so.amount_total, so.currency, so.payment_status, so.status;

-- Grant access to authenticated users
GRANT SELECT ON order_history_view TO authenticated;