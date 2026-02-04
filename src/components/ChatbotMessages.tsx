import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
}

const ChatbotMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMessages, setShowMessages] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 1,
        text: "👋 Hey! I'm Fornello, your personal assistant at our Italian pizzeria!"
      }]);
    }, 2000);

    const timer2 = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 2,
        text: "Need authentic wood-fired pizza, fresh pasta, or Italian appetizers? I'm here to help! 🍕✨"
      }]);
    }, 7000);

    const timer3 = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 3,
        text: "Browse our menu, place an order, or ask about our daily specials? Click to chat! 💬"
      }]);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleCloseMessages = () => {
    setShowMessages(false);
  };

  const handleChatClick = () => {
    setIsOpen(!isOpen);
    setShowMessages(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Proactive Messages Bubble */}
      {showMessages && messages.length > 0 && !isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 animate-slide-up">
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-[320px] mb-3">
            <button
              onClick={handleCloseMessages}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Close messages"
            >
              <X size={14} className="text-gray-600" />
            </button>

            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={handleChatClick}
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-200 relative"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {messages.length > 0 && !isOpen && showMessages && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {messages.length}
          </span>
        )}
      </button>

      {/* Chat Window (placeholder for future full chat implementation) */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-2xl w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4">
              <h3 className="font-bold text-lg">Fornello</h3>
              <p className="text-xs text-orange-100">Your pizzeria assistant</p>
            </div>
            <div className="p-6 bg-gray-50 h-[400px] flex flex-col items-center justify-center">
              <MessageCircle size={48} className="text-orange-500 mb-4" />
              <p className="text-gray-600 text-center text-sm">
                Chat functionality coming soon!<br />
                Browse our menu to order delicious pizza.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatbotMessages;
