import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ReactBeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import WhatsAppSupport from "@/components/WhatsAppSupport";

const TirnakBakim = () => {
  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
      after: "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
      title: "Manikür"
    },
    {
      before: "https://images.unsplash.com/photo-1610992734544-4603a553834b",
      after: "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
      title: "Pedikür"
    },
    {
      before: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b",
      after: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b",
      title: "Protez Tırnak"
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
              Profesyonel Tırnak Bakımı
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              Manikür, pedikür ve protez tırnak uygulamalarında uzman ekibimizle yanınızdayız
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
                  ESKİŞEHİR TIRNAK BAKIM
                  <div className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-accent"></div>
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Eskişehir'in merkezinde, steril ortamda ve uzman ekibimizle profesyonel tırnak bakım hizmetleri sunuyoruz. 
                Kişiye özel tasarımlar ve kaliteli ürünlerle tırnaklarınızın sağlığını koruyoruz.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Manikür, pedikür, kalıcı oje ve protez tırnak uygulamalarımızla ellerinizin ve ayaklarınızın 
                bakımlı görünmesini sağlıyoruz.
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
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371" 
                alt="Eskişehir Tırnak Bakımı" 
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <div className="bg-accent w-8 h-8 rounded-full" />
              </div>
              <h3 className="text-xl font-medium mb-4">Manikür</h3>
              <p className="text-muted-foreground mb-6">
                Profesyonel el ve tırnak bakımı
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Tırnak şekillendirme</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Kalıcı oje</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>El bakımı</span>
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
              <h3 className="text-xl font-medium mb-4">Pedikür</h3>
              <p className="text-muted-foreground mb-6">
                Kapsamlı ayak ve tırnak bakımı
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Tırnak bakımı</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Ayak masajı</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Peeling</span>
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
              <h3 className="text-xl font-medium mb-4">Protez Tırnak</h3>
              <p className="text-muted-foreground mb-6">
                Kalıcı ve estetik tırnak uygulamaları
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Jel tırnak</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Akrilik tırnak</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={16} />
                  <span>Tırnak süsleme</span>
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
              Tırnak Bakımı İçin
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

export default TirnakBakim;
