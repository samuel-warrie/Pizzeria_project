import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProductByPriceId } from '../stripe-config';

export const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<{
    productName?: string;
    amount?: string;
  }>({});

  useEffect(() => {
    // Extract session_id from URL params if needed for order lookup
    const sessionId = searchParams.get('session_id');
    
    // For now, we'll show a generic success message
    // In a real app, you might want to fetch order details using the session_id
    console.log('Checkout session ID:', sessionId);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          Thank you for your order! Your delicious pizza will be prepared with care and delivered fresh to your door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Link
            to="/menu"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Order More Pizzas
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500">
            You will receive an email confirmation shortly with your order details.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};