
import React from 'react';
import { Input } from './input';

interface KawaiiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export const KawaiiInput = React.forwardRef<HTMLInputElement, KawaiiInputProps>(
  ({ icon, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg" role="img" aria-hidden="true">
            {icon}
          </span>
        )}
        <Input
          ref={ref}
          className={`
            rounded-full border-2 border-pigipePinkLight 
            px-6 py-3 text-center shadow-inner bg-white/60 backdrop-blur-sm
            focus:ring-4 focus:ring-pigipePink/40 focus:border-pigipePink
            transition-all duration-300
            ${icon ? 'pl-12' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

KawaiiInput.displayName = "KawaiiInput";
