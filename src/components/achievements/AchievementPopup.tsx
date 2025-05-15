
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface AchievementPopupProps {
  title: string;
  description: string;
  icon: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const AchievementPopup = ({ 
  title, 
  description, 
  icon, 
  onClose,
  autoClose = true,
  autoCloseTime = 5000 
}: AchievementPopupProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);

  const handleCelebrate = () => {
    toast({
      title: "やったね！",
      description: "おめでとうございます🎉 素晴らしい成果です！",
    });
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="mb-4 flex justify-center">
              <div className="achievement-badge h-24 w-24">
                <div className="achievement-badge-inner">
                  <span className="text-4xl">{icon}</span>
                </div>
              </div>
            </div>
            
            <h2 className="mb-2 text-center text-xl font-bold text-game-dark">
              {title}
            </h2>
            <p className="mb-6 text-center text-gray-600">
              {description}
            </p>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCelebrate}
                className="game-button w-full"
              >
                やったね！🎉
              </button>
              <button
                onClick={() => {
                  setIsVisible(false);
                  if (onClose) onClose();
                }}
                className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-all hover:bg-gray-50"
              >
                閉じる
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementPopup;
