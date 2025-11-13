import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] bg-black overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-white"
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Authentic Italian <span className="text-primary-500">Pizza</span> Made with Passion
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-neutral-200"
            >
              From our wood-fired oven to your table. Experience the true taste of Italy.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/menu" className="btn btn-primary px-8 py-4 text-base">
                View Our Menu
              </Link>
              
              <Link to="/contact" className="btn btn-secondary text-white border-white hover:bg-white hover:text-primary-600 px-8 py-4 text-base">
                Find Our Location
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex items-center"
            >
              <span className="text-white">Scroll to discover</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                <ArrowRight className="h-5 w-5 rotate-90" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Italian flag decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
        <div className="w-1/3 bg-green-600"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-primary-600"></div>
      </div>
    </section>
  );
};

export default Hero;