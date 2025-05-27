
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { BadgeCheck, Info, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import BudgetQuiz from "./budget/BudgetQuiz";
import LoanOffer from "./budget/LoanOffer";
import WildBoarLoanOffer from "./budget/WildBoarLoanOffer";
import IntroManga from "./budget/IntroManga";
import ExpenseCalculator from "./budget/ExpenseCalculator";
import DragDropSaving from "./budget/DragDropSaving";
import LoanComparison from "./budget/LoanComparison";
import BudgetPlanner from "./budget/BudgetPlanner";
import FinalTest from "./budget/FinalTest";
import { getEventForDay, getBudgetEvents } from "@/lib/budget-events";
import BudgetCalendarView from "./budget/BudgetCalendarView";
import BudgetSimulationHeader from "./budget/BudgetSimulationHeader";
import DayExpressionIcon from "./budget/DayExpressionIcon";
import SwipeHint from "./budget/SwipeHint";
import PastEventsAccordion from "./budget/PastEventsAccordion";

// dayEventsを定義
const dayEvents = getBudgetEvents();

interface BudgetState {
  money: number;
  happiness: number;
  day: number;
  hasLoan: boolean;
  loanAmount: number;
  interestRate: number;
  hasWildBoarLoan: boolean;
  wildBoarLoanAmount: number;
  wildBoarInterestRate: number;
  missedPayments: number;
  completedEvents: number[];
  achievedBadges: string[];
  weeklyQuizCompleted: boolean;
  currentStage: string;
  calculatedBalance?: number;
  savedAmount?: number;
}

const initialState: BudgetState = {
  money: 150000, // 初期所持金: 15万円
  happiness: 50,
  day: 1,
  hasLoan: false,
  loanAmount: 0,
  interestRate: 0.15, // 15%の高金利
  hasWildBoarLoan: false,
  wildBoarLoanAmount: 0,
  wildBoarInterestRate: 0.30, // 30%の超高金利
  missedPayments: 0,
  completedEvents: [],
  achievedBadges: [],
  weeklyQuizCompleted: false,
  currentStage: "simulation", // 直接シミュレーションから開始
};

// シミュレーションの進捗を保存するためのキー
const SIMULATION_PROGRESS_KEY = "budget_simulation_progress";

const BudgetSimulation = () => {
  const [state, setState] = useState<BudgetState>(initialState);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [showLoanOffer, setShowLoanOffer] = useState(false);
  const [showWildBoarLoanOffer, setShowWildBoarLoanOffer] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [showCalendarView, setShowCalendarView] = useState(true);
  const { toast } = useToast();
  // 星の数を追跡するための状態変数
  const [starCount, setStarCount] = useState(0);
  // 進捗がロードされたかを追跡
  const [progressLoaded, setProgressLoaded] = useState(false);
  // スワイプ機能のための状態
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  // コンテンツ領域への参照
  const contentRef = useRef<HTMLDivElement>(null);
  
  // コンポーネントのマウント時に保存された進捗をロードする
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(SIMULATION_PROGRESS_KEY);
      if (savedProgress) {
        const parsedState = JSON.parse(savedProgress);
        setState(parsedState);
        
        // 結果画面の表示状態も復元
        if (parsedState.day >= 30) {
          showFinalResults(parsedState);
        }
        
        // 進捗がロードされたことをマーク
        setProgressLoaded(true);
        
        console.log("Budget simulation progress loaded:", parsedState);
      } else {
        setProgressLoaded(true);
      }
    } catch (error) {
      console.error("Error loading budget simulation progress:", error);
      setProgressLoaded(true);
    }
  }, []);
  
  // ステートが変更されるたびに進捗を保存する
  useEffect(() => {
    // 初回のロードが完了した後だけ保存する
    if (progressLoaded) {
      try {
        localStorage.setItem(SIMULATION_PROGRESS_KEY, JSON.stringify(state));
        console.log("Budget simulation progress saved:", state);
      } catch (error) {
        console.error("Error saving budget simulation progress:", error);
      }
    }
  }, [state, progressLoaded]);
  
  // 日付が変わった時のイベント処理
  useEffect(() => {
    // 週末のクイズチェック (7日、14日、21日、28日)
    if ([7, 14, 21, 28].includes(state.day) && !state.weeklyQuizCompleted) {
      setShowQuiz(true);
      setShowCalendarView(false);
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
    
    // イノシシローン返済日チェック (金曜日: 5, 10, 15, 20, 25, 30日)
    if ([5, 10, 15, 20, 25, 30].includes(state.day) && state.hasWildBoarLoan) {
      const interest = Math.ceil(state.wildBoarLoanAmount * state.wildBoarInterestRate / 6); // 5日分の金利
      
      if (state.money >= interest) {
        setState((prev) => ({
          ...prev,
          money: prev.money - interest,
          missedPayments: 0, // 支払いを行ったのでリセット
        }));
        
        toast({
          title: "イノシシローン利息の支払い",
          description: `${interest.toLocaleString()}円の高額利息を支払いました。`,
        });
      } else {
        // 支払い不能の場合はペナルティ
        setState((prev) => ({
          ...prev,
          happiness: Math.max(0, prev.happiness - 5), // 幸福度が下がる
          missedPayments: prev.missedPayments + 1, // 未払いカウント増加
          wildBoarInterestRate: prev.wildBoarInterestRate + 0.05 // 金利5%増加
        }));
        
        toast({
          title: "利息の支払い不能",
          description: `支払いができません！イノシシのローン屋が怒っています。金利が上がりました！`,
          variant: "destructive"
        });
        
        // 3回以上未払いの場合は追加ペナルティ
        if (state.missedPayments >= 3) {
          setState((prev) => ({
            ...prev,
            happiness: Math.max(0, prev.happiness - 10),
          }));
          
          toast({
            title: "取立てが厳しくなりました",
            description: `イノシシのローン屋からの取立てが厳しくなり、ストレスで満足度が大幅に下がりました。`,
            variant: "destructive"
          });
        }
      }
    }
    
    // 所持金チェック - 通常ローン (5000円未満)
    if (state.money < 5000 && !state.hasLoan && state.day < 28) {
      setShowLoanOffer(true);
      setShowCalendarView(false);
      return;
    }
    
    // 所持金チェック - イノシシのローン (2000円未満でさらに追い詰められている)
    if (state.money < 2000 && !state.hasWildBoarLoan && !state.hasLoan && state.day < 28) {
      setShowWildBoarLoanOffer(true);
      setShowCalendarView(false);
      return;
    }
    
    // 通常のイベント
    const todaysEvent = getEventForDay(state.day);
    if (todaysEvent) {
      setCurrentEvent(todaysEvent);
      setShowCalendarView(false);
    } else {
      setShowCalendarView(true);
    }
  }, [state.day, state.hasLoan, state.hasWildBoarLoan]);
  
  // スワイプ機能の実装
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100 && !currentEvent && !showLoanOffer && !showQuiz && !showWildBoarLoanOffer && state.day < 30) {
      // Swipe left - go to next day
      handleNextDay();
    }
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };
  
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

    // Scroll to top after day changes
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // シミュレーション進行状態のリセット
  const resetSimulation = () => {
    localStorage.removeItem(SIMULATION_PROGRESS_KEY);
    setState(initialState); // 初期状態に戻す
    setShowResult(false);
    setCurrentEvent(null);
    setShowLoanOffer(false);
    setShowWildBoarLoanOffer(false);
    setShowQuiz(false);
    setShowCalendarView(true);
    setProgressLoaded(true); // リセット後も保存できるようにする
    
    toast({
      title: "シミュレーションリセット",
      description: "1ヶ月サバイバルシミュレーションをリセットしました",
    });
  };
  
  // 現在のステージがシミュレーションで、進行可能かどうかを判定
  const canNavigateDay = !currentEvent && !showLoanOffer && !showQuiz && !showWildBoarLoanOffer && state.day < 30;
  
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
    setShowCalendarView(true);
  };
  
  // クイズに回答した時の処理
  const handleQuizComplete = (isCorrect: boolean) => {
    setShowQuiz(false);
    setShowCalendarView(true);
    
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
    setShowCalendarView(true);
    
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
  
  // イノシシローン申し込み処理
  const handleWildBoarLoanDecision = (accepted: boolean) => {
    setShowWildBoarLoanOffer(false);
    setShowCalendarView(true);
    
    if (accepted) {
      const loanAmount = 20000; // 2万円の少額ローン
      
      setState((prev) => ({
        ...prev,
        money: prev.money + loanAmount,
        hasWildBoarLoan: true,
        wildBoarLoanAmount: loanAmount,
      }));
      
      toast({
        title: "イノシシのローン契約完了",
        description: `${loanAmount.toLocaleString()}円を借り入れました。毎週金曜日に高額利息の支払いがあります。注意してください！`,
        variant: "destructive"
      });
    } else {
      // ローンを断った場合はバッジ獲得
      setState((prev) => ({
        ...prev,
        achievedBadges: [...prev.achievedBadges, "危険回避の達人"],
      }));
      
      toast({
        title: "賢明な判断です！",
        description: "危険なローンを断り、「危険回避の達人」バッジを獲得しました！",
      });
    }
  };
  
  // 最終結果表示
  const showFinalResults = (finalState = state) => {
    let result = "";
    let newStarCount = 0;
    
    // イノシシローンの有無で結果を調整
    if (finalState.hasWildBoarLoan) {
      if (finalState.money >= 30000) {
        result = "イノシシのローンを利用しましたが、なんとか資金を管理できました！";
        newStarCount = 2;
      } else if (finalState.money >= 0) {
        result = "イノシシのローンの高金利に苦しみましたが、どうにか破産は免れました。";
        newStarCount = 1;
      } else {
        result = "イノシシのローンの取立てに追われる生活...次回はもっと注意しましょう。";
        newStarCount = 0;
      }
    } else {
      // 通常の結果判定
      if (finalState.money >= 50000) {
        result = "素晴らしい！賢明な家計管理ができました！";
        newStarCount = 3;
      } else if (finalState.money >= 10000) {
        result = "良くできました！月末まで上手に予算管理ができました。";
        newStarCount = 2;
      } else if (finalState.money >= 0) {
        result = "なんとか借金せずに月末を迎えることができました。";
        newStarCount = 1;
      } else {
        result = "残念ながら赤字になってしまいました。次回はより計画的に！";
        newStarCount = 0;
      }
    }
    
    setResultMessage(result);
    setShowResult(true);
    setStarCount(newStarCount);
    
    // 達成バッジの付与
    if (finalState.money >= 0 && !finalState.achievedBadges.includes("家計サバイバー")) {
      setState((prev) => ({
        ...prev,
        achievedBadges: [...prev.achievedBadges, "家計サバイバー"],
      }));
    }
    
    // イノシシローンを完済できた場合の特別バッジ
    if (finalState.hasWildBoarLoan && finalState.money >= 0 && finalState.missedPayments === 0) {
      setState((prev) => ({
        ...prev,
        achievedBadges: [...prev.achievedBadges, "危険な橋を渡り切った猛者"],
      }));
    }
  };
  
  // 画面の条件分岐レンダリング
  return (
    <>
      {/* Fixed status bar */}
      <BudgetSimulationHeader
        money={state.money}
        happiness={state.happiness}
        day={state.day}
        hasLoan={state.hasLoan}
        loanAmount={state.loanAmount}
        hasWildBoarLoan={state.hasWildBoarLoan}
        wildBoarLoanAmount={state.wildBoarLoanAmount}
        wildBoarInterestRate={state.wildBoarInterestRate}
      />
    
      <div 
        className="rounded-2xl bg-white p-6 shadow-sm h-[90vh] overflow-y-auto overflow-x-hidden"
        ref={contentRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#E0E0E0 transparent' }}
      >
        {showResult ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 text-4xl">
              {state.money >= 50000 ? "🏆" : state.money >= 10000 ? "🎉" : state.money >= 0 ? "😌" : "😓"}
            </div>
            <h2 className="mb-4 text-xl font-bold">1ヶ月のシミュレーション終了</h2>
            <p className="mb-4 text-center leading-relaxed">{resultMessage}</p>
            
            <div className="mb-6 flex">
              {[...Array(3)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-8 w-8 ${i < starCount ? 'text-[#FFD700] fill-[#FFD700]' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            
            <p className="mb-6 text-center leading-relaxed">
              <span className="font-medium">最終残高: </span>
              <span className={state.money >= 0 ? "text-[#FF8A8A] font-bold" : "text-[#FF5555] font-bold"}>
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
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetSimulation}
                className="rounded-xl bg-[#25B589] hover:bg-[#1E9A73] text-white font-medium px-6 py-3 transition-colors shadow-lg"
              >
                もう一度プレイ
              </button>
              
              <button
                onClick={() => {
                  const achievements = JSON.parse(localStorage.getItem("user_achievements") || "{}");
                  achievements.budgetCompleted = true;
                  localStorage.setItem("user_achievements", JSON.stringify(achievements));
                  toast({
                    title: "実績を獲得しました",
                    description: "「家計管理マスター」の実績を獲得しました！",
                  });
                }}
                className="rounded-xl bg-[#FF8A8A] hover:bg-[#FF7575] text-white font-medium px-6 py-3 transition-colors shadow-lg"
              >
                実績を記録する
              </button>
            </div>
          </div>
        ) : (
          <>
            {showWildBoarLoanOffer && (
              <WildBoarLoanOffer 
                onDecision={handleWildBoarLoanDecision} 
                amount={20000} 
                interestRate={Math.round(state.wildBoarInterestRate * 100)}
              />
            )}
            
            {showLoanOffer && !showWildBoarLoanOffer && (
              <LoanOffer 
                onDecision={handleLoanDecision} 
                amount={30000} 
                interestRate={state.interestRate * 100}
              />
            )}
            
            {showQuiz && !showLoanOffer && !showWildBoarLoanOffer && (
              <BudgetQuiz onComplete={handleQuizComplete} />
            )}
            
            {currentEvent && !showLoanOffer && !showQuiz && !showWildBoarLoanOffer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-gray-200 p-5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <DayExpressionIcon day={state.day} hasEvent={true} />
                  <h3 className="text-lg font-bold break-words whitespace-normal leading-relaxed">{currentEvent.title}</h3>
                </div>
                <p className="mb-5 text-gray-700 break-words whitespace-normal leading-relaxed">{currentEvent.description}</p>
                <div className="flex flex-col gap-3">
                  {currentEvent.options.map((option: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleOption(option)}
                      className="flex flex-col rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between flex-wrap">
                        <span className="font-medium break-words whitespace-normal leading-relaxed">{option.text}</span>
                        <div className="flex items-center gap-1 ml-2 mt-1">
                          {option.cost > 0 && (
                            <span className="text-[#FF5555] whitespace-nowrap">
                              -{option.cost.toLocaleString()}円
                            </span>
                          )}
                          {option.reward > 0 && (
                            <span className="text-[#25B589] whitespace-nowrap">
                              +{option.reward.toLocaleString()}円
                            </span>
                          )}
                        </div>
                      </div>
                      {option.happiness !== 0 && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                          <span>満足度:</span>
                          <span className={option.happiness > 0 ? "text-[#25B589]" : "text-[#FF5555]"}>
                            {option.happiness > 0 ? `+${option.happiness}` : option.happiness}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            
            {showCalendarView && !currentEvent && !showLoanOffer && !showQuiz && !showWildBoarLoanOffer && (
              <>
                <div className="mb-6 text-sm text-gray-600">
                  <p>1ヶ月サバイバル:<span className="font-medium"> {state.day}日目</span></p>
                </div>
                
                <BudgetCalendarView
                  onSelectDay={() => {}}
                  currentDay={state.day}
                  completedDays={state.completedEvents}
                  onNextDay={handleNextDay}
                />
                
                {/* 過去のイベントアコーディオン */}
                <PastEventsAccordion 
                  currentDay={state.day} 
                  completedEvents={state.completedEvents}
                />
                
                {/* ヒント表示 */}
                <div className="mt-6 flex items-start gap-2 rounded-lg bg-[#F7F7F7] p-3 text-sm">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                  <p className="text-gray-600 break-words whitespace-normal leading-relaxed">
                    {state.hasWildBoarLoan 
                      ? "イノシシのローン屋からの高金利ローンは毎週金曜日に返済が必要です。返済を怠ると厳しいペナルティが発生します！" 
                      : "計画的な支出を心がけ、余裕を持って月末を迎えましょう。所持金が少なくなるとローンの誘惑があるかもしれませんが、高金利に注意！"}
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
      
      {/* 固定フッター */}
      {!showResult && (
        <div className="mt-4 sticky bottom-0 bg-white border-t py-2 px-4 flex justify-between items-center">
          {canNavigateDay && showCalendarView ? (
            <button 
              onClick={handleNextDay}
              className="px-8 py-4 bg-[#F37B83] hover:bg-[#F37B83]/90 text-white font-bold text-lg rounded-xl transition-colors shadow-lg border-2 border-[#F37B83] hover:border-[#F37B83]/90"
            >
              次の日へ →
            </button>
          ) : (
            <div></div> // Placeholder to maintain layout
          )}
          
          <button 
            onClick={() => {
              if (window.confirm('シミュレーションをリセットしますか？進捗は失われます。')) {
                resetSimulation();
              }
            }}
            className="text-xs border border-red-400 text-red-500 rounded-lg px-3 py-2 hover:bg-red-50"
          >
            リセット
          </button>
        </div>
      )}
    </>
  );
};

export default BudgetSimulation;
