
import React from 'react';
import { motion } from 'framer-motion';

interface SpeechBubbleKawaiiProps {
  children: React.ReactNode;
  character?: string;
  position?: 'left' | 'right';
  className?: string;
}

export const SpeechBubbleKawaii = ({ 
  children, 
  character = "ピギペ",
  position = 'left',
  className = '' 
}: SpeechBubbleKawaiiProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`
        bg-gradient-to-r from-pigipePinkLight/30 to-pigipeYellow/30
        rounded-3xl border border-pigipePinkLight shadow-lg backdrop-blur-sm
        p-4 relative overflow-hidden
      `}>
        <div className="text-xs font-maru font-medium text-pigipePink mb-1">
          {character}
        </div>
        <div className="text-sm text-gray-800 leading-relaxed font-maru">
          {children}
        </div>
        
        {/* Emoji rain effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-30"
              style={{
                left: `${20 + i * 20}%`,
                animation: `emoji-rain 6s linear infinite`,
                animationDelay: `${i * 1.5}s`
              }}
            >
              {['💸', '🎉', '⭐', '💰'][i]}
            </div>
          ))}
        </div>
      </div>
      
      {/* Speech bubble tail */}
      <div 
        className={`absolute top-4 w-0 h-0 ${
          position === 'left' ? '-left-1' : '-right-1'
        }`}
        style={{
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          [position === 'left' ? 'borderRight' : 'borderLeft']: '6px solid #FFA5B4',
        }}
      />
    </motion.div>
  );
};
