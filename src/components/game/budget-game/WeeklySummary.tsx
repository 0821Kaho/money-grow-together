
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Calendar, ArrowRight } from "lucide-react";

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
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold mb-2">第{week}週 結果発表</h2>
        <div className="flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-gray-600">週間収支をチェック</span>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className={`p-6 rounded-lg border-2 ${
          isPositive ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          {isPositive ? (
            <TrendingUp className="h-6 w-6 text-green-600" />
          ) : (
            <TrendingDown className="h-6 w-6 text-red-600" />
          )}
          <span className={`text-lg font-bold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? '黒字！' : '赤字...'}
          </span>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>収入</span>
            <span className="text-green-600 font-medium">+¥{income.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span>支出</span>
            <span className="text-red-600 font-medium">-¥{expenses.toLocaleString()}</span>
          </div>
          
          {interest > 0 && (
            <div className="flex justify-between">
              <span>利息</span>
              <span className="text-red-600 font-medium">-¥{interest.toLocaleString()}</span>
            </div>
          )}
          
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>週間収支</span>
            <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {isPositive ? '+' : ''}¥{netIncome.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-50 p-4 rounded-lg"
      >
        <h3 className="font-medium mb-3">現在の状況</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-xs text-gray-500">所持金</div>
            <div className="text-lg font-bold text-blue-600">¥{money.toLocaleString()}</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-gray-500">借金</div>
            <div className={`text-lg font-bold ${debt > 0 ? 'text-red-600' : 'text-gray-400'}`}>
              ¥{debt.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {week < 4 ? (
            <>
              第{week + 1}週へ
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          ) : (
            <>
              最終結果を見る
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default WeeklySummary;
