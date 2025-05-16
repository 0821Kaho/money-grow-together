
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import TimelineProjectionChart from "./TimelineProjectionChart";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

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
  onGoalChange
}: InvestmentResultsProps) => {
  const [showDetails, setShowDetails] = React.useState(false);
  
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
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full" onClick={handleContinue}>
                <span>毎月{formatCurrency(monthlyAmount)}で続ける</span>
              </Button>
              
              <Button variant="outline" className="w-full" onClick={onGoalChange}>
                <span>目標変更</span>
              </Button>
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
              {Object.entries(allocation).map(([assetId, percentage]) => (
                <div 
                  key={assetId}
                  className={`h-full ${
                    Number(assetId) === 1 ? 'bg-green-500' :
                    Number(assetId) === 2 ? 'bg-blue-500' : 'bg-red-500'
                  }`} 
                  style={{width: `${percentage}%`}}
                />
              ))}
            </div>
            <div className="flex text-xs text-muted-foreground justify-between">
              {assetClasses.map(asset => (
                <div key={asset.id} className="flex items-center">
                  <div 
                    className={`w-2 h-2 rounded-full mr-1 ${
                      asset.id === 1 ? 'bg-green-500' :
                      asset.id === 2 ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                  />
                  <span>{asset.name}: {allocation[asset.id] || 0}%</span>
                </div>
              ))}
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
