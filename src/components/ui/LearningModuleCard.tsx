
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

interface LearningModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number; // 0-100
  onStart: () => void;
}

const LearningModuleCard: React.FC<LearningModuleCardProps> = ({
  title,
  description,
  icon,
  progress,
  onStart,
}) => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
      className="bg-white rounded-2xl border-2 border-pigipePinkLight hover:border-pigipePink transition-colors duration-300 p-6 shadow-sm hover:shadow-md"
    >
      {/* Icon with Pigipe green ring */}
      <div className="flex justify-center mb-4">
        <div className="ring-4 ring-pigipeGreen/20 rounded-full p-3 bg-white">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-heading font-bold text-gray-800 text-center mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-center mb-4 min-h-[3rem]">
        {description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
          <span>進捗</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            initial={{ width: prefersReducedMotion ? `${progress}%` : 0 }}
            animate={{ width: `${progress}%` }}
            transition={prefersReducedMotion ? 
              { duration: 0 } : 
              { type: 'spring', stiffness: 200, damping: 30 }
            }
            className="h-full bg-pigipePink rounded-full"
          />
        </div>
      </div>

      {/* Start Button */}
      <Button
        onClick={onStart}
        className="w-full bg-pigipeGreen hover:bg-pigipeGreenDark text-white font-semibold rounded-full px-5 py-2 transition-colors duration-200"
      >
        スタート
      </Button>
    </motion.div>
  );
};

export default LearningModuleCard;
