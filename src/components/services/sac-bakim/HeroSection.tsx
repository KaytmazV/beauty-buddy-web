
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-[90vh]">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <img
        src="https://images.unsplash.com/photo-1562594980-47b089cecdb9?q=80&w=2070&auto=format&fit=crop"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Saç bakım profesyoneli çalışırken"
      />
      <div className="relative z-20 h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            Saç Bakım Hizmetleri
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Profesyonel ürünler ve uzman kadromuzla saçlarınıza özel çözümler sunuyoruz
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
