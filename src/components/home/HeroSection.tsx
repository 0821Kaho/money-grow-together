
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useRef, useEffect } from "react";
import HeroVideoSection from "@/components/home/HeroVideoSection";
import Countdown from "@/components/prelaunch/Countdown";
import AccountRegistrationForm from "@/components/auth/AccountRegistrationForm";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  launchDate: string;
}

const HeroSection = ({ launchDate }: HeroSectionProps) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  
  // Function to handle scrolling to the registration form
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        
        {/* CTA Button - different for authenticated vs non-authenticated users */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5
          }}
        >
          {isAuthenticated ? (
            <Link to="/modules">
              <Button size="lg" className="rounded-full shadow-lg bg-primary hover:bg-primary/90">
                学習を開始する
              </Button>
            </Link>
          ) : (
            <>
              <Button 
                onClick={scrollToForm} 
                size="lg" 
                className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
              >
                今すぐ始める
              </Button>
              <Link to="/login">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="rounded-full shadow-lg"
                >
                  ログイン
                </Button>
              </Link>
            </>
          )}
        </motion.div>
        
        {/* Scroll indicator - only show for non-authenticated users */}
        {!isAuthenticated && (
          <motion.div 
            ref={arrowRef}
            className="text-muted-foreground mt-2 cursor-pointer"
            onClick={scrollToForm}
          >
            <ArrowDown className="mx-auto h-6 w-6" />
          </motion.div>
        )}
        
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
        
        {/* Registration form - only show for non-authenticated users */}
        {!isAuthenticated && (
          <div id="registration-form" className="w-full max-w-md mx-auto pt-8">
            <AccountRegistrationForm className="w-full" />
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default HeroSection;
