
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-12 md:py-20 bg-pink-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-pink-400 text-lg md:text-xl mb-2"
              >
                Who We Are
              </motion.h3>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-medium text-gray-800 mb-4 md:mb-6"
              >
                Our History
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-600 leading-relaxed"
              >
                2019 yılında başlayan yolculuğumuzda, müşterilerimize en kaliteli hizmeti sunma vizyonuyla
                çalışmalarımızı sürdürüyoruz. Yılların deneyimi ve sürekli gelişen teknolojilerle
                sektörde öncü konumumuzu koruyoruz.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h4 className="text-4xl md:text-5xl font-light text-pink-400 mb-2">5</h4>
                <p className="text-gray-600">Years of Experience</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <h4 className="text-4xl md:text-5xl font-light text-pink-400 mb-2">400+</h4>
                <p className="text-gray-600">Happy Customers</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[300px] md:h-[600px] rounded-2xl overflow-hidden mt-8 md:mt-0"
          >
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Beauty Salon Interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
