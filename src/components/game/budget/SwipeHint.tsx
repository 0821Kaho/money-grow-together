
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
      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-500">スワイプで日付移動</span>
        <motion.img 
          src="/lovable-uploads/78916889-a5e5-4f16-9558-6f378af5bae4.png"
          alt="ピギペ"
          className="h-4 w-4 inline-block"
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>
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
