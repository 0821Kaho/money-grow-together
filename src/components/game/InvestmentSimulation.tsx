import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import InvestmentPortfolio from "./investment/InvestmentPortfolio";
import InvestmentCalculator from "./investment/InvestmentCalculator";
import { Progress } from "@/components/ui/progress";
import { Bell, Coins, FastForward, Award, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GoalWizard from "./investment/GoalWizard";
import GoalAttainmentSlider from "./investment/GoalAttainmentSlider";
import LearningCard from "./investment/LearningCard";
import { Button } from "@/components/ui/button";
import TimelineProjectionChart from "./investment/TimelineProjectionChart";
import InvestmentResults from "./investment/InvestmentResults";
import { Badge } from "@/components/ui/badge";
import { useInvestmentGameStore } from "@/stores/investmentGameStore";

// Define asset classes
const assetClasses = [
  {
    id: 1,
    name: "預金セーフ",
    riskLevel: "低",
    expectedReturn: 1,
    volatility: 0.5,
    description: "低リスク・低リターンの安全資産。元本割れの心配が少ない。",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 101 },
      { year: '2021', value: 102 },
      { year: '2022', value: 103 },
      { year: '2023', value: 104 }
    ],
    color: "#4CAF50",
    nisaCategory: "対象外"
  },
  {
    id: 2,
    name: "債券バランス",
    riskLevel: "中",
    expectedReturn: 3,
    volatility: 5,
    description: "国債や社債を中心とした中リスク・中リターンの安定資産。",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 104 },
      { year: '2021', value: 101 },
      { year: '2022', value: 106 },
      { year: '2023', value: 109 }
    ],
    color: "#2196F3",
    nisaCategory: "つみたて枠"
  },
  {
    id: 3,
    name: "株式グロース",
    riskLevel: "高",
    expectedReturn: 8,
    volatility: 15,
    description: "世界中の株式に投資する高リスク・高リターンの成長資産。",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 90 },
      { year: '2021', value: 115 },
      { year: '2022', value: 105 },
      { year: '2023', value: 120 }
    ],
    color: "#E9546B",
    nisaCategory: "成長投資枠"
  },
  // 新規追加の資産クラス
  {
    id: 4,
    name: "国内債券セーフ",
    riskLevel: "低",
    expectedReturn: 1.5,
    volatility: 1,
    description: "値動き小さく「守り」を固める",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 101 },
      { year: '2021', value: 102.5 },
      { year: '2022', value: 101.8 },
      { year: '2023', value: 103 }
    ],
    color: "#4CAF50", // 低リスク：緑
    nisaCategory: "つみたて枠"
  },
  {
    id: 5,
    name: "先進国株インデックス",
    riskLevel: "中",
    expectedReturn: 5,
    volatility: 8,
    description: "世界経済の平均点を狙う王道",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 95 },
      { year: '2021', value: 110 },
      { year: '2022', value: 108 },
      { year: '2023', value: 115 }
    ],
    color: "#2196F3", // 中リスク：青
    nisaCategory: "つみたて枠"
  },
  {
    id: 6,
    name: "新興国株インデックス",
    riskLevel: "高",
    expectedReturn: 7,
    volatility: 12,
    description: "成長余地大きい「伸びしろ」",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 85 },
      { year: '2021', value: 120 },
      { year: '2022', value: 110 },
      { year: '2023', value: 125 }
    ],
    color: "#E9546B", // 高リスク：赤
    nisaCategory: "成長投資枠"
  },
  {
    id: 7,
    name: "国内REIT",
    riskLevel: "中",
    expectedReturn: 4,
    volatility: 6,
    description: "賃料収入で配当が狙える資産",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 90 },
      { year: '2021', value: 105 },
      { year: '2022', value: 102 },
      { year: '2023', value: 108 }
    ],
    color: "#2196F3", // 中リスク：青
    nisaCategory: "成長投資枠"
  },
  {
    id: 8,
    name: "ゴールド & コモディティ",
    riskLevel: "中",
    expectedReturn: 3,
    volatility: 7,
    description: "物価上昇に強い「保険」役",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 105 },
      { year: '2021', value: 102 },
      { year: '2022', value: 110 },
      { year: '2023', value: 108 }
    ],
    color: "#2196F3", // 中リスク：青
    nisaCategory: "成長投資枠"
  },
  {
    id: 9,
    name: "仮想通貨ミックス",
    riskLevel: "超高",
    expectedReturn: 15,
    volatility: 25,
    description: "ハイリスク・ハイリターンの新興資産",
    chartData: [
      { year: '2019', value: 100 },
      { year: '2020', value: 150 },
      { year: '2021', value: 300 },
      { year: '2022', value: 120 },
      { year: '2023', value: 180 }
    ],
    color: "#9C27B0", // 超高リスク：紫
    nisaCategory: "NISA対象外"
  }
];

// Define a type for the allocation
interface Allocation {
  [key: number]: number;
}

