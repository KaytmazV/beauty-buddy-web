
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Team from "@/pages/Team";
import LazerEpilasyon from "@/pages/services/LazerEpilasyon";
import SacBakim from "@/pages/services/SacBakim";
import NotFound from "@/pages/NotFound";
import UserDashboard from "@/pages/UserDashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/team" element={<Team />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/services/lazer-epilasyon" element={<LazerEpilasyon />} />
          <Route path="/services/sac-bakim" element={<SacBakim />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
