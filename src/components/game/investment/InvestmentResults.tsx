import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import TimelineProjectionChart from "./TimelineProjectionChart";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface InvestmentResultsProps {
  goal: number;
  years: number;
  currentValue: number;
  monthlyAmount: number;
  allocation: { [key: number]: number };
  assetClasses: any[];
  selectedAssetId?: number;
  onSetupComplete: () => void;
  onGoalChange: () => void;
  onGoalAmountChange?: (amount: number) => void;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', { 
    style: 'currency', 
    currency: 'JPY',
    maximumFractionDigits: 0
  }).format(amount);
};

const InvestmentResults = ({ 
  goal,
  years,
  currentValue,
  monthlyAmount,
  allocation,
  assetClasses,
  selectedAssetId,
  onSetupComplete,
  onGoalChange,
  onGoalAmountChange
}: InvestmentResultsProps) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoalAmount, setNewGoalAmount] = useState(goal);
  
  // Calculate future value using compound interest formula
  const calculateFutureValue = (monthly: number, rate: number, years: number): number => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    const futureValue = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    return Math.round(futureValue);
  };

  // Calculate weighted average return based on allocation
  const calculateWeightedReturn = () => {
    let weightedReturn = 0;
    let totalWeight = 0;
    
    Object.entries(allocation).forEach(([assetId, percentage]) => {
      const asset = assetClasses.find(a => a.id === Number(assetId));
      if (asset) {
        weightedReturn += asset.expectedReturn * percentage;
        totalWeight += percentage;
      }
    });
    
    return totalWeight > 0 ? weightedReturn / totalWeight : 0;
  };
  
  const avgReturn = calculateWeightedReturn();
  const futureValue = calculateFutureValue(monthlyAmount, avgReturn, years);
  const achievementRate = Math.min(100, Math.round((futureValue / goal) * 100));
  
  const handleContinue = () => {
    toast({
      title: "自動積立を設定しました",
      description: `毎月${formatCurrency(monthlyAmount)}を積み立てていきます`,
    });
    onSetupComplete();
  };

  // Get risk color based on risk level
  const getRiskColor = (assetId: number) => {
    const asset = assetClasses.find(a => a.id === Number(assetId));
    if (!asset) return "bg-gray-500";
    
    switch (asset.riskLevel) {
      case "低": return "bg-green-500";
      case "中": return "bg-blue-500";
      case "高": return "bg-red-500";
      case "超高": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const handleGoalChange = () => {
    if (isEditingGoal) {
      // Save the new goal amount if it's valid
      if (newGoalAmount >= 100000 && newGoalAmount <= 100000000) {
        if (onGoalAmountChange) {
          onGoalAmountChange(newGoalAmount);
        }
        toast({
          title: "目標更新",
          description: `目標金額を${formatCurrency(newGoalAmount)}に更新しました`,
        });
      }
      setIsEditingGoal(false);
    } else {
      setIsEditingGoal(true);
    }
  };

  const handleSliderChange = (value: number[]) => {
    // Slider range: Min 100,000 to Max 10,000,000
    const min = 100000;
    const max = 10000000;
    const newValue = Math.round(min + (value[0] / 100) * (max - min));
    setNewGoalAmount(newValue);
  };

  const handleDirectAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove commas and convert to number
    const rawValue = e.target.value.replace(/,/g, '');
    
    // Check if it's a valid number
    if (/^\d*$/.test(rawValue)) {
      const value = rawValue === '' ? 0 : parseInt(rawValue);
      // Set a reasonable maximum (e.g., 100 million yen)
      if (value <= 100000000) {
        setNewGoalAmount(value);
      }
    }
  };

  // Format number with commas for display
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Coins className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-bold">このペースなら{years}年後に{formatCurrency(futureValue)}</h2>
            </div>
            
            {isEditingGoal ? (
              <div className="bg-muted p-3 rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">目標金額を設定</span>
                  <span className="font-bold">{formatCurrency(newGoalAmount)}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    type="text"
                    value={formatNumber(newGoalAmount)}
                    onChange={handleDirectAmountChange}
                    className="text-right pr-10"
                  />
                  <span className="ml-1 absolute right-7 text-sm">円</span>
                </div>
                <Slider
                  value={[((newGoalAmount - 100000) / (10000000 - 100000)) * 100]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="mt-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10万円</span>
                  <span>1,000万円</span>
                </div>
              </div>
            ) : (
              <div className="bg-muted p-3 rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">目標達成率</span>
                  <span className="font-bold">{achievementRate}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      achievementRate >= 100 ? 'bg-green-500' : 'bg-primary'
                    }`}
                    style={{ width: `${achievementRate}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span className="text-muted-foreground">目標：{formatCurrency(goal)}</span>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              {isEditingGoal ? (
                <>
                  <Button className="w-full" onClick={handleGoalChange}>
                    <span>目標金額を確定</span>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {
                    setIsEditingGoal(false);
                    setNewGoalAmount(goal);
                  }}>
                    <span>キャンセル</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full" onClick={handleContinue}>
                    <span>毎月{formatCurrency(monthlyAmount)}で続ける</span>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {
                    if (onGoalAmountChange) {
                      // If we have the callback for changing goal amount, use our editing UI
                      handleGoalChange();
                    } else {
                      // Otherwise fallback to original behavior
                      onGoalChange();
                    }
                  }}>
                    <span>目標変更</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <Collapsible 
        open={showDetails}
        onOpenChange={setShowDetails}
        className="border rounded-lg p-4"
      >
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full text-left">
            <span className="font-medium">詳細を見る</span>
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">ポートフォリオ内訳</h3>
            <div className="bg-slate-100 h-3 flex rounded-full overflow-hidden mb-2">
              {Object.entries(allocation)
                .filter(([_, percentage]) => percentage > 0)
                .sort((a, b) => Number(a[0]) - Number(b[0]))
                .map(([assetId, percentage]) => (
                  <div 
                    key={assetId}
                    className={`h-full ${getRiskColor(Number(assetId))}`} 
                    style={{width: `${percentage}%`}}
                  />
                ))
              }
            </div>
            <div className="flex flex-wrap text-xs text-muted-foreground gap-2 mt-2">
              {Object.entries(allocation)
                .filter(([_, percentage]) => percentage > 0)
                .sort((a, b) => Number(a[0]) - Number(b[0]))
                .map(([assetId, percentage]) => {
                  const asset = assetClasses.find(a => a.id === Number(assetId));
                  if (!asset) return null;
                  return (
                    <div key={assetId} className="flex items-center">
                      <div 
                        className={`w-2 h-2 rounded-full mr-1 ${getRiskColor(Number(assetId))}`}
                      />
                      <span>{asset.name}: {percentage}%</span>
                    </div>
                  );
                })
              }
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">収益シミュレーション</h3>
            <TimelineProjectionChart
              initialAmount={currentValue}
              monthlyContribution={monthlyAmount}
              allocation={allocation}
              assetClasses={assetClasses}
              selectedAssetId={selectedAssetId}
              maxYears={years}
              animated={true}
            />
            <div className="text-xs text-gray-500 mt-2">
              <p>※ このシミュレーションは概算です。実際の運用結果は市場状況により変動します。</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default InvestmentResults;
