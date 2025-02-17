
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-light text-accent">
            Bella
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-accent transition-colors">
              Anasayfa
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-accent transition-colors">
              Hizmetlerimiz
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-accent transition-colors">
              Hakkında
            </Link>
            <Link to="/team" className="text-gray-700 hover:text-accent transition-colors">
              Çalışanlarımız
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-accent transition-colors">
              Blog
            </Link>
          </div>

          <Button className="hidden md:flex bg-accent hover:bg-accent/90 text-white gap-2">
            <Calendar className="w-4 h-4" />
            Randevu Al
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
