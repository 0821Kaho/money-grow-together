
import { PiggyBank, CreditCard, Banknote, Calendar } from "lucide-react";

interface StatusBarProps {
  week: number;
  money: number;
  savings: number;
  debt: number;
}

const StatusBar = ({ week, money, savings, debt }: StatusBarProps) => {
  const getMoneyColor = () => {
    if (debt > 0) return "text-red-600";
    if (money < 10000) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 p-3 z-40">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span className="font-medium">第{week}週</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Banknote className="h-4 w-4 text-green-500" />
            <span className={`font-bold ${getMoneyColor()}`}>
              ¥{money.toLocaleString()}
            </span>
          </div>
          
          {savings > 0 && (
            <div className="flex items-center gap-1">
              <PiggyBank className="h-4 w-4 text-blue-500" />
              <span className="text-blue-600 font-medium">
                ¥{savings.toLocaleString()}
              </span>
            </div>
          )}
          
          {debt > 0 && (
            <div className="flex items-center gap-1">
              <CreditCard className="h-4 w-4 text-red-500" />
              <span className="text-red-600 font-medium">
                ¥{debt.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
