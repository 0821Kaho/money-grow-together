
import { useState } from "react";

interface BudgetPlannerProps {
  initialBalance: number;
  onComplete: (success: boolean) => void;
}

const BudgetPlanner = ({ initialBalance, onComplete }: BudgetPlannerProps) => {
  const [weeklyBudget, setWeeklyBudget] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);

  const calculateWeeklyBudget = () => {
    setWeeklyBudget(Math.floor(initialBalance / 4));
    setSpentAmount(0);
  };

  const handleSpending = (amount: number) => {
    setSpentAmount(prev => prev + amount);
  };

  const checkBudgetSuccess = () => {
    const isSuccess = spentAmount <= weeklyBudget;
    onComplete(isSuccess);
  };

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">予算立案ワーク</h3>
      <p className="mb-4">
        今週の予算を立てて、支出を管理しましょう。
        予算内に収めることができれば、次のステップに進めます。
      </p>

      <div className="mb-4">
        <button
          onClick={calculateWeeklyBudget}
          className="rounded-xl bg-game-primary hover:bg-game-primary/90 text-white font-medium px-4 py-2 transition-colors shadow-lg"
        >
          予算を計算する
        </button>
      </div>

      {weeklyBudget > 0 && (
        <div className="mb-4">
          <p>
            今週の予算：{weeklyBudget.toLocaleString()}円
          </p>
          <p>
            支出額：{spentAmount.toLocaleString()}円
          </p>
          <input
            type="number"
            placeholder="支出額を入力"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            onChange={(e) => handleSpending(Number(e.target.value))}
          />
        </div>
      )}

      <button
        onClick={checkBudgetSuccess}
        className="rounded-xl bg-game-primary hover:bg-game-primary/90 text-white font-medium px-4 py-2 transition-colors shadow-lg"
      >
        結果を確認する
      </button>
    </div>
  );
};

export default BudgetPlanner;
