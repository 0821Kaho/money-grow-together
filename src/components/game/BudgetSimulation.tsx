
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { BadgeCheck, Info, DollarSign, PiggyBank, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BudgetQuiz from "./budget/BudgetQuiz";
import LoanOffer from "./budget/LoanOffer";
import { getEventForDay, getBudgetEvents } from "@/lib/budget-events";
import { Badge } from "@/components/ui/badge";

interface BudgetState {
  money: number;
  happiness: number;
  day: number;
  hasLoan: boolean;
  loanAmount: number;
  interestRate: number;
  completedEvents: number[];
  achievedBadges: string[];
  weeklyQuizCompleted: boolean;
}

const initialState: BudgetState = {
  money: 150000, // 初期所持金: 15万円
  happiness: 50,
  day: 1,
  hasLoan: false,
  loanAmount: 0,
  interestRate: 0.15, // 15%の高金利
  completedEvents: [],
  achievedBadges: [],
  weeklyQuizCompleted: false,
};

const BudgetSimulation = () => {
  const [state, setState] = useState<BudgetState>(initialState);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [showLoanOffer, setShowLoanOffer] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const { toast } = useToast();
  // 星の数を追跡するための状態を追加
  const [starCount, setStarCount] = useState(0);
  
  // 日付が変わった時のイベント処理
  useEffect(() => {
    // 週末のクイズチェック (7日、14日、21日、28日)
    if ([7, 14, 21, 28].includes(state.day) && !state.weeklyQuizCompleted) {
      setShowQuiz(true);
      return;
    }
    
    // ローン返済日チェック (10日と25日)
    if ([10, 25].includes(state.day) && state.hasLoan) {
      const interest = Math.ceil(state.loanAmount * state.interestRate / 2); // 半月分の金利
      const newMoney = state.money - interest;
      
      setState((prev) => ({
        ...prev,
        money: newMoney,
      }));
      
      toast({
        title: "ローン利息の支払い",
        description: `${interest.toLocaleString()}円の利息を支払いました。`,
      });
    }
    
    // 所持金チェック - 5000円未満でローンの誘惑
    if (state.money < 5000 && !state.hasLoan && state.day < 28) {
      setShowLoanOffer(true);
      return;
    }
    
    // 通常のイベント
    const todaysEvent = getEventForDay(state.day);
    if (todaysEvent) {
      setCurrentEvent(todaysEvent);
    }
  }, [state.day, state.hasLoan]);
  
  // 次の日へ進む
  const handleNextDay = () => {
    if (state.day >= 30) {
      showFinalResults();
      return;
    }
    
    setState((prev) => ({
      ...prev,
      day: prev.day + 1,
      weeklyQuizCompleted: [7, 14, 21, 28].includes(prev.day + 1) ? false : prev.weeklyQuizCompleted,
    }));
  };
  
  // イベントの選択肢を選んだ時の処理
  const handleOption = (option: any) => {
    const newMoney = state.money - option.cost + option.reward;
    const newHappiness = Math.max(0, Math.min(100, state.happiness + option.happiness));
    
    setState((prev) => ({
      ...prev,
      money: newMoney,
      happiness: newHappiness,
      completedEvents: [...prev.completedEvents, currentEvent.id],
    }));
    
    // バッジ獲得チェック
    if (option.badge) {
      setState((prev) => ({
        ...prev,
        achievedBadges: [...prev.achievedBadges, option.badge],
      }));
      
      toast({
        title: "新しいバッジを獲得しました！",
        description: `「${option.badge}」のバッジを獲得しました！`,
      });
    }
    
    toast({
      title: "選択結果",
      description: option.consequence,
    });
    
    setCurrentEvent(null);
  };
  
  // クイズに回答した時の処理
  const handleQuizComplete = (isCorrect: boolean) => {
    setShowQuiz(false);
    
    if (isCorrect) {
      const bonus = 5000;
      setState((prev) => ({
        ...prev,
        money: prev.money + bonus,
        weeklyQuizCompleted: true,
      }));
      
      toast({
        title: "クイズ正解！",
        description: `正解ボーナスとして${bonus.toLocaleString()}円を獲得しました！`,
      });
    } else {
      setState((prev) => ({
        ...prev,
        weeklyQuizCompleted: true,
      }));
      
      toast({
        title: "残念！",
        description: "次のチャンスに挑戦しましょう。",
      });
    }
  };
  
  // ローン申し込み処理
  const handleLoanDecision = (accepted: boolean) => {
    setShowLoanOffer(false);
    
    if (accepted) {
      const loanAmount = 30000; // 3万円の少額ローン
      
      setState((prev) => ({
        ...prev,
        money: prev.money + loanAmount,
        hasLoan: true,
        loanAmount: loanAmount,
      }));
      
      toast({
        title: "ローン契約完了",
        description: `${loanAmount.toLocaleString()}円を借り入れました。10日と25日に利息の支払いがあります。`,
      });
    } else {
      // ローンを断った場合はバッジ獲得
      setState((prev) => ({
        ...prev,
        achievedBadges: [...prev.achievedBadges, "借入回避マスター"],
      }));
      
      toast({
        title: "賢明な判断です！",
        description: "ローンを断り、「借入回避マスター」バッジを獲得しました！",
      });
    }
  };
  
  // 最終結果表示
  const showFinalResults = () => {
    let result = "";
    let stars = 0;
    
    if (state.money >= 50000) {
      result = "素晴らしい！賢明な家計管理ができました！";
      stars = 3;
    } else if (state.money >= 10000) {
      result = "良くできました！月末まで上手に予算管理ができました。";
      stars = 2;
    } else if (state.money >= 0) {
      result = "なんとか借金せずに月末を迎えることができました。";
      stars = 1;
    } else {
      result = "残念ながら赤字になってしまいました。次回はより計画的に！";
      stars = 0;
    }
    
    setResultMessage(result);
    setShowResult(true);
    setStarCount(stars);
    
    // 達成バッジの付与
    if (state.money >= 0 && !state.achievedBadges.includes("家計サバイバー")) {
      setState((prev) => ({
        ...prev,
        achievedBadges: [...prev.achievedBadges, "家計サバイバー"],
      }));
    }
  };
  
  // 画面の条件分岐レンダリング
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {showResult ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 text-4xl">
            {state.money >= 50000 ? "🏆" : state.money >= 10000 ? "🎉" : state.money >= 0 ? "😌" : "😓"}
          </div>
          <h2 className="mb-4 text-xl font-bold">1ヶ月のシミュレーション終了</h2>
          <p className="mb-4 text-center">{resultMessage}</p>
          
          <div className="mb-6 flex">
            {[...Array(3)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-8 w-8 ${i < starCount ? 'text-[#FFD700] fill-[#FFD700]' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          
          <p className="mb-6 text-center">
            <span className="font-medium">最終残高: </span>
            <span className={state.money >= 0 ? "text-game-primary font-bold" : "text-game-danger font-bold"}>
              {state.money.toLocaleString()}円
            </span>
          </p>
          
          {state.achievedBadges.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-2 text-center font-medium">獲得したバッジ</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {state.achievedBadges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1 bg-[#25B589] text-white">
                    <BadgeCheck className="h-4 w-4" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="game-button"
          >
            もう一度プレイ
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">家計管理シミュレーション</h2>
              <p className="text-sm text-gray-600">
                {state.day}日目 (残り{30 - state.day}日)
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <DollarSign className="h-5 w-5 text-game-primary" />
                <p className="font-medium text-game-primary">
                  {state.money.toLocaleString()}円
                </p>
              </div>
              
              <div className="mt-1 flex items-center gap-1">
                <span className="text-sm">満足度:</span>
                <Progress 
                  value={state.happiness} 
                  className="h-2 w-24" 
                  indicatorClassName={state.happiness < 30 ? "bg-game-danger" : "bg-game-primary"}
                />
              </div>
              
              {state.hasLoan && (
                <div className="mt-1 text-xs text-game-danger">
                  ローン: {state.loanAmount.toLocaleString()}円
                </div>
              )}
            </div>
          </div>
          
          {showLoanOffer && (
            <LoanOffer 
              onDecision={handleLoanDecision} 
              amount={30000} 
              interestRate={state.interestRate * 100}
            />
          )}
          
          {showQuiz && (
            <BudgetQuiz onComplete={handleQuizComplete} />
          )}
          
          {currentEvent && !showLoanOffer && !showQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-gray-200 p-5"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F7F7] text-game-primary">
                  <span className="text-lg font-bold">{state.day}</span>
                </div>
                <h3 className="text-lg font-bold">{currentEvent.title}</h3>
              </div>
              <p className="mb-5 text-gray-700">{currentEvent.description}</p>
              <div className="flex flex-col gap-3">
                {currentEvent.options.map((option: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleOption(option)}
                    className="flex flex-col rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.text}</span>
                      <div className="flex items-center gap-1">
                        {option.cost > 0 && (
                          <span className="text-game-danger">
                            -{option.cost.toLocaleString()}円
                          </span>
                        )}
                        {option.reward > 0 && (
                          <span className="text-[#25B589]">
                            +{option.reward.toLocaleString()}円
                          </span>
                        )}
                      </div>
                    </div>
                    {option.happiness !== 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                        <span>満足度:</span>
                        <span className={option.happiness > 0 ? "text-[#25B589]" : "text-game-danger"}>
                          {option.happiness > 0 ? `+${option.happiness}` : option.happiness}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          
          {!currentEvent && !showLoanOffer && !showQuiz && (
            <div className="flex flex-col items-center p-8">
              <div className="mb-4 text-5xl">{state.day % 5 === 0 ? "💼" : "📆"}</div>
              <p className="mb-6 text-center">
                {state.day}日目：今日は特別なイベントはありません。
              </p>
              <button onClick={handleNextDay} className="game-button">
                次の日へ
              </button>
            </div>
          )}
          
          {/* 日付インジケーター */}
          <div className="mt-6">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium">1日</span>
              <span className="text-xs font-medium">30日</span>
            </div>
            <Progress 
              value={(state.day / 30) * 100} 
              className="h-2" 
            />
          </div>
          
          {/* ヒント表示 */}
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#F7F7F7] p-3 text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
            <p className="text-gray-600">
              計画的な支出を心がけ、余裕を持って月末を迎えましょう。所持金が少なくなるとローンの誘惑があるかもしれませんが、高金利に注意！
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetSimulation;
