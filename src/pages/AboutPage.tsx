import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PizzaIcon, Clock, Users, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us - Pizzeria Fornello';
  }, []);

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
            <h1 className="text-5xl font-serif font-bold mb-4">Our Story</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Learn more about Pizzeria Fornello, our history, and our passion for authentic Italian cuisine.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* History section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-serif font-bold mb-6">Our History</h2>
              <p className="text-lg text-neutral-700 mb-6">
                Founded in 1985 by the Rossi family who immigrated from Naples, Pizzeria Fornello began as a small family restaurant with a passion for authentic Italian cuisine.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                Giuseppe Rossi, our founder, learned the art of pizza-making from his father and grandfather in Naples, where pizza has been perfected over generations. When he moved to America, he brought with him not just recipes, but a philosophy: that great food comes from great ingredients, tradition, and love.
              </p>
              <p className="text-lg text-neutral-700">
                Over the decades, our restaurant has grown, but our commitment to quality and authenticity has never wavered. Today, Pizzeria Fornello is run by the second generation of the Rossi family, continuing the legacy of serving the most authentic Neapolitan pizza outside of Italy.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Pizzeria history" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg w-36 md:w-48 italian-border">
                  <p className="font-serif text-center">Since 1985</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our values */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Our Values</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              These principles guide everything we do at Pizzeria Fornello
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <PizzaIcon className="h-10 w-10 text-primary-600" />,
                title: "Authenticity",
                description: "We stay true to traditional Neapolitan recipes and techniques"
              },
              {
                icon: <Clock className="h-10 w-10 text-primary-600" />,
                title: "Craftsmanship",
                description: "We take the time to make everything by hand with care and attention"
              },
              {
                icon: <Users className="h-10 w-10 text-primary-600" />,
                title: "Family",
                description: "We treat our staff and customers like family, with warmth and respect"
              },
              {
                icon: <Award className="h-10 w-10 text-primary-600" />,
                title: "Quality",
                description: "We never compromise on ingredient quality or preparation standards"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
              >
                <div className="inline-flex items-center justify-center p-4 bg-neutral-100 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The skilled and passionate people behind every delicious dish
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marco Rossi",
                title: "Head Chef",
                image: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
                description: "With 20 years of experience cooking in the finest restaurants, Marco is the cornerstone of our kitchen."
              },
              {
                name: "Sofia Bianchi",
                title: "Pizzaiolo",
                image: "https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
                description: "Sofia trained in Naples and brings her authentic pizza-making techniques to every pie she crafts."
              },
              {
                name: "Antonio Ricci",
                title: "Restaurant Manager",
                image: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
                description: "Antonio ensures that your dining experience is perfect from the moment you walk through our doors."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.title}</p>
                  <p className="text-neutral-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;