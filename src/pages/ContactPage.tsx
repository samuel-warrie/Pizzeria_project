import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact Us - Pizzeria Fornello';
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
            <h1 className="text-5xl font-serif font-bold mb-4">Get In Touch</h1>
            <p className="text-xl max-w-2xl mx-auto">
              We'd love to hear from you! Reach out for reservations, feedback, or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact information and form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                    <p className="text-neutral-700">
                      123 Pizza Street<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone Number</h3>
                    <p className="text-neutral-700">
                      (123) 456-7890<br />
                      (123) 456-7891
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Address</h3>
                    <p className="text-neutral-700">
                      info@pizzeriafornello.com<br />
                      reservations@pizzeriafornello.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Operating Hours</h3>
                    <div className="text-neutral-700 space-y-1">
                      <p>Monday - Thursday: 11am - 10pm</p>
                      <p>Friday - Saturday: 11am - 11pm</p>
                      <p>Sunday: 12pm - 9pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold mb-6">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="input"
                    placeholder="Reservation / Feedback / Other"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="input"
                    placeholder="Write your message here..."
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="py-8">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold mb-6">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9 h-96 w-full rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343035!2d-74.00425872426835!3d40.74076937138799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sMadison%20Square%20Park!5e0!3m2!1sen!2sus!4v1692386404708!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Pizzeria Fornello Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;