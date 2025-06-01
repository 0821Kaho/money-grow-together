
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Target } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="text-center space-y-6 py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-6xl mb-4"
      >
        🏦
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-800"
      >
        家計サバイバルゲーム
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 leading-relaxed px-4"
      >
        1ヶ月間、出費モンスターと戦いながら
        <br />
        賢く家計管理をしてみよう！
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 gap-4 px-6"
      >
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-blue-700">給与計算から支出管理まで体験</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <Target className="h-5 w-5 text-green-500" />
          <span className="text-sm text-green-700">借金せずに月末まで生き残ろう</span>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 rounded-full shadow-lg"
        >
          <Play className="h-5 w-5 mr-2" />
          ゲームスタート
        </Button>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
