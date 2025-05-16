
import BudgetPlanner from "./BudgetPlanner";
import BudgetQuiz from "./BudgetQuiz";
import DragDropSaving from "./DragDropSaving";
import ExpenseCalculator from "./ExpenseCalculator";
import IntroManga from "./IntroManga";
import LoanComparison from "./LoanComparison";
import CreditCardEducation from "./CreditCardEducation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// This component acts as a container for all budget-related modules
const BudgetModules = () => {
  const { toast } = useToast();
  
  // State to track which sections are expanded/collapsed
  const [expandedSections, setExpandedSections] = useState({
    intro: true,
    expenses: false,
    budget: false,
    saving: false,
    credit: false,
    loans: false,
    quiz: false
  });
  
  // State to track module completion status
  const [completedModules, setCompletedModules] = useState({
    intro: false,
    expenses: false,
    budget: false,
    saving: false,
    credit: false,
    loans: false,
    quiz: false
  });
  
  // Toggle section visibility
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  // Generic completion handler for all modules
  const handleModuleComplete = (module: keyof typeof completedModules, data?: any) => {
    // Mark module as completed
    setCompletedModules({
      ...completedModules,
      [module]: true
    });
    
    // Display appropriate toast message based on module
    if (module === "intro") {
      toast({ title: "基礎知識を習得しました！", description: "次のステップに進みましょう" });
    } else if (module === "expenses") {
      const balance = data as number;
      toast({ 
        title: "収支の把握が完了しました", 
        description: balance >= 0 
          ? `残高: +${balance.toLocaleString()}円` 
          : `残高: ${balance.toLocaleString()}円（赤字です）`
      });
      
      // Expand next section automatically
      setTimeout(() => {
        setExpandedSections(prev => ({
          ...prev,
          budget: true
        }));
      }, 500);
    } else if (module === "budget") {
      const isSuccessful = data as boolean;
      toast({
        title: isSuccessful ? "予算シミュレーション成功！" : "予算シミュレーション完了",
        description: isSuccessful 
          ? "予算内で1週間を生活できました！" 
          : "次回はより計画的な予算を立ててみましょう",
        variant: isSuccessful ? "default" : "destructive"
      });
    } else if (module === "saving") {
      const savedAmount = data as number;
      toast({
        title: "節約プラン作成完了！",
        description: `月間 ${savedAmount.toLocaleString()}円 の節約に成功しました`,
      });
    } else if (module === "credit") {
      // Credit card education doesn't need special handling
      toast({ title: "クレジットカードの知識を習得しました", description: "賢い利用方法を学びました" });
    } else if (module === "loans") {
      toast({ title: "ローンの比較学習完了", description: "金利の違いによる影響を理解しました" });
    } else if (module === "quiz") {
      const isCorrect = data as boolean;
      toast({
        title: isCorrect ? "クイズ正解！" : "クイズ回答完了",
        description: isCorrect 
          ? "素晴らしい知識です！" 
          : "次回も挑戦してみましょう",
        variant: isCorrect ? "default" : "destructive"
      });
    }
  };
  
  // Section wrapper component
  const Section = ({ 
    id, 
    title, 
    children 
  }: { 
    id: keyof typeof expandedSections; 
    title: string; 
    children: React.ReactNode 
  }) => (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center p-4 bg-slate-50 rounded-lg mb-2 cursor-pointer"
        onClick={() => toggleSection(id)}
      >
        <div className="flex items-center">
          <h2 className="font-semibold">{title}</h2>
          {completedModules[id] && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              完了
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm">
          {expandedSections[id] ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {expandedSections[id] && children}
    </div>
  );
  
  return (
    <div className="space-y-4">
      <Section id="intro" title="家計管理の基本">
        <IntroManga onComplete={() => handleModuleComplete("intro")} />
      </Section>
      
      <Section id="expenses" title="支出の把握">
        <ExpenseCalculator onComplete={(balance) => handleModuleComplete("expenses", balance)} />
      </Section>
      
      <Section id="budget" title="予算の立て方">
        <BudgetPlanner onComplete={(success) => handleModuleComplete("budget", success)} />
      </Section>
      
      <Section id="saving" title="貯蓄方法">
        <DragDropSaving onComplete={(savedAmount) => handleModuleComplete("saving", savedAmount)} />
      </Section>
      
      <Section id="credit" title="クレジットカードと借金管理">
        <CreditCardEducation />
      </Section>
      
      <Section id="loans" title="ローンの比較">
        <LoanComparison onComplete={() => handleModuleComplete("loans")} />
      </Section>
      
      <Section id="quiz" title="知識チェックテスト">
        <BudgetQuiz onComplete={(isCorrect) => handleModuleComplete("quiz", isCorrect)} />
      </Section>
    </div>
  );
};

export default BudgetModules;
