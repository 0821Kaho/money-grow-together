
import React from 'react';
import { Play } from 'lucide-react';

interface StartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const StartButton = ({ children = "ゲームスタート", ...props }: StartButtonProps) => (
  <button
    className="
      w-full max-w-xs mx-auto
      bg-gradient-to-r from-pigipePink to-pigipePinkLight
      hover:from-pigipePinkLight hover:to-pigipePink
      text-white font-semibold rounded-full py-3
      flex items-center justify-center gap-2 shadow-lg
      transition-all duration-300
    "
    {...props}
  >
    <Play className="w-5 h-5 -ml-1 shrink-0" />
    {children}
  </button>
);
