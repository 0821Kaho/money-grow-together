
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import MascotTooltip from "@/components/mascot/MascotTooltip";
import EmotionColorThermometer from "./investment/EmotionColorThermometer";
import { Coins, Landmark, Briefcase, ChartPie, TrendingUp, Building, Bitcoin } from "lucide-react";

// Define investment options
const investments = [
  {
    id: 1,
    name: "現金リザーブ",
    englishName: "Cash Reserve",
    riskLevel: "極低",
    expectedReturn: 1,
    volatility: 0.5,
    cost: 10000,
    description: "いつでも使える手元資金。生存率を高める安全策。",
    icon: Coins
  },
  {
    id: 2,
    name: "国債",
    englishName: "Government Bond",
    riskLevel: "低",
    expectedReturn: 2,
    volatility: 1,
    cost: 30000,
    description: "国家保証の安定収益。長期サバイバルの土台に。",
    icon: Landmark
  },
  {
    id: 3,
    name: "社債",
    englishName: "Corporate Bond",
    riskLevel: "中低",
    expectedReturn: 4,
    volatility: 5,
    cost: 50000,
    description: "企業収益に連動した利息。ややリスクを取る選択肢。",
    icon: Briefcase
  },
  {
    id: 4,
    name: "ETF",
    englishName: "Exchange Traded Fund",
    riskLevel: "中",
    expectedReturn: 7,
    volatility: 10,
    cost: 70000,
    description: "分散投資でリスク軽減。中期的な生存戦略に最適。",
    icon: ChartPie
  },
  {
    id: 5,
    name: "個別株",
    englishName: "Equity",
    riskLevel: "高",
    expectedReturn: 12,
    volatility: 25,
    cost: 100000,
    description: "大きな成長ポテンシャルだが、致命的損失リスクも併せ持つ。",
    icon: TrendingUp
  },
  {
    id: 6,
    name: "不動産投資信託",
    englishName: "REIT",
    riskLevel: "中",
    expectedReturn: 5,
    volatility: 8,
    cost: 60000,
    description: "家賃収入イメージの安定したインカムゲイン。",
    icon: Building
  },
  {
    id: 7,
    name: "暗号資産",
    englishName: "Crypto",
    riskLevel: "超高",
    expectedReturn: 20,
    volatility: 50,
    cost: 200000,
    description: "短期勝負向きのハイリスク・ハイリターン。生存か絶望か紙一重。",
    icon: Bitcoin
  }
];

// Define market event types
const marketEvents = [
  {
    id: 1,
    name: "好景気",
    impact: { 1: 0.005, 2: 0.01, 3: 0.02, 4: 0.05, 5: 0.1, 6: 0.03, 7: 0.2 },
  },
  {
    id: 2,
    name: "不況",
    impact: { 1: 0.001, 2: -0.005, 3: -0.02, 4: -0.02, 5: -0.07, 6: -0.015, 7: -0.15 },
  },
  {
    id: 3,
    name: "パンデミック",
    impact: { 1: 0.002, 2: 0.005, 3: -0.03, 4: -0.1, 5: -0.25, 6: -0.1, 7: -0.4 },
  },
  {
    id: 4,
    name: "技術革新",
    impact: { 1: 0, 2: 0.001, 3: 0.01, 4: 0.04, 5: 0.15, 6: 0.02, 7: 0.25 },
  },
];

