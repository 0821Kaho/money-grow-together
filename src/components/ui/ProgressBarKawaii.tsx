
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarKawaiiProps {
  value: number;
  max?: number;
  showEmoji?: boolean;
  className?: string;
}

export const ProgressBarKawaii = ({ 
  value, 
  max = 100, 
  showEmoji = true,
  className = '' 
}: ProgressBarKawaiiProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`relative ${className}`}>
      <div className="h-2.5 bg-pigipeBlue/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pigipePink to-pigipeGreen rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      {showEmoji && (
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-lg">
          🎉
        </div>
      )}
    </div>
  );
};
