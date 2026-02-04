import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from '../cart/Cart';
import ChatbotMessages from '../ChatbotMessages';
import { CartProvider } from '../../context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Cart />
        <Footer />
        <ChatbotMessages />
      </div>
    </CartProvider>
  );
};

export default Layout;