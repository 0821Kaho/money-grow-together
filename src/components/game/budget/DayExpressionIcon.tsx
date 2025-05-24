
import { motion } from "framer-motion";

interface DayExpressionIconProps {
  day: number;
  hasEvent: boolean;
}

const DayExpressionIcon = ({ day, hasEvent }: DayExpressionIconProps) => {
  // Get expression based on day and event status
  const getExpression = () => {
    if (hasEvent) {
      // Special expressions for specific days
      if (day % 10 === 0) return "🎉"; // Payday or special day
      if (day % 7 === 0) return "🤔"; // Quiz day
      if (day % 5 === 0) return "😰"; // Loan payment day
      return "😮"; // Regular event
    }
    
    // No event expressions
    if (day % 3 === 0) return "😌";
    if (day % 3 === 1) return "😴";
    return "🙂";
  };

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="w-16 h-16 flex items-center justify-center rounded-full bg-[#FFF5F8] border border-[#FFCCE0]"
    >
      <span className="text-4xl">{getExpression()}</span>
      <span className="absolute -bottom-2 text-xs font-medium bg-white px-2 py-0.5 rounded-full border border-[#FFCCE0]">
        {day}日目
      </span>
    </motion.div>
  );
};

export default DayExpressionIcon;
