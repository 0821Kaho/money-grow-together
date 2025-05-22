
import LifePlanModules from "./lifeplan/LifePlanModules";
import MascotCharacter from "../mascot/MascotCharacter";
import { motion } from "framer-motion";

const LifePlanSimulation = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">ライフプラン・シミュレーション</h1>
          
          {/* Mascot with encouraging phrase */}
          <div className="flex items-center">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <MascotCharacter size="small" className="mr-2 h-8 w-8" />
            </motion.div>
            <span className="text-sm text-game-primary font-semibold italic">
              未来を計画するブー！
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          人生の<span className="text-game-primary font-medium">主要なイベント</span>に必要な
          <span className="text-game-accent font-medium">お金</span>を計画し、
          <span className="text-[#25B589] font-medium">将来への備え</span>を学びましょう。
          未来のライフイベントを選択して、そのための資金計画を立てていきます。
        </p>
        
        <LifePlanModules />
      </div>
    </div>
  );
};

export default LifePlanSimulation;
