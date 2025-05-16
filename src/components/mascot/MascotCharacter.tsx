
import { useState } from "react";
import { motion } from "framer-motion";
import mascotSvg from "@/assets/mascot.svg";

interface MascotCharacterProps {
  size?: "small" | "medium" | "large";
  animate?: boolean;
  className?: string;
  onClick?: () => void;
}

const MascotCharacter = ({ 
  size = "medium", 
  animate = true,
  className = "",
  onClick
}: MascotCharacterProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-14 h-14" // 56px (14rem)
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    // Add coin spin animation
    if (!isSpinning) {
      setIsSpinning(true);
      setTimeout(() => setIsSpinning(false), 500);
    }
  };
  
  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} rounded-full bg-white cursor-pointer overflow-hidden`}
      initial={animate && !isSpinning ? { y: 0 } : undefined}
      animate={animate && !isSpinning ? { 
        y: [0, -5, 0],
      } : isSpinning ? { rotateY: 360 } : undefined}
      transition={isSpinning ? {
        duration: 0.5,
        ease: "easeInOut"
      } : {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }}
      onClick={handleClick}
    >
      <img src={mascotSvg} alt="トントン" className="w-full h-full" />
    </motion.div>
  );
};

export default MascotCharacter;
