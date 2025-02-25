
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const TechnologiesSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            Teknolojilerimiz
          </h2>
          <p className="text-lg text-muted-foreground">
            En son teknoloji cihazlarımızla güvenli ve etkili sonuçlar elde ediyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TechnologyCard
            title="Alexandrite Lazer"
            description="Açık tenlerde etkili, güvenli ve hızlı sonuç veren teknoloji"
            features={["Hızlı tedavi", "Minimum acı", "Kalıcı sonuç"]}
            delay={0.1}
          />
          <TechnologyCard
            title="Nd:YAG Lazer"
            description="Koyu tenlerde güvenle kullanılabilen teknoloji"
            features={["Tüm cilt tiplerinde", "Güvenli uygulama", "Etkili sonuç"]}
            delay={0.2}
          />
          <TechnologyCard
            title="Diode Lazer"
            description="Her cilt tipine uygun, konforlu epilasyon deneyimi"
            features={["Soğutma sistemi", "Hızlı uygulama", "Tüm vücutta"]}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

interface TechnologyCardProps {
  title: string;
  description: string;
  features: string[];
  delay: number;
}

const TechnologyCard = ({ title, description, features, delay }: TechnologyCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
        <div className="bg-accent w-8 h-8 rounded-full" />
      </div>
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="text-green-500" size={16} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TechnologiesSection;
