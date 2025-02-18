
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const LazerEpilasyon = () => {
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
            Lazer Epilasyon
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            En son teknoloji lazer epilasyon cihazlarımız ve uzman kadromuzla, 
            istenmeyen tüylerden kalıcı olarak kurtulmanızı sağlıyoruz.
          </p>
        </motion.div>

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

        {/* Pricing Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-light text-center mb-12">Bölgesel Fiyatlandırma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Yüz Bölgesi</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span>Bıyık</span>
                    <span className="font-medium">₺200</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Çene</span>
                    <span className="font-medium">₺250</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Komple Yüz</span>
                    <span className="font-medium">₺500</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Vücut Bölgesi</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span>Koltukaltı</span>
                    <span className="font-medium">₺300</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Bacak</span>
                    <span className="font-medium">₺800</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Kol</span>
                    <span className="font-medium">₺600</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Özel Paketler</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span>Tüm Vücut</span>
                    <span className="font-medium">₺2000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Yarım Vücut</span>
                    <span className="font-medium">₺1200</span>
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

export default LazerEpilasyon;
