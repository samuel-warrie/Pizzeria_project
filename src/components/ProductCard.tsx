import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { StripeProduct } from '../stripe-config';
import { createCheckoutSession } from '../lib/stripe';
import { useAuth } from '../hooks/useAuth';

interface ProductCardProps {
  product: StripeProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handlePurchase = async () => {
    if (!user) {
      alert('Please sign in to make a purchase');
      return;
    }

    setIsLoading(true);
    try {
      await createCheckoutSession({
        priceId: product.priceId,
        quantity: 1,
      });
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <span className="text-2xl font-bold text-red-600">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <button
          onClick={handlePurchase}
          disabled={isLoading || !user}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Order Now
            </>
          )}
        </button>
        
        {!user && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Sign in to place an order
          </p>
        )}
      </div>
    </motion.div>
  );
};