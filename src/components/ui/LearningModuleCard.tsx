
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play } from 'lucide-react';

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
    <div className="w-full max-w-sm mx-auto space-y-6">
      {/* Main Card */}
      <motion.div
        className="bg-white rounded-2xl border-2 border-pigipePinkLight hover:border-pigipePink transition-all duration-300 p-6 shadow-lg hover:shadow-xl"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Icon Section */}
        <section className="px-4 py-section">
          <div className="flex justify-center mb-4">
            <div className="ring-4 ring-pigipeGreen/20 rounded-full p-3 bg-pigipeGreen/10">
              {icon}
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center text-sm mb-4 leading-relaxed">{description}</p>
        </section>

        {/* Tags Section */}
        {tags.length > 0 && (
          <section className="px-4 py-section">
            <div className="flex flex-col gap-2 items-center">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center bg-pigipePinkLight/40 text-pigipePink text-xs px-3 py-1.5 rounded-full font-medium max-w-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Progress Section */}
        <section className="px-4 py-section">
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>進捗</span>
              <span className="text-[11px] font-medium">{progress}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="h-full bg-pigipePink rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Start Button */}
        <section className="px-4 py-section">
          <Button
            onClick={onStart}
            className="w-full max-w-xs mx-auto bg-pigipeGreen hover:bg-pigipeGreenDark text-white font-semibold rounded-full py-3 flex items-center justify-center gap-2 shadow-lg"
          >
            <Play className="w-5 h-5 -ml-1 shrink-0" />
            ゲームスタート
          </Button>
        </section>
      </motion.div>
    </div>
  );
};

export default LearningModuleCard;
