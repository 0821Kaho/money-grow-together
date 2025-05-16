import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Home, GraduationCap, Briefcase, Heart, Coins } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import StepIndicator from "./StepIndicator";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Updated goal options with more adult-focused categories and preset amounts
const goalOptions = [
  {
    id: "emergency",
    title: "生活防衛費",
    description: "3ヶ月分の生活費を確保し、突然の収入減や医療費にも備える",
    icon: Shield,
    amount: 600000,
    years: 2
  },
  {
    id: "skill",
    title: "スキルアップ資金",
    description: "資格取得・オンライン講座など"稼ぐ力"を伸ばす投資",
    icon: Briefcase,
    amount: 200000,
    years: 1
  },
  {
    id: "medical",
    title: "緊急費用",
    description: "ケガ・家電故障など突発コスト専用の「もしも」資金",
    icon: Heart,
    amount: 500000,
    years: 2
  },
  {
    id: "home",
    title: "マイホーム頭金",
    description: "賃貸→持ち家を検討する層向け。住宅ローン審査で評価される頭金",
    icon: Home,
    amount: 2000000,
    years: 7
  },
  {
    id: "education",
    title: "子どもの教育資金",
    description: "保育料〜大学入学前の学習費を「学資保険＋積立投資」で分散",
    icon: GraduationCap,
    amount: 3000000,
    years: 10
  }
];

// Risk profile presets with more intuitive names and descriptions
const riskProfiles = [
  {
    id: "safe",
    title: "家賃を確実に払うレベル",
    description: "安定性重視、変動幅 -1%〜+3%",
    allocation: { 1: 80, 2: 20, 3: 0 },
    expectedReturn: 2,
    emoji: "🛖",
    riskLevel: "低"
  },
  {
    id: "balance",
    title: "少し成長を求めるレベル",
    description: "安定と成長のバランス、変動幅 -3%〜+6%",
    allocation: { 1: 40, 2: 40, 3: 20 },
    expectedReturn: 4,
    emoji: "🏠",
    riskLevel: "中"
  },
  {
    id: "growth",
    title: "副業で攻めるレベル",
    description: "成長重視、変動幅 -10%〜+15%",
    allocation: { 1: 10, 2: 30, 3: 60 },
    expectedReturn: 7,
    emoji: "🚀",
    riskLevel: "高"
  }
];

interface GoalWizardProps {
  onGoalSelected: (goalAmount: number, goalYears: number) => void;
  onRiskProfileSelected: (allocation: {[key: number]: number}) => void;
  onComplete: () => void;
}

const GoalWizard = ({ onGoalSelected, onRiskProfileSelected, onComplete }: GoalWizardProps) => {
  const [step, setStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedRiskProfile, setSelectedRiskProfile] = useState<string | null>(null);
  const [panicLevel, setPanicLevel] = useState<number>(50); // 0-100, middle is balanced
  const [investmentPreference, setInvestmentPreference] = useState<number>(50); // 0-100
  
  // Get step title based on current step
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "目標を決める";
      case 2: 
        return "リスク許容度を選ぶ";
      case 3:
        return "結果確認";
      default:
        return "";
    }
  };
  
  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    const goal = goalOptions.find(g => g.id === goalId);
    if (goal) {
      onGoalSelected(goal.amount, goal.years);
    }
    setStep(2);
  };
  
  const handleRiskProfileSelect = (profileId: string) => {
    setSelectedRiskProfile(profileId);
    const profile = riskProfiles.find(p => p.id === profileId);
    if (profile) {
      onRiskProfileSelected(profile.allocation);
      
      // Show immediate feedback with toast
      toast({
        title: "想定年平均リターン",
        description: `+${profile.expectedReturn}%`,
        duration: 3000,
      });
    }
  };
  
  const handleFinishPersonalityQuestions = () => {
    // Determine risk profile based on questionnaire
    let profileId = "balance"; // Default is balanced
    
    const totalScore = panicLevel + investmentPreference;
    if (totalScore < 90) {
      profileId = "safe";
    } else if (totalScore > 130) {
      profileId = "growth";
    }
    
    const profile = riskProfiles.find(p => p.id === profileId);
    if (profile) {
      onRiskProfileSelected(profile.allocation);
    }
    
    // Complete the wizard
    onComplete();
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "低": return "bg-green-500";
      case "中": return "bg-yellow-500";
      case "高": return "bg-red-500";
      default: return "bg-green-500";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <StepIndicator 
        currentStep={step} 
        totalSteps={3} 
        stepTitle={getStepTitle()} 
      />
      
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">あなたの目的に合わせた投資プランを提案します</p>
          
          <div className="text-center mb-3">
            <Badge variant="outline" className="bg-primary/5">最少投資額 ¥500〜</Badge>
          </div>
          
          <div className="grid gap-4">
            {goalOptions.map((goal) => (
              <Card 
                key={goal.id} 
                className={`hover:bg-accent/10 cursor-pointer transition-colors ${selectedGoal === goal.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleGoalSelect(goal.id)}
              >
                <CardContent className="flex items-center p-4">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <goal.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-400">¥{goal.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">{goal.years}年目標</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-4 mb-8">
            <p className="text-center text-muted-foreground">あなたに合った投資スタイルを選びましょう</p>
            
            <div className="grid gap-4">
              {riskProfiles.map((profile) => (
                <Card 
                  key={profile.id} 
                  className={`hover:bg-accent/10 cursor-pointer transition-colors ${selectedRiskProfile === profile.id ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => handleRiskProfileSelect(profile.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{profile.emoji}</span>
                        <h3 className="font-semibold">{profile.title}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(profile.riskLevel)}`}></div>
                        <span className="text-sm font-medium">{profile.riskLevel}リスク</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{profile.description}</p>
                    
                    <div className="mt-4">
                      <div className="bg-slate-100 h-2 flex rounded-full overflow-hidden">
                        {profile.id === "safe" && (
                          <>
                            <div className="bg-green-500 h-full" style={{width: '80%'}}></div>
                            <div className="bg-yellow-500 h-full" style={{width: '20%'}}></div>
                          </>
                        )}
                        {profile.id === "balance" && (
                          <>
                            <div className="bg-green-500 h-full" style={{width: '40%'}}></div>
                            <div className="bg-yellow-500 h-full" style={{width: '40%'}}></div>
                            <div className="bg-red-500 h-full" style={{width: '20%'}}></div>
                          </>
                        )}
                        {profile.id === "growth" && (
                          <>
                            <div className="bg-green-500 h-full" style={{width: '10%'}}></div>
                            <div className="bg-yellow-500 h-full" style={{width: '30%'}}></div>
                            <div className="bg-red-500 h-full" style={{width: '60%'}}></div>
                          </>
                        )}
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>安全重視</span>
                        <span>成長重視</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">質問に答えて、あなたにぴったりのプランを見つけましょう</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Q1: 給料日にボーナスが入ったら？</span>
                </div>
                <div className="px-2">
                  <Slider 
                    value={[panicLevel]} 
                    min={0} 
                    max={100} 
                    step={10} 
                    onValueChange={(values) => setPanicLevel(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>まずは貯金する</span>
                    <span>少しリスクを取って増やしたい</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Q2: もし投資額が20%下がったら？</span>
                </div>
                <div className="px-2">
                  <Slider 
                    value={[investmentPreference]} 
                    min={0} 
                    max={100} 
                    step={10} 
                    onValueChange={(values) => setInvestmentPreference(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>慌てて現金化する</span>
                    <span>しばらく様子を見る</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full" 
                  onClick={handleFinishPersonalityQuestions}
                >
                  結果を見る
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GoalWizard;
