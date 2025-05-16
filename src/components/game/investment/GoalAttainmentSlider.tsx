
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ArrowUp } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface GoalAttainmentSliderProps {
  goalAmount: number;
  years: number;
  returnRate: number;
  monthlyDefault: number;
  onMonthlyChange: (amount: number) => void;
}

const GoalAttainmentSlider = ({
  goalAmount,
  years,
  returnRate,
  monthlyDefault,
  onMonthlyChange
}: GoalAttainmentSliderProps) => {
  const [monthlyAmount, setMonthlyAmount] = useState(monthlyDefault);
  const [attainmentPercent, setAttainmentPercent] = useState(0);
  const [wasShownTip, setWasShownTip] = useState(false);
  
  // Calculate future value using compound interest
  const calculateFutureValue = (monthly: number, rate: number, years: number): number => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    // Formula: FV = PMT * ((1 + r)^n - 1) / r * (1 + r)
    return monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  };
  
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

  return (
    <div className="space-y-4">
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
      
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <label htmlFor="monthly" className="text-sm font-medium">
            毎月いくら積み立てる？
          </label>
          <span className="text-sm font-medium">{formatCurrency(monthlyAmount)}</span>
        </div>
        
        <Slider
          id="monthly"
          min={5000}
          max={100000}
          step={1000}
          value={[monthlyAmount]}
          onValueChange={(values) => setMonthlyAmount(values[0])}
          className="py-4"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>¥5,000</span>
          <span>¥50,000</span>
          <span>¥100,000</span>
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
