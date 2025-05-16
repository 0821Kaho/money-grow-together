
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import EventSelection from "./EventSelection";
import TimelineDisplay from "./TimelineDisplay";
import SimulationAdjuster from "./SimulationAdjuster";
import CompletionScreen from "./CompletionScreen";

// This component acts as the main container for all lifeplan-related modules
const LifePlanModules = () => {
  const { toast } = useToast();
  
  // Track the current step in the life planning process
  const [currentStep, setCurrentStep] = useState<"events" | "timeline" | "simulation" | "completion">("events");
  
  // Track module completion status
  const [completedModules, setCompletedModules] = useState({
    events: false,
    timeline: false,
    simulation: false,
    completion: false
  });
  
  // State to track which sections are expanded/collapsed
  const [expandedSections, setExpandedSections] = useState({
    events: true,
    timeline: false,
    simulation: false,
    completion: false
  });
  
  // State to store user's life events data
  const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
  
  // State for financial simulation data
  const [financialPlan, setFinancialPlan] = useState<FinancialPlan>({
    monthlySavings: 30000,
    initialSavings: 500000,
    retirementAge: 65,
    simulationResults: null
  });
  
  // Toggle section visibility
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  // Handle completion of each step
  const handleStepComplete = (step: keyof typeof completedModules, data?: any) => {
    // Mark step as completed
    setCompletedModules({
      ...completedModules,
      [step]: true
    });
    
    // Handle step-specific actions
    if (step === "events") {
      setLifeEvents(data);
      toast({ 
        title: "ライフイベント設定完了！", 
        description: "あなたの人生設計を時間軸で見ていきましょう" 
      });
      
      // Advance to next step automatically
      setTimeout(() => {
        setCurrentStep("timeline");
        setExpandedSections(prev => ({
          ...prev,
          events: false,
          timeline: true
        }));
      }, 500);
    } 
    else if (step === "timeline") {
      toast({ 
        title: "タイムライン作成完了", 
        description: "イベントの資金計画をシミュレーションしてみましょう" 
      });
      
      // Advance to next step
      setTimeout(() => {
        setCurrentStep("simulation");
        setExpandedSections(prev => ({
          ...prev,
          timeline: false,
          simulation: true
        }));
      }, 500);
    }
    else if (step === "simulation") {
      setFinancialPlan(data);
      toast({ 
        title: "シミュレーション完了", 
        description: "具体的な目標と必要な行動がわかりましたね" 
      });
      
      // Advance to completion
      setTimeout(() => {
        setCurrentStep("completion");
        setExpandedSections(prev => ({
          ...prev,
          simulation: false,
          completion: true
        }));
      }, 500);
    }
    else if (step === "completion") {
      toast({ 
        title: "ライフプランモジュール完了！", 
        description: "バッジを獲得しました！" 
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
          {completedModules[id as keyof typeof completedModules] && (
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
  
  // Progress bar component
  const ProgressBar = () => {
    const steps = ["events", "timeline", "simulation", "completion"];
    const currentStepIndex = steps.indexOf(currentStep);
    const progress = (currentStepIndex / (steps.length - 1)) * 100;
    
    return (
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>ステップ {currentStepIndex + 1}/{steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <ProgressBar />
      
      <Section id="events" title="ライフイベントの選択">
        <EventSelection 
          onComplete={(events) => handleStepComplete("events", events)} 
        />
      </Section>
      
      <Section id="timeline" title="ライフプラン・タイムライン">
        <TimelineDisplay 
          events={lifeEvents}
          onComplete={() => handleStepComplete("timeline")} 
          disabled={!completedModules.events}
        />
      </Section>
      
      <Section id="simulation" title="資金シミュレーション">
        <SimulationAdjuster 
          events={lifeEvents}
          financialPlan={financialPlan}
          onComplete={(plan) => handleStepComplete("simulation", plan)} 
          disabled={!completedModules.timeline}
        />
      </Section>
      
      <Section id="completion" title="ライフプラン完成">
        <CompletionScreen 
          events={lifeEvents}
          financialPlan={financialPlan}
          onComplete={() => handleStepComplete("completion")} 
          disabled={!completedModules.simulation}
        />
      </Section>
    </div>
  );
};

export default LifePlanModules;

// Types
export interface LifeEvent {
  id: string;
  type: "education" | "job" | "marriage" | "childbirth" | "housing" | "retirement" | "other";
  title: string;
  age: number;
  year: number;
  cost: number;
  icon: string;
  description?: string;
  custom?: boolean;
}

export interface FinancialPlan {
  monthlySavings: number;
  initialSavings: number;
  retirementAge: number;
  simulationResults: SimulationResult[] | null;
}

export interface SimulationResult {
  age: number;
  year: number;
  savings: number;
  events: string[];
  costs: number;
}
