
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ReactBeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import WhatsAppSupport from "@/components/WhatsAppSupport";

const LazerEpilasyon = () => {
  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3",
      after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
      title: "Bacak Bölgesi"
    },
    {
      before: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3",
      after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
      title: "Kol Bölgesi"
    },
    {
      before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3",
      after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
      title: "Yüz Bölgesi"
    },
    {
      before: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3",
      after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
      title: "Koltukaltı"
    },
    {
      before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3",
      after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
      title: "Bikini Bölgesi"
    },
    {
      before: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3",
      after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
      title: "Tüm Vücut"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      <WhatsAppSupport />
      {/* Hero Section */}
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

      {/* Eskişehir Section */}
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

      {/* Features Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Teknolojilerimiz
            </h2>
            <p className="text-lg text-muted-foreground">
              En son teknoloji cihazlarımızla güvenli ve etkili sonuçlar elde ediyoruz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <div className="bg-accent w-8 h-8 rounded-full" />
              </div>
              <h3 className="text-xl font-medium mb-4">Alexandrite Lazer</h3>
              <p className="text-muted-foreground mb-6">
                Açık tenlerde etkili, güvenli ve hızlı sonuç veren teknoloji
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Hızlı tedavi</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Minimum acı</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Kalıcı sonuç</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <div className="bg-accent w-8 h-8 rounded-full" />
              </div>
              <h3 className="text-xl font-medium mb-4">Nd:YAG Lazer</h3>
              <p className="text-muted-foreground mb-6">
                Koyu tenlerde güvenle kullanılabilen teknoloji
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Tüm cilt tiplerinde</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Güvenli uygulama</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Etkili sonuç</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <div className="bg-accent w-8 h-8 rounded-full" />
              </div>
              <h3 className="text-xl font-medium mb-4">Diode Lazer</h3>
              <p className="text-muted-foreground mb-6">
                Her cilt tipine uygun, konforlu epilasyon deneyimi
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Soğutma sistemi</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Hızlı uygulama</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Tüm vücutta</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Öncesi ve Sonrası
            </h2>
            <p className="text-lg text-muted-foreground">
              Müşterilerimizin gerçek sonuçları
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-accent/10 py-4">
                  <h3 className="text-xl font-medium text-center text-gray-800">{image.title}</h3>
                </div>
                <div className="p-6">
                  <ReactBeforeAfterSlider
                    firstImage={{ imageUrl: image.before }}
                    secondImage={{ imageUrl: image.after }}
                    currentPercentPosition={50}
                    delimiterColor="#9B6B7D"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Hemen Başlayın
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Ücretsiz konsültasyon için randevu alın
            </p>
            <Link to="/appointment">
              <Button size="lg" className="bg-white text-accent hover:bg-white/90">
                <Calendar className="mr-2" />
                Randevu Al
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LazerEpilasyon;
