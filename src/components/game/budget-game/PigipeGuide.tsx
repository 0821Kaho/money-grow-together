
import { motion } from "framer-motion";

interface PigipeGuideProps {
  message: string;
  mood: "happy" | "warning" | "sad" | "excited" | "normal";
}

const PigipeGuide = ({ message, mood }: PigipeGuideProps) => {
  const getMoodEmoji = () => {
    switch (mood) {
      case "happy": return "😊";
      case "warning": return "😰";
      case "sad": return "😢";
      case "excited": return "🤗";
      default: return "🐷";
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case "happy": return "bg-green-100 border-green-300";
      case "warning": return "bg-yellow-100 border-yellow-300";
      case "sad": return "bg-red-100 border-red-300";
      case "excited": return "bg-blue-100 border-blue-300";
      default: return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 left-4 right-4 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`flex items-start gap-3 p-3 rounded-lg border-2 ${getMoodColor()} shadow-lg`}>
        <motion.div
          className="text-2xl flex-shrink-0"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {getMoodEmoji()}
        </motion.div>
        
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">ピギペ</div>
          <p className="text-sm text-gray-800 leading-relaxed">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PigipeGuide;
