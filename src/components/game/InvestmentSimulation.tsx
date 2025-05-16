
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import InvestmentPortfolio from "./investment/InvestmentPortfolio";
import InvestmentCalculator from "./investment/InvestmentCalculator";
import { Progress } from "@/components/ui/progress";
import { Bell, Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const InvestmentSimulation = () => {
  const [goal, setGoal] = useState(1000000); // Default to 1,000,000 yen (1 million)
  const [currentValue, setCurrentValue] = useState(300000); // Default to 300,000 yen
  
  const handleGoalSet = (newGoal: number) => {
    // Ensure minimum goal of 100,000 yen
    setGoal(Math.max(100000, newGoal));
  };
  
  const handleValueUpdate = (newValue: number) => {
    setCurrentValue(newValue);
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (currentValue / goal) * 100);
  
  return (
    <div className="max-w-3xl mx-auto">
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
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
                maximumFractionDigits: 0,
              }).format(goal)}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">現在の評価額</span>
            <span>
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
                maximumFractionDigits: 0,
              }).format(currentValue)}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-secondary">少額でも、20年後は大きな一歩。</p>
      </div>
      
      {/* Main tabs */}
      <Tabs defaultValue="portfolio" className="w-full">
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
          <InvestmentCalculator />
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
    </div>
  );
};

export default InvestmentSimulation;
