
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface MarketEvent {
  name: string;
  description: string;
  effects: {
    [key: string]: number;
  };
  icon: string;
}

interface MarketEventDisplayProps {
  event: MarketEvent | null;
  isVisible: boolean;
}

const MarketEventDisplay = ({ event, isVisible }: MarketEventDisplayProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setAnimationComplete(false);
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, event]);
  
  if (!event) return null;
  
  const getEffectIcon = (effect: number) => {
    if (effect > 1) return <TrendingUp className="h-4 w-4 text-game-success" />;
    if (effect < 1) return <TrendingDown className="h-4 w-4 text-game-danger" />;
    return null;
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            className="relative max-w-md rounded-xl bg-white p-6 shadow-lg"
            initial={{ rotateY: 0 }}
            animate={{ 
              rotateY: animationComplete ? 360 : 0
            }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
                {event.icon}
              </div>
              
              <h3 className="mb-1 text-lg font-bold text-center">{event.name}</h3>
              <p className="mb-4 text-center text-sm text-gray-600">{event.description}</p>
              
              <div className="mb-2 w-full rounded-lg bg-gray-50 p-3">
                <h4 className="mb-2 font-medium text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  市場への影響
                </h4>
                
                <div className="space-y-2">
                  {Object.entries(event.effects).map(([investmentId, effect]) => {
                    const effectPercent = effect > 1 
                      ? `+${Math.round((effect - 1) * 100)}%` 
                      : `${Math.round((effect - 1) * 100)}%`;
                    
                    const investmentNames: {[key: string]: string} = {
                      stocks: "株式フラワー",
                      bonds: "債券ブッシュ",
                      savings: "預金ツリー"
                    };
                    
                    return (
                      <div key={investmentId} className="flex items-center justify-between">
                        <span className="text-sm">{investmentNames[investmentId] || investmentId}</span>
                        <span className={`text-sm font-medium flex items-center gap-1 ${
                          effect > 1 ? "text-game-success" : effect < 1 ? "text-game-danger" : ""
                        }`}>
                          {getEffectIcon(effect)}
                          {effectPercent}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MarketEventDisplay;
