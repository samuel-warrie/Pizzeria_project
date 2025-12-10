import React from 'react';
import { Link } from 'react-router-dom';
import { PizzaIcon, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" onClick={scrollToTop} className="flex items-center space-x-2">
              <PizzaIcon className="h-8 w-8 text-primary-500" />
              <span className="font-serif text-2xl font-bold">
                <span className="text-primary-500">Pizzeria</span>{' '}
                <span className="text-white">Fornello</span>
              </span>
            </Link>
            <p className="text-neutral-300 mt-4">
              Authentic Italian pizzas made with traditional recipes and the freshest ingredients. 
              Every bite tells our story of passion for great food.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-neutral-400 hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-neutral-700 pb-2">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-neutral-300 hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" onClick={scrollToTop} className="text-neutral-300 hover:text-primary-500 transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="text-neutral-300 hover:text-primary-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="text-neutral-300 hover:text-primary-500 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/cart" onClick={scrollToTop} className="text-neutral-300 hover:text-primary-500 transition-colors">Order Online</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-neutral-700 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                <span className="text-neutral-300">(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                <span className="text-neutral-300">
                  123 Pizza Street<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                <div className="text-neutral-300">
                  <p>Mon-Thu: 11am - 10pm</p>
                  <p>Fri-Sat: 11am - 11pm</p>
                  <p>Sunday: 12pm - 9pm</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-neutral-700 pb-2">Newsletter</h4>
            <p className="text-neutral-300 mb-4">
              Subscribe to our newsletter to get updates on special offers and events.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              &copy; {currentYear} Pizzeria Fornello. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-5 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Cookies Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;