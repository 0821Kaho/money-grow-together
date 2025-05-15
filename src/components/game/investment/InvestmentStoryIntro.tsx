
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvestmentStoryIntroProps {
  onComplete: () => void;
  initialGoal?: number;
  onGoalSet: (goal: number) => void;
}

const InvestmentStoryIntro = ({ onComplete, initialGoal = 100000, onGoalSet }: InvestmentStoryIntroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dreamItem, setDreamItem] = useState("");
  const [customGoal, setCustomGoal] = useState(initialGoal);
  
  const slides = [
    {
      title: "お金を育てる冒険の始まり",
      content: (
        <div className="text-center">
          <p className="mb-4">
            あなたには叶えたい夢がありますか？
            新しい車、マイホーム、海外旅行...
          </p>
          <p>
            夢を実現するには、お金を「育てる」スキルが必要です。
            これから植物を育てるように、あなたのお金も育てていきましょう！
          </p>
        </div>
      )
    },
    {
      title: "あなたの夢を教えてください",
      content: (
        <div className="text-center">
          <p className="mb-4">5年後に実現したい夢は何ですか？</p>
          <div className="mb-4">
            <input
              type="text"
              value={dreamItem}
              onChange={(e) => setDreamItem(e.target.value)}
              placeholder="例：海外旅行、マイホーム..."
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>
          <p className="text-sm text-gray-600">
            目標を具体的にすることで、モチベーションが高まります！
          </p>
        </div>
      )
    },
    {
      title: "目標金額を設定しましょう",
      content: (
        <div className="text-center">
          <p className="mb-4">
            {dreamItem ? `「${dreamItem}」の実現` : "夢の実現"}のために必要な金額を設定しましょう
          </p>
          <div className="mb-4 flex items-center justify-center">
            <input
              type="number"
              value={customGoal}
              onChange={(e) => setCustomGoal(Number(e.target.value))}
              min={50000}
              max={1000000}
              step={10000}
              className="w-32 rounded-md border border-gray-300 px-4 py-2 text-right"
            />
            <span className="ml-2">円</span>
          </div>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => setCustomGoal(100000)}>10万円</Button>
            <Button variant="outline" onClick={() => setCustomGoal(300000)}>30万円</Button>
            <Button variant="outline" onClick={() => setCustomGoal(500000)}>50万円</Button>
          </div>
        </div>
      )
    },
    {
      title: "魔法の植物園へようこそ！",
      content: (
        <div className="text-center">
          <p className="mb-4">
            ここでは、お金の種を植えて育てる不思議な体験ができます。
          </p>
          <p className="mb-4">
            預金、債券、株式...それぞれ特性の違う植物を育てながら、
            投資の基本を学びましょう。
          </p>
          <p className="font-medium text-game-primary">
            さあ、あなたの資産形成の旅を始めましょう！
          </p>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onGoalSet(customGoal);
      onComplete();
    }
  };
  
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="relative mb-8 h-1 w-full bg-gray-200">
        <motion.div 
          className="absolute h-full bg-game-primary"
          initial={{ width: `${(currentSlide / (slides.length - 1)) * 100}%` }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h2 className="mb-4 text-xl font-bold text-center">{slides[currentSlide].title}</h2>
        {slides[currentSlide].content}
      </motion.div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleNext}
          className="game-button flex items-center gap-2"
        >
          {currentSlide === slides.length - 1 ? "始める" : "次へ"} 
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InvestmentStoryIntro;
