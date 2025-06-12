
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
    if (event.name.includes("スマホ") || event.name.includes("携帯") || event.name.includes("通信費")) {
      return "/lovable-uploads/375e1aef-b5d9-4035-814c-21ae0bab4e2b.png"; // スマホ料金ピギペ
    }
    if (event.name.includes("ショッピング") || event.name.includes("洋服") || event.name.includes("買い物")) {
      return "/lovable-uploads/fb39243d-dab5-4c90-b599-67f5fbb71ea7.png"; // ショッピングピギペ
    }
    if (event.name.includes("投資") || event.name.includes("貯金") || event.name.includes("資産")) {
      return "/lovable-uploads/084be22b-ff4a-432e-8200-bbe18c0eb9ae.png"; // 投資・貯金ピギペ
    }
    if (event.name.includes("友達") || event.name.includes("紹介") || event.name.includes("お友達")) {
      return "/lovable-uploads/5ef7c612-1a72-4656-bf5e-2b22734670ee.png"; // 友達紹介ピギペ
    }
    // デフォルトは騎士ピギペ（戦うイメージ）
    return "/lovable-uploads/dafd5345-9681-472f-b911-52f3d36505c2.png";
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
