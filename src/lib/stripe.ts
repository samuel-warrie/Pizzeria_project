import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export interface CheckoutSessionData {
  priceId: string;
  quantity?: number;
  successUrl?: string;
  cancelUrl?: string;
}

export const createCheckoutSession = async (data: CheckoutSessionData) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to create checkout session');
  }

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: data.priceId,
      quantity: data.quantity || 1,
      successUrl: data.successUrl || `${window.location.origin}/success`,
      cancelUrl: data.cancelUrl || `${window.location.origin}/menu`,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create checkout session: ${error}`);
  }

  const { sessionId } = await response.json();
  
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    throw error;
  }
};

export { stripePromise };