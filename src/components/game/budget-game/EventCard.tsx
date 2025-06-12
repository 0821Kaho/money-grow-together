
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sword, Zap, AlertTriangle } from "lucide-react";
import { KawaiiCard } from "@/components/ui/KawaiiCard";
import { KawaiiButton } from "@/components/ui/KawaiiButton";
import { KawaiiTag } from "@/components/ui/KawaiiTag";

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
  
  const getMonsterImage = () => {
    // 出費の種類に応じて適切なモンスター画像を選択
    if (event.name.includes("コンビニ") || event.name.includes("スイーツ") || event.name.includes("お菓子")) {
      return "/lovable-uploads/db57275d-2542-4c22-87f0-cb00f70c9c18.png"; // ケーキモンスター
    }
    if (event.name.includes("ランチ") || event.name.includes("昼食") || event.name.includes("食事")) {
      return "/lovable-uploads/5eedcbcd-67f1-4be9-8cf8-9566602714cc.png"; // ハンバーガーモンスター
    }
    if (event.name.includes("コーヒー") || event.name.includes("カフェ") || event.name.includes("飲み物")) {
      return "/lovable-uploads/4ae136da-1ac1-4f3f-9fcb-1b4ce31a5902.png"; // 悪魔モンスター（誘惑）
    }
    // デフォルトは豚の貯金箱（一般的な出費）
    return "/lovable-uploads/6a2cb83e-5914-499d-ac31-6289d8bfc962.png";
  };
  
  const isNeed = event.type === "need";
  const monsterImage = getMonsterImage();
  
  return (
    <div className="space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-maru font-bold mb-1 text-gray-800">出費モンスター出現！</h3>
        <p className="text-sm text-gray-600 font-maru">どう対処する？</p>
      </motion.div>
      
      <KawaiiCard
        accentColor={isNeed ? 'pink' : 'yellow'}
        className={`text-center relative overflow-hidden border-4 ${
          isNeed ? 'border-pigipePink/30' : 'border-pigipeYellow/30'
        }`}
        animate={true}
      >
        <motion.div
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
          className="relative"
        >
          {/* スワイプヒント */}
          <div className="absolute top-2 left-2 text-xs text-gray-400 font-maru">
            {!isNeed && "← 逃げる"}
          </div>
          <div className="absolute top-2 right-2 text-xs text-gray-400 font-maru">
            戦う →
          </div>
          
          <motion.div
            className="mb-3 flex justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img 
              src={monsterImage} 
              alt={`${event.name}モンスター`}
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
          </motion.div>
          
          <h4 className="text-xl font-maru font-bold mb-2 text-gray-800">{event.name}</h4>
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <KawaiiTag 
              icon={isNeed ? "⚡" : "💭"} 
              variant={isNeed ? 'warning' : 'info'}
            >
              {isNeed ? '必要経費' : '欲しいもの'}
            </KawaiiTag>
          </div>
          
          <div className="text-3xl font-num font-bold text-pigipePink mb-4">
            ¥{event.amount.toLocaleString()}
          </div>
          
          {!canAfford && (
            <div className="flex items-center justify-center gap-2 text-red-600 mb-4 bg-red-50/50 rounded-full px-4 py-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-maru">所持金不足！借金になります</span>
            </div>
          )}
        </motion.div>
      </KawaiiCard>
      
      <div className="grid grid-cols-1 gap-3">
        {!isNeed && (
          <KawaiiButton
            onClick={() => onAction("skip")}
            variant="positive"
            icon="🏃‍♀️"
          >
            逃げる（支払わない）
          </KawaiiButton>
        )}
        
        {skillUses > 0 && (
          <KawaiiButton
            onClick={() => onAction("skill")}
            variant="neutral"
            icon="⚡"
          >
            節約スキル使用（残り{skillUses}回）
          </KawaiiButton>
        )}
        
        <KawaiiButton
          onClick={() => onAction("pay")}
          variant="danger"
          icon="⚔️"
        >
          戦う（支払う）
        </KawaiiButton>
      </div>
      
      <div className="text-xs text-center text-gray-500 font-maru">
        {!isNeed ? "カードを左右にスワイプでも選択できます" : "必要経費は逃げられません"}
      </div>
    </div>
  );
};

export default EventCard;
