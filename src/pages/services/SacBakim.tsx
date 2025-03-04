
import WhatsAppSupport from "@/components/WhatsAppSupport";
import HeroSection from "@/components/services/sac-bakim/HeroSection";
import InfoSection from "@/components/services/sac-bakim/InfoSection";
import TreatmentsSection from "@/components/services/sac-bakim/TreatmentsSection";
import CTASection from "@/components/services/sac-bakim/CTASection";

const SacBakim = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      <WhatsAppSupport />
      <HeroSection />
      <InfoSection />
      <TreatmentsSection />
      <CTASection />
    </div>
  );
};

export default SacBakim;
