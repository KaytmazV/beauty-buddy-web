
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Mail, Phone } from "lucide-react";
import WhatsAppSupport from "@/components/WhatsAppSupport";

const Team = () => {
  const team = [
    {
      id: 1,
      name: "Dr. Ayşe Yılmaz",
      role: "Medikal Estetik Uzmanı",
      image: "/lovable-uploads/64a521e6-1a33-4880-aa73-c55de1019236.png",
      education: ["İstanbul Üniversitesi Tıp Fakültesi", "Estetik Tıp Uzmanlığı"],
      experience: "15 yıl",
      expertise: ["Lazer Epilasyon", "Cilt Gençleştirme", "Medikal Cilt Bakımı"],
      description: "Medikal estetik alanında 15 yıllık deneyime sahip olan Dr. Ayşe Yılmaz, özellikle lazer epilasyon ve cilt gençleştirme tedavilerinde uzmanlaşmıştır.",
      certifications: ["Amerikan Estetik Tıp Derneği Sertifikası", "Avrupa Lazer Derneği Üyeliği"],
      social: {
        instagram: "drayse",
        email: "ayse@example.com",
        phone: "+90 555 555 55 55"
      }
    },
    {
      id: 2,
      name: "Zeynep Demir",
      role: "Saç ve Güzellik Uzmanı",
      image: "/lovable-uploads/693c8ffe-710b-40f8-9218-b562b9b63f05.png",
      education: ["Güzellik ve Saç Bakımı Yüksek Lisansı"],
      experience: "8 yıl",
      expertise: ["Saç Bakımı", "Keratin Tedavisi", "Saç Boyama"],
      description: "Saç bakımı ve güzellik konusunda uzman olan Zeynep Demir, en son trendleri ve teknikleri yakından takip ederek müşterilerine en iyi hizmeti sunmaktadır.",
      certifications: ["L'Oréal Profesyonel Saç Bakımı Sertifikası", "Wella Colorist Sertifikası"],
      social: {
        instagram: "zeynepbeauty",
        email: "zeynep@example.com",
        phone: "+90 555 555 55 56"
      }
    },
    {
      id: 3,
      name: "Elif Kaya",
      role: "Tırnak Bakım Uzmanı",
      image: "/lovable-uploads/daed8c08-150b-4242-8b90-e0a06e01df8e.png",
      education: ["Güzellik ve Bakım Uzmanlığı"],
      experience: "6 yıl",
      expertise: ["Manikür", "Pedikür", "Protez Tırnak"],
      description: "Tırnak bakımı ve tasarımı konusunda uzmanlaşmış olan Elif Kaya, hijyenik ve profesyonel hizmet anlayışıyla çalışmaktadır.",
      certifications: ["Profesyonel Tırnak Bakımı Sertifikası", "Nail Art Uzmanlık Sertifikası"],
      social: {
        instagram: "elifnails",
        email: "elif@example.com",
        phone: "+90 555 555 55 57"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white pt-24">
      <WhatsAppSupport />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Profesyonel Ekibimiz
          </h1>
          <p className="text-lg text-muted-foreground">
            Deneyimli ve uzman kadromuzla size en iyi hizmeti sunmak için buradayız
          </p>
        </motion.div>
      </section>

      {/* Team Members */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden group">
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-light mb-2">{member.name}</h3>
                    <p className="text-white/90">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium mb-2">Eğitim</h4>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {member.education.map((edu, i) => (
                          <li key={i}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-2">Uzmanlık Alanları</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((exp, i) => (
                          <span
                            key={i}
                            className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">Deneyim</h4>
                      <p className="text-muted-foreground">{member.experience}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">Sertifikalar</h4>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {member.certifications.map((cert, i) => (
                          <li key={i}>{cert}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-muted-foreground pt-2">
                      {member.description}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                      <a
                        href={`https://instagram.com/${member.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Instagram size={20} />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Mail size={20} />
                      </a>
                      <a
                        href={`tel:${member.social.phone}`}
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Phone size={20} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-accent text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-white/90">
              Güzellik merkezimizde deneyimli ekibimizden hizmet alan müşterilerimizin yorumları
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-lg"
              >
                <p className="text-white/90 mb-4">
                  "Profesyonel ekip ve kaliteli hizmet. Çok memnun kaldım ve herkese tavsiye ediyorum."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full" />
                  <div>
                    <h4 className="font-medium">Müşteri İsmi</h4>
                    <p className="text-white/70 text-sm">İşlem: Lazer Epilasyon</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
