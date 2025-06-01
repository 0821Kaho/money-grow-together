
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Sword, Zap, AlertTriangle } from "lucide-react";

interface EventCardProps {
  event: {
    name: string;
    amount: number;
    type: "need" | "want";
  };
  skillUses: number;
  canAfford: boolean;
  onAction: (action: "pay" | "skip" | "skill") => void;
}

const EventCard = ({ event, skillUses, canAfford, onAction }: EventCardProps) => {
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);
  
  const getMonsterEmoji = () => {
    if (event.name.includes("コンビニ")) return "/lovable-uploads/cfe23039-6987-4cf7-b49f-f5b45238ee66.png";
    if (event.name.includes("スマホ")) return "/lovable-uploads/e6bd89fa-cd9d-4b7a-bb86-362504513f5c.png";
    if (event.name.includes("家賃")) return "🏠";
    if (event.name.includes("税金")) return "📋";
    if (event.name.includes("保険")) return "🛡️";
    if (event.name.includes("旅行")) return "✈️";
    if (event.name.includes("美容")) return "💄";
    if (event.name.includes("コーヒー")) return "☕";
    if (event.name.includes("洋服")) return "👕";
    if (event.name.includes("ガジェット")) return "📱";
    return "👹";
  };
  
  const isNeed = event.type === "need";
  const monsterIcon = getMonsterEmoji();
  
  return (
    <div className="space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-bold mb-1">出費モンスター出現！</h3>
        <p className="text-sm text-gray-600">どう対処する？</p>
      </motion.div>
      
      <motion.div
        className={`p-6 rounded-2xl border-4 ${
          isNeed ? 'border-red-300 bg-red-50' : 'border-orange-300 bg-orange-50'
        } text-center relative overflow-hidden`}
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(event, info) => {
          if (info.offset.x < -50) setDragDirection("left");
          else if (info.offset.x > 50) setDragDirection("right");
          else setDragDirection(null);
        }}
        onDragEnd={(event, info) => {
          if (info.offset.x < -100 && !isNeed) {
            onAction("skip");
          } else if (info.offset.x > 100) {
            onAction("pay");
          }
          setDragDirection(null);
        }}
        style={{
          backgroundColor: dragDirection === "left" ? "#dcfce7" : 
                           dragDirection === "right" ? "#fee2e2" : undefined
        }}
      >
        {/* スワイプヒント */}
        <div className="absolute top-2 left-2 text-xs text-gray-400">
          {!isNeed && "← 逃げる"}
        </div>
        <div className="absolute top-2 right-2 text-xs text-gray-400">
          戦う →
        </div>
        
        <motion.div
          className="mb-3 flex justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {monsterIcon.startsWith('/') ? (
            <img 
              src={monsterIcon} 
              alt={event.name}
              className="w-16 h-16"
            />
          ) : (
            <span className="text-6xl">{monsterIcon}</span>
          )}
        </motion.div>
        
        <h4 className="text-xl font-bold mb-2">{event.name}</h4>
        
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isNeed ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
          }`}>
            {isNeed ? '必要経費' : '欲しいもの'}
          </span>
        </div>
        
        <div className="text-3xl font-bold text-red-600 mb-4">
          ¥{event.amount.toLocaleString()}
        </div>
        
        {!canAfford && (
          <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">所持金不足！借金になります</span>
          </div>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 gap-3">
        {!isNeed && (
          <Button
            onClick={() => onAction("skip")}
            variant="outline"
            className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50"
          >
            <Shield className="h-4 w-4" />
            逃げる（支払わない）
          </Button>
        )}
        
        {skillUses > 0 && (
          <Button
            onClick={() => onAction("skill")}
            variant="outline"
            className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Zap className="h-4 w-4" />
            節約スキル使用（残り{skillUses}回）
          </Button>
        )}
        
        <Button
          onClick={() => onAction("pay")}
          className={`flex items-center gap-2 ${
            canAfford ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          <Sword className="h-4 w-4" />
          戦う（支払う）
        </Button>
      </div>
      
      <div className="text-xs text-center text-gray-500">
        {!isNeed ? "カードを左右にスワイプでも選択できます" : "必要経費は逃げられません"}
      </div>
    </div>
  );
};

export default EventCard;
