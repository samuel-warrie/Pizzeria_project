import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedMenu from '../components/home/FeaturedMenu';
import About from '../components/home/About';
import Specialties from '../components/home/Specialties';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Pizzeria Fornello - Authentic Italian Pizza';
  }, []);
  
  return (
    <div>
      <Hero />
      <Specialties />
      <FeaturedMenu />
      <About />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default HomePage;