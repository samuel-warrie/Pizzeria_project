import { MenuItem, Category } from "../types/menu";

export const categories: Category[] = [
  {
    id: "pizzas",
    name: "Pizzas",
    description:
      "Our authentic Italian pizzas, made with hand-stretched dough and premium ingredients",
  },
];

export const menuItems: MenuItem[] = [
  // Pizzas
  {
    id: "margherita",
    name: "Margherita",
    description:
      "Classic pizza with tomato sauce, mozzarella, fresh basil, salt, and extra-virgin olive oil",
    price: 10.99,
    image:
      "https://images.pexels.com/photos/6605193/pexels-photo-6605193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "pizzas",
    popular: true,
    vegetarian: true,
    allergens: ["dairy", "gluten"],
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description:
      "American favorite topped with tomato sauce, mozzarella, and crispy pepperoni",
    price: 12.99,
    image:
      "https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "pizzas",
    popular: true,
    allergens: ["dairy", "gluten"],
  },
  {
    id: "quattro-formaggi",
    name: "Quattro Formaggi",
    description:
      "Four cheese pizza with mozzarella, gorgonzola, fontina, and parmigiano reggiano",
    price: 13.99,
    image:
      "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "pizzas",
    vegetarian: true,
    allergens: ["dairy", "gluten"],
  },
  {
    id: "diavola",
    name: "Diavola",
    description:
      "Spicy pizza with tomato sauce, mozzarella, spicy salami, and chili peppers",
    price: 13.99,
    image:
      "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "pizzas",
    spicy: true,
    allergens: ["dairy", "gluten"],
  },
  {
    id: "prosciutto-funghi",
    name: "Prosciutto e Funghi",
    description: "Ham and mushroom pizza with tomato sauce and mozzarella",
    price: 14.99,
    image:
      "https://images.pexels.com/photos/6697469/pexels-photo-6697469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "pizzas",
    allergens: ["dairy", "gluten"],
  },
  {
    id: "capricciosa",
    name: "Capricciosa",
    description:
      "Artichokes, mushrooms, olives, and ham with tomato sauce and mozzarella",
    price: 14.99,
    image:
      "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "pizzas",
    allergens: ["dairy", "gluten"],
  },
];

export const getMenuItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter((item) => item.category === categoryId);
};

export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter((item) => item.popular);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find((item) => item.id === id);
};
