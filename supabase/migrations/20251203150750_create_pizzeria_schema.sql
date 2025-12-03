/*
  # Pizzeria Fornello Database Schema
  
  ## Overview
  Complete database schema for a pizza restaurant with menu management, orders, and Stripe payment integration.
  
  ## 1. New Tables
  
  ### Categories Table
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (e.g., "Pizzas", "Drinks")
  - `description` (text) - Category description
  - `display_order` (integer) - Order for displaying categories
  - `active` (boolean) - Whether category is currently active
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### Menu Items Table
  - `id` (uuid, primary key) - Unique menu item identifier
  - `category_id` (uuid) - Foreign key to categories
  - `name` (text) - Item name
  - `description` (text) - Item description
  - `price` (numeric) - Item price in dollars
  - `image_url` (text) - URL to item image
  - `popular` (boolean) - Featured/popular item flag
  - `vegetarian` (boolean) - Vegetarian option flag
  - `spicy` (boolean) - Spicy item flag
  - `allergens` (text array) - List of allergens
  - `active` (boolean) - Whether item is currently available
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### Orders Table
  - `id` (uuid, primary key) - Unique order identifier
  - `user_id` (uuid) - Foreign key to auth.users (null for guest orders)
  - `customer_name` (text) - Customer name
  - `customer_email` (text) - Customer email
  - `customer_phone` (text) - Customer phone number
  - `delivery_address` (text) - Delivery address
  - `order_notes` (text) - Special instructions
  - `subtotal` (numeric) - Order subtotal before tax
  - `tax` (numeric) - Tax amount
  - `delivery_fee` (numeric) - Delivery fee
  - `total` (numeric) - Total order amount
  - `status` (order_status enum) - Order status
  - `payment_status` (payment_status enum) - Payment status
  - `stripe_payment_intent_id` (text) - Stripe payment intent ID
  - `created_at` (timestamptz) - Order creation time
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### Order Items Table
  - `id` (uuid, primary key) - Unique order item identifier
  - `order_id` (uuid) - Foreign key to orders
  - `menu_item_id` (uuid) - Foreign key to menu_items
  - `item_name` (text) - Item name at time of order
  - `item_price` (numeric) - Item price at time of order
  - `quantity` (integer) - Quantity ordered
  - `special_instructions` (text) - Item-specific instructions
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### Stripe Integration Tables
  
  #### Stripe Customers
  - `id` (bigint, primary key) - Internal ID
  - `user_id` (uuid) - Foreign key to auth.users
  - `customer_id` (text) - Stripe customer ID
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `deleted_at` (timestamptz) - Soft delete timestamp
  
  #### Stripe Subscriptions
  - `id` (bigint, primary key) - Internal ID
  - `customer_id` (text) - Stripe customer ID
  - `subscription_id` (text) - Stripe subscription ID
  - `price_id` (text) - Stripe price ID
  - `current_period_start` (bigint) - Subscription period start
  - `current_period_end` (bigint) - Subscription period end
  - `cancel_at_period_end` (boolean) - Cancellation flag
  - `payment_method_brand` (text) - Payment method type
  - `payment_method_last4` (text) - Last 4 digits of card
  - `status` (stripe_subscription_status enum) - Subscription status
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `deleted_at` (timestamptz) - Soft delete timestamp
  
  #### Stripe Orders
  - `id` (bigint, primary key) - Internal ID
  - `checkout_session_id` (text) - Stripe checkout session ID
  - `payment_intent_id` (text) - Stripe payment intent ID
  - `customer_id` (text) - Stripe customer ID
  - `amount_subtotal` (bigint) - Subtotal in cents
  - `amount_total` (bigint) - Total in cents
  - `currency` (text) - Currency code
  - `payment_status` (text) - Payment status from Stripe
  - `status` (stripe_order_status enum) - Order fulfillment status
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `deleted_at` (timestamptz) - Soft delete timestamp
  
  ## 2. Security (RLS Policies)
  
  All tables have Row Level Security enabled with appropriate policies:
  
  ### Categories & Menu Items
  - Public read access (anyone can view the menu)
  - No write access (managed by admin through Supabase dashboard)
  
  ### Orders
  - Authenticated users can view their own orders
  - Authenticated users can create orders
  - Users can update orders only when status is 'pending'
  
  ### Order Items
  - Users can view items from their own orders
  - Users can insert items when creating orders
  
  ### Stripe Tables
  - Users can only view their own customer data
  - Users can only view their own subscriptions and payment orders
  
  ## 3. Indexes
  
  Indexes created for optimal query performance:
  - Menu items by category
  - Orders by user
  - Orders by status
  - Order items by order
  - Stripe customers by user
  
  ## 4. Important Notes
  
  - All monetary amounts in orders are stored as numeric (decimal) for precision
  - Stripe amounts are stored as bigint (cents) per Stripe's requirements
  - Order status tracking enables real-time updates
  - Soft deletes implemented for Stripe data to maintain audit trail
  - Guest orders supported (user_id can be null)
  - Prices stored in order items preserve pricing at time of purchase
*/

