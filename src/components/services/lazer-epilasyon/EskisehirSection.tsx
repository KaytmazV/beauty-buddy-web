
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EskisehirSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-block">
              <h2 className="text-4xl font-light text-gray-800 relative">
                ESKİŞEHİR LAZER EPİLASYON
                <div className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-accent"></div>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Eskişehir'in kalbinde, modern teknoloji ve uzman kadromuzla lazer epilasyon hizmetleri sunuyoruz. 
              Her cilt tipine uygun, FDA onaylı son teknoloji cihazlarımızla güvenli ve etkili sonuçlar elde ediyoruz. 
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Deneyimli ekibimiz, kişiselleştirilmiş tedavi planları ile sizin için en uygun çözümü sunarak, 
              istenmeyen tüylerden kalıcı olarak kurtulmanızı sağlıyor.
            </p>
            <div className="pt-4">
              <Link to="/blog">
                <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-white">
                  Daha Fazla Bilgi
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3" 
              alt="Eskişehir Lazer Epilasyon" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EskisehirSection;
