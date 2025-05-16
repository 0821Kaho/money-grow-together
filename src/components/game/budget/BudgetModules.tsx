
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

// This component acts as a container for all budget-related modules
const BudgetModules = () => {
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
  
  // Toggle section visibility
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
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
        <h2 className="font-semibold">{title}</h2>
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
        <IntroManga />
      </Section>
      
      <Section id="expenses" title="支出の把握">
        <ExpenseCalculator />
      </Section>
      
      <Section id="budget" title="予算の立て方">
        <BudgetPlanner />
      </Section>
      
      <Section id="saving" title="貯蓄方法">
        <DragDropSaving />
      </Section>
      
      <Section id="credit" title="クレジットカードと借金管理">
        <CreditCardEducation />
      </Section>
      
      <Section id="loans" title="ローンの比較">
        <LoanComparison />
      </Section>
      
      <Section id="quiz" title="知識チェックテスト">
        <BudgetQuiz />
      </Section>
    </div>
  );
};

export default BudgetModules;
