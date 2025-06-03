
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingElementsProps {
  count?: number;
  type?: "coins" | "leaves" | "stars" | "bubbles";
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

const FloatingElements = ({ 
  count = 6, 
  type = "coins", 
  speed = "medium",
  className = ""
}: FloatingElementsProps) => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 12 + Math.random() * 8,
      delay: Math.random() * 2
    }));
    setElements(newElements);
  }, [count]);

  const getElementIcon = () => {
    switch (type) {
      case "coins": return "🪙";
      case "leaves": return "🍃";
      case "stars": return "✨";
      case "bubbles": return "🫧";
      default: return "🪙";
    }
  };

  const getAnimationDuration = () => {
    switch (speed) {
      case "slow": return 15;
      case "fast": return 8;
      default: return 12;
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: getAnimationDuration(),
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {getElementIcon()}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
