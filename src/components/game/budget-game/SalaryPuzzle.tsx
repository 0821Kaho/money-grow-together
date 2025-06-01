
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle } from "lucide-react";

interface SalaryPuzzleProps {
  week: number;
  onComplete: (netSalary: number) => void;
}

const SalaryPuzzle = ({ week, onComplete }: SalaryPuzzleProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  const grossSalary = 280000; // 総支給額
  const deductions = [
    { name: "所得税", amount: 8400 },
    { name: "住民税", amount: 12000 },
    { name: "健康保険", amount: 14000 },
    { name: "厚生年金", amount: 25600 },
  ];
  
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const correctAnswer = grossSalary - totalDeductions;
  
  const handleCheck = () => {
    setShowResult(true);
    setTimeout(() => {
      onComplete(correctAnswer);
    }, 2000);
  };
  
  const isCorrect = parseInt(userAnswer) === correctAnswer;
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold mb-2">第{week}週 給与明細</h2>
        <p className="text-sm text-gray-600">手取り額を計算してみよう！</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg border"
      >
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-5 w-5 text-blue-500" />
          <span className="font-medium">給与明細書</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between font-bold">
            <span>総支給額</span>
            <span>¥{grossSalary.toLocaleString()}</span>
          </div>
          
          <div className="border-t pt-2">
            <div className="text-xs text-gray-600 mb-1">控除項目:</div>
            {deductions.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex justify-between text-red-600"
              >
                <span>- {item.name}</span>
                <span>¥{item.amount.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="border-t pt-2 flex justify-between font-bold text-orange-600">
            <span>控除合計</span>
            <span>¥{totalDeductions.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>
      
      {!showResult ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="text-center">
            <label className="block text-sm font-medium mb-2">
              手取り額を入力してください
            </label>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3 text-center text-lg border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="例: 224000"
            />
          </div>
          
          <Button
            onClick={handleCheck}
            disabled={!userAnswer}
            className="w-full bg-blue-500 hover:bg-blue-600"
            size="lg"
          >
            決定
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}>
            {isCorrect ? (
              <div className="flex items-center justify-center gap-2 text-green-700">
                <CheckCircle className="h-6 w-6" />
                <span className="font-bold">正解！</span>
              </div>
            ) : (
              <div className="text-yellow-700">
                <span className="font-bold">正解は ¥{correctAnswer.toLocaleString()} でした</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600">
            お給料をゲット！今週の支出に備えましょう
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SalaryPuzzle;
