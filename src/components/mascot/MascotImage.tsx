
import { motion } from "framer-motion";

interface MascotImageProps {
  variant?: "default" | "coin" | "running" | "calculator" | "question" | "thumbsUp" | "happy" | "reading" | "sad" | "sleeping" | "dancing" | "cheering" | "thinking" | "excited";
  size?: "small" | "medium" | "large" | "xl";
  animate?: boolean;
  className?: string;
  onClick?: () => void;
  alt?: string;
  mood?: "normal" | "celebratory" | "focused" | "relaxed";
}

const MascotImage = ({ 
  variant = "default", 
  size = "medium", 
  animate = true,
  className = "",
  onClick,
  alt = "トントン",
  mood = "normal"
}: MascotImageProps) => {
  
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
    xl: "w-48 h-48"
  };
  
  // Map variant to image path
  const getImagePath = () => {
    switch (variant) {
      case "coin":
        return "/lovable-uploads/3c41dd2d-2377-498b-bfd2-a107f7fa530d.png";
      case "running":
        return "/lovable-uploads/6a9130c9-75f3-4ef0-bd0d-85158ed3e82b.png";
      case "calculator":
        return "/lovable-uploads/91011487-9ada-4811-a1de-12d382d21661.png";
      case "question":
        return "/lovable-uploads/8c10f8c4-3405-4e28-966f-c327d24c0a4f.png";
      case "thumbsUp":
        return "/lovable-uploads/ac520a80-1571-4dc4-88fb-71ea11bf5b03.png";
      case "happy":
        return "/lovable-uploads/8aff52e1-ba14-419a-af93-b24378b413a9.png";
      case "reading":
        return "/lovable-uploads/730fe578-30b1-4cb2-a941-b7cbd6b9cb41.png";
      case "sad":
        return "/lovable-uploads/83a22f24-e955-4cc4-b48e-fc524dc7be8f.png";
      case "sleeping":
        return "/lovable-uploads/e5532835-e9f1-4a5d-9270-c02e8d72d0a9.png";
      case "dancing":
      case "cheering":
        return "/lovable-uploads/8aff52e1-ba14-419a-af93-b24378b413a9.png"; // Happy variant for dancing/cheering
      case "thinking":
        return "/lovable-uploads/8c10f8c4-3405-4e28-966f-c327d24c0a4f.png"; // Question variant for thinking
      case "excited":
        return "/lovable-uploads/ac520a80-1571-4dc4-88fb-71ea11bf5b03.png"; // ThumbsUp variant for excited
      case "default":
      default:
        return "/lovable-uploads/3c41dd2d-2377-498b-bfd2-a107f7fa530d.png";
    }
  };
  
  // Enhanced animation based on variant and mood
  const getAnimation = () => {
    if (!animate) return undefined;
    
    const baseAnimation = (() => {
      switch (variant) {
        case "happy":
        case "cheering":
          return { 
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          };
        case "dancing":
          return {
            rotate: [0, -10, 10, -5, 5, 0],
            y: [0, -5, 0, -3, 0],
            scale: [1, 1.1, 0.95, 1.05, 1]
          };
        case "running":
          return { 
            x: [0, 3, 0, -3, 0],
            y: [0, -2, 0, -2, 0],
            rotate: [0, 2, -2, 0]
          };
        case "question":
        case "thinking":
          return { 
            rotate: [0, 8, -8, 0],
            y: [0, -2, 0]
          };
        case "thumbsUp":
        case "excited":
          return { 
            scale: [1, 1.1, 1],
            y: [0, -5, 0],
            rotate: [0, 5, 0]
          };
        case "sad":
          return {
            y: [0, 2, 0],
            rotate: [0, -2, 2, 0],
            scale: [1, 0.98, 1]
          };
        case "sleeping":
          return {
            y: [0, -1, 0],
            scale: [1, 1.02, 1]
          };
        case "calculator":
          return {
            y: [0, -3, 0],
            rotate: [0, 3, -3, 0]
          };
        default:
          return { 
            y: [0, -5, 0],
            scale: [1, 1.02, 1]
          };
      }
    })();

    // Mood modifiers
    if (mood === "celebratory") {
      return {
        ...baseAnimation,
        scale: baseAnimation.scale ? baseAnimation.scale.map(s => s * 1.1) : [1, 1.15, 1],
        y: baseAnimation.y ? baseAnimation.y.map(y => y - 2) : [0, -7, 0]
      };
    }

    return baseAnimation;
  };

  const getAnimationDuration = () => {
    switch (variant) {
      case "running": return 1.5;
      case "dancing": return 2;
      case "excited": return 1.8;
      case "sleeping": return 4;
      default: return 3;
    }
  };
  
  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} cursor-pointer transition-transform`}
      initial={{ opacity: 1 }}
      animate={getAnimation()}
      transition={{
        repeat: Infinity,
        duration: getAnimationDuration(),
        ease: "easeInOut"
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img 
        src={getImagePath()} 
        alt={alt}
        className="w-full h-full object-contain drop-shadow-sm" 
      />
    </motion.div>
  );
};

export default MascotImage;
