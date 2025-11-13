import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Utensils, Clock, Leaf } from 'lucide-react';

interface Specialty {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const specialties: Specialty[] = [
  {
    icon: <Pizza className="w-10 h-10 text-primary-600" />,
    title: 'Authentic Recipe',
    description: 'Our pizzas are made following traditional Neapolitan recipes passed down through generations.',
  },
  {
    icon: <Utensils className="w-10 h-10 text-primary-600" />,
    title: 'Quality Ingredients',
    description: 'We use only the freshest ingredients, imported Italian flour, and San Marzano tomatoes.',
  },
  {
    icon: <Clock className="w-10 h-10 text-primary-600" />,
    title: 'Wood-Fired Oven',
    description: 'Our pizzas are cooked in a traditional wood-fired oven at 850°F for just 90 seconds.',
  },
  {
    icon: <Leaf className="w-10 h-10 text-primary-600" />,
    title: 'Fresh Daily',
    description: 'Our dough is made fresh daily and allowed to rise for 24 hours for perfect texture and flavor.',
  },
];

const Specialties: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold mb-4">What Makes Us Special</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            At Pizzeria Fornello, we take pride in our commitment to quality and tradition
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center p-6 rounded-xl bg-neutral-50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center p-4 bg-neutral-100 rounded-full mb-4">
                {specialty.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{specialty.title}</h3>
              <p className="text-neutral-600">{specialty.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;