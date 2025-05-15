
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Plant {
  id: string;
  name: string;
  growthRate: number;
  risk: number;
  initialCost: number;
  description: string;
  icon: string;
}

const plants: Plant[] = [
  {
    id: "savings",
    name: "定期預金の種",
    growthRate: 0.001,
    risk: 0,
    initialCost: 1000,
    description: "安全だけど成長はゆっくり。元本割れの心配はありません。",
    icon: "🌱",
  },
  {
    id: "bonds",
    name: "債券の苗",
    growthRate: 0.002,
    risk: 0.1,
    initialCost: 5000,
    description: "ほどほどの成長率で比較的安全。少しのリスクがあります。",
    icon: "🌿",
  },
  {
    id: "stocks",
    name: "株式の木",
    growthRate: 0.005,
    risk: 0.3,
    initialCost: 10000,
    description: "高い成長率が期待できますが、リスクも高めです。",
    icon: "🌳",
  },
];

const InvestmentSimulation = () => {
  const [money, setMoney] = useState(50000);
  const [investments, setInvestments] = useState<{
    [key: string]: { amount: number; growth: number };
  }>({});
  const [yearsPassed, setYearsPassed] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

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

  const simulateGrowth = () => {
    setIsSimulating(true);
    
    // Run the simulation for 10 years
    const interval = setInterval(() => {
      setYearsPassed((prev) => {
        if (prev >= 10) {
          clearInterval(interval);
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
      
      setInvestments((prev) => {
        const newInvestments = { ...prev };
        
        // Apply growth and risk to each investment
        Object.keys(newInvestments).forEach((plantId) => {
          const plant = plants.find((p) => p.id === plantId);
          if (plant) {
            // Apply random market event (risk)
            const marketEvent = Math.random();
            let growthModifier = 1;
            
            if (marketEvent < plant.risk * 0.5) {
              // Bad event
              growthModifier = 0.8; // 20% loss
            } else if (marketEvent > 1 - plant.risk * 0.5) {
              // Good event
              growthModifier = 1.2; // 20% gain
            }
            
            // Apply growth
            newInvestments[plantId] = {
              amount: newInvestments[plantId].amount,
              growth:
                newInvestments[plantId].growth *
                (1 + plant.growthRate * growthModifier * 12), // Monthly compounding
            };
          }
        });
        
        return newInvestments;
      });
    }, 1000);
  };

  const calculateTotalValue = () => {
    return Object.keys(investments).reduce((total, plantId) => {
      return total + investments[plantId].amount * investments[plantId].growth;
    }, 0);
  };

  const resetSimulation = () => {
    setMoney(50000);
    setInvestments({});
    setYearsPassed(0);
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">お金の植物園</h2>
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-50 p-4">
        <div>
          <p className="text-sm text-gray-600">あなたの資金</p>
          <p className="text-lg font-bold">{money.toLocaleString()}円</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">投資総額</p>
          <p className="text-lg font-bold">
            {Object.values(investments)
              .reduce((sum, inv) => sum + inv.amount, 0)
              .toLocaleString()}
            円
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">現在の価値</p>
          <p className="text-lg font-bold text-game-primary">
            {Math.round(calculateTotalValue()).toLocaleString()}円
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">経過年数</p>
          <p className="text-lg font-bold">{yearsPassed}年</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="mb-3 font-medium">投資商品</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="rounded-lg border border-gray-200 p-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="text-2xl">{plant.icon}</div>
                <h4 className="font-medium">{plant.name}</h4>
              </div>
              <p className="mb-2 text-sm text-gray-600">{plant.description}</p>
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
      
      <div className="mb-6">
        <h3 className="mb-3 font-medium">あなたの投資</h3>
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
                      <div className="text-2xl">{plant?.icon}</div>
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
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={simulateGrowth}
          disabled={
            Object.keys(investments).length === 0 ||
            isSimulating ||
            yearsPassed >= 10
          }
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
    </div>
  );
};

export default InvestmentSimulation;
