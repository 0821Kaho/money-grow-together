
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import MascotImage from "@/components/mascot/MascotImage";
import KPIBanner from "@/components/home/KPIBanner";
import PageHeader from "@/components/home/PageHeader";
import HeroSection from "@/components/home/HeroSection";
import ModulesSection from "@/components/home/ModulesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AcademicSection from "@/components/home/AcademicSection";

const Index = () => {
  const launchDate = "2025-05-22T20:00:00+09:00"; // Updated to May 22, 2025, 20:00 JST

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <PageHeader />

      {/* Hero Section */}
      <HeroSection launchDate={launchDate} />
      
      <hr className="border-t border-dashed border-gray-200 my-12 max-w-4xl mx-auto" />

      {/* KPI Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <KPIBanner />
        </div>
      </section>

      {/* Modules Section */}
      <ModulesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* University Logo */}
      <AcademicSection />

      {/* Floating Mascot */}
      <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6 hidden md:block">
        <MascotImage 
          variant="default" 
          size="large" 
          className="shadow-md" 
        />
      </div>
    </div>
  );
};

export default Index;
