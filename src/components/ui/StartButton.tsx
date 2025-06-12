
import React from 'react';
import { Play } from 'lucide-react';

interface StartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const StartButton = ({ children = "ゲームスタート", ...props }: StartButtonProps) => (
  <button
    className="
      w-full max-w-xs mx-auto
      bg-gradient-to-r from-pigipePink via-pigipeGreen to-pigipeBlue
      hover:brightness-110 hover:shadow-xl
      text-white font-semibold rounded-full py-3
      flex items-center justify-center gap-2 shadow-lg
      transition-all duration-300 transform hover:scale-105
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-100%] before:transition-transform before:duration-700
      hover:before:translate-x-[100%]
    "
    {...props}
  >
    <Play className="w-5 h-5 -ml-1 shrink-0 z-10 relative" />
    <span className="z-10 relative">{children}</span>
  </button>
);
