
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface LearningModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number; // 0-100
  onStart: () => void;
  tags?: string[];
}

const LearningModuleCard = ({ 
  title, 
  description, 
  icon, 
  progress, 
  onStart,
  tags = []
}: LearningModuleCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-2xl border-2 border-pigipePinkLight hover:border-pigipePink transition-all duration-300 p-6 shadow-lg hover:shadow-xl"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Icon Section */}
      <div className="flex justify-center mb-4">
        <div className="ring-4 ring-pigipeGreen/20 rounded-full p-3 bg-pigipeGreen/10">
          {icon}
        </div>
      </div>

      {/* Title and Description */}
      <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center text-sm mb-4">{description}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-pigipePinkLight/40 text-pigipePink text-xs px-2 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>進捗</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="h-full bg-pigipePink rounded-full"
          />
        </div>
      </div>

      {/* Start Button */}
      <Button
        onClick={onStart}
        className="w-full bg-pigipeGreen hover:bg-pigipeGreenDark text-white font-semibold rounded-full px-6 py-2 shadow-md"
      >
        ゲームスタート
      </Button>
    </motion.div>
  );
};

export default LearningModuleCard;
