import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { StripeProduct } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';

interface PizzaCardProps {
  product: StripeProduct;
}

export const PizzaCard: React.FC<PizzaCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      alert('Please sign in to order');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: product.priceId,
          mode: product.mode,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/menu`,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="h-48 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
        <span className="text-4xl font-bold text-white">{product.name[0]}</span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">
            {product.currencySymbol}{product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleCheckout}
            disabled={isLoading || !user}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            {isLoading ? 'Processing...' : 'Order Now'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};