
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, GraduationCap, Plane, Shield, Home, Gift } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Goal options for users to select from
const goalOptions = [
  {
    id: "travel",
    title: "海外旅行",
    description: "夢の旅行に行くための費用",
    icon: Plane,
    amount: 500000,
    years: 2
  },
  {
    id: "education",
    title: "教育資金",
    description: "スキルアップや子どもの教育",
    icon: GraduationCap,
    amount: 2000000,
    years: 10
  },
  {
    id: "emergency",
    title: "緊急資金",
    description: "急な出費に備えた安心資金",
    icon: Shield,
    amount: 1000000,
    years: 3
  },
  {
    id: "home",
    title: "住宅資金",
    description: "マイホーム購入の頭金",
    icon: Home,
    amount: 5000000,
    years: 15
  },
  {
    id: "other",
    title: "その他の目標",
    description: "自分だけの特別な目標",
    icon: Gift,
    amount: 1000000,
    years: 5
  }
];

// Risk profile presets
const riskProfiles = [
  {
    id: "safe",
    title: "超安心型",
    description: "元本割れのリスクを最小限に抑えます",
    allocation: { 1: 80, 2: 20, 3: 0 },
    weather: "sun",
    emotion: "smile"
  },
  {
    id: "balance",
    title: "バランス型",
    description: "安定性と成長性のバランスを重視します",
    allocation: { 1: 40, 2: 40, 3: 20 },
    weather: "cloud",
    emotion: "smile"
  },
  {
    id: "growth",
    title: "成長型",
    description: "リスクを取って高い成長を目指します",
    allocation: { 1: 10, 2: 30, 3: 60 },
    weather: "cloud-lightning",
    emotion: "frown"
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
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
  
  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    const goal = goalOptions.find(g => g.id === goalId);
    if (goal) {
      onGoalSelected(goal.amount, goal.years);
    }
    setStep(2);
  };
  
  const handleRiskProfileSelect = (profileId: string) => {
    const profile = riskProfiles.find(p => p.id === profileId);
    if (profile) {
      onRiskProfileSelected(profile.allocation);
    }
    setStep(3);
  };
  
  const handlePersonalityQuestion = (trait: string) => {
    setPersonalityTraits([...personalityTraits, trait]);
    
    // If we have 2 answers, determine risk profile and complete
    if (personalityTraits.length === 1) {
      // Simple algorithm: 
      // cautious + save = safe
      // cautious + invest = balance
      // risk + save = balance
      // risk + invest = growth
      let profileId = "balance"; // Default
      
      if (trait === "save" && personalityTraits[0] === "cautious") {
        profileId = "safe";
      } else if (trait === "invest" && personalityTraits[0] === "risk") {
        profileId = "growth";
      }
      
      const profile = riskProfiles.find(p => p.id === profileId);
      if (profile) {
        onRiskProfileSelected(profile.allocation);
      }
      
      // Complete the wizard after a short delay
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "sun": return <span className="text-green-500">☀️</span>;
      case "cloud": return <span className="text-blue-500">⛅️</span>;
      case "cloud-lightning": return <span className="text-red-500">🌩</span>;
      default: return <span>☀️</span>;
    }
  };
  
  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case "smile": return <span className="text-green-500">😌</span>;
      case "neutral": return <span className="text-blue-500">🙂</span>;
      case "frown": return <span className="text-red-500">😬</span>;
      default: return <span>🙂</span>;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center">何のためにお金を増やしたいですか？</h2>
          <p className="text-center text-muted-foreground">目的を選ぶと、あなたに合った投資プランを提案します</p>
          
          <div className="grid gap-4 mt-6">
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
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center">投資スタイルを選びましょう</h2>
          <p className="text-center text-muted-foreground">あなたに合った方法を選んでください</p>
          
          <Tabs defaultValue="choose" className="mt-6">
            <TabsList className="grid grid-cols-1 mb-4">
              <TabsTrigger value="choose">スタイルを選ぶ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="choose" className="space-y-4">
              {riskProfiles.map((profile) => (
                <Card 
                  key={profile.id} 
                  className="hover:bg-accent/10 cursor-pointer transition-colors"
                  onClick={() => handleRiskProfileSelect(profile.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{profile.title}</h3>
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="flex space-x-1">
                                {getWeatherIcon(profile.weather)}
                                {getEmotionIcon(profile.emotion)}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>リスクレベル: {
                                profile.id === "safe" ? "低め" :
                                profile.id === "balance" ? "中程度" :
                                "高め"
                              }</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{profile.description}</p>
                    
                    <div className="mt-4">
                      <div className="bg-slate-100 h-2 flex rounded-full overflow-hidden">
                        {profile.id === "safe" && (
                          <>
                            <div className="bg-green-500 h-full" style={{width: '80%'}}></div>
                            <div className="bg-blue-500 h-full" style={{width: '20%'}}></div>
                          </>
                        )}
                        {profile.id === "balance" && (
                          <>
                            <div className="bg-green-500 h-full" style={{width: '40%'}}></div>
                            <div className="bg-blue-500 h-full" style={{width: '40%'}}></div>
                            <div className="bg-red-500 h-full" style={{width: '20%'}}></div>
                          </>
                        )}
                        {profile.id === "growth" && (
                          <>
                            <div className="bg-green-500 h-full" style={{width: '10%'}}></div>
                            <div className="bg-blue-500 h-full" style={{width: '30%'}}></div>
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
              
              <Card className="hover:bg-accent/10 cursor-pointer transition-colors">
                <CardContent className="p-4" onClick={() => setStep(3)}>
                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full p-3 mr-4">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AIおまかせ</h3>
                      <p className="text-sm text-muted-foreground">簡単な質問であなたに合ったプランを提案</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center">あなたの性格を教えてください</h2>
          <p className="text-center text-muted-foreground">2つの質問であなたに最適なプランを提案します</p>
          
          {personalityTraits.length === 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">質問1: お金について、どちらに近いですか？</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => setPersonalityTraits(["cautious"])}
                >
                  <div className="text-left">
                    <div className="font-medium">安全第一で考えたい</div>
                    <div className="text-sm text-muted-foreground">元本割れしないことが大切</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => setPersonalityTraits(["risk"])}
                >
                  <div className="text-left">
                    <div className="font-medium">ある程度リスクは取れる</div>
                    <div className="text-sm text-muted-foreground">リターンのためなら変動は許容できる</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          )}
          
          {personalityTraits.length === 1 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">質問2: 将来のお金について、どう考えますか？</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => handlePersonalityQuestion("save")}
                >
                  <div className="text-left">
                    <div className="font-medium">貯めることが優先</div>
                    <div className="text-sm text-muted-foreground">安定して貯まることが大切</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => handlePersonalityQuestion("invest")}
                >
                  <div className="text-left">
                    <div className="font-medium">増やすことが優先</div>
                    <div className="text-sm text-muted-foreground">多少のリスクがあっても増やしたい</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          )}
          
          {personalityTraits.length === 2 && (
            <Card className="mt-6">
              <CardContent className="p-6 text-center">
                <div className="text-xl mb-3">あなたに最適なプランを作成中...</div>
                <Progress value={60} className="h-2 mb-4" />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalWizard;
