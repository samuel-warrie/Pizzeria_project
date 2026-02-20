import React from "react";
import { motion } from "framer-motion";
import MenuItemCard from "./MenuItemCard";
import { Category, MenuItem } from "../../types/menu";
import PopularPizzasPopup from "./PopularPizzasPopup";
interface CategorySectionProps {
  category: Category;
  items: MenuItem[];
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [popularItems, setPopularItems] = React.useState<string[]>([]);

  const handleSeePopular = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = "http://127.0.0.1:8000/recommend/popular";
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setPopularItems(data);
      setIsPopupOpen(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch popular items",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id={category.id} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div>
          <h2 className="text-3xl font-serif font-bold mb-2">
            {category.name}
            <button
              className="ml-4 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-full text-sm"
              onClick={handleSeePopular}
            >
              {isLoading ? "Loading..." : "See Popular"}
            </button>
          </h2>
        </div>
        <p className="text-neutral-600 mb-6">{category.description}</p>
      </motion.div>
      <PopularPizzasPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        isLoading={isLoading}
        error={error}
        items={popularItems}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <MenuItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
