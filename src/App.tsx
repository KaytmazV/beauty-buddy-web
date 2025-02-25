
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import Team from "@/pages/Team";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import LazerEpilasyon from "@/pages/services/LazerEpilasyon";
import SacBakim from "@/pages/services/SacBakim";
import TirnakBakim from "@/pages/services/TirnakBakim";
import SacBoyama from "@/pages/services/SacBoyama";
import NotFound from "@/pages/NotFound";
import UserDashboard from "@/pages/UserDashboard";
import Navbar from "@/components/ui/navbar";
import AppointmentForm from "@/components/AppointmentForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/services/lazer-epilasyon" element={<LazerEpilasyon />} />
          <Route path="/services/sac-bakim" element={<SacBakim />} />
          <Route path="/services/tirnak-bakim" element={<TirnakBakim />} />
          <Route path="/services/sac-boyama" element={<SacBoyama />} />
          <Route path="/team" element={<Team />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