const InvestmentSimulation = () => {
  // Zustand store for Week progress tracking
  const { completedWeeks, totalMoney } = useInvestmentGameStore();
  
  // State
  const [goal, setGoal] = useState(1000000); // Default to 1,000,000 yen (1 million)
  const [currentValue, setCurrentValue] = useState(300000); // Default to 300,000 yen
  const [years, setYears] = useState(10); // Default to 10 years
  const [showWizard, setShowWizard] = useState(true); // Start with wizard
  const [allocation, setAllocation] = useState<Allocation>({ 
    1: 20, 2: 20, 3: 10, 
    4: 10, 5: 20, 6: 5, 
    7: 10, 8: 5, 9: 0 
  }); // Updated default allocation
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState(30000); // Default monthly amount
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isNewUser, setIsNewUser] = useState(true); // Track if this is first time use
  const [showDemoMode, setShowDemoMode] = useState(false); // Demo mode for first-time users
  const [selectedAssetId, setSelectedAssetId] = useState<number | undefined>(undefined);
  const [wizardComplete, setWizardComplete] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [streakDays, setStreakDays] = useState(1);
  const [salary, setSalary] = useState(300000); // Default monthly salary
  
  // Learning tips
  const learningTips = [
    {
      title: "NISAを活用しよう！",
      description: "NISAは投資の利益が非課税になる制度です。年間120万円まで投資できます。",
      tipType: "nisa" as const
    },
    {
      title: "複利効果を活かそう",
      description: "早く始めるほど時間の力で資産が大きく育ちます。10年で約2倍になることも！",
      tipType: "compound" as const
    },
    {
      title: "手数料は大敵",
      description: "投資信託の手数料は年利の1%未満がおすすめ。長期ではとても大きな差に！",
      tipType: "fees" as const
    },
    {
      title: "収入の一部を自動積立",
      description: "給料日に自動で引き落とす設定をすると、続けやすくなります。",
      tipType: "diversification" as const
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
    setWizardComplete(true);
    
    // Show welcome message
    toast({
      title: "目標設定完了！",
      description: `${goalYears}年後に${goalAmount.toLocaleString()}円を目指しましょう！`,
    });
    
    // Show learning card after a delay
    setTimeout(() => {
      setShowLearningCard(true);
    }, 3000);
  };
  
  const handleRiskProfileSelected = (newAllocation: Allocation) => {
    setAllocation(newAllocation);
  };
  
  const handleMonthlyAmountChange = (amount: number) => {
    setMonthlyAmount(amount);
  };

  const handleSalaryChange = (amount: number) => {
    setSalary(amount);
  };
  
  const handleAssetSelected = (assetId: number) => {
    setSelectedAssetId(assetId === selectedAssetId ? undefined : assetId);
  };
  
  const handleSetupComplete = () => {
    setShowWizard(false);
    setUserLevel(prev => prev + 1);
    
    toast({
      title: "レベルアップ！",
      description: `投資の達人Lv${userLevel + 1}になりました！`,
    });
  };
  
  const handleResetWizard = () => {
    setWizardComplete(false);
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
  
  // Get a random learning tip
  const getRandomTip = () => {
    return learningTips[Math.floor(Math.random() * learningTips.length)];
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Show wizard if first time */}
      {showWizard ? (
        <>
          {!wizardComplete ? (
            <GoalWizard 
              onGoalSelected={(amount, years) => {
                setGoal(amount);
                setYears(years);
              }}
              onRiskProfileSelected={handleRiskProfileSelected}
              onComplete={() => handleGoalWizardComplete(goal, years)}
            />
          ) : (
            <InvestmentResults
              goal={goal}
              years={years}
              currentValue={currentValue}
              monthlyAmount={monthlyAmount}
              allocation={allocation}
              assetClasses={assetClasses}
              selectedAssetId={selectedAssetId}
              onSetupComplete={handleSetupComplete}
              onGoalChange={handleResetWizard}
              onGoalAmountChange={handleGoalSet}
            />
          )}
        </>
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
            <div className="flex items-center gap-2">
              <Badge variant="silver" className="flex items-center gap-1">
                <Flame className="h-3 w-3" />
                <span>{streakDays}日連続</span>
              </Badge>
              <Badge variant="gold" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>Lv{userLevel}</span>
              </Badge>
              <button className="p-1.5 hover:bg-muted rounded-full">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Week Progress Bar */}
          <Card className="mb-4">
            <CardContent className="py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">学習進捗</span>
                <span className="text-xs text-muted-foreground">
                  {completedWeeks.length}/3 Week完了
                </span>
              </div>
              <Progress value={(completedWeeks.length / 3) * 100} className="h-2 mb-3" />
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-1 rounded ${completedWeeks.includes(1) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  Week1: 基礎
                </span>
                <span className={`px-2 py-1 rounded ${completedWeeks.includes(2) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  Week2: 複利
                </span>
                <span className={`px-2 py-1 rounded ${completedWeeks.includes(3) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  Week3: 分散
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Week1 Tutorial Link */}
          <Card className="mb-4 border-l-4 border-l-pigipe-primary">
            <CardContent className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 bg-pigipe-secondary p-2 rounded-full">
                    <span className="text-xl">🐷</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">投資チュートリアル</h4>
                    <p className="text-xs text-muted-foreground">貯金と投資の違いをピギペと一緒に学ぼう！</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/game/investment/week1', '_blank')}
                  className="text-pigipe-primary border-pigipe-primary hover:bg-pigipe-secondary"
                >
                  Week1 スタート
                </Button>
              </div>
            </CardContent>
          </Card>
          
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
          
          {/* Learning Card - shown occasionally */}
          {showLearningCard && (
            <div className="mb-4">
              <LearningCard
                title={getRandomTip().title}
                description={getRandomTip().description}
                tipType={getRandomTip().tipType}
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
                onAssetSelected={handleAssetSelected}
              />
              
              {/* Add the future timeline projection chart */}
              <TimelineProjectionChart
                initialAmount={currentValue}
                monthlyContribution={monthlyAmount}
                allocation={allocation}
                assetClasses={assetClasses}
                selectedAssetId={selectedAssetId}
                animated={true}
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
                  salary={salary}
                  onSalaryChange={handleSalaryChange}
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
                  <p className="text-xs text-muted-foreground">コンビニコーヒーを1回減らして¥150貯めよう！</p>
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
