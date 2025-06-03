
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChoiceButtonProps {
  choice: 'A' | 'B';
  text: string;
  onClick: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, text, onClick }) => {
  const isChoiceA = choice === 'A';
  
  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-xl px-6 py-4 min-w-[200px]
        font-semibold text-white shadow-lg border-2 border-white/20
        transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2
        ${isChoiceA 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500/50' 
          : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:ring-pink-500/50'
        }
      `}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      aria-label={`選択肢${choice}: ${text}`}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut'
        }}
      />
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <span className={`
          w-6 h-6 rounded-full border-2 border-white flex items-center justify-center
          text-sm font-bold
        `}>
          {choice}
        </span>
        <span className="text-sm sm:text-base">{text}</span>
      </div>
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ChoiceButton;
