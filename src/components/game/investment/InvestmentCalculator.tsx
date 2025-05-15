
import React, { useState, useEffect, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp } from "lucide-react";

// Constants for slider ranges
const MIN_YEARS = 1;
const MAX_YEARS = 20;
const MIN_MONTHLY = 5000;
const MAX_MONTHLY = 100000;
const RETURNS = [3, 5, 7];

const InvestmentCalculator: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState<number>(1000000);
  const [years, setYears] = useState<number>(10);
  const [monthly, setMonthly] = useState<number>(30000);
  const [returnRate, setReturnRate] = useState<number>(5);
  
  // Format number with comma and currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate future value using compound interest formula
  const calculateFutureValue = (monthly: number, rate: number, years: number): number => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    const futureValue = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    return Math.round(futureValue);
  };

  const principalAmount = useMemo(() => monthly * years * 12, [monthly, years]);
  
  const futureValue = useMemo(() => {
    return calculateFutureValue(monthly, returnRate, years);
  }, [monthly, returnRate, years]);
  
  const interestGained = useMemo(() => {
    return futureValue - principalAmount;
  }, [futureValue, principalAmount]);
  
  const percentageGain = useMemo(() => {
    return principalAmount > 0 ? Math.round((interestGained / principalAmount) * 100) : 0;
  }, [interestGained, principalAmount]);

  // Calculate years needed to reach target with current monthly and return rate
  const yearsToReachTarget = useMemo(() => {
    // Simple estimation using binary search
    let low = 1;
    let high = 50; // Maximum 50 years
    let mid;
    let result = 0;
    
    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      const estimated = calculateFutureValue(monthly, returnRate, mid);
      
      if (estimated >= targetAmount) {
        result = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    
    return result;
  }, [targetAmount, monthly, returnRate]);

  // Calculate increased monthly payment to reach target faster
  const suggestedMonthly = useMemo(() => {
    return monthly + 5000;
  }, [monthly]);
  
  const suggestedYears = useMemo(() => {
    // Simple estimation using binary search
    let low = 1;
    let high = years;
    let mid;
    let result = years;
    
    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      const estimated = calculateFutureValue(suggestedMonthly, returnRate, mid);
      
      if (estimated >= targetAmount) {
        result = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    
    return result;
  }, [targetAmount, suggestedMonthly, returnRate, years]);

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setTargetAmount(parseInt(value) || 0);
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">投資シミュレーター</h2>
      
      {/* Target Amount Input */}
      <div className="space-y-2">
        <label htmlFor="target-amount" className="text-sm font-medium">
          目標金額を入力:
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">¥</span>
          <Input
            id="target-amount"
            type="text"
            value={targetAmount.toLocaleString()}
            onChange={handleTargetAmountChange}
            className="pl-8"
          />
        </div>
      </div>
      
      {/* Years Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="years" className="text-sm font-medium">
            いつまでに達成したい？
          </label>
          <span className="text-sm font-medium">{years} 年</span>
        </div>
        <Slider
          id="years"
          min={MIN_YEARS}
          max={MAX_YEARS}
          step={1}
          value={[years]}
          onValueChange={(values) => setYears(values[0])}
          className="py-4"
        />
      </div>
      
      {/* Monthly Amount Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="monthly" className="text-sm font-medium">
            毎月いくら積み立てる？
          </label>
          <span className="text-sm font-medium">{formatCurrency(monthly)}</span>
        </div>
        <Slider
          id="monthly"
          min={MIN_MONTHLY}
          max={MAX_MONTHLY}
          step={1000}
          value={[monthly]}
          onValueChange={(values) => setMonthly(values[0])}
          className="py-4"
        />
      </div>
      
      {/* Return Rate Tabs */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          想定利回り（年率・税引前）
        </label>
        <Tabs 
          defaultValue={returnRate.toString()} 
          onValueChange={(value) => setReturnRate(parseInt(value))}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full">
            {RETURNS.map((rate) => (
              <TabsTrigger key={rate} value={rate.toString()}>
                {rate}%
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {/* Results Card */}
      <Card className="mt-6 bg-slate-50">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="font-bold">■ {years} 年後の予測資産 {formatCurrency(futureValue)}</div>
            <div className="pl-4">├ 元本 {formatCurrency(principalAmount)}</div>
            <div className="pl-4">└ 運用益 {formatCurrency(interestGained)} (+{percentageGain}%)</div>
          </div>
          
          {/* Suggestion Tips */}
          <div className="mt-4 bg-primary/10 p-3 rounded-lg text-sm">
            <div className="flex items-start gap-2">
              <span className="text-primary">👉</span>
              <span>積立額を{formatCurrency(5000)}増やすと、到達まで{suggestedYears}年に短縮！</span>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>※ このシミュレーションは概算です。実際の運用結果は市場状況により変動します。</p>
            <p>※ 運用益は税引前です。一般的な投資では約20%の税金がかかります。</p>
          </div>
          
          {/* NISA Tip */}
          <div className="mt-2 flex items-center text-xs text-primary">
            <span className="mr-1 inline-block">
              <ArrowUp size={12} />
            </span>
            <span>NISA口座を利用すると運用益非課税のメリットがあります</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Action Reminder */}
      <div className="text-center mt-6">
        <p className="text-sm mb-2">毎月{formatCurrency(monthly)}が難しい？</p>
        <a href="/module/5" className="text-primary font-medium text-sm flex items-center justify-center">
          副業シミュレータへジャンプ
          <ArrowUp className="ml-1 rotate-45" size={14} />
        </a>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
