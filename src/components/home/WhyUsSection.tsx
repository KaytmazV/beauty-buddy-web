
import { motion } from "framer-motion";
import { Users, Scissors, Star, Heart, Calendar, MapPin } from "lucide-react";

const WhyUsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-accent mb-2">En İyisi Olmak</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">Neden Biz?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4 md:px-0">
            20 yıllık tecrübemiz ve uzman kadromuzla size en kaliteli hizmeti sunuyoruz
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-0">
          {/* Center Image */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full rounded-full overflow-hidden border-4 border-accent/20"
            >
              <img 
                src="/lovable-uploads/db42afb7-b175-4b3d-a2cf-713523bc80ea.png"
                alt="Beauty Center" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-[30rem] md:gap-y-16 py-8 md:py-20">
            {/* Left Side Items */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-right flex items-center justify-end gap-4"
            >
              <div>
                <h3 className="text-lg font-medium mb-2">Deneyimli Ekip</h3>
                <p className="text-muted-foreground text-base">
                  Alanında uzman profesyonel kadro
                </p>
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-accent" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Scissors className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Profesyonel Hizmet</h3>
                <p className="text-muted-foreground text-base">
                  Kişiye özel bakım planlaması
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-right flex items-center justify-end gap-4"
            >
              <div>
                <h3 className="text-lg font-medium mb-2">Özenli Hizmet</h3>
                <p className="text-muted-foreground text-base">
                  Her müşterimize özel ilgi
                </p>
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-accent" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Premium Kalite</h3>
                <p className="text-muted-foreground text-base">
                  En kaliteli ürünler ve hizmet
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-right flex items-center justify-end gap-4"
            >
              <div>
                <h3 className="text-lg font-medium mb-2">Esnek Çalışma</h3>
                <p className="text-muted-foreground text-base">
                  Size uygun randevu imkanı
                </p>
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-8 h-8 text-accent" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Merkezi Konum</h3>
                <p className="text-muted-foreground text-base">
                  Kolay ulaşılabilir lokasyon
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
