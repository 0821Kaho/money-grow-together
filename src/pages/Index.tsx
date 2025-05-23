
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import MascotImage from "@/components/mascot/MascotImage";
import KPIBanner from "@/components/home/KPIBanner";
import PageHeader from "@/components/home/PageHeader";
import HeroSection from "@/components/home/HeroSection";
import ModulesSection from "@/components/home/ModulesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AcademicSection from "@/components/home/AcademicSection";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <PageHeader />

      {/* Hero Section */}
      <HeroSection />
      
      <hr className="border-t border-dashed border-gray-200 my-12 max-w-4xl mx-auto" />

      {/* Modules Section - Moved above KPI Banner */}
      <ModulesSection />

      {/* KPI Banner - Now appears after Modules Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <KPIBanner />
        </div>
      </section>

      {/* Registration Section */}
      <section id="register-section" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-lg border-primary/10">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">今すぐPigipeをはじめよう</h2>
                <p className="text-muted-foreground max-w-lg">
                  登録は簡単1分で完了します。始めるのに料金は一切かかりません。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      無料で登録する
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">
                      ログイン
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

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

      {/* CSS for floating animation */}
      <style>
        {`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        `}
      </style>
    </div>
  );
};

export default Index;
