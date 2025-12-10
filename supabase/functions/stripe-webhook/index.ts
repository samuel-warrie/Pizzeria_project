import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    const body = await req.text();

    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    return;
  }

  if (!('customer' in stripeData)) {
    return;
  }

  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    console.error(`No customer received on event: ${JSON.stringify(event)}`);
  } else {
    let isSubscription = true;

    if (event.type === 'checkout.session.completed') {
      const { mode } = stripeData as Stripe.Checkout.Session;

      isSubscription = mode === 'subscription';

      console.info(`Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`);
    }

    const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

    if (isSubscription) {
      console.info(`Starting subscription sync for customer: ${customerId}`);
      await syncCustomerFromStripe(customerId);
    } else if (mode === 'payment' && payment_status === 'paid') {
      try {
        const {
          id: checkout_session_id,
          payment_intent,
          amount_subtotal,
          amount_total,
          currency,
          customer_details,
          metadata,
        } = stripeData as Stripe.Checkout.Session;

        const { error: orderError } = await supabase.from('stripe_orders').insert({
          checkout_session_id,
          payment_intent_id: payment_intent,
          customer_id: customerId,
          amount_subtotal,
          amount_total,
          currency,
          payment_status,
          status: 'completed',
        });

        if (orderError) {
          console.error('Error inserting stripe order:', orderError);
          return;
        }

        const userId = metadata?.userId;
        if (!userId) {
          console.error('No userId in session metadata');
          return;
        }

        const deliveryAddress = metadata?.street
          ? `${metadata.street}, ${metadata.city}, ${metadata.state} ${metadata.zipCode}`
          : null;

        const subtotal = amount_subtotal ? Number(amount_subtotal) / 100 : 0;
        const tax = subtotal * 0.08;
        const deliveryFee = 4.99;
        const total = amount_total ? Number(amount_total) / 100 : 0;

        const orderData: any = {
          user_id: userId,
          customer_name: customer_details?.name || 'Customer',
          customer_email: customer_details?.email || '',
          customer_phone: customer_details?.phone || '',
          delivery_address: deliveryAddress,
          delivery_street: metadata?.street || null,
          delivery_city: metadata?.city || null,
          delivery_state: metadata?.state || null,
          delivery_zip_code: metadata?.zipCode || null,
          address_id: metadata?.addressId || null,
          subtotal,
          tax,
          delivery_fee: deliveryFee,
          total,
          status: 'confirmed',
          payment_status: 'paid',
          stripe_payment_intent_id: payment_intent,
        };

        const { data: createdOrder, error: mainOrderError } = await supabase.from('orders').insert(orderData).select().single();

        if (mainOrderError || !createdOrder) {
          console.error('Error inserting order:', mainOrderError);
          return;
        }

        const cartItems = metadata?.cart_items;
        if (cartItems) {
          try {
            const items = JSON.parse(cartItems);
            if (Array.isArray(items) && items.length > 0) {
              const orderItems = items.map((item: any) => ({
                order_id: createdOrder.id,
                menu_item_id: item.menu_item_id || item.id,
                item_name: item.name,
                item_price: item.price,
                quantity: item.quantity,
                special_instructions: item.special_instructions || null,
              }));

              const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

              if (itemsError) {
                console.error('Error inserting order items:', itemsError);
              } else {
                console.info(`Successfully inserted ${orderItems.length} order items`);
              }
            }
          } catch (parseError) {
            console.error('Error parsing cart items:', parseError);
          }
        }

        await supabase
          .from('stripe_orders')
          .update({ order_id: createdOrder.id })
          .eq('payment_intent_id', payment_intent);

        console.info(`Successfully processed one-time payment and created order for session: ${checkout_session_id}`);
      } catch (error) {
        console.error('Error processing one-time payment:', error);
      }
    }
  }
}

async function syncCustomerFromStripe(customerId: string) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (subscriptions.data.length === 0) {
      console.info(`No active subscriptions found for customer: ${customerId}`);
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          subscription_status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        console.error('Error updating subscription status:', noSubError);
        throw new Error('Failed to update subscription status in database');
      }
    }

    const subscription = subscriptions.data[0];

    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    }
    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}
