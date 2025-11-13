import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem } from '../../types/menu';
import { useCart } from '../../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  index?: number;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, index = 0 }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <motion.div 
      className="menu-item relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {item.vegetarian && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Vegetarian
          </span>
        )}
        {item.spicy && (
          <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
            Spicy
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span className="font-bold text-primary-600">€{item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4 flex-grow">{item.description}</p>
        
        {item.allergens && item.allergens.length > 0 && (
          <div className="text-xs text-neutral-500 mb-3">
            <span className="font-medium">Allergens:</span> {item.allergens.join(', ')}
          </div>
        )}
        
        <button 
          onClick={handleAddToCart}
          className="mt-auto btn btn-primary w-full flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;