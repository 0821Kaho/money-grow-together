
import { motion } from "framer-motion";

interface MascotImageProps {
  variant?: "default" | "coin" | "running" | "calculator" | "question" | "thumbsUp" | "happy" | "reading" | "sad" | "sleeping";
  size?: "small" | "medium" | "large" | "xl";
  animate?: boolean;
  className?: string;
  onClick?: () => void;
}

const MascotImage = ({ 
  variant = "default", 
  size = "medium", 
  animate = true,
  className = "",
  onClick
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
      case "default":
      default:
        return "/lovable-uploads/3c41dd2d-2377-498b-bfd2-a107f7fa530d.png";
    }
  };
  
  // Different animation based on variant
  const getAnimation = () => {
    if (!animate) return undefined;
    
    switch (variant) {
      case "happy":
        return { 
          y: [0, -8, 0],
          rotate: [0, 5, -5, 0]
        };
      case "running":
        return { 
          x: [0, 5, 0, -5, 0],
          y: [0, -2, 0, -2, 0]
        };
      case "question":
        return { 
          rotate: [0, 5, -5, 0] 
        };
      case "thumbsUp":
        return { 
          scale: [1, 1.05, 1],
          y: [0, -3, 0]
        };
      default:
        return { 
          y: [0, -5, 0] 
        };
    }
  };
  
  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      initial={{ opacity: 1 }}
      animate={getAnimation()}
      transition={{
        repeat: Infinity,
        duration: variant === "running" ? 1.5 : 3,
        ease: "easeInOut"
      }}
      onClick={onClick}
    >
      <img 
        src={getImagePath()} 
        alt="トントン" 
        className="w-full h-full object-contain" 
      />
    </motion.div>
  );
};

export default MascotImage;
