
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
        {/* Static Image Section (replacing video) */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
          <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <img 
              src="/lovable-uploads/ec7df113-04f3-425a-9f6c-6961670f3159.png" 
              alt="かわいいピギー" 
              className="w-full h-auto max-h-[200px] object-contain p-4"
            />
          </div>
          
          {/* Removed the +1,300万 Overlay with Piggy Image */}
        </div>
        
        {/* Stats Section */}
        <div className="w-full md:w-2/3 p-4">
          <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">みんなで成長しよう！</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="p-3">
              <div className="flex justify-center items-center gap-2">
                <img 
                  src="/lovable-uploads/82291aa4-53b2-4c72-8fdb-8599a34fdd33.png" 
                  alt="Piggy Bank" 
                  className="h-5 w-5"
                />
                <p className="text-xl md:text-2xl font-number font-bold text-primary">1,300万円+</p>
              </div>
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
