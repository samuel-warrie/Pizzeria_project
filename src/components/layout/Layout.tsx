import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from '../cart/Cart';
import WelcomePopup from '../WelcomePopup';
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
        <WelcomePopup />
      </div>
    </CartProvider>
  );
};

export default Layout;