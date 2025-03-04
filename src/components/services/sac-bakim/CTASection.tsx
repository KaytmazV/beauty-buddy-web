
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Ücretsiz konsültasyon için randevu alın
          </p>
          <Link to="/appointment">
            <Button size="lg" className="bg-white text-accent hover:bg-white/90">
              <Calendar className="mr-2" />
              Randevu Al
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
