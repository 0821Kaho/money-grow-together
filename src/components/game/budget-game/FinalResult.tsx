
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Star, Trophy, AlertTriangle } from "lucide-react";

interface FinalResultProps {
  money: number;
  savings: number;
  debt: number;
  onRestart: () => void;
}

const FinalResult = ({ money, savings, debt, onRestart }: FinalResultProps) => {
  const totalAssets = money + savings - debt;
  
  const getResult = () => {
    if (debt > 0) {
      return {
        type: "bad",
        title: "借金地獄エンド",
        message: "借金が残ってしまいました...。計画的な支出を心がけましょう！",
        emoji: "😰",
        color: "red",
        stars: 1
      };
    } else if (totalAssets < 50000) {
      return {
        type: "normal",
        title: "ギリギリ生活エンド",
        message: "なんとか借金せずに月末を迎えました。次回はもっと貯金を目指しましょう！",
        emoji: "😅",
        color: "yellow",
        stars: 2
      };
    } else {
      return {
        type: "good",
        title: "資産形成エンド",
        message: "素晴らしい！賢明な家計管理で資産を築くことができました！",
        emoji: "🎉",
        color: "green",
        stars: 3
      };
    }
  };
  
  const result = getResult();
  
  const getColorClasses = () => {
    switch (result.color) {
      case "green":
        return "border-green-300 bg-green-50 text-green-800";
      case "yellow":
        return "border-yellow-300 bg-yellow-50 text-yellow-800";
      case "red":
        return "border-red-300 bg-red-50 text-red-800";
      default:
        return "border-gray-300 bg-gray-50 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-8xl mb-4"
      >
        {result.emoji}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
        <p className="text-gray-600 leading-relaxed px-4">{result.message}</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-1 mb-4"
      >
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            className={`h-8 w-8 ${
              star <= result.stars 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-lg border-2 ${getColorClasses()}`}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-6 w-6" />
          <span className="font-bold text-lg">最終スコア</span>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>所持金</span>
            <span className="font-medium">¥{money.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span>貯金</span>
            <span className="font-medium">¥{savings.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span>借金</span>
            <span className="font-medium text-red-600">¥{debt.toLocaleString()}</span>
          </div>
          
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>総資産</span>
            <span className={totalAssets >= 0 ? 'text-green-600' : 'text-red-600'}>
              ¥{totalAssets.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-3"
      >
        <div className="bg-blue-50 p-4 rounded-lg text-left">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-blue-500" />
            学んだポイント
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 収入と支出のバランスが重要</li>
            <li>• 借金の利息は家計を圧迫する</li>
            <li>• 欲しいものと必要なものを区別する</li>
            <li>• 節約スキルを適切に使う</li>
          </ul>
        </div>
        
        <Button
          onClick={onRestart}
          size="lg"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          もう一度チャレンジ
        </Button>
      </motion.div>
    </div>
  );
};

export default FinalResult;
