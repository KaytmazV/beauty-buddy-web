
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const InfoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Sağlıklı Saçlar İçin Profesyonel Bakım
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Modern yaşamın stres faktörleri, çevresel etkenler ve yanlış bakım uygulamaları saçlarınızın canlılığını kaybetmesine neden olabilir.
            Salonumuzda sunduğumuz profesyonel saç bakım hizmetleri ile saçlarınızı yeniden canlandırıyor, güçlendiriyor ve
            doğal parlaklığına kavuşturuyoruz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-none shadow-lg overflow-hidden h-full">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop" 
                  alt="Saç bakım ürünleri" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Profesyonel Ürünler</h3>
                <p className="text-gray-600">
                  Salonumuzda dünya çapında bilinen markaların en kaliteli ve en güncel ürünlerini kullanıyoruz. 
                  Her saç tipine özel olarak seçilen ürünlerle, saçlarınızın ihtiyacı olan bakımı en doğru şekilde sağlıyoruz.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-none shadow-lg overflow-hidden h-full">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop" 
                  alt="Uzman ekip" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Uzman Kadro</h3>
                <p className="text-gray-600">
                  Alanında uzmanlaşmış, sürekli kendini geliştiren ve en güncel teknikleri bilen profesyonel ekibimiz, 
                  saçlarınızın ihtiyacını doğru tespit ederek en uygun bakımı uyguluyor.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
