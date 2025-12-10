import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface LineItem {
  price: string;
  quantity: number;
}

interface Address {
  addressId?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  saveToProfile?: boolean;
}

interface CheckoutOptions {
  lineItems: LineItem[];
  mode: 'payment' | 'subscription';
  successUrl: string;
  cancelUrl: string;
  address?: Address;
}

export const useStripeCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const createCheckoutSession = async ({ lineItems, mode, successUrl, cancelUrl, address }: CheckoutOptions) => {
    if (!user) {
      setError('You must be logged in to checkout');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          line_items: lineItems,
          success_url: successUrl,
          cancel_url: cancelUrl,
          mode,
          address,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
    error,
  };
};