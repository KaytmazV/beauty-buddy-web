
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AppointmentForm from "./components/AppointmentForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/ui/navbar";
import LazerEpilasyon from "./pages/services/LazerEpilasyon";
import SacBakim from "./pages/services/SacBakim";
import Team from "./pages/Team";

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
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/services/lazer-epilasyon" element={<LazerEpilasyon />} />
          <Route path="/services/sac-bakim" element={<SacBakim />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
