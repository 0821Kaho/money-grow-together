
import { Link } from "react-router-dom";
import MascotImage from "../mascot/MascotImage";
import { motion } from "framer-motion";

const KPIBanner = () => {
  return (
    <Link to="/impact" className="block">
      <motion.div 
        className="w-full bg-[#FFF8E1] border-2 border-[#FFE49C] rounded-xl p-5 hover:shadow-md transition-all duration-300"
        whileHover={{ y: -3 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <MascotImage 
              variant="happy" 
              size="small" 
              className="relative z-10" 
              animate={true}
              alt="ピギペ"
            />
            <span className="absolute -top-2 -right-2 text-lg">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                💰
              </motion.div>
            </span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <p className="font-heading font-bold text-lg text-[#333]">+1,300万円 相当</p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">生涯便益</span>
            </div>
            <p className="font-heading text-sm text-gray-600 mt-1">完全無料で学べる金融教育プログラム</p>
          </div>
          
          <div className="flex items-center gap-1 text-primary font-bold">
            <span>詳細を見る</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default KPIBanner;
