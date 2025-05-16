
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { ChartLine } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

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

// Define interface for component props
interface InvestmentPortfolioProps {
  onValueUpdate: (value: number) => void;
  goal: number;
  onGoalSet: (goal: number) => void;
  onAssetSelected?: (assetId: number) => void;
}

const InvestmentPortfolio = ({ 
  onValueUpdate, 
  goal, 
  onGoalSet, 
  onAssetSelected 
}: InvestmentPortfolioProps) => {
  const [allocation, setAllocation] = useState({ 
    1: 30, 2: 20, 3: 15, 
    4: 10, 5: 10, 6: 5, 
    7: 5, 8: 5, 9: 0 
  }); // Updated default allocation with new assets
  const [monthlyAmount, setMonthlyAmount] = useState(30000);
  const [portfolioValue, setPortfolioValue] = useState(300000);
  const [earned, setEarned] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  
  // Update portfolio value based on allocation and simulated returns
  useEffect(() => {
    // Calculate weighted return
    let totalReturn = 0;
    assetClasses.forEach(asset => {
      const weight = allocation[asset.id] / 100;
      totalReturn += asset.expectedReturn * weight;
    });
    
    // Set initial values
    const initial = 300000;
    setPortfolioValue(initial);
    setEarned(0);
    
    // Update parent component
    onValueUpdate(initial);
    
    // Simulate growth over time (just for UI demonstration)
    const interval = setInterval(() => {
      setPortfolioValue(prev => {
        // Monthly return (annual / 12) applied to current value
        const monthlyReturn = prev * (totalReturn / 100 / 12);
        const newValue = prev + monthlyReturn;
        setEarned(e => e + monthlyReturn);
        
        // Update parent component
        onValueUpdate(newValue);
        
        return newValue;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allocation, onValueUpdate]);

  const handleAllocationChange = (assetId: number, newValue: number[]) => {
    // Ensure allocations sum to 100%
    const value = newValue[0];
    const currentSum = Object.values(allocation).reduce((a, b) => a + b, 0);
    const otherAssetsSum = currentSum - allocation[assetId];
    
    if (otherAssetsSum + value > 100) {
      toast({
        title: "配分の合計が100%を超えています",
        description: "他の資産の配分を調整してください",
      });
      return;
    }
    
    setAllocation({ ...allocation, [assetId]: value });
  };
  
  const handleMonthlyChange = (value: number[]) => {
    setMonthlyAmount(value[0]);
  };
  
  const handleAssetClick = (assetId: number) => {
    setSelectedAsset(selectedAsset === assetId ? null : assetId);
    if (onAssetSelected) {
      onAssetSelected(assetId);
    }
  };
  
  // Calculate risk level based on allocation
  const calculateRiskLevel = () => {
    let riskScore = 0;
    assetClasses.forEach(asset => {
      const weight = allocation[asset.id] / 100;
      riskScore += asset.volatility * weight;
    });
    
    if (riskScore < 2) return "かなり保守的";
    if (riskScore < 5) return "保守的";
    if (riskScore < 10) return "バランス型";
    if (riskScore < 15) return "積極的";
    return "かなり積極的";
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Calculate expected annual return
  const calculateExpectedReturn = () => {
    let totalReturn = 0;
    assetClasses.forEach(asset => {
      const weight = allocation[asset.id] / 100;
      totalReturn += asset.expectedReturn * weight;
    });
    return totalReturn.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-lg">ポートフォリオ概要</h3>
              <p className="text-sm text-muted-foreground">リスクレベル: {calculateRiskLevel()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">見込みリターン（年率）</p>
              <p className="text-lg font-semibold text-secondary">+{calculateExpectedReturn()}%</p>
            </div>
          </div>
          
          <div className="flex justify-between mb-2 text-sm">
            <span>現在の評価額</span>
            <span className="font-medium">{formatCurrency(Math.round(portfolioValue))}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>運用益</span>
            <span className={`font-medium ${earned > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {earned > 0 ? '+' : ''}{formatCurrency(Math.round(earned))}
            </span>
          </div>
        </CardContent>
      </Card>
      
      {/* Asset Allocation */}
      <div className="space-y-4">
        <h3 className="font-semibold">資産配分</h3>
        
        {assetClasses.map((asset) => (
          <Card 
            key={asset.id} 
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedAsset === asset.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleAssetClick(asset.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-medium">{asset.name}</h4>
                  <div className="flex items-center flex-wrap gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${
                      asset.riskLevel === "低" ? "bg-green-100 text-green-800" :
                      asset.riskLevel === "中" ? "bg-blue-100 text-blue-800" :
                      asset.riskLevel === "高" ? "bg-red-100 text-red-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {asset.riskLevel}リスク
                    </span>
                    <span className="text-xs text-green-600">+{asset.expectedReturn}%</span>
                    {asset.nisaCategory && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        asset.nisaCategory === "つみたて枠" ? "bg-emerald-100 text-emerald-800" :
                        asset.nisaCategory === "成長投資枠" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {asset.nisaCategory}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{allocation[asset.id] || 0}%</p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">{asset.description}</p>
              
              {/* Mini chart */}
              <div className="h-20 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={asset.chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={asset.color} 
                      strokeWidth={2}
                      dot={false}
                    />
                    <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                    <XAxis hide />
                    <Tooltip 
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          return (
                            <div className="bg-background border border-border p-1 text-xs">
                              <p className="font-medium">{payload[0].payload.year}</p>
                              <p>値: {payload[0].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <Slider 
                value={[allocation[asset.id] || 0]} 
                onValueChange={(value) => handleAllocationChange(asset.id, value)}
                min={0}
                max={100}
                step={5}
                className="mb-1"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Monthly Investment */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">毎月の積立額</h3>
          <div className="text-center mb-2">
            <span className="text-2xl font-bold">{formatCurrency(monthlyAmount)}</span>
          </div>
          
          <Slider
            value={[monthlyAmount]} 
            onValueChange={handleMonthlyChange}
            min={5000}
            max={100000}
            step={1000}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>¥5,000</span>
            <span>¥50,000</span>
            <span>¥100,000</span>
          </div>
          
          <Button 
            className="w-full mt-4"
            onClick={() => {
              toast({
                title: "シミュレーション実行中",
                description: "積立投資の成長をシミュレーションしています...",
              });
              
              // Simulate earning some coins for engagement
              setTimeout(() => {
                toast({
                  title: "10コイン獲得！",
                  description: "シミュレーション完了のご褒美です",
                });
              }, 1500);
            }}
          >
            毎月 {formatCurrency(monthlyAmount)} でシミュレート
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentPortfolio;
