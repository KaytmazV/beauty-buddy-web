import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Index = () => {
  const services = [
    {
      title: "Lazer Epilasyon",
      description: "Kalıcı tüy alma çözümleri için son teknoloji lazer epilasyon hizmetimiz",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
      link: "/services/lazer-epilasyon"
    },
    {
      title: "Saç Bakımı",
      description: "Profesyonel saç bakım ve tedavi hizmetlerimiz",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      link: "/services/sac-bakimi"
    },
    {
      title: "Tırnak Bakımı",
      description: "Manikür, pedikür ve tırnak bakım hizmetlerimiz",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
      link: "/services/tirnak-bakimi"
    },
    {
      title: "Saç Boyama",
      description: "Profesyonel saç boyama ve renklendirme hizmetlerimiz",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803",
      link: "/services/sac-boyama"
    }
  ];

  const ServiceCard = ({ title, description, image, link }: ServiceCardProps) => {
    return (
      <Link to={link}>
        <Card className="group relative overflow-hidden h-[400px] border-none">
          <CardContent className="p-0">
            <div className="absolute inset-0">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="relative h-full p-6 flex flex-col justify-end text-white">
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-sm">{description}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 px-4"
          >
            <h1 className="text-5xl md:text-7xl font-light">
              Güzelliğinize Değer Katın
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
              Profesyonel ekibimiz ve son teknoloji cihazlarımızla hizmetinizdeyiz
            </p>
            <div className="pt-4">
              <Link to="/appointment">
                <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
                  <Calendar className="w-4 h-4" />
                  Hemen Randevu Al
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-secondary">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-light text-center mb-16"
          >
            Hizmetlerimiz
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
