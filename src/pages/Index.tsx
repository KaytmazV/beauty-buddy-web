import { motion } from "framer-motion";
import { Calendar, MapPin, Phone, Scissors, Star, Users, Heart, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center text-white z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light mb-6"
          >
            Güzellik ve Zarafet
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Size özel profesyonel bakım hizmetleriyle doğal güzelliğinizi ortaya çıkarıyoruz
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-x-4"
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Randevu Al
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
              Hizmetlerimiz
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent mb-2">En İyisi Olmak</p>
            <h2 className="text-4xl font-light text-gray-800 mb-4">Neden Biz?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              20 yıllık tecrübemiz ve uzman kadromuzla size en kaliteli hizmeti sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-14 h-14 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3">Deneyimli Ekip</h3>
                  <p className="text-muted-foreground text-lg">
                    Alanında uzman profesyonel kadro ile hizmetinizdeyiz
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-14 h-14 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3">Özenli Hizmet</h3>
                  <p className="text-muted-foreground text-lg">
                    Her müşterimize özel ilgi ve hassasiyet
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Center Column with Image */}
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full aspect-square rounded-full overflow-hidden border-4 border-accent/20"
              >
                <img 
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="Beauty Center" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scissors className="w-14 h-14 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3">Profesyonel Hizmet</h3>
                  <p className="text-muted-foreground text-lg">
                    Kişiye özel bakım planlaması
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-14 h-14 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3">Premium Kalite</h3>
                  <p className="text-muted-foreground text-lg">
                    En kaliteli ürünler ve hizmet
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-4">Hizmetlerimiz</h2>
            <p className="text-muted-foreground">Size özel profesyonel bakım hizmetleri</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-80 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">{service.title}</h3>
                  <p className="text-white/80 text-center max-w-xs px-4">{service.description}</p>
                  <Button variant="outline" className="mt-4 text-white border-white hover:bg-white/20">
                    Detaylı Bilgi
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-4">Ekibimiz</h2>
            <p className="text-muted-foreground">Profesyonel ve deneyimli ekibimizle tanışın</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="relative h-[400px] overflow-hidden rounded-xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-medium mb-2">{member.name}</h3>
                      <p className="text-white/80 mb-4">{member.role}</p>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <a 
                          href={member.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white hover:text-accent transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light text-center mb-12">İletişim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-secondary rounded-xl p-8">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Telefon</h3>
                      <p className="text-muted-foreground">+90 555 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Adres</h3>
                      <p className="text-muted-foreground">Güzellik Sokak No:1, İstanbul</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Çalışma Saatleri</h3>
                      <p className="text-muted-foreground">Her gün 09:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-[400px] bg-muted">
                {/* Placeholder for Google Maps */}
                <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const whyUs = [
  {
    title: "Deneyim",
    description: "20 yıllık sektör tecrübesi",
    icon: <Star className="w-8 h-8 text-accent" />,
    stat: "20+"
  },
  {
    title: "Mutlu Müşteri",
    description: "Memnuniyet odaklı hizmet",
    icon: <Heart className="w-8 h-8 text-accent" />,
    stat: "5000+"
  },
  {
    title: "Uzman Kadro",
    description: "Profesyonel ekip",
    icon: <Users className="w-8 h-8 text-accent" />,
    stat: "15+"
  },
  {
    title: "Hizmet",
    description: "Farklı güzellik hizmeti",
    icon: <Scissors className="w-8 h-8 text-accent" />,
    stat: "30+"
  }
];

const services = [
  {
    title: "Saç Bakımı",
    description: "Profesyonel saç kesimi, boyama ve bakım hizmetleri",
    icon: <Scissors className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    title: "Cilt Bakımı",
    description: "Kişiye özel cilt analizi ve bakım uygulamaları",
    icon: <Star className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    title: "Makyaj",
    description: "Özel günler için profesyonel makyaj hizmetleri",
    icon: <Users className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  }
];

const teamMembers = [
  {
    name: "Ayşe Yılmaz",
    role: "Saç Tasarım Uzmanı",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    instagram: "https://instagram.com/ayseyilmaz"
  },
  {
    name: "Zeynep Kaya",
    role: "Makyaj ve Cilt Bakım Uzmanı",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    instagram: "https://instagram.com/zeynepkaya"
  },
  {
    name: "Merve Demir",
    role: "Lazer ve Epilasyon Uzmanı",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    instagram: "https://instagram.com/mervedemir"
  }
];

export default Index;
