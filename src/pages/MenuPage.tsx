import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { categories, getMenuItemsByCategory } from '../data/menu';
import CategorySection from '../components/menu/CategorySection';

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);

  useEffect(() => {
    document.title = 'Menu - Pizzeria Fornello';
    
    // Scroll handling for category navigation
    const handleScroll = () => {
      // Find which section is currently most visible
      const sectionElements = categories.map(cat => 
        document.getElementById(cat.id)
      ).filter(Boolean);
      
      const viewportHeight = window.innerHeight;
      
      let maxVisibleSection = null;
      let maxVisibleArea = 0;
      
      sectionElements.forEach(section => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        
        if (visibleHeight > maxVisibleArea && visibleHeight > 0) {
          maxVisibleArea = visibleHeight;
          maxVisibleSection = section.id;
        }
      });
      
      if (maxVisibleSection && maxVisibleSection !== activeCategory) {
        setActiveCategory(maxVisibleSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);
  
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      // Accounting for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveCategory(categoryId);
    }
  };

  return (
    <div>
      {/* Hero section */}
      <section className="pt-32 pb-16 bg-primary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-serif font-bold mb-4">Our Menu</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover our selection of authentic Italian pizzas, appetizers, pastas and more. 
              Made with fresh ingredients and traditional recipes.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Category navigation */}
      <div className="sticky top-20 z-30 bg-white shadow-md">
        <div className="container-custom py-4 overflow-x-auto">
          <div className="flex space-x-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Menu sections */}
      <div className="container-custom py-12">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            items={getMenuItemsByCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;