
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Calendar, ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            <span className="text-2xl font-light text-accent hidden sm:inline">
              Atasoy Beauty Center
            </span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
              <div className="flex flex-col p-4 space-y-4">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Anasayfa
                </Link>
                <Link 
                  to="/services/lazer-epilasyon" 
                  className="text-gray-700 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lazer Epilasyon
                </Link>
                <Link 
                  to="/services/sac-bakim" 
                  className="text-gray-700 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Saç Bakım
                </Link>
                <Link 
                  to="/services/tirnak-bakim" 
                  className="text-gray-700 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tırnak Bakımı
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hakkında
                </Link>
                <Link 
                  to="/team" 
                  className="text-gray-700 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Çalışanlarımız
                </Link>
                <Link 
                  to="/blog" 
                  className="text-gray-700 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/appointment" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white gap-2">
                    <Calendar className="w-4 h-4" />
                    Randevu Al
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-accent transition-colors">
              Anasayfa
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-accent transition-colors">
                Hizmetlerimiz
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/services/lazer-epilasyon" className="w-full">
                    Lazer Epilasyon
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/services/sac-bakim" className="w-full">
                    Saç Bakım
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/services/tirnak-bakim" className="w-full">
                    Tırnak Bakımı
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/services/sac-boyama" className="w-full">
                    Saç Boyama
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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

          <Link to="/appointment" className="hidden md:block">
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
