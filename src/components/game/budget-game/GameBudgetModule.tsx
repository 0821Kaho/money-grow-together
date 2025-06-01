
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import PigipeGuide from "./PigipeGuide";
import StatusBar from "./StatusBar";
import IntroScreen from "./IntroScreen";
import SalaryPuzzle from "./SalaryPuzzle";
import EventCard from "./EventCard";
import WeeklySummary from "./WeeklySummary";
import FinalResult from "./FinalResult";

interface GameEvent {
  name: string;
  amount: number;
  type: "need" | "want";
}

interface GameState {
  currentWeek: number;
  money: number;
  savings: number;
  debt: number;
  gamePhase: "intro" | "salaryPuzzle" | "event" | "weeklySummary" | "ending";
  currentEventIndex: number;
  skillUses: number;
  weeklyIncome: number;
  weeklyExpenses: number;
  weeklyInterest: number;
  pigipeMessage: string;
  pigipeMood: "happy" | "warning" | "sad" | "excited" | "normal";
}

const initialState: GameState = {
  currentWeek: 1,
  money: 0,
  savings: 0,
  debt: 0,
  gamePhase: "intro",
  currentEventIndex: 0,
  skillUses: 3, // 月全体で3回まで
  weeklyIncome: 0,
  weeklyExpenses: 0,
  weeklyInterest: 0,
  pigipeMessage: "一緒に家計管理を学ぼうブー！",
  pigipeMood: "excited"
};

// 週ごとのイベントデータ
const weeklyEvents: GameEvent[][] = [
  // Week 1 - 比較的軽い支出
  [
    { name: "コンビニスイーツ魔人", amount: 800, type: "want" as const },
    { name: "スマホ料金ドラゴン", amount: 8000, type: "need" as const },
    { name: "コーヒー誘惑デーモン", amount: 500, type: "want" as const },
    { name: "昼食ガーディアン", amount: 3000, type: "need" as const },
    { name: "友達の誘いスライム", amount: 2500, type: "want" as const }
  ],
  // Week 2 - 中程度の支出
  [
    { name: "家賃ドラゴン", amount: 25000, type: "need" as const },
    { name: "洋服欲望ビースト", amount: 8000, type: "want" as const },
    { name: "食材調達ナイト", amount: 6000, type: "need" as const },
    { name: "エンタメ誘惑魔王", amount: 1500, type: "want" as const },
    { name: "交通費ゴブリン", amount: 4000, type: "need" as const }
  ],
  // Week 3 - やや重い支出
  [
    { name: "光熱費ドラゴン", amount: 12000, type: "need" as const },
    { name: "ガジェット物欲モンスター", amount: 15000, type: "want" as const },
    { name: "医療費緊急イベント", amount: 5000, type: "need" as const },
    { name: "飲み会誘惑スピリット", amount: 4000, type: "want" as const },
    { name: "日用品補給隊", amount: 3000, type: "need" as const }
  ],
  // Week 4 - 最終週、重い支出
  [
    { name: "税金徴収ドラゴン", amount: 20000, type: "need" as const },
    { name: "旅行計画テンプテーション", amount: 30000, type: "want" as const },
    { name: "家電故障緊急事態", amount: 18000, type: "need" as const },
    { name: "美容院リフレッシュ", amount: 6000, type: "want" as const },
    { name: "保険料オーガ", amount: 8000, type: "need" as const }
  ]
];

