
import { motion } from "framer-motion";

interface DayExpressionIconProps {
  day: number;
  hasEvent: boolean;
}

const DayExpressionIcon = ({ day, hasEvent }: DayExpressionIconProps) => {
  // Get Pigipe image path based on day and event status
  const getPigipeImage = () => {
    if (hasEvent) {
      // Special expressions for specific days
      if (day % 10 === 0) return "/lovable-uploads/84e9fd66-764d-47c0-8879-5aaa03852460.png"; // Payday - happy with confetti
      if (day % 7 === 0) return "/lovable-uploads/205ea134-d896-483b-a4ed-8a1fcdc46c2f.png"; // Quiz day - thinking
      if (day % 5 === 0) return "/lovable-uploads/949c6920-36ad-423e-8ee0-43a69ede9051.png"; // Loan payment day - confused
      return "/lovable-uploads/0768c793-a331-4c5a-a83a-60fc6e3bcea0.png"; // Regular event - with phone
    }
    
    // No event expressions
    if (day % 3 === 0) return "/lovable-uploads/443cd777-2381-4783-be30-1fe0bfef9a50.png"; // Smiling
    if (day % 3 === 1) return "/lovable-uploads/0431fed4-3bd6-4e4d-a794-0cd57ef8ef91.png"; // Sleeping
    return "/lovable-uploads/228de5b4-f353-4f7c-8fee-eba6b01c59ba.png"; // Thumbs up
  };

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="w-20 h-20 flex items-center justify-center rounded-full bg-[#FFF5F8] border border-[#FFCCE0]"
    >
      <div className="relative w-16 h-16">
        <img 
          src={getPigipeImage()} 
          alt="ピギペ" 
          className="w-full h-full object-contain"
        />
      </div>
      <span className="absolute -bottom-2 text-xs font-medium bg-white px-2 py-0.5 rounded-full border border-[#FFCCE0]">
        {day}日目
      </span>
    </motion.div>
  );
};

export default DayExpressionIcon;
