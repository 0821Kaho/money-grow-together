
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroVideoSection from "@/components/home/HeroVideoSection";

const HeroSection = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to the signup form
  const scrollToRegister = () => {
    document.getElementById("register-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        
        {/* Sub-headline - Modified with Pigipe mention */}
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          <span className="sm:inline block">ピギペと遊んで学べる</span>
          <span className="sm:inline block">完全無料のお金のアプリ</span>
        </p>
        
        {/* Hero Video placed directly after the description */}
        <div className="w-full flex justify-center">
          <HeroVideoSection className="w-full max-w-md" />
        </div>
        
        {/* CTA Button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5
          }}
        >
          <Link to="/signup">
            <Button 
              size="lg" 
              className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              今すぐ登録する
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button 
            onClick={scrollToRegister} 
            size="lg" 
            variant="outline"
            className="rounded-full shadow-sm"
          >
            詳しく見る
          </Button>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          ref={arrowRef}
          className="text-muted-foreground mt-2 cursor-pointer"
          onClick={scrollToRegister}
        >
          <ArrowDown className="mx-auto h-6 w-6" />
        </motion.div>
        
        {/* Floating decorative elements - small yen coins */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02] -z-10">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-primary text-xl md:text-2xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`
              }}
            >
              ¥
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
