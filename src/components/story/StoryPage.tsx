
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Scene } from '@/types/story';

interface StoryPageProps {
  scene: Scene;
  imagePath: string;
  onAdvance: () => void;
  showAdvanceHint: boolean;
}

const StoryPage: React.FC<StoryPageProps> = ({ 
  scene, 
  imagePath, 
  onAdvance, 
  showAdvanceHint 
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
      {/* Image Section */}
      <motion.div 
        className="flex-1 max-w-md lg:max-w-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={imagePath}
            alt={`Scene ${scene.id}`}
            fill
            className="object-contain bg-gradient-to-br from-orange-50 to-pink-50"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </motion.div>

      {/* Dialogue Section */}
      <motion.div 
        className="flex-1 max-w-md lg:max-w-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className="relative backdrop-blur-md bg-white/80 border border-white/20 rounded-2xl p-6 shadow-xl"
          role="dialog"
          aria-live="polite"
          onClick={showAdvanceHint ? onAdvance : undefined}
        >
          {/* Speech bubble tail */}
          <div className="absolute -left-4 top-8 w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white/80 border-b-[16px] border-b-transparent" />
          
          <div className="space-y-4">
            <div className="text-lg lg:text-xl font-medium text-gray-800 leading-relaxed whitespace-pre-line scroll-smooth">
              {scene.text}
            </div>

            {showAdvanceHint && (
              <motion.div 
                className="flex items-center justify-end text-sm text-gray-500 mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>タップまたはスペースキーで進む ▶</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StoryPage;
