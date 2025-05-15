import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import MascotTooltip from "@/components/mascot/MascotTooltip";
import EmotionColorThermometer from "./investment/EmotionColorThermometer";

// Define plant types
const plants = [
  {
    id: 1,
    name: "国債",
    riskLevel: "低",
    expectedReturn: 2,
    volatility: 1,
    cost: 10000,
  },
  {
    id: 2,
    name: "ETF",
    riskLevel: "中",
    expectedReturn: 7,
    volatility: 10,
    cost: 50000,
  },
  {
    id: 3,
    name: "個別株",
    riskLevel: "高",
    expectedReturn: 15,
    volatility: 25,
    cost: 200000,
  },
];

// Define market event types
const marketEvents = [
  {
    id: 1,
    name: "好景気",
    impact: { 1: 0.01, 2: 0.05, 3: 0.1 },
  },
  {
    id: 2,
    name: "不況",
    impact: { 1: -0.005, 2: -0.02, 3: -0.07 },
  },
  {
    id: 3,
    name: "パンデミック",
    impact: { 1: -0.001, 2: -0.1, 3: -0.25 },
  },
];

const InvestmentPlantGarden = ({ initialGoal = 1000000 }: { initialGoal?: number }) => {
  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);
  const [balance, setBalance] = useState(1000000);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [totalValue, setTotalValue] = useState(1000000);
  const [plantReturns, setPlantReturns] = useState<{ [key: number]: number }>({});
  const [marketEvent, setMarketEvent] = useState<any>(null);
  const [showEventMessage, setShowEventMessage] = useState(false);
  const [goal, setGoal] = useState(initialGoal);

  // Calculate total return percentage
  const totalReturnAmount = totalValue - investedAmount;
  const totalReturnPercentage = (totalReturnAmount / investedAmount) * 100 || 0;

  useEffect(() => {
    // Simulate monthly investment returns
    const intervalId = setInterval(() => {
      setPlantReturns((prevReturns) => {
        const newReturns: { [key: number]: number } = {};
        let totalReturnValue = 0;

        plants.forEach((plant) => {
          const plantId = plant.id;
          const currentReturn = prevReturns[plantId] || 0;
          let newReturn = currentReturn;

          // Apply expected return
          newReturn += plant.expectedReturn / 12;

          // Apply market event impact
          if (marketEvent) {
            newReturn += plant.expectedReturn * marketEvent.impact[plantId];
          }

          newReturns[plantId] = newReturn;
          totalReturnValue += newReturn;
        });

        // Update total value
        setTotalValue((prevTotalValue) => {
          const newValue = prevTotalValue + (totalReturnValue / 100) * investedAmount;
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
  }, [investedAmount, marketEvent]);

  const handlePlantSelect = (plantId: number) => {
    setSelectedPlantId(plantId);
  };

  const handleInvest = () => {
    if (!selectedPlantId) {
      toast({
        title: "投資する植物を選んでください",
        description: "植物カードをクリックして選択してください",
      });
      return;
    }

    const selectedPlant = plants.find((plant) => plant.id === selectedPlantId);

    if (!selectedPlant) {
      toast({
        title: "エラー",
        description: "選択した植物が見つかりませんでした",
      });
      return;
    }

    if (balance < selectedPlant.cost) {
      toast({
        title: "残高が足りません",
        description: "もっとコインを集めてから投資しましょう",
      });
      return;
    }

    setBalance((prevBalance) => prevBalance - selectedPlant.cost);
    setInvestedAmount((prevInvestedAmount) => prevInvestedAmount + selectedPlant.cost);
    setTotalValue((prevTotalValue) => prevTotalValue + selectedPlant.cost);

    toast({
      title: `${selectedPlant.name}に投資しました！`,
      description: `魔法の庭で${selectedPlant.name}が育つのを見守りましょう`,
    });
  };

  // Calculate progress towards goal
  const progress = Math.min(100, (totalValue / goal) * 100);

  // Render component
  return (
    <div className="space-y-6">
      {/* Header and Intro */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">魔法の植物園</h2>
        <p className="text-gray-600 mb-4">
          植物を育てて、資産を増やしましょう！
        </p>
        <p className="text-gray-600">
          目標金額まで:{" "}
          {new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "JPY",
            maximumFractionDigits: 0,
          }).format(goal - totalValue)}
        </p>
        <Progress value={progress} className="mt-2" />
      </div>

      {/* Plant Selection Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plants.map((plant) => (
          <Card
            key={plant.id}
            className={`relative overflow-hidden transition-all ${
              selectedPlantId === plant.id
                ? "border-2 border-primary shadow-md"
                : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-semibold text-lg">{plant.name}</h3>
                <span className="text-sm text-muted-foreground">
                  {plant.riskLevel}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">期待リターン</p>
                  <p className="font-medium">
                    {plant.expectedReturn > 0 ? "+" : ""}
                    {plant.expectedReturn}%
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground mb-1">変動幅</p>
                  <p className="font-medium">{plant.volatility}%</p>
                </div>
                
                {/* New Emotion Color Thermometer */}
                <EmotionColorThermometer 
                  value={plantReturns[plant.id] || 0}
                  height="h-16"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => handlePlantSelect(plant.id)}
                className="w-full"
              >
                {selectedPlantId === plant.id ? "選択中" : "選択"}
              </Button>
            </CardContent>
          </Card>
        ))}
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
                  {marketEvent.name}が発生しました。
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
          ]}
          position="bottom"
          characterSize="small"
        />
      </div>
    </div>
  );
};

export default InvestmentPlantGarden;
