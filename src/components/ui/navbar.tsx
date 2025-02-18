
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
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/2e54b248-c48c-4bdf-9e70-3f7000d0a4a4.png" 
              alt="Atasoy Beauty Center Logo" 
              className="h-12"
            />
            <span className="text-2xl font-light text-accent">
              Atasoy Beauty Center
            </span>
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

          <Link to="/appointment">
            <Button className="hidden md:flex bg-accent hover:bg-accent/90 text-white gap-2">
              <Calendar className="w-4 h-4" />
              Randevu Al
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
