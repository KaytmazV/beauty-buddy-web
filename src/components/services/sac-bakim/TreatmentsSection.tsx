
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const treatments = [
  {
    id: 1,
    name: "Keratin Bakımı",
    description: "Profesyonel keratin bakımı ile saçlarınızı yeniden canlandırın. Kırık uçları onarır ve parlaklık kazandırır.",
    price: "₺1,200",
    icon: "✨"
  },
  {
    id: 2,
    name: "Saç Botoksu",
    description: "Saç botoksu ile saçlarınızı derinlemesine besleyin. Yıpranmış saçlar için ideal bir tedavi yöntemidir.",
    price: "₺950",
    icon: "💆‍♀️"
  },
  {
    id: 3,
    name: "Protein Tedavisi",
    description: "Saçlarınıza protein takviyesi yaparak güçlendirin ve dökülmeleri azaltın.",
    price: "₺750",
    icon: "💪"
  },
  {
    id: 4,
    name: "Argan Yağı Bakımı",
    description: "Argan yağı ile saçlarınızı nemlendirin ve doğal parlaklık kazandırın.",
    price: "₺650",
    icon: "💧"
  },
  {
    id: 5,
    name: "Nem Terapisi",
    description: "Kuru ve mat saçlar için özel olarak geliştirilen nem terapisi ile saçlarınızı canlandırın.",
    price: "₺550",
    icon: "🌊"
  },
  {
    id: 6,
    name: "Biyolüminans Tedavi",
    description: "Yeni nesil biyolüminans teknolojisi ile saçlarınıza doğal ışıltı katın.",
    price: "₺1,500",
    icon: "✨"
  }
];

const TreatmentsSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Saç Bakım Hizmetlerimiz
          </h2>
          <p className="text-lg text-gray-600">
            Sağlıklı, parlak ve canlı saçlar için sunduğumuz özel bakım seçenekleri
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-3xl mb-4">{treatment.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{treatment.name}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{treatment.description}</p>
                  <p className="font-bold text-lg text-accent">{treatment.price}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentsSection;
