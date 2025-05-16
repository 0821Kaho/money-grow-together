
import { motion } from "framer-motion";
import { Leaf, LeafyGreen } from "lucide-react";

interface LeafVisualProps {
  size?: "small" | "medium" | "large";
  type?: "single" | "multiple";
  animate?: boolean;
  className?: string;
}

const LeafVisual = ({ 
  size = "medium", 
  type = "single",
  animate = true,
  className = "" 
}: LeafVisualProps) => {
  
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };
  
  return (
    <motion.div
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ backgroundColor: "#E0F2E9" }}
      initial={animate ? { rotate: 0 } : undefined}
      animate={animate ? { 
        rotate: [0, 5, -5, 0],
      } : undefined}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }}
    >
      <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
        {type === "single" ? (
          <Leaf 
            size={size === "large" ? 32 : size === "medium" ? 24 : 16} 
            color="#2BA26B" 
            strokeWidth={1.5} 
          />
        ) : (
          <LeafyGreen 
            size={size === "large" ? 32 : size === "medium" ? 24 : 16} 
            color="#2BA26B" 
            strokeWidth={1.5} 
          />
        )}
      </div>
    </motion.div>
  );
};

export default LeafVisual;
