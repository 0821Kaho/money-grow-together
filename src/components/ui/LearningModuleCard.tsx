
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play } from 'lucide-react';
import { Tag } from '@/components/ui/Tag';

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
    <div className="w-full max-w-sm mx-auto space-y-6 relative">
      {/* Background ornaments */}
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-pigipeYellow/10 blur-sm animate-float" />
      <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pigipeBlue/10 transform rotate-45 blur-sm" />
      
      {/* Main Card */}
      <motion.div
        className="bg-white rounded-2xl border-2 border-pigipePinkLight hover:border-pigipePink transition-all duration-300 p-6 shadow-lg hover:shadow-xl relative overflow-hidden"
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pigipeYellow/5 via-transparent to-pigipeBlue/5 pointer-events-none" />
        
        {/* Icon Section */}
        <section className="px-4 py-section relative z-10">
          <div className="flex justify-center mb-4">
            <motion.div
              className="ring-4 ring-pigipeGreen/20 rounded-full p-3 bg-gradient-to-r from-pigipeGreen/10 to-pigipeBlue/10 hover:ring-pigipeGreen/40 transition-all duration-300"
              whileHover={{ 
                rotate: [0, -2, 2, 0],
                scale: 1.05
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          </div>

          {/* Title and Description */}
          <motion.h3 
            className="text-xl font-bold text-gray-800 text-center mb-2"
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {title}
          </motion.h3>
          <p className="text-gray-600 text-center text-sm mb-4 leading-relaxed">{description}</p>
        </section>

        {/* Tags Section */}
        {tags.length > 0 && (
          <section className="px-4 py-section relative z-10">
            <div className="flex flex-col gap-2 items-center">
              {tags.map((tag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Tag>
                    {tag}
                  </Tag>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Progress Section */}
        <section className="px-4 py-section relative z-10">
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>進捗</span>
              <span className="text-[11px] font-medium">{progress}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-gradient-to-r from-gray-200 to-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="h-full bg-gradient-to-r from-pigipePink to-pigipeGreen rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Start Button */}
        <section className="px-4 py-section relative z-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onStart}
              className="w-full max-w-xs mx-auto bg-gradient-to-r from-pigipeGreen to-pigipeBlue hover:from-pigipeGreenDark hover:to-pigipeBlueDark text-white font-semibold rounded-full py-3 flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform hover:shadow-xl"
            >
              <Play className="w-5 h-5 -ml-1 shrink-0" />
              ゲームスタート
            </Button>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
};

export default LearningModuleCard;
