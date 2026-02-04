import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Pizza } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  timestamp: Date;
}

const ChatbotMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 1,
        text: "Welcome to Fornello! 👋 We're serving authentic Italian pizzas made fresh from our wood-fired oven. Browse our menu and enjoy!",
        timestamp: new Date()
      }]);
    }, 2000);

    const timer2 = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 2,
        text: "Don't miss our special offer! Use code WELCOME15 for 15% off your first order. 🍕",
        timestamp: new Date()
      }]);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (isClosed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-200 relative"
        >
          <MessageCircle size={28} />
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
              {messages.length}
            </span>
          )}
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl w-80 max-w-[calc(100vw-3rem)] overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <Pizza size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Fornello</h3>
                <p className="text-xs text-orange-100">Always here to help</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
                aria-label="Minimize chat"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button
                onClick={() => setIsClosed(true)}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Pizza size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Loading messages...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="bg-orange-500 rounded-full p-2 flex-shrink-0">
                        <Pizza size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-md">
                          <p className="text-gray-800 text-sm leading-relaxed">
                            {message.text}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 ml-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-500 text-center">
              Need help? Check out our menu or contact us!
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ChatbotMessages;
