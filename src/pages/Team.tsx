
import { motion } from "framer-motion";
import { Instagram, Mail, Phone } from "lucide-react";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Team = () => {
  const team = [
    {
      id: 1,
      name: "Dr. Ayşe Yılmaz",
      role: "Medikal Estetik Uzmanı",
      image: "/lovable-uploads/64a521e6-1a33-4880-aa73-c55de1019236.png",
      experience: "15 yıl",
      expertise: ["Lazer Epilasyon", "Cilt Gençleştirme", "Medikal Cilt Bakımı"],
      description: "Medikal estetik alanında 15 yıllık deneyime sahip olan Dr. Ayşe Yılmaz, özellikle lazer epilasyon ve cilt gençleştirme tedavilerinde uzmanlaşmıştır.",
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
      experience: "8 yıl",
      expertise: ["Saç Bakımı", "Keratin Tedavisi", "Saç Boyama"],
      description: "Saç bakımı ve güzellik konusunda uzman olan Zeynep Demir, en son trendleri ve teknikleri yakından takip ederek müşterilerine en iyi hizmeti sunmaktadır.",
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
      experience: "6 yıl",
      expertise: ["Manikür", "Pedikür", "Protez Tırnak"],
      description: "Tırnak bakımı ve tasarımı konusunda uzmanlaşmış olan Elif Kaya, hijyenik ve profesyonel hizmet anlayışıyla çalışmaktadır.",
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
      
      {/* Ana Başlık */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Çalışanlarımız 
          </h1>
          <p className="text-lg text-muted-foreground">
            Deneyimli ve uzman kadromuzla size en iyi hizmeti sunmak için buradayız
          </p>
        </motion.div>
      </section>

      {/* Çalışanlar Listesi */}
      <section className="container mx-auto px-6 mb-20">
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
          {team.map((member, index) => (
            <AccordionItem key={member.id} value={`item-${index}`}>
              <AccordionTrigger className="text-2xl font-light hover:no-underline py-8">
                <div className="flex items-center gap-4">
                  <span>{member.name}</span>
                  <span className="text-lg text-muted-foreground font-normal">
                    {member.role}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-6">
                  <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4">Uzmanlık Alanları</h3>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((exp, i) => (
                          <span
                            key={i}
                            className="bg-accent/10 text-accent px-4 py-2 rounded-full"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-4">Deneyim</h3>
                      <p className="text-lg text-muted-foreground">{member.experience}</p>
                    </div>

                    <p className="text-lg text-muted-foreground">
                      {member.description}
                    </p>

                    <div className="flex items-center gap-6 pt-4">
                      <a
                        href={`https://instagram.com/${member.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Instagram size={24} />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Mail size={24} />
                      </a>
                      <a
                        href={`tel:${member.social.phone}`}
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Phone size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
