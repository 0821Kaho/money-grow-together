
import { useState } from "react";
import { motion } from "framer-motion";
import { PiggyBank, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  day?: number;
  isFixed?: boolean;
}

interface BudgetPlannerProps {
  onComplete: (success: boolean) => void;
}

const BudgetPlanner = ({ onComplete }: BudgetPlannerProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [income] = useState(50000); // 週の収入
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: "rent", name: "家賃（週割）", amount: 15000, category: "housing", isFixed: true },
    { id: "utilities", name: "光熱費", amount: 5000, category: "utilities", isFixed: true },
    { id: "food", name: "食費", amount: 0, category: "food" },
    { id: "transport", name: "交通費", amount: 0, category: "transport" },
    { id: "entertainment", name: "娯楽費", amount: 0, category: "entertainment" },
    { id: "savings", name: "貯蓄", amount: 0, category: "savings" },
    { id: "other", name: "その他", amount: 0, category: "other" },
  ]);

  const [simulation, setSimulation] = useState({
    day: 1,
    balance: income,
    expenses: [] as { day: number; name: string; amount: number }[],
    happiness: 50,
  });

  // 予算の合計を計算
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = income - totalBudget;

  // 予算金額の更新
  const updateBudgetAmount = (id: string, amount: number) => {
    setBudgetItems(
      budgetItems.map((item) =>
        item.id === id ? { ...item, amount: Math.max(0, amount) } : item
      )
    );
  };

  // 1日進める
  const advanceDay = () => {
    // 固定の支出イベント
    const fixedEvents = [
      { day: 2, name: "友人との食事", amount: 3000, category: "food" },
      { day: 4, name: "映画鑑賞", amount: 2000, category: "entertainment" },
      { day: 6, name: "急な交通費", amount: 1500, category: "transport" },
    ];

    // 今日の固定イベント
    const todaysEvent = fixedEvents.find((event) => event.day === simulation.day);

    if (todaysEvent) {
      // カテゴリーに対応する予算項目を見つける
      const budgetItem = budgetItems.find(
        (item) => item.category === todaysEvent.category
      );

      // 予算内かどうかチェック
      const isWithinBudget =
        budgetItem && todaysEvent.amount <= budgetItem.amount;
      
      // 支出を記録
      const newExpenses = [
        ...simulation.expenses,
        { day: simulation.day, name: todaysEvent.name, amount: todaysEvent.amount },
      ];

      // 残高を更新
      const newBalance = simulation.balance - todaysEvent.amount;

      // 新しい幸福度を計算
      const happinessChange = isWithinBudget ? 5 : -10;
      const newHappiness = Math.max(
        0,
        Math.min(100, simulation.happiness + happinessChange)
      );

      // シミュレーション状態を更新
      setSimulation({
        ...simulation,
        day: simulation.day + 1,
        balance: newBalance,
        expenses: newExpenses,
        happiness: newHappiness,
      });

      // トースト通知
      if (isWithinBudget) {
        toast({
          title: `${todaysEvent.name}（予算内）`,
          description: `${todaysEvent.amount.toLocaleString()}円を支出しました。予算内で計画通りです！`,
        });
      } else {
        toast({
          title: `${todaysEvent.name}（予算超過）`,
          description: `${todaysEvent.amount.toLocaleString()}円を支出しました。この出費は予算を超えています！`,
          variant: "destructive",
        });
      }
    } else {
      // イベントがない日は単純に日付を進める
      setSimulation({
        ...simulation,
        day: simulation.day + 1,
      });

      toast({
        title: `${simulation.day}日目`,
        description: "特別な出費はありませんでした",
      });
    }
  };

  // シミュレーション終了処理
  const finishSimulation = () => {
    // 成功条件: 残高がプラスで、幸福度が一定以上
    const isSuccessful = simulation.balance > 0 && simulation.happiness >= 40;
    onComplete(isSuccessful);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg bg-white p-6"
    >
      {step === 1 ? (
        <>
          <h3 className="mb-4 text-xl font-bold">1週間の予算を立てよう</h3>
          <p className="mb-6 text-gray-700 break-words whitespace-normal">
            週の収入から各カテゴリーにいくら使うか予算を決めましょう。
            予想外の出費にも対応できるよう計画的に！
          </p>

          <div className="mb-6 rounded-lg bg-[#F7F7F7] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">週の収入</span>
              <span className="font-bold text-[#25B589]">
                {income.toLocaleString()}円
              </span>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">予算合計</span>
              <span className="font-bold">
                {totalBudget.toLocaleString()}円
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold">残り予算</span>
              <span
                className={`font-bold ${
                  remainingBudget >= 0
                    ? "text-[#25B589]"
                    : "text-game-danger"
                }`}
              >
                {remainingBudget.toLocaleString()}円
              </span>
            </div>
          </div>

          {remainingBudget < 0 && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-game-danger/10 p-3 text-sm text-game-danger">
              <AlertTriangle className="h-5 w-5" />
              <p className="break-words whitespace-normal">
                予算が収入を超えています！どこかを調整してください。
              </p>
            </div>
          )}

          <div className="mb-6 space-y-3">
            {budgetItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg ${
                  item.isFixed
                    ? "bg-gray-100"
                    : "bg-white border border-gray-200"
                } p-4`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={item.amount}
                      onChange={(e) =>
                        updateBudgetAmount(
                          item.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                      disabled={item.isFixed}
                      className={`w-20 rounded-md border border-gray-300 p-1 text-right ${
                        item.isFixed ? "bg-gray-100" : ""
                      }`}
                    />
                    <span className="ml-1">円</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    {item.isFixed && (
                      <span className="rounded-md bg-gray-200 px-2 py-0.5 text-xs">
                        固定費
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateBudgetAmount(item.id, item.amount - 1000)
                      }
                      disabled={item.isFixed || item.amount <= 0}
                      className={`rounded px-2 py-0.5 text-xs ${
                        item.isFixed || item.amount <= 0
                          ? "bg-gray-200 text-gray-500"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      -1000
                    </button>
                    <button
                      onClick={() =>
                        updateBudgetAmount(item.id, item.amount + 1000)
                      }
                      disabled={item.isFixed}
                      className={`rounded px-2 py-0.5 text-xs ${
                        item.isFixed
                          ? "bg-gray-200 text-gray-500"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      +1000
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={remainingBudget < 0}
            className={`w-full rounded-xl px-6 py-3 font-medium text-white transition-all ${
              remainingBudget < 0
                ? "bg-gray-400"
                : "bg-game-primary hover:brightness-105"
            }`}
          >
            予算を確定してシミュレーションを始める
          </button>
        </>
      ) : (
        <>
          <h3 className="mb-4 text-xl font-bold">1週間の生活シミュレーション</h3>

          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1 rounded-lg bg-[#F7F7F7] p-4">
              <p className="text-sm text-gray-600">現在の残高</p>
              <p
                className={`text-xl font-bold ${
                  simulation.balance > 0
                    ? "text-[#25B589]"
                    : "text-game-danger"
                }`}
              >
                {simulation.balance.toLocaleString()}円
              </p>
            </div>
            <div className="flex-1 rounded-lg bg-[#F7F7F7] p-4">
              <p className="text-sm text-gray-600">満足度</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${
                      simulation.happiness >= 70
                        ? "bg-[#25B589]"
                        : simulation.happiness >= 40
                        ? "bg-[#FFB547]"
                        : "bg-game-danger"
                    }`}
                    style={{ width: `${simulation.happiness}%` }}
                  ></div>
                </div>
                <span className="font-bold">{simulation.happiness}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F7F7] text-game-primary">
                <span className="text-lg font-bold">{simulation.day}</span>
              </div>
              <h4 className="font-bold">
                {simulation.day <= 7
                  ? `${simulation.day}日目`
                  : "シミュレーション完了"}
              </h4>
            </div>

            {simulation.expenses.length > 0 && (
              <div className="mb-4 space-y-2">
                <h5 className="font-medium">これまでの支出</h5>
                {simulation.expenses.map((expense, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-[#F7F7F7] p-2 text-sm"
                  >
                    <div>
                      <span className="mr-2 font-medium">
                        {expense.day}日目:
                      </span>
                      <span>{expense.name}</span>
                    </div>
                    <span className="font-medium">
                      -{expense.amount.toLocaleString()}円
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {simulation.day <= 7 ? (
            <button
              onClick={advanceDay}
              className="w-full rounded-xl bg-game-primary px-6 py-3 font-medium text-white transition-all hover:brightness-105"
            >
              次の日に進む
            </button>
          ) : (
            <button
              onClick={finishSimulation}
              className="w-full rounded-xl bg-[#25B589] px-6 py-3 font-medium text-white transition-all hover:brightness-105"
            >
              シミュレーション完了
            </button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default BudgetPlanner;
