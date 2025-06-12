
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle, Sparkles } from "lucide-react";

interface SalaryPuzzleProps {
  week: number;
  onComplete: (netSalary: number) => void;
}

const SalaryPuzzle = ({ week, onComplete }: SalaryPuzzleProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const grossSalary = 280000; // 総支給額
  const deductions = [
    { name: "所得税", amount: 8400, emoji: "💰" },
    { name: "住民税", amount: 12000, emoji: "🏛️" },
    { name: "健康保険", amount: 14000, emoji: "🏥" },
    { name: "厚生年金", amount: 25600, emoji: "👴" },
  ];
  
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const correctAnswer = grossSalary - totalDeductions;
  
  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 800);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
  
  const handleCheck = () => {
    setShowResult(true);
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    if (isCorrect) {
      setShowConfetti(true);
    }
    setTimeout(() => {
      onComplete(correctAnswer);
    }, 2000);
  };
  
  const isCorrect = parseInt(userAnswer) === correctAnswer;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pigipeBlue/30 via-white to-pigipePink/20 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                rotate: 0
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
                x: Math.random() * window.innerWidth
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              {['⭐', '✨', '🎉', '💖', '🌟'][i % 5]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="space-y-8 p-6 max-w-lg mx-auto">
        {/* Header with kawaii wiggle animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            className="inline-block"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <h2 className="font-maru text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pigipePink to-pigipeGreen bg-clip-text text-transparent mb-2">
              第{week}週 給与明細 ✨
            </h2>
          </motion.div>
          <p className="font-maru text-sm text-gray-600">手取り額を計算してみよう！</p>
          
          {/* Progress bar with emoji */}
          <div className="mt-4 relative">
            <div className="h-2.5 bg-pigipeBlue/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pigipePink to-pigipeGreen rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-lg">
              🎉
            </div>
          </div>
        </motion.div>
        
        {/* Salary Card with kawaii gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-pigipeBlue/10 via-white to-pigipePink/10 p-6 rounded-3xl shadow-xl border border-pigipePinkLight/30 backdrop-blur-sm relative heart-tail"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calculator className="h-6 w-6 text-pigipePink" />
            </motion.div>
            <span className="font-maru font-bold text-lg text-gray-800">給与明細書</span>
            <Sparkles className="h-5 w-5 text-pigipeYellow animate-pulse" />
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between font-bold text-lg">
              <span className="font-maru">💼 総支給額</span>
              <span className="text-pigipeGreen">¥{grossSalary.toLocaleString()}</span>
            </div>
            
            <div className="border-t-2 border-pigipePink/20 pt-3">
              <div className="text-xs text-gray-600 mb-2 font-maru">控除項目:</div>
              {deductions.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex justify-between text-pigipePink bg-pigipePink/5 rounded-full px-3 py-1 mb-1"
                >
                  <span className="font-maru">
                    {item.emoji} {item.name}
                  </span>
                  <span>-¥{item.amount.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="border-t-2 border-pigipeGreen/20 pt-3 flex justify-between font-bold text-lg text-orange-500 bg-pigipeYellow/20 rounded-2xl px-3 py-2">
              <span className="font-maru">📊 控除合計</span>
              <span>¥{totalDeductions.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
        
        {!showResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <label className="block font-maru text-sm font-medium mb-3 text-gray-700">
                ✨ 手取り額を入力してください ✨
              </label>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-4 text-center text-xl font-num border-2 border-pigipePinkLight rounded-full focus:border-pigipePink focus:ring-4 focus:ring-pigipePink/30 focus:outline-none bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300"
                placeholder="例: 224000"
              />
            </div>
            
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleCheck}
                disabled={!userAnswer}
                className="w-full bg-gradient-to-r from-pigipePink to-pigipeBlue hover:brightness-110 text-white font-maru font-bold py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✨ 決定 ✨
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className={`p-6 rounded-3xl ${isCorrect ? 'bg-gradient-to-r from-pigipeGreen/20 to-pigipeBlue/20' : 'bg-gradient-to-r from-pigipeYellow/30 to-pigipeLavender/20'} border-2 ${isCorrect ? 'border-pigipeGreen' : 'border-pigipeYellow'} shadow-xl`}>
              {isCorrect ? (
                <motion.div
                  className="flex items-center justify-center gap-3 text-pigipeGreen"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="h-8 w-8" />
                  <span className="font-maru font-bold text-xl">正解！🎉</span>
                </motion.div>
              ) : (
                <div className="text-orange-600">
                  <span className="font-maru font-bold text-lg">
                    💡 正解は ¥{correctAnswer.toLocaleString()} でした
                  </span>
                </div>
              )}
            </div>
            
            <motion.p
              className="font-maru text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-pigipePink/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              💰 お給料をゲット！今週の支出に備えましょう ✨
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SalaryPuzzle;
