
import { motion, AnimatePresence } from "framer-motion";

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
  if (!event) return null;
  
  const getEffectClass = (effect: number) => {
    if (effect > 1) return "text-game-success";
    if (effect < 1) return "text-game-danger";
    return "text-gray-500";
  };
  
  const formatEffect = (effect: number) => {
    const percentage = ((effect - 1) * 100).toFixed(0);
    return effect >= 1 ? `+${percentage}%` : `${percentage}%`;
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ pointerEvents: "none" }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  {event.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{event.name}</h3>
                  <p className="text-sm text-gray-600">市場イベント発生</p>
                </div>
              </div>
            </div>
            
            <p className="mb-4 text-gray-700">{event.description}</p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">各投資への影響:</h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(event.effects).map(([investmentId, effect]) => (
                  <div key={investmentId} className="rounded-md border border-gray-200 p-2">
                    <p className="text-xs">
                      {investmentId === "savings" && "預金"}
                      {investmentId === "bonds" && "債券"}
                      {investmentId === "stocks" && "株式"}
                    </p>
                    <p className={`text-sm font-medium ${getEffectClass(effect)}`}>
                      {formatEffect(effect)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MarketEventDisplay;
