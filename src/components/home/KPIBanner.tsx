
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const KPIBanner = () => {
  return (
    <motion.div 
      className="w-full rounded-xl bg-white shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Static Image Section (replacing video) */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
          <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <img 
              src="/lovable-uploads/ec7df113-04f3-425a-9f6c-6961670f3159.png" 
              alt="かわいいピギー" 
              className="w-full h-auto max-h-[200px] object-contain p-4"
            />
          </div>
        </div>
        
        {/* Stats Section - Updated with academic evidence */}
        <div className="w-full md:w-2/3 p-4">
          <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">学術エビデンスに基づく効果</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-muted-foreground font-medium mb-1">保守シナリオ（最低効果）</p>
              <p className="text-xl font-number font-bold text-primary">+¥1,000,000</p>
              <p className="text-xs text-gray-500 font-body">生涯便益（利息削減 + 早期投資のみ換算）</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-muted-foreground font-medium mb-1">学術エビデンス平均</p>
              <p className="text-xl font-number font-bold text-primary">+¥13,000,000</p>
              <p className="text-xs text-gray-500 font-body">生涯便益（米国高校 15h コース試算：US$100k）</p>
            </div>
          </div>
          
          <Link 
            to="/impact" 
            className="mt-4 inline-flex items-center text-primary hover:underline"
          >
            詳細な効果分析を見る
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default KPIBanner;
