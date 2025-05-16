
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const KPIBanner = () => {
  return (
    <Link to="/impact" className="block">
      <motion.div 
        className="w-full"
        whileHover={{ y: -3 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="flex items-center gap-3 px-4 py-3 bg-[#FFF8E1] border border-[#FFE49C] rounded-2xl w-full shadow-sm">
          {/* 左：数字カラム */}
          <div className="flex flex-col">
            <span className="font-number text-2xl text-amber-600 leading-none">
              +1,300万円
            </span>
            <span className="font-heading text-sm text-gray-600 tracking-tight">
              相当
            </span>
            <p className="font-body text-xs mt-2 text-gray-700">
              完全無料で学べる金融教育プログラム
            </p>
          </div>

          {/* 右：縦スタック */}
          <div className="flex flex-col items-end ml-auto">
            <span className="px-2 py-[2px] rounded-full bg-rose-100 text-rose-500 text-[11px] font-heading">
              生涯便益
            </span>

            <div className="mt-3 text-rose-500 text-sm flex items-center font-heading">
              詳細を見る
              <ChevronRight className="w-4 h-4 ml-[2px]" />
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default KPIBanner;
