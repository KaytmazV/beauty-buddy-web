
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-[90vh]">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <iframe
        src="https://www.youtube.com/embed/lxiO5mXOcR0?autoplay=1&mute=1&loop=1&playlist=lxiO5mXOcR0&controls=0"
        className="absolute inset-0 w-full h-full object-cover"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="relative z-20 h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            Lazer Epilasyon
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Son teknoloji cihazlarımız ve uzman kadromuzla kalıcı çözümler sunuyoruz
          </p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link to="/appointment">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Randevu Al
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
