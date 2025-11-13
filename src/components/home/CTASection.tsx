import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 relative bg-neutral-900 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/4197491/pexels-photo-4197491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')"
        }}
      />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Hungry Yet? Order Now!
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Experience the authentic taste of Italy from the comfort of your home. 
            Order online for pickup or delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/menu" className="btn btn-primary px-8 py-4 text-lg">
              Order Online
            </Link>
            <Link to="/contact" className="btn btn-secondary text-white border-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg">
              Call for Reservation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;