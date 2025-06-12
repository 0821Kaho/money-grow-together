
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
      bg-pigipePinkLight/30 text-pigipePink
      max-w-xs mx-auto
      ${className}
    `}
  >
    {children}
  </span>
);
