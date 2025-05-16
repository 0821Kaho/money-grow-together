
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import InvestmentPortfolio from "./investment/InvestmentPortfolio";
import InvestmentCalculator from "./investment/InvestmentCalculator";
import { Progress } from "@/components/ui/progress";
import { Bell, Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GoalWizard from "./investment/GoalWizard";
import GoalAttainmentSlider from "./investment/GoalAttainmentSlider";
import LearningCard from "./investment/LearningCard";
import { Button } from "@/components/ui/button";

const InvestmentSimulation = () => {
  // State
  const [goal, setGoal] = useState(1000000); // Default to 1,000,000 yen (1 million)
  const [currentValue, setCurrentValue] = useState(300000); // Default to 300,000 yen
  const [years, setYears] = useState(10); // Default to 10 years
  const [showWizard, setShowWizard] = useState(true); // Start with wizard
  const [allocation, setAllocation] = useState({ 1: 50, 2: 30, 3: 20 }); // Default allocation
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState(30000); // Default monthly amount
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isNewUser, setIsNewUser] = useState(true); // Track if this is first time use
  const [showDemoMode, setShowDemoMode] = useState(false); // Demo mode for first-time users
  
  // Learning tips
  const learningTips = [
    {
      title: "NISAを活用しよう！",
      description: "NISAは投資の利益が非課税になる制度です。年間120万円まで投資できます。",
      tipType: "nisa"
    },
    {
      title: "複利効果を活かそう",
      description: "早く始めるほど時間の力で資産が大きく育ちます。10年で約2倍になることも！",
      tipType: "compound"
    },
    {
      title: "手数料は大敵",
      description: "投資信託の手数料は年利の1%未満がおすすめ。長期ではとても大きな差に！",
      tipType: "fees"
    },
    {
      title: "収入の一部を自動積立",
      description: "給料日に自動で引き落とす設定をすると、続けやすくなります。",
      tipType: "diversification"
    }
  ];
  
  const handleGoalSet = (newGoal: number) => {
    // Ensure minimum goal of 100,000 yen
    setGoal(Math.max(100000, newGoal));
  };
  
  const handleValueUpdate = (newValue: number) => {
    setCurrentValue(newValue);
  };
  
  const handleGoalWizardComplete = (goalAmount: number, goalYears: number) => {
    setGoal(goalAmount);
    setYears(goalYears);
    setShowWizard(false);
    
    // Show welcome message
    toast({
      title: "目標設定完了！",
      description: `${goalYears}年後に${goalAmount.toLocaleString()}円を目指しましょう！`,
    });
    
    // Show learning card after a delay
    setTimeout(() => {
      setShowLearningCard(true);
    }, 3000);
    
    // For first-time users, show demo mode
    if (isNewUser) {
      setShowDemoMode(true);
      
      // Exit demo mode after 30 seconds
      setTimeout(() => {
        setShowDemoMode(false);
        setIsNewUser(false);
        toast({
          title: "デモモード終了",
          description: "これからは実際にあなたの目標で投資シミュレーションをしましょう！",
        });
      }, 30000);
    }
  };
  
  const handleRiskProfileSelected = (newAllocation: {[key: number]: number}) => {
    setAllocation(newAllocation);
  };
  
  const handleMonthlyAmountChange = (amount: number) => {
    setMonthlyAmount(amount);
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (currentValue / goal) * 100);
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Show wizard if first time */}
      {showWizard ? (
        <GoalWizard 
          onGoalSelected={(amount, years) => {
            setGoal(amount);
            setYears(years);
          }}
          onRiskProfileSelected={handleRiskProfileSelected}
          onComplete={() => handleGoalWizardComplete(goal, years)}
        />
      ) : (
        <>
          {/* Header with logo and notification bell */}
          <div className="flex justify-between items-center mb-4 p-2">
            <div className="flex items-center">
              <div className="bg-primary rounded-full p-1.5 mr-2">
                <Coins className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg">マネゴロー</span>
            </div>
            <button className="p-1.5 hover:bg-muted rounded-full">
              <Bell className="h-5 w-5" />
            </button>
          </div>
          
          {/* Goal tracking */}
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">目標額</span>
                <span className="font-medium">
                  {formatCurrency(goal)}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">現在の評価額</span>
                <span>
                  {formatCurrency(currentValue)}
                </span>
              </div>
            </CardContent>
          </Card>
          
          {showDemoMode && (
            <Card className="mb-4 bg-blue-50 border-blue-200">
              <CardContent className="py-3 px-4">
                <div className="flex items-center">
                  <div className="mr-3 bg-blue-100 p-1.5 rounded-full">
                    <Coins className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">デモモード</h4>
                    <p className="text-xs text-blue-600">
                      まずは¥10,000でシミュレーション体験をしてみましょう！
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-secondary">少額でも、20年後は大きな一歩。</p>
          </div>
          
          {/* Learning Card - shown occasionally */}
          {showLearningCard && (
            <div className="mb-4">
              <LearningCard
                title={learningTips[Math.floor(Math.random() * learningTips.length)].title}
                description={learningTips[Math.floor(Math.random() * learningTips.length)].description}
                tipType={learningTips[Math.floor(Math.random() * learningTips.length)].tipType}
                onClose={() => setShowLearningCard(false)}
              />
            </div>
          )}
          
          {/* Main tabs */}
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="portfolio">ポートフォリオ</TabsTrigger>
              <TabsTrigger value="simulator">積立シミュレーター</TabsTrigger>
            </TabsList>
            <TabsContent value="portfolio">
              <InvestmentPortfolio 
                onValueUpdate={handleValueUpdate}
                goal={goal}
                onGoalSet={handleGoalSet}
              />
            </TabsContent>
            <TabsContent value="simulator">
              <div className="space-y-6 p-4 bg-white rounded-xl shadow-sm">
                <GoalAttainmentSlider 
                  goalAmount={goal}
                  years={years}
                  returnRate={5} // Default return rate
                  monthlyDefault={monthlyAmount}
                  onMonthlyChange={handleMonthlyAmountChange}
                />
                
                <div className="mt-6">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      // Switch to portfolio tab
                      setActiveTab("portfolio");
                      
                      // Show toast
                      toast({
                        title: "シミュレーション完了",
                        description: "ポートフォリオを確認してみましょう！",
                      });
                      
                      // Show learning card after a delay
                      setTimeout(() => {
                        setShowLearningCard(true);
                      }, 2000);
                    }}
                  >
                    ポートフォリオを見てみる
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Daily Challenge */}
          <Card className="mt-4 border-l-4 border-l-accent">
            <CardContent className="py-3">
              <div className="flex items-center">
                <div className="mr-3 bg-accent/20 p-1.5 rounded-full">
                  <Coins className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">今日のチャレンジ</h4>
                  <p className="text-xs text-muted-foreground">積立額を +¥500 増やしてみましょう！</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default InvestmentSimulation;
