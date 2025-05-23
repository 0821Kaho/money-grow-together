
import { useState } from "react";
import IntroManga from "./IntroManga";
import ExpenseCalculator from "./ExpenseCalculator";
import BudgetPlanner from "./BudgetPlanner";
import DragDropSaving from "./DragDropSaving";
import LoanComparison from "./LoanComparison";
import CreditCardEducation from "./CreditCardEducation";
import BudgetQuiz from "./BudgetQuiz";
import InterestRateExplainer from "./InterestRateExplainer";

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

const BudgetModules = () => {
  const [currentModule, setCurrentModule] = useState<Module>(Module.INTRO);
  const [balance, setBalance] = useState(0);

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

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">家計管理の基本</h2>

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
          onComplete={() => handleModuleComplete(Module.DRAG_DROP_SAVING)}
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
          <p className="text-green-600">
            次のモジュールで、さらに深く学んでいきましょう！
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetModules;
