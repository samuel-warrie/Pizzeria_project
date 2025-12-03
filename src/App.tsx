import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import { Menu } from './pages/Menu';
import { Success } from './pages/Success';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/cart" 
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/checkout/success" 
              element={
                <PrivateRoute>
                  <CheckoutSuccessPage />
                </PrivateRoute>
              } 
          <Route path="/menu" element={<Menu />} />
          <Route path="/success" element={<Success />} />
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;