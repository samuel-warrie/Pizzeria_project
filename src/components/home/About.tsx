import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Pizzeria interior" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-48 md:w-64 italian-border">
                <p className="font-serif text-lg italic text-neutral-700">"Passion is the main ingredient in every dish we serve."</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6">Our Story</h2>
            <p className="text-lg text-neutral-700 mb-6">
              Founded in 1985 by the Rossi family, Pizzeria Fornello brings authentic Italian 
              flavors from Naples to your neighborhood. Our recipes have been passed down through 
              generations, preserving the tradition and passion of true Italian cooking.
            </p>
            <p className="text-lg text-neutral-700 mb-8">
              We use only the freshest ingredients, imported Italian flour, and cook our pizzas in a 
              wood-fired oven to achieve that perfect, authentic taste that has made Italian pizza 
              famous worldwide.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Link to="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Find Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;