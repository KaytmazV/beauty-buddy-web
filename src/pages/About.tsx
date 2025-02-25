
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineItem {
  year: number;
  title: string;
  description: string;
}

const timeline: TimelineItem[] = [
  {
    year: 2011,
    title: "Sektöre İlk Adım",
    description: "İlayda Bağ Güzellik Salonu olarak sektöre ilk adımımızı attık. Müşterilerimize en iyi hizmeti sunma hedefiyle yola çıktık."
  },
  {
    year: 2015,
    title: "Büyüme ve Gelişim",
    description: "Artan müşteri memnuniyeti ve talep doğrultusunda salonumuzu genişlettik. Ekibimize yeni uzmanlar katıldı."
  },
  {
    year: 2017,
    title: "Teknoloji Yatırımı",
    description: "En son teknoloji cihazlarla donanımımızı yeniledik. Lazer epilasyon ve cilt bakımı alanında öncü teknolojileri müşterilerimizle buluşturduk."
  },
  {
    year: 2020,
    title: "Dijital Dönüşüm",
    description: "Pandemi sürecinde dijital randevu sistemimizi geliştirdik. Online danışmanlık hizmetlerimizi başlattık."
  },
  {
    year: 2022,
    title: "Yenilikçi Hizmetler",
    description: "Yeni nesil cilt bakım teknolojileri ve organik ürün serimizi müşterilerimizle buluşturduk. Sürdürülebilir güzellik anlayışımızı güçlendirdik."
  }
];

const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex gap-8 md:gap-12 items-start relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {/* Sol taraf - Yıl */}
      <div className="w-24 md:w-32 text-right flex-shrink-0">
        <span className="text-2xl md:text-3xl font-bold text-accent">
          {item.year}
        </span>
      </div>

      {/* Ok ve çizgi */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 bg-accent rounded-full z-10"></div>
        <motion.div 
          className="w-0.5 bg-accent/30 h-full absolute top-3"
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : { height: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Sağ taraf - İçerik */}
      <Card className="flex-1 mb-12">
        <CardContent className="p-6">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.title}</h3>
          <p className="text-muted-foreground">{item.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Bölümü */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Güzellik Yolculuğumuz
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            2011'den beri güzellik ve bakım sektöründe, sizlere en iyi hizmeti
            sunmak için çalışıyoruz. İşte yıllar içindeki gelişimimiz...
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-accent"
          >
            <ArrowDown size={32} className="mx-auto" />
          </motion.div>
        </motion.div>
      </div>

      {/* Zaman Çizelgesi */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
