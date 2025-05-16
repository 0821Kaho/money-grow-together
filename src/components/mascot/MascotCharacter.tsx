
import { useState } from "react";
import { motion } from "framer-motion";
import mascotSvg from "@/assets/mascot.svg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MascotCharacterProps {
  size?: "small" | "medium" | "large";
  animate?: boolean;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
  alt?: string;
}

const MascotCharacter = ({ 
  size = "medium", 
  animate = true,
  className = "",
  onClick,
  tooltip,
  alt = "ピギペ"
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
  
  const mascotContent = (
    <motion.div
      className={`${sizeClasses[size]} ${className} rounded-full bg-transparent cursor-pointer overflow-hidden`}
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
      <img 
        src={mascotSvg} 
        alt={alt} 
        className="w-full h-full object-contain" 
      />
    </motion.div>
  );
  
  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {mascotContent}
          </TooltipTrigger>
          <TooltipContent className="font-bubble">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return mascotContent;
};

export default MascotCharacter;
