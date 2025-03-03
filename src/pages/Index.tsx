
import { useState } from "react";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import HeroSection from "@/components/home/HeroSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import AboutSection from "@/components/home/AboutSection";
import TeamSection from "@/components/home/TeamSection";
import AppointmentSection from "@/components/home/AppointmentSection";
import ContactSection from "@/components/home/ContactSection";
import { teamMembers } from "@/components/home/data";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <WhatsAppSupport />
      <HeroSection />
      <WhyUsSection />
      <AboutSection />
      <TeamSection teamMembers={teamMembers} />
      <AppointmentSection />
      <ContactSection />
    </div>
  );
};

export default Index;
