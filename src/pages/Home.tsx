@@ .. @@
 import React from 'react';
 import { Link } from 'react-router-dom';
 import { motion } from 'framer-motion';
-import { Pizza, Clock, Star, MapPin } from 'lucide-react';
+import { Pizza, Clock, Star, MapPin, ChefHat } from 'lucide-react';

 export const Home: React.FC = () => {
 }
@@ .. @@
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
           >
-            <Link
-              to="/menu"
-              className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
-            >
-              <Pizza className="mr-2 h-5 w-5" />
-              View Our Menu
-            </Link>
+            <div className="flex flex-col sm:flex-row gap-4 justify-center">
+              <Link
+                to="/menu"
+                className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
+              >
+                <Pizza className="mr-2 h-5 w-5" />
+                Order Now
+              </Link>
+              <Link
+                to="/about"
+                className="inline-flex items-center justify-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg border-2 border-red-600 hover:bg-red-50 transition-colors duration-200"
+              >
+                <ChefHat className="mr-2 h-5 w-5" />
+                Learn More
+              </Link>
+            </div>
           </motion.div>
         </div>
       </section>