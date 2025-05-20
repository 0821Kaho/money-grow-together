
import { motion } from "framer-motion";

const KPIBanner = () => {
  return (
    <motion.div 
      className="w-full rounded-xl bg-white shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Static Image Section */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden p-4 flex items-center justify-center">
          <img 
            src="/lovable-uploads/8222b1da-7b67-4414-9861-8040d87f70ab.png" 
            alt="Kawaii Piggy Bank" 
            className="h-48 w-48 object-contain"
          />
          
          {/* Academic Evidence Overlay */}
          <motion.div 
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-bold text-primary flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <img 
              src="/lovable-uploads/8222b1da-7b67-4414-9861-8040d87f70ab.png" 
              alt="Piggy Bank" 
              className="h-6 w-6"
            />
            学術エビデンス
          </motion.div>
        </div>
        
        {/* Stats Section with Accurate Data */}
        <div className="w-full md:w-2/3 p-4">
          <h3 className="text-xl font-heading font-bold text-gray-800 mb-1">金融教育の効果</h3>
          <p className="text-xs text-muted-foreground mb-3">学術研究に基づく生涯便益</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Conservative Scenario */}
            <div className="p-3 bg-blue-50/50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">保守シナリオ（最低効果）</p>
              <div className="flex justify-center items-center gap-2 mb-1">
                <p className="text-xl md:text-2xl font-number font-bold text-primary">+¥1,000,000</p>
              </div>
              <p className="text-xs text-gray-500 font-body">利息削減＋早期投資のみ換算</p>
            </div>
            
            {/* Academic Evidence Average */}
            <div className="p-3 bg-amber-50/50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">学術エビデンス平均</p>
              <div className="flex justify-center items-center gap-2 mb-1">
                <p className="text-xl md:text-2xl font-number font-bold text-amber-600">+¥13,000,000</p>
              </div>
              <p className="text-xs text-gray-500 font-body">米国高校15hコース試算：US$100k</p>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 text-right italic">
            Tyton Partners "Investing in Tomorrow", Champlain College 2023
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default KPIBanner;
