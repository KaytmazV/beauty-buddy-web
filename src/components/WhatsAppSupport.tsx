
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppSupport = () => {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-4 bottom-4 z-50 md:left-6 md:bottom-6"
    >
      <button
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative"
        aria-label="WhatsApp Destek"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute left-full ml-4 bg-black/75 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Bize Ulaşın
        </span>
      </button>
    </motion.div>
  );
};

export default WhatsAppSupport;