-- Create enums for order status tracking
CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'out_for_delivery',
  'delivered',
  'cancelled'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'paid',
  'failed',
  'refunded'
);

-- Stripe subscription status enum
CREATE TYPE stripe_subscription_status AS ENUM (
  'not_started',
  'incomplete',
  'incomplete_expired',
  'trialing',
  'active',
  'past_due',
  'canceled',
  'unpaid',
  'paused'
);

-- Stripe order status enum
CREATE TYPE stripe_order_status AS ENUM (
  'pending',
  'completed',
  'canceled'
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active categories"
  ON categories
  FOR SELECT
  USING (active = true);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  popular boolean DEFAULT false,
  vegetarian boolean DEFAULT false,
  spicy boolean DEFAULT false,
  allergens text[] DEFAULT ARRAY[]::text[],
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active menu items"
  ON menu_items
  FOR SELECT
  USING (active = true);

-- Create index for menu items by category
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_menu_items_popular ON menu_items(popular) WHERE active = true AND popular = true;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  delivery_address text,
  order_notes text,
  subtotal numeric(10, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
  tax numeric(10, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
  delivery_fee numeric(10, 2) NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
  total numeric(10, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
  status order_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their pending orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for orders
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE RESTRICT NOT NULL,
  item_name text NOT NULL,
  item_price numeric(10, 2) NOT NULL CHECK (item_price >= 0),
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  special_instructions text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view items from their orders"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add items to their orders"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid() AND status = 'pending'
    )
  );

-- Create index for order items
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- Stripe customers table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  customer_id text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT NULL
);

ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own customer data"
  ON stripe_customers
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() AND deleted_at IS NULL);

-- Create index for stripe customers
CREATE INDEX IF NOT EXISTS idx_stripe_customers_user ON stripe_customers(user_id) WHERE deleted_at IS NULL;

-- Stripe subscriptions table
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id text UNIQUE NOT NULL,
  subscription_id text DEFAULT NULL,
  price_id text DEFAULT NULL,
  current_period_start bigint DEFAULT NULL,
  current_period_end bigint DEFAULT NULL,
  cancel_at_period_end boolean DEFAULT false,
  payment_method_brand text DEFAULT NULL,
  payment_method_last4 text DEFAULT NULL,
  status stripe_subscription_status NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT NULL
);

ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription data"
  ON stripe_subscriptions
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id
      FROM stripe_customers
      WHERE user_id = auth.uid() AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

-- Stripe orders table (for payment tracking)
CREATE TABLE IF NOT EXISTS stripe_orders (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  checkout_session_id text NOT NULL,
  payment_intent_id text NOT NULL,
  customer_id text NOT NULL,
  amount_subtotal bigint NOT NULL,
  amount_total bigint NOT NULL,
  currency text NOT NULL,
  payment_status text NOT NULL,
  status stripe_order_status NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT NULL
);

ALTER TABLE stripe_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stripe order data"
  ON stripe_orders
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id
      FROM stripe_customers
      WHERE user_id = auth.uid() AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

-- Create view for user subscriptions
CREATE OR REPLACE VIEW stripe_user_subscriptions 
WITH (security_invoker = true) AS
SELECT
  c.customer_id,
  s.subscription_id,
  s.status as subscription_status,
  s.price_id,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end,
  s.payment_method_brand,
  s.payment_method_last4
FROM stripe_customers c
LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id
WHERE c.user_id = auth.uid()
AND c.deleted_at IS NULL
AND s.deleted_at IS NULL;

GRANT SELECT ON stripe_user_subscriptions TO authenticated;

-- Create view for user stripe orders
CREATE OR REPLACE VIEW stripe_user_orders 
WITH (security_invoker = true) AS
SELECT
  c.customer_id,
  o.id as order_id,
  o.checkout_session_id,
  o.payment_intent_id,
  o.amount_subtotal,
  o.amount_total,
  o.currency,
  o.payment_status,
  o.status as order_status,
  o.created_at as order_date
FROM stripe_customers c
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
WHERE c.user_id = auth.uid()
AND c.deleted_at IS NULL
AND o.deleted_at IS NULL;

GRANT SELECT ON stripe_user_orders TO authenticated;