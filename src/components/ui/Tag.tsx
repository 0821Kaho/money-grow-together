
import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = "" }: TagProps) => (
  <span
    className={`
      inline-flex items-center justify-center
      px-3 py-1.5 rounded-full text-xs font-medium
      bg-pigipePinkLight/40 text-pigipePink
      max-w-xs
      ${className}
    `}
  >
    {children}
  </span>
);
