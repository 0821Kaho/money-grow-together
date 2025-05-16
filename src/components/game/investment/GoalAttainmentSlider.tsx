
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ArrowUp } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GoalAttainmentSliderProps {
  goalAmount: number;
  years: number;
  returnRate: number;
  monthlyDefault: number;
  onMonthlyChange: (amount: number) => void;
  salary?: number;
  onSalaryChange?: (amount: number) => void;
}

const GoalAttainmentSlider = ({
  goalAmount,
  years,
  returnRate,
  monthlyDefault,
  onMonthlyChange,
  salary = 300000,
  onSalaryChange
}: GoalAttainmentSliderProps) => {
  const [monthlyAmount, setMonthlyAmount] = useState(monthlyDefault);
  const [attainmentPercent, setAttainmentPercent] = useState(0);
  const [wasShownTip, setWasShownTip] = useState(false);
  const [inputMode, setInputMode] = useState<"amount" | "percentage">("amount");
  const [monthlyPercentage, setMonthlyPercentage] = useState(Math.round((monthlyDefault / salary) * 100));
  const [userSalary, setUserSalary] = useState(salary);
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  // Calculate future value using compound interest
  const calculateFutureValue = (monthly: number, rate: number, years: number): number => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    // Formula: FV = PMT * ((1 + r)^n - 1) / r * (1 + r)
    return monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  };
  
  // Update percentage when amount or salary changes
  useEffect(() => {
    if (userSalary > 0) {
      setMonthlyPercentage(Math.round((monthlyAmount / userSalary) * 100));
    }
  }, [monthlyAmount, userSalary]);
  
  // Update amount when percentage changes
  useEffect(() => {
    if (inputMode === "percentage" && userSalary > 0) {
      const newAmount = Math.round((monthlyPercentage / 100) * userSalary / 1000) * 1000;
      setMonthlyAmount(newAmount);
    }
  }, [monthlyPercentage, userSalary, inputMode]);
  
  useEffect(() => {
    // Calculate how current monthly amount will attain goal
    const futureValue = calculateFutureValue(monthlyAmount, returnRate, years);
    const percent = Math.min(100, Math.round((futureValue / goalAmount) * 100));
    setAttainmentPercent(percent);
    
    // Show tip if close but not quite there
    if (percent >= 85 && percent < 100 && !wasShownTip) {
      const additionalNeeded = Math.ceil((100 - percent) / 5) * 1000; // Round up to nearest 1000
      
      if (monthlyAmount + additionalNeeded <= 100000) { // Cap at max slider value
        toast({
          title: "もう少しで目標達成！",
          description: `毎月${additionalNeeded.toLocaleString()}円増やすと、達成率が100%になります！`,
        });
        setWasShownTip(true);
      }
    }
    
    onMonthlyChange(monthlyAmount);
  }, [monthlyAmount, returnRate, years, goalAmount, onMonthlyChange, wasShownTip]);
  
  // Format currency with yen symbol
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get color based on attainment percentage
  const getAttainmentColor = () => {
    if (attainmentPercent >= 100) return "bg-green-500";
    if (attainmentPercent >= 70) return "bg-yellow-500";
    if (attainmentPercent >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  // Handle direct input change for monthly amount
  const handleDirectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 100000) {
      setMonthlyAmount(value);
    }
  };
  
  // Handle salary input change
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 50000 && value <= 2000000) {
      setUserSalary(value);
      if (onSalaryChange) onSalaryChange(value);
      
      // Show recommendation toast
      if (!showRecommendation) {
        const recommendedAmount = Math.round(value * 0.1);
        toast({
          title: "家計管理ルール",
          description: `収入の10%＝${formatCurrency(recommendedAmount)}を推奨します`,
        });
        setShowRecommendation(true);
      }
    }
  };
  
  // Handle percentage slider change
  const handlePercentageChange = (values: number[]) => {
    setMonthlyPercentage(values[0]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="salary" className="block text-sm font-medium mb-1">月収</label>
          <div className="flex items-center">
            <Input
              id="salary"
              type="number"
              min={50000}
              max={2000000}
              step={10000}
              value={userSalary}
              onChange={handleSalaryChange}
              className="text-right pr-10"
              placeholder="300,000"
            />
            <span className="ml-1 absolute right-3 text-sm">円</span>
          </div>
          {userSalary < 50000 && userSalary > 0 && (
            <p className="text-xs text-red-500 mt-1">
              最低50,000円を入力してください
            </p>
          )}
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="contribution" className="text-sm font-medium">積立額</label>
            <span className="text-sm font-medium">{formatCurrency(monthlyAmount)}</span>
          </div>
          <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "amount" | "percentage")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="amount">金額指定</TabsTrigger>
              <TabsTrigger value="percentage">% 指定</TabsTrigger>
            </TabsList>
            <TabsContent value="amount" className="mt-0 pt-0">
              <div className="flex gap-2 items-center">
                <Slider
                  id="monthly"
                  min={1000}
                  max={Math.min(100000, userSalary)}
                  step={1000}
                  value={[monthlyAmount]}
                  onValueChange={(values) => setMonthlyAmount(values[0])}
                  className="flex-1"
                />
                <div className="w-28 flex items-center relative">
                  <Input
                    type="number"
                    min={0}
                    max={Math.min(100000, userSalary)}
                    step={1000}
                    value={monthlyAmount}
                    onChange={handleDirectInputChange}
                    className="text-right pr-10"
                  />
                  <span className="ml-1 absolute right-3 text-sm">円</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="percentage" className="mt-0 pt-0">
              <div className="space-y-2">
                <Slider
                  id="monthlyPercentage"
                  min={1}
                  max={50}
                  step={1}
                  value={[monthlyPercentage]}
                  onValueChange={handlePercentageChange}
                  className="flex-1"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  収入の{monthlyPercentage}% = {formatCurrency(monthlyAmount)}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">目標達成度</h3>
          <span className={`text-sm font-medium ${
            attainmentPercent >= 100 ? "text-green-600" : "text-muted-foreground"
          }`}>
            {attainmentPercent}%
          </span>
        </div>
        
        <Progress 
          value={attainmentPercent} 
          className="h-3"
          indicatorClassName={getAttainmentColor()}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      {attainmentPercent < 100 && (
        <div className="bg-primary/10 p-3 rounded-md text-sm mt-2">
          <div className="flex items-start gap-2">
            <ArrowUp className="h-4 w-4 text-primary" />
            <span>
              毎月{formatCurrency(1000)}増やすと、達成率が約{Math.min(5, 100 - attainmentPercent)}%上がります！
            </span>
          </div>
        </div>
      )}
      
      {attainmentPercent >= 100 && (
        <div className="bg-green-50 border border-green-200 p-3 rounded-md text-sm mt-2">
          <div className="flex items-start gap-2">
            <span className="text-green-600">🎉</span>
            <span className="text-green-700">
              このペースなら目標金額を達成できます！
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalAttainmentSlider;
