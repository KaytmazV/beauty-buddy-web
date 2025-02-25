
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/UserDashboard";
import LazerEpilasyon from "./pages/services/LazerEpilasyon";
import SacBakim from "./pages/services/SacBakim";
import Navbar from "./components/ui/navbar";
import { Toaster } from "@/components/ui/sonner";
import WhatsAppSupport from "./components/WhatsAppSupport";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/services/lazer-epilasyon" element={<LazerEpilasyon />} />
        <Route path="/services/sac-bakim" element={<SacBakim />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppSupport />
      <Toaster />
    </Router>
  );
}

export default App;
