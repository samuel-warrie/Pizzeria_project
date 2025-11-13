import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PizzaIcon, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems, toggleCart } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <PizzaIcon className="h-8 w-8 text-primary-600" />
          <span className="font-serif text-2xl font-bold">
            <span className="text-primary-600">Pizzeria</span>{' '}
            <span className={isScrolled ? 'text-neutral-800' : 'text-white'}>
              Fornello
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-primary-600'
                  : isScrolled
                  ? 'text-neutral-800 hover:text-primary-600'
                  : 'text-white hover:text-primary-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleCart}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled
                ? 'text-neutral-800 hover:bg-neutral-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          <button
            onClick={toggleMobileMenu}
            className="p-2 md:hidden rounded-full transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X
                className={`h-6 w-6 ${
                  isScrolled ? 'text-neutral-800' : 'text-white'
                }`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${
                  isScrolled ? 'text-neutral-800' : 'text-white'
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} navLinks={navLinks} />
    </header>
  );
};

export default Header;