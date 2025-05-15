
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const tips: Tip[] = [
  {
    id: 1,
    title: "72の法則",
    description: "投資が2倍になる年数は「72÷年利回り(%)」でおおよそ計算できます。例えば年利5%の場合、72÷5=14.4年で投資額が2倍になります。",
    icon: "🧮"
  },
  {
    id: 2,
    title: "複利の力",
    description: "複利とは、元本に対してだけでなく、過去に得た利益に対しても利息がつく仕組みです。この効果は長期間にわたって大きな差を生み出します。",
    icon: "📈"
  },
  {
    id: 3,
    title: "リスクとリターン",
    description: "一般的に、高いリターン（利益）が期待できる投資ほど、高いリスク（損失の可能性）があります。自分のリスク許容度に合った投資を選びましょう。",
    icon: "⚖️"
  },
  {
    id: 4,
    title: "分散投資の重要性",
    description: "「卵は一つのカゴに盛るな」ということわざがあるように、投資も一箇所に集中させず、複数の商品に分散させることでリスクを軽減できます。",
    icon: "🧺"
  },
  {
    id: 5,
    title: "長期投資のメリット",
    description: "短期的な市場の変動に一喜一憂せず、長期的な視点で投資を続けることで、時間の力を味方につけることができます。",
    icon: "⏳"
  }
];

const InvestmentTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [cardsUnlocked, setCardsUnlocked] = useState<number[]>([1]); // Start with first card unlocked
  
  const unlockNextTip = () => {
    if (!cardsUnlocked.includes(currentTip + 2) && currentTip + 2 <= tips.length) {
      setCardsUnlocked([...cardsUnlocked, currentTip + 2]);
    }
  };
  
  const navigateTip = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentTip < cardsUnlocked.length - 1) {
      setCurrentTip(currentTip + 1);
    } else if (direction === 'prev' && currentTip > 0) {
      setCurrentTip(currentTip - 1);
    }
  };
  
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-game-primary" />
        <h2 className="text-xl font-bold">投資の知識</h2>
      </div>
      
      <div className="relative h-48 overflow-hidden">
        {cardsUnlocked.length > 0 ? (
          <motion.div 
            key={currentTip}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <div className="rounded-lg border border-gray-200 p-4 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{tips[cardsUnlocked[currentTip] - 1].icon}</div>
                <h3 className="font-medium">{tips[cardsUnlocked[currentTip] - 1].title}</h3>
              </div>
              <p className="text-sm text-gray-600">
                {tips[cardsUnlocked[currentTip] - 1].description}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">投資を始めると知識カードが解放されます</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => navigateTip('prev')}
            disabled={currentTip === 0}
            className="rounded-full border border-gray-300 p-2 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigateTip('next')}
            disabled={currentTip >= cardsUnlocked.length - 1}
            className="rounded-full border border-gray-300 p-2 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          {cardsUnlocked.length > 0 ? (
            <span>{currentTip + 1} / {cardsUnlocked.length} ({tips.length}枚中)</span>
          ) : (
            <span>0 / {tips.length}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentTips;
