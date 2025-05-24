
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SwipeHint = () => {
  return (
    <div className="flex justify-center items-center gap-6 mt-2 opacity-60">
      <motion.div
        animate={{ x: [-5, 0, -5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronLeft size={16} />
      </motion.div>
      <span className="text-xs text-gray-500">スワイプで日付移動</span>
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronRight size={16} />
      </motion.div>
    </div>
  );
};

export default SwipeHint;
