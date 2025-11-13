import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navLinks }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg"
        >
          <div className="py-4 px-6 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="block py-2 text-lg font-medium text-neutral-800 hover:text-primary-600"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                to="/cart"
                className="block py-2 px-4 bg-primary-600 text-white text-center rounded-full font-medium"
              >
                Order Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;