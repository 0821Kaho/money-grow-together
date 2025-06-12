
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

interface KawaiiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'positive' | 'neutral' | 'danger' | 'primary';
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const KawaiiButton = ({ 
  children, 
  variant = 'primary', 
  icon, 
  size = 'md',
  animate = true,
  className = '',
  ...props 
}: KawaiiButtonProps) => {
  const variantStyles = {
    positive: 'bg-pigipeGreen/80 hover:bg-pigipeGreen text-white shadow-[0_3px_12px_rgba(122,223,162,.25)]',
    neutral: 'bg-pigipeBlue/30 hover:bg-pigipeBlue/40 text-gray-700 backdrop-blur-sm shadow-[0_3px_12px_rgba(205,239,255,.25)]',
    danger: 'bg-gradient-to-r from-pigipePink to-pigipeLavender hover:brightness-110 text-white shadow-[0_3px_12px_rgba(255,112,138,.25)]',
    primary: 'bg-gradient-to-r from-pigipePink to-pigipeBlue hover:brightness-110 text-white shadow-[0_3px_12px_rgba(255,112,138,.25)]'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const baseClasses = `
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    font-maru font-semibold rounded-full
    transition-all duration-300 transform
    flex items-center justify-center gap-2
    border-0 focus:outline-none focus:ring-4 focus:ring-pigipePink/30
    ${className}
  `;

  // Filter out potential conflicting props for motion.button
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
    ...safeProps
  } = props;

  if (animate) {
    return (
      <motion.button
        className={baseClasses}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...safeProps}
      >
        {icon && (
          <span role="img" aria-hidden="true" className="text-current">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </motion.button>
    );
  }

  return (
    <button
      className={baseClasses}
      {...props}
    >
      {icon && (
        <span role="img" aria-hidden="true" className="text-current">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};
