export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const products: StripeProduct[] = [
  {
    id: 'prod_SRYtXJOycygFd7',
    priceId: 'price_1RWflQD344N4aAbuwp8sdJ6o',
    name: 'Capricciosa',
    description: 'Artichokes, mushrooms, olives, and ham with tomato sauce and mozzarella',
    mode: 'payment',
  },
  {
    id: 'prod_SRYrRR7UXwIsVX',
    priceId: 'price_1RWfk7D344N4aAbuJw5FB8c7',
    name: 'Prosciutto e Funghi',
    description: 'Ham and mushroom pizza with tomato sauce and mozzarella',
    mode: 'payment',
  },
  {
    id: 'prod_SRYpWyWtjMl2bk',
    priceId: 'price_1RWfhMD344N4aAbujBkuw7Rv',
    name: 'Diavola',
    description: 'Spicy pizza with tomato sauce, mozzarella, spicy salami, and chili peppers',
    mode: 'payment',
  },
  {
    id: 'prod_SRYnzxdlqrdweB',
    priceId: 'price_1RWffaD344N4aAbuXkmQBmiP',
    name: 'Quattro Formaggi',
    description: 'Four cheese pizza with mozzarella, gorgonzola, fontina, and parmigiano reggiano',
    mode: 'payment',
  },
  {
    id: 'prod_SRYl98m4X4mcKq',
    priceId: 'price_1RWfduD344N4aAbuyETyTNwS',
    name: 'pepperoni',
    description: 'American favorite topped with tomato sauce, mozzarella, and crispy pepperoni',
    mode: 'payment',
  },
  {
    id: 'prod_SRYjlC9IQvf5zY',
    priceId: 'price_1RWfcBD344N4aAburKgbcn6i',
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce, mozzarella, fresh basil, salt, and extra-virgin olive oil',
    mode: 'payment',
  },
];

export const getProductByName = (name: string): StripeProduct | undefined => {
  return products.find((product) => product.name.toLowerCase() === name.toLowerCase());
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return products.find((product) => product.priceId === priceId);
};