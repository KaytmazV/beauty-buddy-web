
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const SacBakim = () => {
  return (
    <div className="min-h-screen pt-24 bg-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Saç Bakım Hizmetleri
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profesyonel saç bakım hizmetlerimizle saçlarınızı yeniden canlandırıyor, 
            sağlıklı ve parlak görünmelerini sağlıyoruz.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-medium mb-4">Keratin Bakımı</h3>
            <p className="text-muted-foreground mb-4">
              Saçlarınızı yeniden yapılandıran profesyonel bakım
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Elektriklenme önleme</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Parlak görünüm</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Kolay şekillendirme</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-medium mb-4">Protein Bakımı</h3>
            <p className="text-muted-foreground mb-4">
              Yıpranmış saçlar için özel formül
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Saç kırıklarını onarım</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Güçlendirme</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Nem dengeleme</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-medium mb-4">Botoks Bakımı</h3>
            <p className="text-muted-foreground mb-4">
              Derin bakım ve yoğun nemlendirme
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Yoğun nemlendirme</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Hacim kazandırma</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                <span>Uzun süreli etki</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-light text-center mb-12">Bakım Paketleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Temel Bakım</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span>Saç Kesimi</span>
                    <span className="font-medium">₺150</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Şekillendirme</span>
                    <span className="font-medium">₺100</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Yıkama</span>
                    <span className="font-medium">₺50</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Keratin Bakımı</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span>Kısa Saç</span>
                    <span className="font-medium">₺800</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Orta Saç</span>
                    <span className="font-medium">₺1000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Uzun Saç</span>
                    <span className="font-medium">₺1200</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Botoks Bakımı</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span>Kısa Saç</span>
                    <span className="font-medium">₺600</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Orta Saç</span>
                    <span className="font-medium">₺800</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Uzun Saç</span>
                    <span className="font-medium">₺1000</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
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

export default SacBakim;
