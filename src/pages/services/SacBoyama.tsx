import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Paintbrush, Palette, Check, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ReactBeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import WhatsAppSupport from "@/components/WhatsAppSupport";

const SacBoyama = () => {
  const services = [
    {
      title: "Saç Boyama",
      description: "Profesyonel saç boyama hizmeti",
      features: ["Kaliteli boya ürünleri", "Özel renk karışımları", "Saç tipine uygun uygulama"]
    },
    {
      title: "Renk Analizi",
      description: "Kişiye özel renk danışmanlığı",
      features: ["Ten rengi analizi", "Doğal saç rengi değerlendirme", "Optimal renk seçimi"]
    },
    {
      title: "Saç Bakımı",
      description: "Boya sonrası özel bakım",
      features: ["Renk koruyucu bakım", "Nem takviyesi", "Parlaklık bakımı"]
    }
  ];

  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9",
      after: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11",
      title: "Sarı Tonlar"
    },
    {
      before: "https://images.unsplash.com/photo-1500840216050-6ffa99d75160",
      after: "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe",
      title: "Kahverengi Tonlar"
    },
    {
      before: "https://images.unsplash.com/photo-1509704215857-7ac19c9842b4",
      after: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11",
      title: "Özel Teknikler"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      <WhatsAppSupport />
      
      {/* Hero Section */}
      <div className="relative h-[90vh]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <iframe
          src="https://www.youtube.com/embed/y2g7FduOLiU?autoplay=1&mute=1&loop=1&playlist=y2g7FduOLiU&controls=0"
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
              Profesyonel Saç Boyama
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              Uzman kadromuz ve kaliteli ürünlerimizle hayalinizdeki saç rengine kavuşun
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
                  ESKİŞEHİR SAÇ BOYAMA
                  <div className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-accent"></div>
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Eskişehir'de profesyonel saç boyama hizmeti arıyorsanız doğru yerdesiniz. 
                En son trendleri ve teknikleri takip eden uzman ekibimizle, hayalinizdeki saç rengine 
                kavuşmanızı sağlıyoruz.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Schwarzkopf ürünleriyle çalışıyor, saçlarınızın sağlığını koruyoruz. 
                Renk analizi ile size en uygun tonu belirliyor, kişiselleştirilmiş çözümler sunuyoruz.
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
                src="https://images.unsplash.com/photo-1560869713-da86a9ec1437"
                alt="Eskişehir Saç Boyama" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hizmetler Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-lg text-muted-foreground">
              Profesyonel ekibimizle sizlere en iyi hizmeti sunuyoruz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {index === 0 ? (
                    <Paintbrush className="w-8 h-8 text-accent" />
                  ) : index === 1 ? (
                    <Palette className="w-8 h-8 text-accent" />
                  ) : (
                    <Check className="w-8 h-8 text-accent" />
                  )}
                </div>
                <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="text-green-500" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fotoğraf Galerisi Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Örnek Çalışmalarımız
            </h2>
            <p className="text-lg text-muted-foreground">
              Öncesi ve sonrası fotoğraflarla müşteri memnuniyetimiz
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

      {/* Galeri Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Galeri
            </h2>
            <p className="text-lg text-muted-foreground">
              En son saç boyama çalışmalarımızdan örnekler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img 
                src="https://images.unsplash.com/photo-1605497788044-5a32c7078486" 
                alt="Saç Boyama Örnek 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df" 
                alt="Saç Boyama Örnek 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img 
                src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250" 
                alt="Saç Boyama Örnek 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
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
              Saç Boyama İçin
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Ücretsiz renk analizi ve konsültasyon için randevu alın
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

export default SacBoyama;
