
import React from "react";
import MoneyVisual from "@/components/ui/MoneyVisual";
import LeafVisual from "@/components/ui/LeafVisual";
import { motion } from "framer-motion";

interface TontonGameVisualsProps {
  type?: "money" | "plant" | "risk" | "combined";
  size?: "small" | "medium" | "large";
  className?: string;
}

const TontonGameVisuals = ({
  type = "combined",
  size = "medium",
  className = ""
}: TontonGameVisualsProps) => {
  
  const renderVisual = () => {
    switch (type) {
      case "money":
        return (
          <div className="flex space-x-2">
            <MoneyVisual type="coin" size={size} />
            <MoneyVisual type="piggy" size={size} />
          </div>
        );
      case "plant":
        return (
          <div className="flex space-x-2">
            <LeafVisual type="single" size={size} />
            <LeafVisual type="multiple" size={size} />
          </div>
        );
      case "risk":
        return (
          <div className="flex space-x-2">
            <MoneyVisual type="coin" size={size} />
            <div className="relative">
              <LeafVisual type="single" size={size} />
              <motion.div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-game-accent"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </div>
        );
      case "combined":
      default:
        return (
          <div className="flex flex-wrap gap-2 justify-center">
            <MoneyVisual type="coin" size={size} />
            <LeafVisual type="multiple" size={size} />
            <MoneyVisual type="piggy" size={size} />
            <LeafVisual type="single" size={size} />
          </div>
        );
    }
  };
  
  return (
    <div className={`p-2 rounded-lg ${className}`}>
      {renderVisual()}
    </div>
  );
};

export default TontonGameVisuals;
