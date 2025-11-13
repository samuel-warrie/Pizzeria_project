export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  allergens?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}