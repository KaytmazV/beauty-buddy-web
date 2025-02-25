
import { motion } from "framer-motion";
import ReactBeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

const beforeAfterImages = [
  {
    before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
    title: "Bacak Bölgesi"
  },
  {
    before: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
    title: "Kol Bölgesi"
  },
  {
    before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
    title: "Yüz Bölgesi"
  },
  {
    before: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
    title: "Koltukaltı"
  },
  {
    before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
    title: "Bikini Bölgesi"
  },
  {
    before: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
    title: "Tüm Vücut"
  }
];

const BeforeAfterSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            Öncesi ve Sonrası
          </h2>
          <p className="text-lg text-muted-foreground">
            Müşterilerimizin gerçek sonuçları
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-accent/10 py-4">
                <h3 className="text-xl font-medium text-center text-gray-800">{image.title}</h3>
              </div>
              <div className="p-6">
                <ReactBeforeAfterSlider
                  firstImage={{ imageUrl: image.before }}
                  secondImage={{ imageUrl: image.after }}
                  currentPercentPosition={50}
                  delimiterColor="#9B6B7D"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
