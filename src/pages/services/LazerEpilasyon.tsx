
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ReactBeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

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
    <div className="min-h-screen bg-secondary">
      {/* Video Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-black/50 z-10" />
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
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6">
              Lazer Epilasyon
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto px-6">
              En son teknoloji ile kalıcı çözümler sunuyoruz
            </p>
          </motion.div>
        </div>
      </div>

      {/* Eskişehir Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-light text-gray-800">
                ESKİŞEHİR LAZER EPİLASYON
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Eskişehir'in kalbinde, modern teknoloji ve uzman kadromuzla lazer epilasyon hizmetleri sunuyoruz. Her cilt tipine uygun, FDA onaylı son teknoloji cihazlarımızla güvenli ve etkili sonuçlar elde ediyoruz. Deneyimli ekibimiz, kişiselleştirilmiş tedavi planları ile sizin için en uygun çözümü sunarak, istenmeyen tüylerden kalıcı olarak kurtulmanızı sağlıyor. Hijyenik ortamımız, profesyonel yaklaşımımız ve uygun fiyat politikamızla Eskişehir'de lazer epilasyon denince akla gelen ilk adres olmaktan gurur duyuyoruz.
              </p>
              <div className="pt-4">
                <Link to="/appointment">
                  <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
                    <Calendar className="w-4 h-4" />
                    Ücretsiz Danışmanlık
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3" 
                alt="Eskişehir Lazer Epilasyon" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-16">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-medium mb-4">Alexandrite Lazer</h3>
            <p className="text-muted-foreground mb-4">
              Açık tenlerde etkili, güvenli ve hızlı sonuç veren teknoloji
            </p>
            <ul className="space-y-2">
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
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-medium mb-4">Nd:YAG Lazer</h3>
            <p className="text-muted-foreground mb-4">
              Koyu tenlerde güvenle kullanılabilen teknoloji
            </p>
            <ul className="space-y-2">
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
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-medium mb-4">Diode Lazer</h3>
            <p className="text-muted-foreground mb-4">
              Her cilt tipine uygun, konforlu epilasyon deneyimi
            </p>
            <ul className="space-y-2">
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

        {/* Before/After Section */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-light text-center mb-12"
          >
            Hizmetlerimiz ve Sonuçlarımız
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-medium text-center mb-4">{image.title}</h3>
                <ReactBeforeAfterSlider
                  firstImage={{ imageUrl: image.before }}
                  secondImage={{ imageUrl: image.after }}
                  currentPercentPosition={50}
                  delimiterColor="#9B6B7D"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/appointment">
            <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
              <Calendar className="w-4 h-4" />
              Hemen Randevu Al
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LazerEpilasyon;
