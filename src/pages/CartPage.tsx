import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { getProductByName } from '../stripe-config';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { createCheckoutSession, loading: checkoutLoading, error: checkoutError } = useStripeCheckout();
  
  useEffect(() => {
    document.title = 'Your Cart - Pizzeria Fornello';
  }, []);
  
  const handleCheckout = async () => {
    const lineItems = cartItems.map(item => {
      const product = getProductByName(item.name);
      if (!product) {
        throw new Error(`Product not found: ${item.name}`);
      }
      return {
        price: product.priceId,
        quantity: item.quantity
      };
    });

    await createCheckoutSession({
      lineItems,
      mode: 'payment',
      successUrl: `${window.location.origin}/checkout/success`,
      cancelUrl: `${window.location.origin}/cart`,
    });
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold mb-4">Your Cart</h1>
          <Link to="/menu" className="inline-flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </motion.div>
        
        {checkoutError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {checkoutError}
          </div>
        )}
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 rounded-xl">
            <ShoppingCart className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Check out our menu to find something delicious!
            </p>
            <Link to="/menu" className="btn btn-primary px-8">
              View Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold">Order Items</h2>
                </div>
                
                <ul className="divide-y divide-neutral-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded-md mr-6 mb-4 sm:mb-0"
                      />
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="font-medium text-lg">{item.name}</h3>
                            <p className="text-neutral-500 text-sm mb-2">€{item.price.toFixed(2)} each</p>
                          </div>
                          <span className="font-semibold text-lg mb-3 sm:mb-0">
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-neutral-300 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-neutral-100 rounded-l-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-neutral-100 rounded-r-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-500 hover:text-primary-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-medium">€{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Tax</span>
                      <span className="font-medium">€{(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Delivery Fee</span>
                      <span className="font-medium">€4.99</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-lg">
                        €{(cartTotal + (cartTotal * 0.08) + 4.99).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className={`btn btn-primary w-full ${checkoutLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {checkoutLoading ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                  
                  <p className="text-xs text-neutral-500 text-center mt-4">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;