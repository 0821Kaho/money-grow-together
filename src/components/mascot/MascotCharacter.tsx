
import { motion } from "framer-motion";
import mascotSvg from "@/assets/mascot.svg";

interface MascotCharacterProps {
  size?: "small" | "medium" | "large";
  animate?: boolean;
  className?: string;
}

const MascotCharacter = ({ 
  size = "medium", 
  animate = true,
  className = "" 
}: MascotCharacterProps) => {
  
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-40 h-40"
  };
  
  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      initial={animate ? { y: 0 } : undefined}
      animate={animate ? { 
        y: [0, -10, 0],
        rotate: [0, 5, 0, -5, 0]
      } : undefined}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }}
    >
      <img src={mascotSvg} alt="マネゴロー" className="w-full h-full" />
    </motion.div>
  );
};

export default MascotCharacter;
