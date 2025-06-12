
import { motion } from "framer-motion";

interface PigipeGuideProps {
  message: string;
  mood?: "happy" | "warning" | "sad" | "excited" | "normal";
  size?: "small" | "medium" | "large";
}

const PigipeGuide = ({ message, mood = "normal", size = "medium" }: PigipeGuideProps) => {
  const getMoodImage = () => {
    // すべてのムードで新しいピギペ画像を使用
    return "/lovable-uploads/455347ad-764f-4882-96f7-988b2483b736.png";
  };

  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <motion.div
      className="flex items-start gap-3"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className={`${sizeClasses[size]} flex-shrink-0`}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <img 
          src={getMoodImage()} 
          alt="ピギペ" 
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      <div className="flex-1 p-4 rounded-xl border bg-pigipePinkLight/30 border-pigipePinkLight shadow-lg">
        <div className="text-xs font-medium text-pigipePink mb-1">ピギペ</div>
        <p className="text-sm text-gray-800 leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
};

export default PigipeGuide;
