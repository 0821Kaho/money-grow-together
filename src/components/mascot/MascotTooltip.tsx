
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MascotImage from "./MascotImage";

interface MascotTooltipProps {
  messages: string[];
  position?: "left" | "right" | "top" | "bottom";
  characterSize?: "small" | "medium" | "large";
  variant?: "default" | "coin" | "running" | "calculator" | "question" | "thumbsUp" | "happy";
}

const MascotTooltip = ({ 
  messages, 
  position = "right",
  characterSize = "medium",
  variant = "default"
}: MascotTooltipProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const positionClasses = {
    left: "right-full mr-4",
    right: "left-full ml-4",
    top: "bottom-full mb-4",
    bottom: "top-full mt-4"
  };
  
  const handleClick = () => {
    if (!showTooltip) {
      setShowTooltip(true);
      return;
    }
    
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(prev => prev + 1);
    } else {
      setShowTooltip(false);
      setCurrentMessage(0);
    }
  };

  // Map variant to appropriate alt text
  const getAltText = (variant: string) => {
    switch(variant) {
      case "coin": return "コインを掲げるピギペ";
      case "running": return "走るピギペ";
      case "calculator": return "電卓をたたくピギペ";
      case "question": return "首をかしげるピギペ";
      case "thumbsUp": return "親指を立てるピギペ";
      case "happy": return "嬉しそうなピギペ";
      default: return "ピギペ";
    }
  };
  
  return (
    <div className="relative inline-block">
      <div onClick={handleClick} className="cursor-pointer">
        <MascotImage variant={variant} size={characterSize} alt={getAltText(variant)} />
      </div>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            className={`absolute ${positionClasses[position]} z-50 w-64 rounded-xl bg-white p-4 shadow-lg border border-primary/20 mascot-tooltip`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative">
              <p className="text-sm font-bubble">{messages[currentMessage]}</p>
              <div className="mt-2 text-xs text-right text-gray-500">
                {currentMessage + 1}/{messages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MascotTooltip;
