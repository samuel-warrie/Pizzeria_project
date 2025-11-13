import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPopularItems } from '../../data/menu';
import MenuItemCard from '../menu/MenuItemCard';

const FeaturedMenu: React.FC = () => {
  const popularItems = getPopularItems().slice(0, 3);
  
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold mb-4">Our Popular Dishes</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our most loved dishes, made with traditional recipes and the freshest ingredients
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {popularItems.map((item, index) => (
            <MenuItemCard key={item.id} item={item} index={index} />
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/menu" className="btn btn-primary px-8">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;