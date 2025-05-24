
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface BudgetSimulationHeaderProps {
  money: number;
  happiness: number;
  day: number;
  hasLoan: boolean;
  loanAmount: number;
  hasWildBoarLoan: boolean;
  wildBoarLoanAmount: number;
  wildBoarInterestRate: number;
}

const BudgetSimulationHeader = ({
  money,
  happiness,
  day,
  hasLoan,
  loanAmount,
  hasWildBoarLoan,
  wildBoarLoanAmount,
  wildBoarInterestRate,
}: BudgetSimulationHeaderProps) => {
  // Helper to determine text color based on balance
  const getBalanceTextColor = () => {
    if (money < 0) return "text-[#FF5555]"; // Negative balance - bright red
    return "text-[#FF8A8A]"; // Normal balance - softer red with better contrast
  };

  // Helper to determine happiness bar color
  const getHappinessBarColor = () => {
    if (happiness < 30) return "bg-gradient-to-r from-red-500 to-orange-400";
    if (happiness < 60) return "bg-gradient-to-r from-orange-400 to-yellow-400";
    return "bg-gradient-to-r from-green-400 to-emerald-500";
  };

  // Helper to get appropriate Pigipe coin image
  const getPigipeCoinImage = () => {
    if (money < 0) return "/lovable-uploads/f0e25a98-4e04-4ed2-866f-8abdef33b4e0.png"; // Sad face
    if (money > 50000) return "/lovable-uploads/84e9fd66-764d-47c0-8879-5aaa03852460.png"; // Very happy
    return "/lovable-uploads/1658a1ba-66f2-4a8d-9da6-baaa0ee8ea80.png"; // Normal happy with coin
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm px-4 py-2">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-game-light text-game-primary">
            <span className="text-sm font-medium">{day}/30</span>
          </div>
          <div className="text-sm text-gray-600">
            残り<span className="font-bold">{30 - day}</span>日
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-sm mr-1">満足度:</span>
            <div className="w-24 relative">
              <Progress
                value={happiness}
                className="h-2"
                indicatorClassName={getHappinessBarColor()}
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <motion.div
              animate={money >= 0 ? { rotate: [0, 10, 0] } : { scale: [1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 3, repeatDelay: 1 }}
              className="h-5 w-5"
            >
              <img 
                src={getPigipeCoinImage()} 
                alt="ピギペ" 
                className="h-5 w-5"
              />
            </motion.div>
            <p className={`font-medium ${getBalanceTextColor()}`}>
              {money.toLocaleString()}円
            </p>
          </div>
        </div>
      </div>

      {/* Loan indicators */}
      {(hasLoan || hasWildBoarLoan) && (
        <div className="flex justify-end max-w-3xl mx-auto mt-1 text-xs">
          <div className="space-y-1">
            {hasLoan && (
              <div className="text-game-danger flex items-center gap-1">
                <img 
                  src="/lovable-uploads/f0e25a98-4e04-4ed2-866f-8abdef33b4e0.png" 
                  alt="ピギペ" 
                  className="h-4 w-4"
                />
                ローン: {loanAmount.toLocaleString()}円
              </div>
            )}
            {hasWildBoarLoan && (
              <div className="text-game-danger font-semibold flex items-center gap-1">
                <img 
                  src="/lovable-uploads/949c6920-36ad-423e-8ee0-43a69ede9051.png" 
                  alt="ピギペ" 
                  className="h-4 w-4"
                />
                イノシシローン: {wildBoarLoanAmount.toLocaleString()}円 ({Math.round(wildBoarInterestRate * 100)}% 金利)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetSimulationHeader;
