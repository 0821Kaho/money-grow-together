import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartLine, Flower, TreeDeciduous, TreePalm } from "lucide-react";

interface Plant {
  id: string;
  name: string;
  growthRate: number;
  risk: number;
  initialCost: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const plants: Plant[] = [
  {
    id: "savings",
    name: "預金の種",
    growthRate: 0.001, // 0.1% per month
    risk: 0,
    initialCost: 1000,
    description: "安全だけど成長はゆっくり。元本割れの心配はありません。",
    icon: <TreePalm className="h-6 w-6" />,
    color: "#4DAA57",
  },
  {
    id: "bonds",
    name: "債券の苗",
    growthRate: 0.003, // 0.3% per month
    risk: 0.1,
    initialCost: 5000,
    description: "ほどほどの成長率で比較的安全。少しのリスクがあります。",
    icon: <TreeDeciduous className="h-6 w-6" />,
    color: "#60B8D4",
  },
  {
    id: "stocks",
    name: "株式の木",
    growthRate: 0.008, // 0.8% per month
    risk: 0.3,
    initialCost: 10000,
    description: "高い成長率が期待できますが、リスクも高めです。",
    icon: <Flower className="h-6 w-6" />,
    color: "#FFD166",
  },
];

interface MarketEvent {
  name: string;
  description: string;
  effects: {
    [key: string]: number; // plantId: growthModifier
  };
  icon: string;
}

const marketEvents: MarketEvent[] = [
  {
    name: "市場の好況",
    description: "経済が好調で全ての投資の成長率がアップ！",
    effects: {
      savings: 1.1, // 10% boost
      bonds: 1.2,   // 20% boost
      stocks: 1.5,  // 50% boost
    },
    icon: "🌞",
  },
  {
    name: "金利上昇",
    description: "中央銀行が金利を引き上げ。預金が有利になりました。",
    effects: {
      savings: 1.5, // 50% boost
      bonds: 0.9,   // 10% reduction
      stocks: 0.8,  // 20% reduction
    },
    icon: "📈",
  },
  {
    name: "市場の暴落",
    description: "株式市場が大幅下落。リスク資産が打撃を受けています。",
    effects: {
      savings: 1.0, // no effect
      bonds: 0.7,   // 30% reduction
      stocks: 0.4,  // 60% reduction
    },
    icon: "⚡",
  },
  {
    name: "債券市場の混乱",
    description: "債券市場で価格変動が発生しています。",
    effects: {
      savings: 1.0, // no effect
      bonds: 0.6,   // 40% reduction
      stocks: 0.9,  // 10% reduction
    },
    icon: "🌪️",
  },
  {
    name: "経済回復",
    description: "景気後退から回復し、投資が順調に成長しています。",
    effects: {
      savings: 1.05, // 5% boost
      bonds: 1.2,   // 20% boost
      stocks: 1.4,  // 40% boost
    },
    icon: "🌱",
  },
];

const InvestmentPlantGarden = () => {
  const [money, setMoney] = useState(50000);
  const [investments, setInvestments] = useState<{
    [key: string]: { amount: number; growth: number };
  }>({});
  const [monthsPassed, setMonthsPassed] = useState(0);
  const [yearsPassed, setYearsPassed] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1000); // ms per month
  const [marketEventHistory, setMarketEventHistory] = useState<Array<{event: MarketEvent, month: number}>>([]);
  const [currentEvent, setCurrentEvent] = useState<MarketEvent | null>(null);
  const [initialTotalValue, setInitialTotalValue] = useState(0);
  const [goal, setGoal] = useState(100000); // Example goal: double initial money
  const [resultMessage, setResultMessage] = useState("");
  const [badges, setBadges] = useState<Array<{name: string, icon: string}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Set initial value when investments change
    if (Object.keys(investments).length > 0 && initialTotalValue === 0) {
      setInitialTotalValue(money + calculateTotalValue());
    }
  }, [investments]);

  const buyPlant = (plant: Plant) => {
    if (money < plant.initialCost) {
      toast({
        title: "購入できません",
        description: "資金が足りません",
        variant: "destructive",
      });
      return;
    }

    setMoney((prev) => prev - plant.initialCost);
    setInvestments((prev) => {
      const current = prev[plant.id] ? prev[plant.id].amount : 0;
      return {
        ...prev,
        [plant.id]: {
          amount: current + plant.initialCost,
          growth: 1,
        },
      };
    });

    toast({
      title: `${plant.name}を購入しました`,
      description: `${plant.initialCost.toLocaleString()}円を投資しました`,
    });
  };

  const triggerMarketEvent = () => {
    if (Math.random() > 0.7) { // 30% chance of an event
      const event = marketEvents[Math.floor(Math.random() * marketEvents.length)];
      setCurrentEvent(event);
      setMarketEventHistory(prev => [...prev, {event, month: monthsPassed}]);
      
      toast({
        title: `市場イベント: ${event.name}`,
        description: event.description,
      });

      return event;
    }
    return null;
  };

  const simulateGrowth = () => {
    if (Object.keys(investments).length === 0) {
      toast({
        title: "投資がありません",
        description: "まずは投資先を選んでください",
        variant: "destructive",
      });
      return;
    }
    
    setIsSimulating(true);
    setInitialTotalValue(money + calculateTotalValue());
    
    // Run the simulation for max 10 years (120 months)
    const interval = setInterval(() => {
      setMonthsPassed((prev) => {
        const newMonths = prev + 1;
        if (newMonths % 12 === 0) {
          setYearsPassed(newMonths / 12);
        }
        
        if (newMonths >= 120) { // 10 years
          clearInterval(interval);
          setIsSimulating(false);
          checkGoalAchievement();
          return newMonths;
        }
        return newMonths;
      });
      
      // Apply market events
      const event = triggerMarketEvent();
      
      setInvestments((prev) => {
        const newInvestments = { ...prev };
        
        // Apply growth and risk to each investment
        Object.keys(newInvestments).forEach((plantId) => {
          const plant = plants.find((p) => p.id === plantId);
          if (plant) {
            // Apply random market event (risk)
            let growthModifier = 1;
            
            if (event) {
              // Apply event effect if available
              growthModifier = event.effects[plantId] || 1;
            } else {
              // Regular randomness based on risk
              const marketEvent = Math.random();
              if (marketEvent < plant.risk * 0.5) {
                // Bad month
                growthModifier = 0.9; // 10% loss
              } else if (marketEvent > 1 - plant.risk * 0.5) {
                // Good month
                growthModifier = 1.1; // 10% gain
              }
            }
            
            // Apply growth with compound interest
            newInvestments[plantId] = {
              amount: newInvestments[plantId].amount,
              growth: newInvestments[plantId].growth * (1 + plant.growthRate * growthModifier),
            };
          }
        });
        
        return newInvestments;
      });
    }, simulationSpeed);
  };

  const checkGoalAchievement = () => {
    const totalValue = money + calculateTotalValue();
    const achieved = totalValue >= goal;
    const diversified = Object.keys(investments).length >= 2;
    const years = yearsPassed;
    
    let badgeName = "";
    let badgeIcon = "";
    
    if (achieved) {
      if (years <= 3) {
        badgeName = "早期達成投資家";
        badgeIcon = "🏆";
      } else if (diversified) {
        badgeName = "賢明な投資家";
        badgeIcon = "🥇";
      } else {
        badgeName = "投資家";
        badgeIcon = "🥈";
      }
      
      setResultMessage(`目標達成！${years}年で${goal.toLocaleString()}円に到達しました！`);
      setBadges(prev => [...prev, {name: badgeName, icon: badgeIcon}]);
      
      toast({
        title: "おめでとうございます！",
        description: `新しいバッジを獲得しました：${badgeName}`,
      });
    } else {
      const shortfall = goal - totalValue;
      setResultMessage(`あと${shortfall.toLocaleString()}円足りませんでした。より早く始めるか、異なる投資戦略を試してみましょう。`);
    }
  };

  const calculateTotalValue = () => {
    return Object.keys(investments).reduce((total, plantId) => {
      return total + investments[plantId].amount * investments[plantId].growth;
    }, 0);
  };

  const resetSimulation = () => {
    setMoney(50000);
    setInvestments({});
    setMonthsPassed(0);
    setYearsPassed(0);
    setMarketEventHistory([]);
    setCurrentEvent(null);
    setInitialTotalValue(0);
    setResultMessage("");
    // Keep badges achieved
  };

  const totalValue = money + calculateTotalValue();
  const growthPercentage = initialTotalValue > 0 
    ? ((totalValue - initialTotalValue) / initialTotalValue) * 100 
    : 0;

  // Calculate progress toward goal
  const goalProgress = Math.min(100, Math.round((totalValue / goal) * 100));

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">お金の植物園</h2>
        
        {/* Overview */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">あなたの資金</p>
              <p className="text-lg font-bold">{money.toLocaleString()}円</p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">投資総額</p>
              <p className="text-lg font-bold">
                {Object.values(investments)
                  .reduce((sum, inv) => sum + inv.amount, 0)
                  .toLocaleString()}
                円
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">現在の評価額</p>
              <p className="text-lg font-bold text-game-primary">
                {Math.round(calculateTotalValue()).toLocaleString()}円
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">総資産</p>
              <p className="text-lg font-bold text-game-primary">
                {Math.round(totalValue).toLocaleString()}円
                {growthPercentage !== 0 && (
                  <span className={`ml-2 text-sm ${growthPercentage > 0 ? 'text-game-success' : 'text-game-danger'}`}>
                    {growthPercentage > 0 ? '+' : ''}{growthPercentage.toFixed(1)}%
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">経過時間</p>
              <p className="text-lg font-bold">{yearsPassed}年{monthsPassed % 12}ヶ月</p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">目標金額</p>
              <p className="text-lg font-bold">{goal.toLocaleString()}円</p>
            </div>
            
            <div className="mt-2">
              <div className="mb-1 flex justify-between">
                <span className="text-xs">進捗</span>
                <span className="text-xs">{goalProgress}%</span>
              </div>
              <Progress value={goalProgress} />
            </div>
            
            {badges.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <Badge key={idx} variant="gold" className="flex items-center gap-1">
                    <span>{badge.icon}</span> {badge.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Plants Shop */}
        <div className="mb-6">
          <h3 className="mb-3 font-medium">投資商品</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {plants.map((plant) => (
              <div
                key={plant.id}
                className="rounded-lg border border-gray-200 p-3"
                style={{ borderLeftColor: plant.color, borderLeftWidth: '4px' }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${plant.color}20` }}>
                    {plant.icon}
                  </div>
                  <h4 className="font-medium">{plant.name}</h4>
                </div>
                <p className="mb-2 text-sm text-gray-600">{plant.description}</p>
                <div className="text-xs mb-3">
                  <div className="flex items-center justify-between">
                    <span>成長率</span>
                    <span className="font-medium">{(plant.growthRate * 100).toFixed(1)}%/月</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>リスク</span>
                    <span className="font-medium">{(plant.risk * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {plant.initialCost.toLocaleString()}円
                  </span>
                  <button
                    onClick={() => buyPlant(plant)}
                    disabled={money < plant.initialCost || isSimulating}
                    className="rounded bg-game-primary px-3 py-1 text-xs font-medium text-white disabled:bg-gray-300"
                  >
                    購入
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Portfolio */}
        <div className="mb-6">
          <h3 className="mb-3 font-medium">あなたのポートフォリオ</h3>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            {Object.keys(investments).length > 0 ? (
              <div className="divide-y">
                {Object.keys(investments).map((plantId) => {
                  const plant = plants.find((p) => p.id === plantId);
                  const currentValue = Math.round(
                    investments[plantId].amount * investments[plantId].growth
                  );
                  const profit = currentValue - investments[plantId].amount;
                  const profitPercentage = Math.round(
                    ((currentValue - investments[plantId].amount) /
                      investments[plantId].amount) *
                      100
                  );
                  
                  return (
                    <div key={plantId} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="flex h-10 w-10 items-center justify-center rounded-full"
                          style={{ backgroundColor: plant ? `${plant.color}20` : '#f3f3f3' }}
                        >
                          {plant?.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{plant?.name}</h4>
                          <p className="text-xs text-gray-600">
                            元本: {investments[plantId].amount.toLocaleString()}円
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {currentValue.toLocaleString()}円
                        </p>
                        <p
                          className={`text-xs ${
                            profit >= 0
                              ? "text-game-success"
                              : "text-game-danger"
                          }`}
                        >
                          {profit >= 0 ? "+" : ""}
                          {profit.toLocaleString()}円 ({profitPercentage}%)
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                まだ投資をしていません。上の商品から購入してみましょう。
              </div>
            )}
          </div>
        </div>
        
        {/* Market Events */}
        {marketEventHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 font-medium">市場イベント履歴</h3>
            <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200">
              {marketEventHistory.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 border-b border-gray-200 p-2 last:border-0">
                  <div className="text-xl">{item.event.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.event.name}</p>
                    <p className="text-xs text-gray-600">{Math.floor(item.month / 12)}年{item.month % 12}ヶ月目</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Simulation Controls */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={simulateGrowth}
            disabled={isSimulating}
            className="game-button flex-1"
          >
            {isSimulating
              ? "シミュレーション中..."
              : yearsPassed >= 10
              ? "シミュレーション完了"
              : "成長をシミュレーション"}
          </button>
          <button
            onClick={resetSimulation}
            className="flex-1 rounded-full border border-gray-300 px-6 py-3 font-medium transition-all hover:bg-gray-50 active:scale-95"
          >
            リセット
          </button>
        </div>
        
        {/* Result Message */}
        {resultMessage && (
          <div className="mt-4 rounded-lg bg-gray-50 p-4 text-center">
            <p className="font-medium">{resultMessage}</p>
          </div>
        )}
      </div>
      
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <ChartLine className="h-6 w-6 text-game-primary" />
          <h2 className="text-xl font-bold">投資の知識</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 font-medium">複利の力</h3>
            <p className="text-sm text-gray-600">
              複利とは、元本だけでなく過去の利益に対しても利息がつく仕組みです。
              長期間にわたって複利を活用すると、わずかな違いが大きな差になります。
              例えば、年利5%の場合、約14.4年で投資額が2倍になります（72の法則）。
            </p>
          </div>
          
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 font-medium">リスク分散の重要性</h3>
            <p className="text-sm text-gray-600">
              全てのお金を一つの商品に投資すると、そのリスクに全額がさらされます。
              異なるタイプの商品に分散投資することで、リスクを減らし、安定したリターンが期待できます。
              株式だけでなく、債券や預金などバランスよく保有しましょう。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlantGarden;
