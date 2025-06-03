
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "scale" | "tilt" | "none";
  clickable?: boolean;
  onClick?: () => void;
  gradient?: boolean;
  glowing?: boolean;
}

const EnhancedCard = ({
  children,
  className,
  hoverEffect = "lift",
  clickable = false,
  onClick,
  gradient = false,
  glowing = false
}: EnhancedCardProps) => {
  
  const baseClasses = "bg-white rounded-xl shadow-lg border border-gray-100 relative overflow-hidden transition-all duration-300";
  
  const gradientClasses = gradient 
    ? "bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30" 
    : "";
    
  const glowClasses = glowing 
    ? "shadow-2xl shadow-blue-500/10 border-blue-200/50" 
    : "";

  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "lift":
        return { 
          y: -8, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
        };
      case "glow":
        return { 
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          borderColor: "rgba(59, 130, 246, 0.5)"
        };
      case "scale":
        return { scale: 1.02 };
      case "tilt":
        return { 
          rotateY: 5,
          scale: 1.01
        };
      case "none":
      default:
        return {};
    }
  };

  const getTapAnimation = () => {
    return clickable ? { scale: 0.98 } : {};
  };

  return (
    <motion.div
      className={cn(
        baseClasses,
        gradientClasses,
        glowClasses,
        clickable && "cursor-pointer",
        className
      )}
      whileHover={hoverEffect !== "none" ? getHoverAnimation() : undefined}
      whileTap={getTapAnimation()}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background pattern */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glowing border effect */}
      {glowing && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-blue-400/20"
          animate={{
            borderColor: ["rgba(59, 130, 246, 0.2)", "rgba(59, 130, 246, 0.4)", "rgba(59, 130, 246, 0.2)"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default EnhancedCard;
