
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Area, ResponsiveContainer, ComposedChart } from 'recharts';
import { FastForward, Play, Pause } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface TimelineProjectionChartProps {
  initialAmount: number;
  monthlyContribution: number;
  allocation: {[key: number]: number};
  assetClasses: any[];
  selectedAssetId?: number;
  maxYears?: number;
  animated?: boolean;
}

const TimelineProjectionChart = ({ 
  initialAmount, 
  monthlyContribution, 
  allocation, 
  assetClasses,
  selectedAssetId,
  maxYears = 30,
  animated = false
}: TimelineProjectionChartProps) => {
  const [yearsToProject, setYearsToProject] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [pulseType, setPulseType] = useState<'positive' | 'negative'>('positive');
  
  // Prepare chart data based on allocation
  const projectionData = useMemo(() => {
    const data = [];
    let currentTotal = initialAmount;
    let assetValues: {[key: number]: number} = {};
    
    // Initialize asset values
    assetClasses.forEach(asset => {
      const percentage = allocation[asset.id] || 0;
      assetValues[asset.id] = initialAmount * (percentage / 100);
    });
    
    // Project for yearsToProject years
    for (let year = 0; year <= yearsToProject; year++) {
      let yearData: any = { year };
      let yearlyTotal = 0;
      
      // Calculate values for each asset class
      assetClasses.forEach(asset => {
        const percentage = allocation[asset.id] || 0;
        
        // First year is just initial distribution
        if (year === 0) {
          yearData[`asset${asset.id}`] = assetValues[asset.id];
          yearlyTotal += assetValues[asset.id];
        } else {
          // Calculate yearly return based on expected return
          const previousValue = assetValues[asset.id];
          // Add monthly contributions distributed according to allocation
          const yearlyContribution = monthlyContribution * 12 * (percentage / 100);
          // Calculate asset value with growth
          const newValue = previousValue * (1 + asset.expectedReturn / 100) + yearlyContribution;
          assetValues[asset.id] = newValue;
          yearData[`asset${asset.id}`] = newValue;
          yearlyTotal += newValue;
        }
      });
      
      // Add total to data
      yearData.total = yearlyTotal;
      data.push(yearData);
    }
    
    return data;
  }, [initialAmount, monthlyContribution, allocation, assetClasses, yearsToProject]);
  
  // Format currency for tooltips
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format Y-axis values in "万円" (10,000 JPY)
  const formatYenInMan = (value: number) => {
    return `${(value / 10000).toFixed(0)}万`;
  };
  
  // Calculate gains and returns
  const totalInvestment = useMemo(() => {
    // Initial amount + monthly contributions over time
    return initialAmount + (monthlyContribution * 12 * yearsToProject);
  }, [initialAmount, monthlyContribution, yearsToProject]);
  
  const projectedEndValue = useMemo(() => {
    return projectionData.length > 0 ? projectionData[projectionData.length - 1].total : 0;
  }, [projectionData]);
  
  const projectedGains = useMemo(() => {
    return projectedEndValue - totalInvestment;
  }, [projectedEndValue, totalInvestment]);
  
  const isPositiveGain = projectedGains > 0;
  
  // Animation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setYearsToProject(prev => {
          if (prev < maxYears) {
            // Trigger pulse animation
            setShowPulse(true);
            setPulseType(isPositiveGain ? 'positive' : 'negative');
            setTimeout(() => setShowPulse(false), 800);
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxYears, isPositiveGain]);
  
  // Reset if props change
  useEffect(() => {
    setYearsToProject(Math.min(10, maxYears));
    setIsPlaying(false);
  }, [initialAmount, monthlyContribution, allocation, maxYears]);
  
  const handleYearSliderChange = (values: number[]) => {
    setYearsToProject(values[0]);
    setIsPlaying(false);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && yearsToProject >= maxYears) {
      setYearsToProject(1);
    }
  };
  
  const selectedAsset = selectedAssetId ? assetClasses.find(a => a.id === selectedAssetId) : null;
  
  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">資産成長予測</h3>
          <div className="flex items-center gap-2">
            {animated && (
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 px-2 text-xs"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                {isPlaying ? '一時停止' : '自動再生'}
              </Button>
            )}
            <Badge variant="outline" className="bg-primary/5 text-xs">
              {yearsToProject}年後
            </Badge>
          </div>
        </div>
        
        <div className="relative">
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={projectionData}>
              <defs>
                {assetClasses.map((asset) => (
                  <linearGradient key={asset.id} id={`colorAsset${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={asset.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={asset.color} stopOpacity={0.1}/>
                  </linearGradient>
                ))}
              </defs>
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 11 }} 
                tickFormatter={(value) => `${value}年`}
              />
              <YAxis 
                width={50}
                tick={{ fontSize: 11 }}
                tickFormatter={formatYenInMan}
                label={{ 
                  value: '資産額（万円）', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { 
                    textAnchor: 'middle',
                    fontSize: 11
                  } 
                }}
              />
              <Tooltip 
                formatter={(value: any) => [formatCurrency(value), '']}
                labelFormatter={(label) => `${label}年目`}
              />
              
              {/* Area charts for each asset class */}
              {assetClasses.map((asset) => (
                <Area
                  key={asset.id}
                  type="monotone"
                  dataKey={`asset${asset.id}`}
                  stroke={asset.color}
                  fillOpacity={selectedAssetId ? (selectedAssetId === asset.id ? 0.8 : 0.1) : 0.8}
                  fill={`url(#colorAsset${asset.id})`}
                  stackId="1"
                />
              ))}
              
              {/* Total line */}
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#8884d8" 
                strokeWidth={2} 
                dot={false} 
              />
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* Pulse animation overlay */}
          {showPulse && (
            <motion.div 
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 rounded-lg ${
                pulseType === 'positive' ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}
            />
          )}
        </div>
        
        {animated && (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>1年</span>
              <span>{maxYears}年</span>
            </div>
            <Slider
              value={[yearsToProject]}
              min={1}
              max={maxYears}
              step={1}
              onValueChange={handleYearSliderChange}
            />
          </div>
        )}
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">投資元本</div>
            <div className="font-medium">{formatCurrency(totalInvestment)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">予測資産</div>
            <div className="font-medium">{formatCurrency(projectedEndValue)}</div>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="text-xs text-muted-foreground">運用益</div>
          <div className={`font-medium ${isPositiveGain ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveGain ? '+' : ''}{formatCurrency(projectedGains)}
          </div>
        </div>
        
        {selectedAsset && (
          <div className="mt-4 p-2 bg-slate-50 rounded-md">
            <div className="text-xs font-medium">{selectedAsset.name}を選択中</div>
            <div className="text-xs text-muted-foreground">
              {selectedAsset.description}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimelineProjectionChart;
