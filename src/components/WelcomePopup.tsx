import React, { useState, useEffect } from 'react';
import { X, Pizza } from 'lucide-react';

const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 rounded-full p-4">
              <Pizza size={48} className="text-orange-600" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome to Fornello!
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Discover authentic Italian pizza crafted with passion and the finest ingredients.
            Fresh from our wood-fired oven to your table.
          </p>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-orange-800 font-semibold mb-1">
              Special Offer!
            </p>
            <p className="text-orange-700 text-sm">
              Get 15% off your first order. Use code: <span className="font-bold">WELCOME15</span>
            </p>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Ordering
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WelcomePopup;
