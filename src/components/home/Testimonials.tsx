import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    rating: 5,
    text: 'The most authentic Italian pizza I\'ve had outside of Naples. Absolutely delicious and reminds me of my childhood in Italy.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Sophia Chen',
    rating: 5,
    text: 'The Margherita pizza is incredible! Fresh ingredients, perfect crust, and friendly service. We come here at least once a week.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'James Wilson',
    rating: 4,
    text: 'Great atmosphere and even better food. The wood-fired oven really makes a difference in the flavor. Highly recommend!',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        fill={i < testimonial.rating ? '#eab308' : 'none'}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-accent-500' : 'text-neutral-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-700 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;