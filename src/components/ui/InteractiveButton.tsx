
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop'> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  animation?: "bounce" | "pulse" | "shake" | "glow" | "scale" | "rotate";
  icon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

const InteractiveButton = ({
  variant = "primary",
  size = "md",
  animation = "scale",
  icon,
  loading = false,
  className,
  children,
  disabled,
  ...buttonProps
}: InteractiveButtonProps) => {
  
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-pigipePink to-pigipePinkLight text-white shadow-lg hover:shadow-xl focus:ring-pigipePink/50",
    secondary: "bg-gradient-to-r from-pigipeGreen to-pigipeGreenDark text-white shadow-lg hover:shadow-xl focus:ring-pigipeGreen/50",
    success: "bg-gradient-to-r from-pigipeGreen to-pigipeGreenDark text-white shadow-lg hover:shadow-xl focus:ring-pigipeGreen/50",
    warning: "bg-gradient-to-r from-game-accent to-yellow-500 text-gray-800 shadow-lg hover:shadow-xl focus:ring-game-accent/50",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl focus:ring-red-500/50",
    ghost: "bg-white/80 backdrop-blur border-2 border-pigipePink/30 text-pigipePink hover:bg-pigipePink/10 hover:border-pigipePink focus:ring-pigipePink/50"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  const getHoverAnimation = () => {
    switch (animation) {
      case "bounce":
        return { y: [-2, -6, -2] };
      case "pulse":
        return { scale: [1, 1.05, 1] };
      case "shake":
        return { x: [0, -2, 2, -2, 2, 0] };
      case "glow":
        return { boxShadow: ["0 4px 15px rgba(0,0,0,0.1)", "0 8px 25px rgba(255, 112, 138, 0.5)", "0 4px 15px rgba(0,0,0,0.1)"] };
      case "rotate":
        return { rotate: [0, 5, -5, 0] };
      case "scale":
      default:
        return { scale: [1, 1.02, 1] };
    }
  };

  const getTapAnimation = () => {
    return { scale: 0.95 };
  };

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      whileHover={!disabled && !loading ? getHoverAnimation() : undefined}
      whileTap={!disabled && !loading ? getTapAnimation() : undefined}
      transition={{ duration: 0.2 }}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      <div className="relative flex items-center gap-2">
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        ) : icon ? (
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
        ) : null}
        
        <span>{children}</span>
      </div>
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default InteractiveButton;