const InvestmentPlantGarden = ({ initialGoal = 1000000 }: { initialGoal?: number }) => {
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<number | null>(null);
  const [balance, setBalance] = useState(1000000);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [totalValue, setTotalValue] = useState(1000000);
  const [investmentReturns, setInvestmentReturns] = useState<{ [key: number]: number }>({});
  const [marketEvent, setMarketEvent] = useState<any>(null);
  const [showEventMessage, setShowEventMessage] = useState(false);
  const [goal, setGoal] = useState(initialGoal);
  const [investmentAllocations, setInvestmentAllocations] = useState<{ [key: number]: number }>({});

  // Calculate total return percentage
  const totalReturnAmount = totalValue - balance - investedAmount;
  const totalReturnPercentage = investedAmount > 0 ? (totalReturnAmount / investedAmount) * 100 : 0;

  useEffect(() => {
    // Simulate monthly investment returns
    const intervalId = setInterval(() => {
      setInvestmentReturns((prevReturns) => {
        const newReturns: { [key: number]: number } = {};
        let totalReturnValue = 0;

        investments.forEach((investment) => {
          const investmentId = investment.id;
          const currentReturn = prevReturns[investmentId] || 0;
          const allocation = investmentAllocations[investmentId] || 0;
          let newReturn = currentReturn;

          if (allocation > 0) {
            // Apply expected return (monthly)
            newReturn += investment.expectedReturn / 12;

            // Apply market event impact
            if (marketEvent) {
              newReturn += investment.expectedReturn * marketEvent.impact[investmentId];
            }

            // Add some randomness based on volatility
            const randomFactor = (Math.random() - 0.5) * (investment.volatility / 100);
            newReturn += randomFactor * investment.expectedReturn;
          }

          newReturns[investmentId] = newReturn;
          totalReturnValue += (newReturn / 100) * allocation;
        });

        // Update total value
        setTotalValue((prevTotalValue) => {
          const newValue = balance + investedAmount + totalReturnValue;
          return Math.max(0, newValue); // Prevent negative total value
        });

        return newReturns;
      });
    }, 3000);

    // Simulate random market events
    const eventIntervalId = setInterval(() => {
      const randomEvent =
        marketEvents[Math.floor(Math.random() * marketEvents.length)];
      setMarketEvent(randomEvent);
      setShowEventMessage(true);

      // Hide event message after 5 seconds
      setTimeout(() => {
        setShowEventMessage(false);
      }, 5000);
    }, 15000);

    return () => {
      clearInterval(intervalId);
      clearInterval(eventIntervalId);
    };
  }, [investedAmount, marketEvent, balance, investmentAllocations]);

  const handleInvestmentSelect = (investmentId: number) => {
    setSelectedInvestmentId(investmentId);
  };

  const handleInvest = () => {
    if (!selectedInvestmentId) {
      toast({
        title: "投資先を選んでください",
        description: "投資カードをクリックして選択してください",
      });
      return;
    }

    const selectedInvestment = investments.find((investment) => investment.id === selectedInvestmentId);

    if (!selectedInvestment) {
      toast({
        title: "エラー",
        description: "選択した投資先が見つかりませんでした",
      });
      return;
    }

    if (balance < selectedInvestment.cost) {
      toast({
        title: "残高が足りません",
        description: "もっとコインを集めてから投資しましょう",
      });
      return;
    }

    // Update balance and invested amount
    setBalance((prevBalance) => prevBalance - selectedInvestment.cost);
    setInvestedAmount((prevInvestedAmount) => prevInvestedAmount + selectedInvestment.cost);
    
    // Update investment allocations
    setInvestmentAllocations((prevAllocations) => ({
      ...prevAllocations,
      [selectedInvestmentId]: (prevAllocations[selectedInvestmentId] || 0) + selectedInvestment.cost
    }));

    toast({
      title: `${selectedInvestment.name}に投資しました！`,
      description: `${selectedInvestment.cost.toLocaleString()}円を${selectedInvestment.name}に投資しました`,
    });
  };

  // Calculate progress towards goal
  const progress = Math.min(100, (totalValue / goal) * 100);

  // Render component
  return (
    <div className="space-y-6">
      {/* Header and Intro */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">投資の実験場</h2>
        <p className="text-gray-600 mb-4">
          様々な投資先を試して、資産を増やしましょう！
        </p>
        <p className="text-gray-600">
          目標金額まで:{" "}
          {new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "JPY",
            maximumFractionDigits: 0,
          }).format(Math.max(0, goal - totalValue))}
        </p>
        <Progress value={progress} className="mt-2" />
      </div>

      {/* Survival and Morale Meters */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-1">生存メーター（残資金）</h3>
            <p className="text-xl font-bold">
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
                maximumFractionDigits: 0,
              }).format(balance)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-1">士気メーター（累積リターン）</h3>
            <p className={`text-xl font-bold ${totalReturnAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalReturnAmount >= 0 ? "+" : ""}
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
                maximumFractionDigits: 0,
              }).format(totalReturnAmount)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Investment Selection Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {investments.map((investment) => {
          const InvestmentIcon = investment.icon;
          const allocation = investmentAllocations[investment.id] || 0;
          const isSelected = selectedInvestmentId === investment.id;
          const returnValue = investmentReturns[investment.id] || 0;
          
          return (
            <Card
              key={investment.id}
              className={`relative overflow-hidden transition-all ${
                isSelected
                  ? "border-2 border-primary shadow-md"
                  : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full ${allocation > 0 ? 'bg-purple-100' : 'bg-gray-100'}`}>
                      <InvestmentIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{investment.name}</h3>
                      <p className="text-xs text-muted-foreground">{investment.englishName}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    investment.riskLevel === "極低" ? "bg-blue-50 text-blue-700" :
                    investment.riskLevel === "低" ? "bg-green-50 text-green-700" :
                    investment.riskLevel === "中低" ? "bg-teal-50 text-teal-700" :
                    investment.riskLevel === "中" ? "bg-yellow-50 text-yellow-700" :
                    investment.riskLevel === "高" ? "bg-orange-50 text-orange-700" :
                    "bg-red-50 text-red-700"
                  }`}>
                    {investment.riskLevel}リスク
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  {investment.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">期待リターン</p>
                    <p className="font-medium text-green-600">
                      +{investment.expectedReturn}%
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">変動幅</p>
                    <p className="font-medium">{investment.volatility}%</p>
                  </div>
                  
                  {/* Emotion Color Thermometer */}
                  {allocation > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">現在のリターン</p>
                      <EmotionColorThermometer 
                        value={returnValue}
                        height="h-16"
                      />
                    </div>
                  )}
                </div>

                {allocation > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground">投資額</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                        maximumFractionDigits: 0,
                      }).format(allocation)}
                    </p>
                  </div>
                )}

                <Button
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handleInvestmentSelect(investment.id)}
                  className="w-full"
                >
                  {isSelected ? "選択中" : "選択"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Investment Actions */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <MascotCharacter size="small" />
          <div>
            <p className="text-sm text-gray-600">現在の残高:</p>
            <p className="text-lg font-semibold">
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
                maximumFractionDigits: 0,
              }).format(balance)}
            </p>
          </div>
        </div>
        <Button onClick={handleInvest}>投資する</Button>
      </div>

      {/* Market Events */}
      {showEventMessage && marketEvent && (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.214-1.36 2.979 0l8.982 15.903a1.5 1.5 0 01-1.301 2.411H1.52c-1.121 0-2.1-.799-2.1-1.911L8.257 3.099zM6.99 7.5a1 1 0 112 0 1 1 0 01-2 0zM9 13a1 1 0 102 0 1 1 0 00-2 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                市場イベント発生: {marketEvent.name}
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {marketEvent.name}が発生しました。各投資のリターンに影響があります。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Results section with larger thermometer */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">現在の成果</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">総資産:</span>
            <span className="font-semibold">
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
                maximumFractionDigits: 0,
              }).format(totalValue)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-4">
          <EmotionColorThermometer 
            value={totalReturnPercentage}
            height="h-32"
            className="mx-8"
          />
        </div>
        
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-muted-foreground">投資した金額</p>
            <p className="font-semibold">
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
                maximumFractionDigits: 0,
              }).format(investedAmount)}
            </p>
          </div>
          
          <div>
            <p className="text-muted-foreground">リターン</p>
            <p className={`font-semibold ${totalReturnAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalReturnAmount >= 0 ? "+" : ""}
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
                maximumFractionDigits: 0,
              }).format(totalReturnAmount)}
              <span className="text-xs ml-1">
                ({totalReturnPercentage >= 0 ? "+" : ""}
                {totalReturnPercentage.toFixed(1)}%)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Mascot Tips */}
      <div className="flex items-center justify-center">
        <MascotTooltip
          messages={[
            "分散投資はリスクを減らす効果があります。",
            "市場の動向に注意しましょう。",
            "長期的な視点で投資を考えましょう。",
            "リスクが高いほど、リターンも高くなる傾向があります。",
            "現金リザーブは緊急時に備えて大事です。",
          ]}
          position="bottom"
          characterSize="small"
        />
      </div>
    </div>
  );
};

export default InvestmentPlantGarden;
