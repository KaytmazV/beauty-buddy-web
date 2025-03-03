
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/4df17329-c687-4107-a6eb-71492d6cb117.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6 text-center text-white z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-7xl font-light mb-4 md:mb-6"
        >
          Güzellik ve Zarafet
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto px-4 md:px-0"
        >
          Size özel profesyonel bakım hizmetleriyle doğal güzelliğinizi ortaya çıkarıyoruz
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4 md:space-y-0 md:space-x-4"
        >
          <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white mb-4 md:mb-0">
            Randevu Al
          </Button>
          <Button size="lg" variant="outline" className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white border-white">
            Hizmetlerimiz
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