const GameBudgetModule = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const { toast } = useToast();

  // 週の開始時に給与を計算
  const getWeeklySalary = (week: number) => {
    const baseSalary = 280000; // 月28万円想定
    const deductions = Math.floor(baseSalary * 0.2); // 控除20%
    return baseSalary - deductions; // 手取り約22.4万円
  };

  // 現在の週のイベントを取得
  const getCurrentEvents = () => {
    return weeklyEvents[gameState.currentWeek - 1] || [];
  };

  // アクション処理
  const handleAction = (action: string, payload?: any) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      switch (action) {
        case "START_GAME":
          return {
            ...newState,
            gamePhase: "salaryPuzzle",
            pigipeMessage: "まずは今週のお給料を確認しようブー！",
            pigipeMood: "excited"
          };

        case "SALARY_COMPLETE":
          const salary = payload.netSalary;
          return {
            ...newState,
            money: prev.money + salary,
            weeklyIncome: salary,
            gamePhase: "event",
            currentEventIndex: 0,
            pigipeMessage: `${salary.toLocaleString()}円ゲット！今週の支出に備えようブー！`,
            pigipeMood: "happy"
          };

        case "PAY_EXPENSE":
          const payAmount = payload.amount;
          let newMoney = prev.money - payAmount;
          let newDebt = prev.debt;
          
          if (newMoney < 0) {
            newDebt += Math.abs(newMoney);
            newMoney = 0;
          }
          
          return {
            ...newState,
            money: newMoney,
            debt: newDebt,
            weeklyExpenses: prev.weeklyExpenses + payAmount,
            currentEventIndex: prev.currentEventIndex + 1,
            pigipeMessage: newDebt > prev.debt ? 
              "借金になっちゃった...気をつけようブー！" : 
              "支払い完了！次も頑張ろうブー！",
            pigipeMood: newDebt > prev.debt ? "warning" : "normal"
          };

        case "SKIP_EXPENSE":
          return {
            ...newState,
            currentEventIndex: prev.currentEventIndex + 1,
            pigipeMessage: "欲望に打ち勝った！偉いブー！",
            pigipeMood: "happy"
          };

        case "USE_SKILL":
          const originalAmount = payload.amount;
          const discountRate = 0.3; // 30%割引
          const discountAmount = Math.floor(originalAmount * discountRate);
          const finalAmount = originalAmount - discountAmount;
          
          let skillMoney = prev.money - finalAmount;
          let skillDebt = prev.debt;
          
          if (skillMoney < 0) {
            skillDebt += Math.abs(skillMoney);
            skillMoney = 0;
          }
          
          return {
            ...newState,
            money: skillMoney,
            debt: skillDebt,
            skillUses: prev.skillUses - 1,
            weeklyExpenses: prev.weeklyExpenses + finalAmount,
            currentEventIndex: prev.currentEventIndex + 1,
            pigipeMessage: `節約スキルで${discountAmount.toLocaleString()}円お得！ナイス判断ブー！`,
            pigipeMood: "excited"
          };

        case "WEEK_END":
          // 利息計算
          const interestRate = 0.005; // 週利0.5%
          const interest = Math.floor(prev.debt * interestRate);
          
          return {
            ...newState,
            debt: prev.debt + interest,
            weeklyInterest: interest,
            gamePhase: "weeklySummary",
            pigipeMessage: interest > 0 ? 
              `利息が${interest.toLocaleString()}円発生したブー...` : 
              "今週もお疲れさまブー！",
            pigipeMood: interest > 0 ? "warning" : "happy"
          };

        case "NEXT_WEEK":
          if (prev.currentWeek >= 4) {
            return {
              ...newState,
              gamePhase: "ending",
              pigipeMessage: "1ヶ月完了！結果を見てみようブー！",
              pigipeMood: "excited"
            };
          }
          
          return {
            ...newState,
            currentWeek: prev.currentWeek + 1,
            gamePhase: "salaryPuzzle",
            currentEventIndex: 0,
            weeklyIncome: 0,
            weeklyExpenses: 0,
            weeklyInterest: 0,
            pigipeMessage: `第${prev.currentWeek + 1}週目スタート！頑張ろうブー！`,
            pigipeMood: "excited"
          };

        case "RESET_GAME":
          return {
            ...initialState,
            gamePhase: "salaryPuzzle"
          };

        default:
          return newState;
      }
    });
  };

  // 週末チェック
  useEffect(() => {
    const currentEvents = getCurrentEvents();
    if (gameState.gamePhase === "event" && gameState.currentEventIndex >= currentEvents.length) {
      handleAction("WEEK_END");
    }
  }, [gameState.currentEventIndex, gameState.gamePhase]);

  const currentEvents = getCurrentEvents();
  const currentEvent = currentEvents[gameState.currentEventIndex];

  return (
    <Card className="w-full max-w-md mx-auto min-h-[600px]">
      <CardContent className="p-0 relative overflow-hidden">
        {/* Status Bar */}
        {gameState.gamePhase !== "intro" && (
          <StatusBar
            week={gameState.currentWeek}
            money={gameState.money}
            savings={gameState.savings}
            debt={gameState.debt}
          />
        )}

        {/* Main Game Content */}
        <div className="p-4 pt-16">
          <AnimatePresence mode="wait">
            {gameState.gamePhase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <IntroScreen onStart={() => handleAction("START_GAME")} />
              </motion.div>
            )}

            {gameState.gamePhase === "salaryPuzzle" && (
              <motion.div
                key="salary"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <SalaryPuzzle
                  week={gameState.currentWeek}
                  onComplete={(netSalary) => handleAction("SALARY_COMPLETE", { netSalary })}
                />
              </motion.div>
            )}

            {gameState.gamePhase === "event" && currentEvent && (
              <motion.div
                key={`event-${gameState.currentEventIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <EventCard
                  event={currentEvent}
                  skillUses={gameState.skillUses}
                  canAfford={gameState.money >= currentEvent.amount}
                  onAction={(action) => {
                    if (action === "pay") {
                      handleAction("PAY_EXPENSE", { amount: currentEvent.amount });
                    } else if (action === "skip") {
                      handleAction("SKIP_EXPENSE");
                    } else if (action === "skill") {
                      handleAction("USE_SKILL", { amount: currentEvent.amount });
                    }
                  }}
                />
              </motion.div>
            )}

            {gameState.gamePhase === "weeklySummary" && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <WeeklySummary
                  week={gameState.currentWeek}
                  income={gameState.weeklyIncome}
                  expenses={gameState.weeklyExpenses}
                  interest={gameState.weeklyInterest}
                  money={gameState.money}
                  debt={gameState.debt}
                  onNext={() => handleAction("NEXT_WEEK")}
                />
              </motion.div>
            )}

            {gameState.gamePhase === "ending" && (
              <motion.div
                key="ending"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <FinalResult
                  money={gameState.money}
                  savings={gameState.savings}
                  debt={gameState.debt}
                  onRestart={() => handleAction("RESET_GAME")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pigipe Guide */}
        <PigipeGuide
          message={gameState.pigipeMessage}
          mood={gameState.pigipeMood}
        />
      </CardContent>
    </Card>
  );
};

export default GameBudgetModule;
