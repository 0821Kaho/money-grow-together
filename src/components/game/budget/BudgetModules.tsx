
import { useState, useEffect } from "react";
import IntroManga from "./IntroManga";
import ExpenseCalculator from "./ExpenseCalculator";
import BudgetPlanner from "./BudgetPlanner";
import DragDropSaving from "./DragDropSaving";
import LoanComparison from "./LoanComparison";
import CreditCardEducation from "./CreditCardEducation";
import BudgetQuiz from "./BudgetQuiz";
import InterestRateExplainer from "./InterestRateExplainer";
import { toast } from "@/hooks/use-toast";

enum Module {
  INTRO = "intro",
  INTEREST_RATE = "interest_rate",
  EXPENSE_CALCULATOR = "expense_calculator",
  BUDGET_PLANNER = "budget_planner",
  DRAG_DROP_SAVING = "drag_drop_saving",
  LOAN_COMPARISON = "loan_comparison",
  CREDIT_CARD = "credit_card",
  QUIZ = "quiz",
  COMPLETED = "completed",
}

const STORAGE_KEY = "budget_module_progress";

interface ModuleProgress {
  currentModule: Module;
  balance: number;
}

const BudgetModules = () => {
  const [currentModule, setCurrentModule] = useState<Module>(Module.INTRO);
  const [balance, setBalance] = useState(0);
  
  // Load saved progress on component mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const progress: ModuleProgress = JSON.parse(savedProgress);
        setCurrentModule(progress.currentModule);
        setBalance(progress.balance);
        
        // Show a toast notification when resuming
        if (progress.currentModule !== Module.INTRO && progress.currentModule !== Module.COMPLETED) {
          toast({
            title: "学習再開",
            description: "前回の続きから再開します",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error loading saved progress:", error);
    }
  }, []);

  // Save progress whenever the current module changes
  useEffect(() => {
    try {
      const progress: ModuleProgress = {
        currentModule,
        balance,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }, [currentModule, balance]);

  const handleModuleComplete = (nextModule: Module) => {
    setCurrentModule(nextModule);
  };

  const handleExpenseCalculatorComplete = (calculatedBalance: number) => {
    setBalance(calculatedBalance);
    setCurrentModule(Module.BUDGET_PLANNER);
  };

  const showInterestRateEducation = () => {
    setCurrentModule(Module.INTEREST_RATE);
  };

  const handleBudgetPlannerComplete = (success: boolean) => {
    setCurrentModule(Module.DRAG_DROP_SAVING);
  };

  // Reset progress function (optional for user to restart)
  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentModule(Module.INTRO);
    setBalance(0);
    toast({
      title: "学習リセット",
      description: "最初から始めます",
      duration: 3000,
    });
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-center text-2xl font-bold">家計管理の基本</h2>
        
        {currentModule !== Module.INTRO && currentModule !== Module.COMPLETED && (
          <button 
            onClick={resetProgress}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            リセット
          </button>
        )}
      </div>

      {currentModule === Module.INTRO && (
        <IntroManga 
          onComplete={() => handleModuleComplete(Module.EXPENSE_CALCULATOR)} 
          onInterestRateEducation={showInterestRateEducation}
        />
      )}

      {currentModule === Module.INTEREST_RATE && (
        <InterestRateExplainer
          onComplete={() => handleModuleComplete(Module.EXPENSE_CALCULATOR)}
        />
      )}

      {currentModule === Module.EXPENSE_CALCULATOR && (
        <ExpenseCalculator onComplete={handleExpenseCalculatorComplete} />
      )}

      {currentModule === Module.BUDGET_PLANNER && (
        <BudgetPlanner
          initialBalance={balance}
          onComplete={handleBudgetPlannerComplete}
        />
      )}

      {currentModule === Module.DRAG_DROP_SAVING && (
        <DragDropSaving
          onComplete={() => handleModuleComplete(Module.LOAN_COMPARISON)}
        />
      )}

      {currentModule === Module.LOAN_COMPARISON && (
        <LoanComparison
          onComplete={() => handleModuleComplete(Module.CREDIT_CARD)}
        />
      )}

      {currentModule === Module.CREDIT_CARD && (
        <CreditCardEducation
          onComplete={() => handleModuleComplete(Module.QUIZ)}
        />
      )}

      {currentModule === Module.QUIZ && (
        <BudgetQuiz onComplete={() => handleModuleComplete(Module.COMPLETED)} />
      )}

      {currentModule === Module.COMPLETED && (
        <div className="rounded-lg bg-green-50 p-6 text-center">
          <h3 className="mb-4 text-xl font-bold text-green-800">
            おめでとうございます！
          </h3>
          <p className="mb-6 text-green-700">
            家計管理の基本コースを無事に完了しました。
            あなたは今、より賢明な金銭管理のスキルを身につけました。
          </p>
          <div className="mx-auto w-24 h-24 mb-4">
            <img
              src="/lovable-uploads/baee6be4-6d46-4b16-bdcf-f8f2c76d55ae.png"
              alt="Achievement"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-green-600 mb-6">
            次のモジュールで、さらに深く学んでいきましょう！
          </p>
          <button 
            onClick={resetProgress}
            className="text-sm text-green-600 hover:text-green-700 border border-green-600 hover:border-green-700 rounded-lg px-4 py-2"
          >
            コースをリセットする
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetModules;
