
import { motion } from "framer-motion";
import { Coins, PiggyBank } from "lucide-react";

interface MoneyVisualProps {
  size?: "small" | "medium" | "large";
  type?: "coin" | "piggy";
  animate?: boolean;
  className?: string;
}

const MoneyVisual = ({ 
  size = "medium", 
  type = "coin",
  animate = true,
  className = "" 
}: MoneyVisualProps) => {
  
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };
  
  const iconColors = {
    coin: "#FFD66E", // Gold color matching Tonton's coin
    piggy: "#FFC0B4"  // Pink color matching Tonton's body
  };
  
  return (
    <motion.div
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ backgroundColor: type === "coin" ? "#FFDD88" : "#FFB1A4" }}
      initial={animate ? { scale: 0.9 } : undefined}
      animate={animate ? { 
        scale: [0.9, 1.05, 0.9],
      } : undefined}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }}
    >
      <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
        {type === "coin" ? (
          <Coins 
            size={size === "large" ? 32 : size === "medium" ? 24 : 16} 
            color="#663311" 
            strokeWidth={1.5} 
          />
        ) : (
          <PiggyBank 
            size={size === "large" ? 32 : size === "medium" ? 24 : 16} 
            color="#663311" 
            strokeWidth={1.5} 
          />
        )}
      </div>
    </motion.div>
  );
};

export default MoneyVisual;
