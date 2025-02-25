
import { WhatsAppSupport } from "@/components/WhatsAppSupport";
import HeroSection from "@/components/services/lazer-epilasyon/HeroSection";
import EskisehirSection from "@/components/services/lazer-epilasyon/EskisehirSection";
import TechnologiesSection from "@/components/services/lazer-epilasyon/TechnologiesSection";
import BeforeAfterSection from "@/components/services/lazer-epilasyon/BeforeAfterSection";
import CTASection from "@/components/services/lazer-epilasyon/CTASection";

const LazerEpilasyon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      <WhatsAppSupport />
      <HeroSection />
      <EskisehirSection />
      <TechnologiesSection />
      <BeforeAfterSection />
      <CTASection />
    </div>
  );
};

export default LazerEpilasyon;
