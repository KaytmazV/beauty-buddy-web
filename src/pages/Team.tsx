
import { motion } from "framer-motion";
import { Instagram, Mail, Phone } from "lucide-react";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import { useState } from "react";

const Team = () => {
  const [activeTeamMember, setActiveTeamMember] = useState(1);

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

  const activeMember = team.find(member => member.id === activeTeamMember);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white pt-24">
      <WhatsAppSupport />
      
      {/* Ana Başlık */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Çalışanlarımız
          </h1>
        </motion.div>
      </section>

      {/* Alt Başlıklar - Navigation */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto">
          {team.map((member) => (
            <button
              key={member.id}
              onClick={() => setActiveTeamMember(member.id)}
              className={`text-xl font-light py-2 px-6 rounded-full transition-colors ${
                activeTeamMember === member.id 
                ? "bg-accent text-white" 
                : "text-gray-600 hover:text-accent"
              }`}
            >
              {member.name}
            </button>
          ))}
        </div>
      </section>

      {/* Aktif Üye Portföyü */}
      {activeMember && (
        <motion.section 
          key={activeMember.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 mb-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="relative h-[600px] rounded-2xl overflow-hidden group">
                <img
                  src={activeMember.image}
                  alt={activeMember.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-light text-gray-800 mb-2">
                    {activeMember.name}
                  </h2>
                  <p className="text-xl text-muted-foreground">{activeMember.role}</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Uzmanlık Alanları</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeMember.expertise.map((exp, i) => (
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
                  <p className="text-lg text-muted-foreground">{activeMember.experience}</p>
                </div>

                <p className="text-lg text-muted-foreground">
                  {activeMember.description}
                </p>

                <div className="flex items-center gap-6 pt-4">
                  <a
                    href={`https://instagram.com/${activeMember.social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href={`mailto:${activeMember.social.email}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Mail size={24} />
                  </a>
                  <a
                    href={`tel:${activeMember.social.phone}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Phone size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

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
