import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
}

const ChatbotMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isClosed, setIsClosed] = useState(false);
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
    }, 12000);

    const timer3 = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 3,
        text: "Browse our menu, place an order, or ask about our daily specials? Click to chat! 💬"
      }]);
    }, 22000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (isClosed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 max-w-sm">
      {!isOpen && (
        <button
          onClick={() => setIsClosed(true)}
          className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Close messages"
        >
          <X size={16} className="text-gray-600" />
        </button>
      )}

      <div className="flex flex-col gap-3 w-full">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className="animate-slide-in bg-white rounded-2xl shadow-xl p-4 max-w-[320px] w-full"
            style={{
              animationDelay: `${index * 100}ms`,
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

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-200 mt-2"
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatbotMessages;
