
import { useState, useEffect } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { FastForward, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TimelineProjectionChartProps {
  initialAmount: number;
  monthlyContribution: number;
  allocation: { [key: number]: number };
  assetClasses: {
    id: number;
    name: string;
    expectedReturn: number;
    volatility: number;
    color: string;
    description?: string;
  }[];
  selectedAssetId?: number;
}

const TimelineProjectionChart = ({
  initialAmount,
  monthlyContribution,
  allocation,
  assetClasses,
  selectedAssetId
}: TimelineProjectionChartProps) => {
  const [yearsToProject, setYearsToProject] = useState(10);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [isValueIncreasing, setIsValueIncreasing] = useState(false);
  const [isValueDecreasing, setIsValueDecreasing] = useState(false);
  const [animationTimeout, setAnimationTimeout] = useState<NodeJS.Timeout | null>(null);

  // Calculate projected data when inputs change
  useEffect(() => {
    generateProjectionData();
  }, [initialAmount, monthlyContribution, allocation, yearsToProject]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, [animationTimeout]);

  const generateProjectionData = () => {
    const data = [];
    let currentValue = initialAmount;
    let previousValue = initialAmount;
    
    // Get weighted return rate from allocation
    const calculateWeightedReturn = () => {
      let totalReturn = 0;
      assetClasses.forEach(asset => {
        const weight = allocation[asset.id] / 100;
        totalReturn += asset.expectedReturn * weight;
      });
      return totalReturn / 100; // Convert to decimal for calculation
    };
    
    const annualReturnRate = calculateWeightedReturn();
    const monthlyReturnRate = Math.pow(1 + annualReturnRate, 1/12) - 1;
    
    // Generate data for each year
    for (let year = 0; year <= yearsToProject; year++) {
      // For each year, calculate monthly compounding
      if (year > 0) {
        for (let month = 0; month < 12; month++) {
          // Add monthly contribution
          currentValue += monthlyContribution;
          // Apply monthly return
          currentValue *= (1 + monthlyReturnRate);
        }
      }
      
      // Calculate individual asset values
      const assetValues: { [key: string]: number } = {};
      assetClasses.forEach(asset => {
        const weight = allocation[asset.id] / 100;
        assetValues[`asset${asset.id}`] = currentValue * weight;
      });
      
      // Add data point for this year
      data.push({
        year,
        totalValue: Math.round(currentValue),
        ...assetValues,
        growth: currentValue - previousValue
      });
      
      previousValue = currentValue;
    }
    
    // Show animation effect based on growth
    if (data.length > 1 && data[data.length-1].growth > 0) {
      showPositiveAnimation();
    } else if (data.length > 1 && data[data.length-1].growth < 0) {
      showNegativeAnimation();
    }
    
    setProjectionData(data);
  };
  
  const showPositiveAnimation = () => {
    if (animationTimeout) clearTimeout(animationTimeout);
    setIsValueIncreasing(true);
    setIsValueDecreasing(false);
    const timeout = setTimeout(() => {
      setIsValueIncreasing(false);
    }, 1000);
    setAnimationTimeout(timeout);
  };
  
  const showNegativeAnimation = () => {
    if (animationTimeout) clearTimeout(animationTimeout);
    setIsValueDecreasing(true);
    setIsValueIncreasing(false);
    const timeout = setTimeout(() => {
      setIsValueDecreasing(false);
    }, 1000);
    setAnimationTimeout(timeout);
  };
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Get selected asset details
  const selectedAsset = selectedAssetId 
    ? assetClasses.find(asset => asset.id === selectedAssetId)
    : null;

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="font-medium text-sm">未来予測チャート</h3>
            <TooltipProvider>
              <TooltipUI>
                <TooltipTrigger asChild>
                  <button className="ml-1.5 p-1 hover:bg-muted rounded-full">
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    このチャートは将来の予測であり、実際の結果は変動します。
                    複利効果と時間の力で資産がどう増えるか確認できます。
                  </p>
                </TooltipContent>
              </TooltipUI>
            </TooltipProvider>
          </div>
          
          {projectionData.length > 0 && (
            <div 
              className={`text-sm font-medium transition-colors duration-500 ${
                isValueIncreasing ? 'text-green-500 animate-pulse' : 
                isValueDecreasing ? 'text-red-500 animate-pulse' : ''
              }`}
            >
              {formatCurrency(projectionData[projectionData.length - 1]?.totalValue || initialAmount)}
            </div>
          )}
        </div>
        
        {/* Chart Area */}
        <div className="h-40 mb-6 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={projectionData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value}年`}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => formatCurrency(value).replace('円', '')}
                width={60}
              />
              <Tooltip
                content={({active, payload}) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2 bg-background border rounded-md shadow-md">
                        <p className="text-xs font-medium">{payload[0].payload.year}年後</p>
                        <p className="text-xs mt-1">{formatCurrency(payload[0].payload.totalValue)}</p>
                        {selectedAsset && (
                          <p className="text-xs mt-1">
                            {selectedAsset.name}: {formatCurrency(payload[0].payload[`asset${selectedAsset.id}`])}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              {/* Selected Asset Area Chart (if an asset is selected) */}
              {selectedAsset && (
                <Area
                  type="monotone"
                  dataKey={`asset${selectedAsset.id}`}
                  stroke={selectedAsset.color}
                  fill={selectedAsset.color}
                  fillOpacity={0.3}
                  strokeWidth={1}
                  activeDot={{ r: 5, stroke: selectedAsset.color, strokeWidth: 2 }}
                />
              )}
              
              {/* Total Portfolio Line */}
              <Area
                type="monotone"
                dataKey="totalValue"
                stroke="#9b87f5"
                strokeWidth={2}
                fill="#9b87f5"
                fillOpacity={0.1}
                activeDot={{ r: 6, stroke: "#9b87f5", strokeWidth: 2, fill: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Pulse effect overlay for positive/negative changes */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              isValueIncreasing ? 'bg-green-500 opacity-10 animate-pulse' : 
              isValueDecreasing ? 'bg-red-500 opacity-10 animate-pulse' : 
              'opacity-0'
            }`}
          />
        </div>
        
        {/* Time Slider */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <FastForward className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <h4 className="text-xs font-medium">未来を早送り</h4>
            <span className="ml-auto text-xs font-medium">{yearsToProject}年後</span>
          </div>
          
          <Slider
            value={[yearsToProject]}
            onValueChange={(value) => setYearsToProject(value[0])}
            min={1}
            max={30}
            step={1}
            className="mb-1"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1年</span>
            <span>15年</span>
            <span>30年</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineProjectionChart;
