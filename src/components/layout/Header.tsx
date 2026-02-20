import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PizzaIcon, Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, toggleCart } = useCart();
  const { user, signOut } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isUserMenuOpen && !target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    // Recommend link will be conditionally rendered below
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <PizzaIcon className="h-8 w-8 text-primary-600" />
          <span className="font-serif text-2xl font-bold">
            <span className="text-primary-600">Pizzeria</span>{" "}
            <span className={isScrolled ? "text-neutral-800" : "text-white"}>
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
                  ? "text-primary-600"
                  : isScrolled
                    ? "text-neutral-800 hover:text-primary-600"
                    : "text-white hover:text-primary-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              to="/recommend"
              className={`font-medium transition-colors duration-300 ${
                isActive("/recommend")
                  ? "text-primary-600"
                  : isScrolled
                    ? "text-neutral-800 hover:text-primary-600"
                    : "text-white hover:text-primary-100"
              }`}
            >
              Recommend
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleCart}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled
                ? "text-neutral-800 hover:bg-neutral-100"
                : "text-white hover:bg-white/10"
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

          {user ? (
            <div className="hidden md:block relative user-menu-container">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "text-neutral-800 hover:bg-neutral-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="User menu"
              >
                <User className="h-6 w-6" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-neutral-800 hover:bg-neutral-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={toggleMobileMenu}
            className="p-2 md:hidden rounded-full transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X
                className={`h-6 w-6 ${
                  isScrolled ? "text-neutral-800" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${
                  isScrolled ? "text-neutral-800" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        navLinks={
          user
            ? [...navLinks, { name: "Recommend", path: "/recommend" }]
            : navLinks
        }
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
