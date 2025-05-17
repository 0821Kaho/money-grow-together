
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import MascotImage from "@/components/mascot/MascotImage";

const KPIBanner = () => {
  return (
    <Link to="/impact" className="block w-full">
      <motion.div 
        className="relative w-full"
        whileHover={{ y: -3 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative w-full bg-[#FFF8E1] border border-[#FFE49C] rounded-2xl p-6">
          {/* 左：数字カラム */}
          <div className="flex flex-col">
            <span className="font-number text-xl text-amber-600 leading-none">
              +1,300万円
              <span className="font-heading text-sm text-gray-700 ml-1">相当</span>
            </span>
            <p className="font-body text-xs mt-1 text-gray-700">
              完全無料で学べる金融教育プログラム
            </p>
          </div>

          {/* 右上：バッジ */}
          <span className="absolute top-4 right-4 px-2 py-[2px] rounded-full bg-rose-100 text-rose-500 text-[10px] font-heading">
            生涯便益
          </span>

          {/* 右：リンク */}
          <div className="mt-3 text-rose-500 text-sm flex items-center font-heading">
            詳細を見る
            <ChevronRight className="w-4 h-4 ml-[2px]" />
          </div>
          
          {/* 豚アイコン */}
          <div className="absolute -bottom-6 right-4 hidden sm:block">
            <MascotImage variant="happy" size="small" />
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default KPIBanner;
