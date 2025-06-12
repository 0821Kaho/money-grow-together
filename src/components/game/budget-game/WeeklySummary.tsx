
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Calendar, ArrowRight, Coins, Wallet, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import Confetti from "@/components/common/Confetti";
import PigipeGuide from "@/components/common/PigipeGuide";

interface WeeklySummaryProps {
  week: number;
  income: number;
  expenses: number;
  interest: number;
  money: number;
  debt: number;
  onNext: () => void;
}

const WeeklySummary = ({ week, income, expenses, interest, money, debt, onNext }: WeeklySummaryProps) => {
  const netIncome = income - expenses - interest;
  const isPositive = netIncome >= 0;
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Trigger animations on mount
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setAnimationPhase(2), 1000);
    
    if (isPositive) {
      const confettiTimer = setTimeout(() => setShowConfetti(true), 1200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(confettiTimer);
      };
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isPositive]);

  // Progress calculation for module progress
  const moduleProgress = (week / 4) * 100;

  // Random encouraging messages from Pigipe
  const pigipeMessages = isPositive ? [
    "やったブー！黒字達成だブー！この調子でがんばろうブー！🎉",
    "素晴らしいブー！お金の管理が上手になってきたブー！✨",
    "完璧ブー！投資の才能があるかもしれないブー！💰"
  ] : [
    "大丈夫ブー！失敗は成功のもとだブー！次週がんばろうブー！💪",
    "ドンマイブー！みんな最初は苦労するものブー！応援してるブー！🌟",
    "これも勉強ブー！次はきっと上手くいくブー！一緒にがんばろうブー！🚀"
  ];

  const randomMessage = pigipeMessages[Math.floor(Math.random() * pigipeMessages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pigipeBlue/30 via-pigipeYellow/20 to-pigipeLavender/30 p-4 overflow-hidden relative">
      <Confetti 
        show={showConfetti} 
        onComplete={() => setShowConfetti(false)}
        type={isPositive ? "celebration" : "stars"}
        intensity="medium"
      />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            {i % 3 === 0 ? '💰' : i % 3 === 1 ? '📊' : '⭐'}
          </motion.div>
        ))}
      </div>

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        {/* Module Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-maru font-medium text-pigipePink">
              週間進捗
            </span>
            <span className="text-xs font-num text-gray-600">
              {week}/4週
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pigipePink to-pigipeGreen rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${moduleProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          {/* Bead-style indicators */}
          <div className="flex justify-between mt-2">
            {[1, 2, 3, 4].map((weekNum) => (
              <motion.div
                key={weekNum}
                className={`w-3 h-3 rounded-full border-2 ${
                  weekNum <= week 
                    ? 'bg-pigipeGreen border-pigipeGreen' 
                    : 'bg-white border-gray-300'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: weekNum * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Title with Pigipe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center relative"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-pigipePinkLight/30">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Calendar className="h-6 w-6 text-pigipePink" />
              <h1 className="text-2xl font-maru font-bold text-gray-800">
                第{week}週 結果発表
              </h1>
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12">
              <motion.img
                src="/lovable-uploads/455347ad-764f-4882-96f7-988b2483b736.png"
                alt="ピギペ"
                className="w-full h-full object-contain drop-shadow-lg"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animationPhase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`rounded-3xl p-6 shadow-xl border-2 backdrop-blur-sm ${
            isPositive 
              ? 'bg-gradient-to-br from-pigipeGreen/20 to-pigipeYellow/30 border-pigipeGreen/40' 
              : 'bg-gradient-to-br from-red-100/80 to-pink-100/80 border-red-300/40'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ 
                rotate: isPositive ? [0, 360] : [0, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {isPositive ? (
                <TrendingUp className="h-8 w-8 text-pigipeGreen" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-500" />
              )}
            </motion.div>
            <span className={`text-2xl font-maru font-bold ${
              isPositive ? 'text-pigipeGreen' : 'text-red-500'
            }`}>
              {isPositive ? '🎉 黒字達成！' : '😅 赤字でした...'}
            </span>
          </div>

          {/* Income/Expense Table */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-pigipeGreen/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-pigipeGreen" />
                </div>
                <span className="font-maru text-gray-700">収入</span>
              </div>
              <span className="font-num font-bold text-pigipeGreen">
                +¥{income.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
                <span className="font-maru text-gray-700">支出</span>
              </div>
              <span className="font-num font-bold text-red-500">
                -¥{expenses.toLocaleString()}
              </span>
            </div>

            {interest > 0 && (
              <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="font-maru text-gray-700">利息</span>
                </div>
                <span className="font-num font-bold text-orange-500">
                  -¥{interest.toLocaleString()}
                </span>
              </div>
            )}

            <div className="border-t-2 border-dashed border-gray-300 pt-3">
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-xl shadow-md">
                <span className="font-maru font-bold text-gray-800">週間収支</span>
                <motion.span 
                  className={`font-num font-bold text-xl ${
                    isPositive ? 'text-pigipeGreen' : 'text-red-500'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 300 }}
                >
                  {isPositive ? '+' : ''}¥{netIncome.toLocaleString()}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wallet Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animationPhase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-pigipeBlue/30"
        >
          <h3 className="font-maru font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-pigipePink" />
            現在の財政状況
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">所持金</div>
              <div className="font-num font-bold text-2xl text-pigipeGreen mb-2">
                ¥{money.toLocaleString()}
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pigipeGreen to-pigipeYellow rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((money / 10000) * 100, 100)}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">借金</div>
              <div className={`font-num font-bold text-2xl mb-2 ${
                debt > 0 ? 'text-red-500' : 'text-gray-400'
              }`}>
                ¥{debt.toLocaleString()}
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: debt > 0 ? `${Math.min((debt / 5000) * 100, 100)}%` : '0%' }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pigipe Speech */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={animationPhase >= 2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PigipeGuide 
            message={randomMessage}
            mood={isPositive ? "excited" : "normal"}
            size="medium"
          />
        </motion.div>

        {/* Next Week Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animationPhase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pb-4"
        >
          <Button
            onClick={onNext}
            size="lg"
            className="w-full bg-gradient-to-r from-pigipePink to-pigipeGreen hover:from-pigipePink/90 hover:to-pigipeGreen/90 text-white font-maru font-bold text-lg py-4 rounded-2xl shadow-xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            role="button"
          >
            <motion.div 
              className="flex items-center justify-center gap-3"
              whileTap={{ scale: 0.95 }}
            >
              <Coins className="h-6 w-6" />
              {week < 4 ? (
                <>
                  第{week + 1}週へ進む
                  <ArrowRight className="h-6 w-6" />
                </>
              ) : (
                <>
                  最終結果を見る
                  <ArrowRight className="h-6 w-6" />
                </>
              )}
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WeeklySummary;
