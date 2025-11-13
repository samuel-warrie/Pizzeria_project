import React from 'react';
import { motion } from 'framer-motion';
import MenuItemCard from './MenuItemCard';
import { Category, MenuItem } from '../../types/menu';

interface CategorySectionProps {
  category: Category;
  items: MenuItem[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, items }) => {
  return (
    <section id={category.id} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="text-3xl font-serif font-bold mb-2">{category.name}</h2>
        <p className="text-neutral-600 mb-6">{category.description}</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <MenuItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;