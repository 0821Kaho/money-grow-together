
import { motion } from "framer-motion";
import { Coins } from "lucide-react";

interface MoneyBarProps {
  amount: number;
  label?: string;
  showChange?: boolean;
  change?: number;
  size?: "small" | "medium" | "large";
}

const MoneyBar = ({ 
  amount, 
  label = "所持金", 
  showChange = false, 
  change = 0,
  size = "medium" 
}: MoneyBarProps) => {
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24
  };

  return (
    <motion.div
      className={`bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-between max-w-sm w-full ${sizeClasses[size]}`}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2">
        <Coins size={iconSizes[size]} className="text-accent" />
        <span className="text-gray-600 font-medium">{label}:</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-800">
          ¥{amount.toLocaleString()}
        </span>
        
        {showChange && change !== 0 && (
          <motion.span
            className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ({change > 0 ? '+' : ''}¥{change.toLocaleString()})
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default MoneyBar;
