
import React from 'react';
import { motion } from 'framer-motion';

interface KawaiiCardProps {
  children: React.ReactNode;
  icon?: string;
  title?: string;
  accentColor?: 'pink' | 'green' | 'blue' | 'yellow' | 'lavender';
  className?: string;
  animate?: boolean;
}

export const KawaiiCard = ({ 
  children, 
  icon, 
  title, 
  accentColor = 'pink', 
  className = '',
  animate = true 
}: KawaiiCardProps) => {
  const accentColorMap = {
    pink: 'from-pigipePink/10 via-white to-pigipeBlue/10 border-pigipePinkLight',
    green: 'from-pigipeGreen/10 via-white to-pigipeYellow/10 border-pigipeGreen/30',
    blue: 'from-pigipeBlue/10 via-white to-pigipeLavender/10 border-pigipeBlue/30',
    yellow: 'from-pigipeYellow/10 via-white to-pigipePink/10 border-pigipeYellow/30',
    lavender: 'from-pigipeLavender/10 via-white to-pigipeBlue/10 border-pigipeLavender/30'
  };

  const CardComponent = animate ? motion.div : 'div';
  const animationProps = animate ? {
    whileHover: { scale: 1.02, y: -2 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
  } : {};

  return (
    <CardComponent
      className={`
        bg-gradient-to-br ${accentColorMap[accentColor]} 
        rounded-3xl shadow-xl border backdrop-blur-sm p-6 relative overflow-hidden
        transition-all duration-300 hover:shadow-2xl
        ${className}
      `}
      {...animationProps}
    >
      {(icon || title) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <span 
              className="text-2xl" 
              role="img" 
              aria-label={title || "アイコン"}
            >
              {icon}
            </span>
          )}
          {title && (
            <h3 className="font-maru font-bold text-lg text-gray-800">{title}</h3>
          )}
        </div>
      )}
      {children}
    </CardComponent>
  );
};
