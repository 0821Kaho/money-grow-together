
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useRef, useEffect } from "react";
import HeroVideoSection from "@/components/home/HeroVideoSection";
import Countdown from "@/components/prelaunch/Countdown";
import PreRegisterForm from "@/components/prelaunch/PreRegisterForm";

interface HeroSectionProps {
  launchDate: string;
}

const HeroSection = ({ launchDate }: HeroSectionProps) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  
  // Function to handle scrolling to the waitlist form
  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Function to occasionally bounce the arrow
  useEffect(() => {
    const arrowElement = arrowRef.current;
    if (!arrowElement) return;
    
    // Add occasional bounce animation every 3 seconds
    const interval = setInterval(() => {
      arrowElement.classList.add("animate-bounce");
      
      // Remove animation class after animation completes
      setTimeout(() => {
        arrowElement.classList.remove("animate-bounce");
      }, 1000);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <motion.div 
        className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          お金で<span className="text-primary">夢をあきらめない</span>
        </h1>
        
        {/* Sub-headline - Modified for mobile line break */}
        <p className="text-lg text-muted-foreground max-w-lg">
          <span className="sm:inline block">ピギペと遊んで学べる</span>
          <span className="sm:inline block">完全無料のお金のアプリ</span>
        </p>
        
        {/* Hero Video placed directly after the description */}
        <div className="w-full flex justify-center">
          <HeroVideoSection className="w-full max-w-xs" />
        </div>
        
        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5
          }}
        >
          <Button 
            onClick={scrollToForm} 
            size="lg" 
            className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
          >
            事前登録する
          </Button>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          ref={arrowRef}
          className="text-muted-foreground mt-2 cursor-pointer"
          onClick={scrollToForm}
        >
          <ArrowDown className="mx-auto h-6 w-6" />
        </motion.div>
        
        {/* Countdown */}
        <Countdown targetDate={launchDate} className="w-full mt-8" />
        
        {/* Pre-register form */}
        <div id="waitlist-form" className="w-full max-w-md mx-auto pt-8">
          <PreRegisterForm className="w-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
