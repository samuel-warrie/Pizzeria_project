import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserType } from '@supabase/supabase-js';
import { User, LogOut } from 'lucide-react';

interface NavLink {
  name: string;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  user: UserType | null;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navLinks, user, onLogout }) => {
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

            {user ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-2 border-t border-gray-200"
                >
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 py-2 text-lg font-medium text-neutral-800 hover:text-primary-600"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                >
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 py-2 text-lg font-medium text-neutral-800 hover:text-primary-600"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-2 border-t border-gray-200"
                >
                  <Link
                    to="/login"
                    className="block py-2 text-lg font-medium text-neutral-800 hover:text-primary-600"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                >
                  <Link
                    to="/signup"
                    className="block py-2 px-4 bg-primary-600 text-white text-center rounded-lg font-medium"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;