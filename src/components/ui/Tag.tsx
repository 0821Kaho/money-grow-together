
import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = "" }: TagProps) => (
  <span
    className={`
      inline-flex items-center justify-center
      px-3 py-1 rounded-full text-[13px] font-medium
      bg-gradient-to-r from-pigipePinkLight to-pigipeYellow/60
      text-pigipePink shadow-inner
      max-w-xs mx-auto transition-all duration-300
      hover:shadow-lg hover:scale-105
      ${className}
    `}
  >
    {children}
  </span>
);
