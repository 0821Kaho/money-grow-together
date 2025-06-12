
import { motion } from "framer-motion";
import { BookOpen, Target } from "lucide-react";
import { StartButton } from "@/components/ui/StartButton";

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
        className="mb-4"
      >
        <img 
          src="/lovable-uploads/839f59f0-0d1c-4f3d-957f-cb64d784ea29.png" 
          alt="家計サバイバルゲーム" 
          className="w-32 h-32 mx-auto"
        />
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
        <div className="flex items-center gap-3 p-3 bg-pigipePinkLight/20 rounded-lg border border-pigipePinkLight/30">
          <BookOpen className="h-5 w-5 text-pigipePink" />
          <span className="text-sm text-pigipePink font-medium">給与計算から支出管理まで体験</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-pigipePinkLight/20 rounded-lg border border-pigipePinkLight/30">
          <Target className="h-5 w-5 text-pigipePink" />
          <span className="text-sm text-pigipePink font-medium">借金せずに月末まで生き残ろう</span>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
      >
        <StartButton onClick={onStart} />
      </motion.div>
    </div>
  );
};

export default IntroScreen;
