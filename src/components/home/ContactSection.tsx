
import { motion } from "framer-motion";
import { Phone, MapPin, Calendar } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-8 md:mb-12">İletişim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Side - Contact Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden"
            >
              <img 
                src="/lovable-uploads/64a521e6-1a33-4880-aa73-c55de1019236.png"
                alt="Beauty Salon Storefront"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right Side - Map */}
            <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px] bg-muted">
              {/* Placeholder for Google Maps */}
              <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-accent" />
              </div>
            </div>

            {/* Contact Information Below */}
            <div className="bg-secondary rounded-xl p-6 md:p-8 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Telefon</h3>
                    <p className="text-muted-foreground">+90 555 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Adres</h3>
                    <p className="text-muted-foreground">Güzellik Sokak No:1, İstanbul</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Çalışma Saatleri</h3>
                    <p className="text-muted-foreground">Her gün 09:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
