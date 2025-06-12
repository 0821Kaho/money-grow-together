
import React from 'react';

interface KawaiiTagProps {
  children: React.ReactNode;
  icon?: string;
  variant?: 'default' | 'warning' | 'success' | 'info';
  className?: string;
}

export const KawaiiTag = ({ 
  children, 
  icon, 
  variant = 'default',
  className = '' 
}: KawaiiTagProps) => {
  const variantStyles = {
    default: 'bg-pigipeYellow/40 text-pigipePink',
    warning: 'bg-pigipeLavender/40 text-purple-700',
    success: 'bg-pigipeGreen/40 text-green-700',
    info: 'bg-pigipeBlue/40 text-blue-700'
  };

  return (
    <span className={`
      ${variantStyles[variant]}
      font-maru font-semibold rounded-full px-3 py-1 
      inline-flex items-center gap-1 text-sm
      shadow-inner transition-all duration-200
      ${className}
    `}>
      {icon && (
        <span role="img" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};
