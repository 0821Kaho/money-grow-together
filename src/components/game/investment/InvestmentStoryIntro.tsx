
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import { ArrowRight } from "lucide-react";

interface InvestmentStoryIntroProps {
  onComplete: () => void;
  initialGoal?: number;
  onGoalSet?: (goal: number) => void;
}

const InvestmentStoryIntro = ({ 
  onComplete, 
  initialGoal = 1000000,
  onGoalSet
}: InvestmentStoryIntroProps) => {
  const [step, setStep] = useState(1);
  const [dreamItem, setDreamItem] = useState("");
  const [goalAmount, setGoalAmount] = useState(initialGoal);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Set goal if callback exists
      if (onGoalSet) {
        onGoalSet(goalAmount);
      }
      onComplete();
    }
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove commas and convert to number
    const rawValue = e.target.value.replace(/,/g, '');
    
    // Check if it's a valid number
    if (/^\d*$/.test(rawValue)) {
      const value = rawValue === '' ? 0 : parseInt(rawValue);
      // Set a reasonable maximum (e.g., 100 million yen)
      if (value <= 100000000) {
        setGoalAmount(value);
      }
    }
  };
  
  const handleSliderChange = (value: number[]) => {
    // Slider value is between 0-100, convert to a reasonable range
    // e.g., 500,000 to 10,000,000 yen
    const newValue = Math.round(500000 + (value[0] / 100) * 9500000);
    setGoalAmount(newValue);
  };
  
  // Format number with commas for display
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <Badge variant="outline" className="bg-game-primary/10 text-game-primary">
          モジュール2: 初めての投資
        </Badge>
        <MascotCharacter size="small" />
      </div>
      
      <div className="mb-8">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="mb-2 text-2xl font-bold">魔法の植物園</h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600">
            お金を育てる冒険が始まります。あなたの選択次第で大きく育つでしょう。
          </p>
        </motion.div>
      </div>
      
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold">将来の夢</h2>
          <p>あなたには叶えたい夢がありますか？</p>
          
          <div>
            <label htmlFor="dreamItem" className="mb-2 block text-sm font-medium">
              あなたの夢
            </label>
            <Input
              id="dreamItem"
              placeholder="例：新車を買う、旅行に行く、家を購入する"
              value={dreamItem}
              onChange={(e) => setDreamItem(e.target.value)}
              className="mb-4"
            />
          </div>
          
          <motion.div 
            className="relative h-60 overflow-hidden rounded-lg bg-[#F7F5F2]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-5xl">✨</div>
                <p className="font-medium">
                  {dreamItem || "あなたの夢"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  を叶えるために投資を始めましょう
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold">目標を設定</h2>
          <p>いくら貯めたいですか？</p>
          
          <div>
            <label htmlFor="goalAmount" className="mb-2 block text-sm font-medium">
              目標金額
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="goalAmount"
                type="text"
                value={formatNumber(goalAmount)}
                onChange={handleAmountChange}
                className="mb-4"
              />
              <span className="ml-2">円</span>
            </div>
            
            <div className="mb-6">
              <p className="mb-2 text-sm text-gray-500">金額を調整する：</p>
              <Slider
                defaultValue={[5]}
                max={100}
                step={1}
                className="mb-6"
                onValueChange={handleSliderChange}
                value={[(goalAmount - 500000) / 9500000 * 100]}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>50万円</span>
                <span>1,000万円</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-[#F7F5F2] p-4">
            <h3 className="mb-2 font-medium">複利の力</h3>
            <p className="text-sm text-gray-600 mb-4">
              投資を始めるのが早ければ早いほど、複利効果により大きな成果が得られます。
            </p>
            
            <div className="flex items-center justify-between rounded-md bg-white p-3">
              <div>
                <p className="text-sm font-medium">10年後の目標金額</p>
                <p className="text-xs text-gray-500">平均5%の収益率の場合</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{Math.round(goalAmount * 1.63).toLocaleString()}円</p>
                <p className="text-xs text-game-success">+63%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold">魔法の植物園へようこそ</h2>
          <p>これからお金の育て方を学びましょう</p>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-[#4CAF50]/10 p-3 text-center">
              <div className="mb-2 text-3xl">🌳</div>
              <p className="text-sm font-medium">預金ツリー</p>
              <p className="text-xs text-gray-500">安全だけど成長遅い</p>
            </div>
            
            <div className="rounded-lg bg-[#8BC34A]/10 p-3 text-center">
              <div className="mb-2 text-3xl">🌿</div>
              <p className="text-sm font-medium">債券ブッシュ</p>
              <p className="text-xs text-gray-500">バランス型成長</p>
            </div>
            
            <div className="rounded-lg bg-[#FF6B6B]/10 p-3 text-center">
              <div className="mb-2 text-3xl">🌸</div>
              <p className="text-sm font-medium">株式フラワー</p>
              <p className="text-xs text-gray-500">成長早いけどリスク大</p>
            </div>
          </div>
          
          <div className="rounded-lg bg-[#F7F5F2] p-4">
            <h3 className="mb-2 flex items-center font-medium">
              <span className="mr-2 text-xl">💡</span>
              投資の心得
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              <li>リスクを分散させて、一つの投資に集中しないこと</li>
              <li>長期的な視点で見ること</li>
              <li>市場の変動に一喜一憂しないこと</li>
            </ul>
          </div>
        </motion.div>
      )}
      
      <div className="flex justify-center">
        <button 
          onClick={handleNextStep} 
          className="rounded-xl bg-game-primary hover:bg-game-primary/90 text-white font-medium px-6 py-3 transition-colors shadow-lg flex items-center gap-2"
        >
          {step < 3 ? "次へ" : "始める"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default InvestmentStoryIntro;
