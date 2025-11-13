import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccessPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Order Confirmed - Pizzeria Fornello';
  }, []);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-serif font-bold mb-4">Thank You for Your Order!</h1>
          
          <p className="text-lg text-neutral-600 mb-8">
            Your order has been confirmed and is being prepared. You'll receive a confirmation
            email shortly with your order details.
          </p>
          
          <div className="space-y-4">
            <Link to="/menu" className="btn btn-primary block">
              Order More
            </Link>
            <Link to="/" className="btn btn-secondary block">
              Return to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;