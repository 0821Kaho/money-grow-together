
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
        {/* Video Section */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Kawaii_Piggy Bank.mp4" type="video/mp4" />
            あなたのブラウザはビデオをサポートしていません。
          </video>
          
          {/* +1,300万 Overlay */}
          <motion.div 
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-bold text-primary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            +1,300万円
          </motion.div>
        </div>
        
        {/* Stats Section */}
        <div className="w-full md:w-2/3 p-4">
          <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">みんなで成長しよう！</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="p-3">
              <p className="text-xl md:text-2xl font-number font-bold text-primary">1,300万円+</p>
              <p className="text-xs text-gray-500 font-body">貯蓄達成額</p>
            </div>
            <div className="p-3">
              <p className="text-xl md:text-2xl font-number font-bold text-primary">8,500人+</p>
              <p className="text-xs text-gray-500 font-body">学習者数</p>
            </div>
            <div className="p-3">
              <p className="text-xl md:text-2xl font-number font-bold text-primary">24,000+</p>
              <p className="text-xs text-gray-500 font-body">達成された目標</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KPIBanner;
