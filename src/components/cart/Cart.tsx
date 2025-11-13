import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart,
    cartTotal
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          
          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-xl font-bold">Your Cart</h2>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <ShoppingCart className="h-16 w-16 text-neutral-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-neutral-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                  <button 
                    onClick={toggleCart}
                    className="btn btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-16 w-16 object-cover rounded-md"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.name}</h4>
                            <span className="font-medium">
                              €{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500 mt-1">€{item.price.toFixed(2)} each</p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-neutral-300 rounded-full">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-neutral-100 rounded-l-full transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral-100 rounded-r-full transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 text-neutral-500 hover:text-primary-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-6 py-4 border-t border-neutral-200">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">€{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-neutral-500 mb-4">
                  Taxes and delivery fee calculated at checkout
                </p>
                <Link
                  to="/cart"
                  onClick={toggleCart}
                  className="btn btn-primary w-full"
                >
                  Checkout
                </Link>
                <button
                  onClick={toggleCart}
                  className="btn btn-secondary w-full mt-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;