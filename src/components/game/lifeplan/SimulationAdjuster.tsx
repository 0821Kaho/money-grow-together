
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { LifeEvent, FinancialPlan, SimulationResult } from "./LifePlanModules";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine,
  ReferenceDot
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface SimulationAdjusterProps {
  events: LifeEvent[];
  financialPlan: FinancialPlan;
  onComplete: (plan: FinancialPlan) => void;
  disabled?: boolean;
}

const SimulationAdjuster = ({ events, financialPlan, onComplete, disabled = false }: SimulationAdjusterProps) => {
  const [monthlySavings, setMonthlySavings] = useState(financialPlan.monthlySavings);
  const [initialSavings, setInitialSavings] = useState(financialPlan.initialSavings);
  const [retirementAge, setRetirementAge] = useState(financialPlan.retirementAge);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[] | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  
  // Run simulation with current parameters
  const runSimulation = () => {
    if (events.length === 0) return;
    
    // Find min and max age to create a complete timeline
    const minAge = Math.min(...events.map(e => e.age));
    const maxAge = Math.max(retirementAge + 5, Math.max(...events.map(e => e.age)) + 5);
    
    // Create results array
    const results: SimulationResult[] = [];
    
    // Starting values
    let currentSavings = initialSavings;
    const yearlySavings = monthlySavings * 12;
    
    // Configure simulation parameters
    const annualInterestRate = 0.01; // 1% for conservative simulation
    const inflationRate = 0.01;      // 1% annual inflation
    
    // Create data points for each year
    const minStartAge = Math.min(events[0].age, minAge);
    
    for (let age = minStartAge; age <= maxAge; age++) {
      // Get events for this age
      const eventsAtThisAge = events.filter(e => e.age === age);
      const totalCost = eventsAtThisAge.reduce((sum, e) => sum + e.cost, 0);
      const year = events[0].year - (events[0].age - age);
      
      // Calculate savings with compound interest
      if (age > minStartAge) {
        // Apply annual interest to existing savings
        currentSavings *= (1 + annualInterestRate);
      }
      
      // Add yearly savings if before retirement
      if (age < retirementAge) {
        currentSavings += yearlySavings;
      }
      
      // Subtract event costs
      currentSavings -= totalCost;
      
      // Store result
      results.push({
        age,
        year,
        savings: Math.max(0, currentSavings), // Prevent negative savings for chart clarity
        events: eventsAtThisAge.map(e => e.title),
        costs: totalCost
      });
    }
    
    setSimulationResults(results);
    setIsSimulated(true);
  };
  
  // Run initial simulation on mount or when events change
  useEffect(() => {
    if (events.length > 0) {
      runSimulation();
    }
  }, [events]);
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(2)}億円`;
    } else if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}万円`;
    } else {
      return `${value.toFixed(0)}円`;
    }
  };
  
  // Handle completion and save parameters
  const handleComplete = () => {
    const updatedPlan: FinancialPlan = {
      monthlySavings,
      initialSavings,
      retirementAge,
      simulationResults
    };
    
    onComplete(updatedPlan);
  };
  
  // Find key financial insights
  const getFinancialInsights = () => {
    if (!simulationResults || simulationResults.length === 0) return null;
    
    const lastResult = simulationResults[simulationResults.length - 1];
    const retirementResult = simulationResults.find(r => r.age === retirementAge);
    const lowestPoint = [...simulationResults].sort((a, b) => a.savings - b.savings)[0];
    const highestExpense = [...simulationResults].sort((a, b) => b.costs - a.costs)[0];
    
    return {
      finalSavings: lastResult?.savings || 0,
      retirementSavings: retirementResult?.savings || 0,
      lowestSavings: lowestPoint?.savings || 0,
      lowestSavingsAge: lowestPoint?.age || 0,
      highestExpense: highestExpense?.costs || 0,
      highestExpenseAge: highestExpense?.age || 0,
      projectedYears: lastResult?.age - simulationResults[0].age || 0
    };
  };
  
  const insights = getFinancialInsights();
  
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        {events.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500 mb-4">
              まずはライフイベントを選択してください
            </p>
            <Button 
              variant="outline"
              onClick={() => {}}
              disabled={true}
            >
              ライフイベントの設定が必要です
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">資金シミュレーション</h3>
              <p className="text-sm text-gray-500 mb-4">
                ライフイベントに向けた資金計画をシミュレーションしましょう。
                各パラメーターを調整して、最適な貯蓄プランを検討できます。
              </p>
            </div>
            
            {/* Parameters adjustment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="text-sm font-medium mb-4">シミュレーション設定</h4>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex justify-between text-sm mb-1">
                      <span>月々の貯蓄額</span>
                      <span className="font-medium">{formatCurrency(monthlySavings)}/月</span>
                    </label>
                    <Slider
                      value={[monthlySavings]}
                      min={10000}
                      max={100000}
                      step={1000}
                      onValueChange={(value) => setMonthlySavings(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1万円</span>
                      <span>10万円</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex justify-between text-sm mb-1">
                      <span>現在の貯蓄額</span>
                      <span className="font-medium">{formatCurrency(initialSavings)}</span>
                    </label>
                    <Slider
                      value={[initialSavings]}
                      min={0}
                      max={5000000}
                      step={100000}
                      onValueChange={(value) => setInitialSavings(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0円</span>
                      <span>500万円</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex justify-between text-sm mb-1">
                      <span>想定退職年齢</span>
                      <span className="font-medium">{retirementAge}歳</span>
                    </label>
                    <Slider
                      value={[retirementAge]}
                      min={60}
                      max={70}
                      step={1}
                      onValueChange={(value) => setRetirementAge(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>60歳</span>
                      <span>70歳</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={runSimulation}
                  >
                    シミュレーション実行
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border">
                <h4 className="text-sm font-medium mb-4">シミュレーション結果</h4>
                
                {insights && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-primary/5 rounded">
                        <div className="text-xs text-gray-500">最終貯蓄額</div>
                        <div className="text-lg font-medium">{formatCurrency(insights.finalSavings)}</div>
                      </div>
                      <div className="p-3 bg-primary/5 rounded">
                        <div className="text-xs text-gray-500">退職時貯蓄額</div>
                        <div className="text-lg font-medium">{formatCurrency(insights.retirementSavings)}</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded">
                      <div className="text-xs text-gray-500">最大支出</div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">{formatCurrency(insights.highestExpense)}</div>
                        <div className="text-xs bg-slate-200 px-2 py-1 rounded">{insights.highestExpenseAge}歳時</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded">
                      <div className="text-xs text-gray-500">貯蓄最低ポイント</div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">{formatCurrency(insights.lowestSavings)}</div>
                        <div className="text-xs bg-slate-200 px-2 py-1 rounded">{insights.lowestSavingsAge}歳時</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded border border-green-100">
                      <div className="text-xs text-gray-600 mb-1">資産形成アドバイス</div>
                      <div className="text-sm">
                        {insights.lowestSavings < 0 ? (
                          <span className="text-red-600">支出に対して貯蓄が不足しています。月々の貯蓄額を増やすか、支出を見直しましょう。</span>
                        ) : insights.retirementSavings < 20000000 ? (
                          <span className="text-amber-600">退職時の貯蓄額が2,000万円以下です。老後に向けてもう少し貯蓄を増やすことを検討しましょう。</span>
                        ) : (
                          <span className="text-green-600">良いペースで資産形成できています。このまま計画に沿って継続しましょう。</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Simulation chart */}
            {simulationResults && simulationResults.length > 0 && (
              <div className="mb-8 bg-white p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-4">貯蓄シミュレーションチャート</h4>
                <div className="h-[300px] w-full">
                  <ChartContainer
                    config={{
                      primary: {
                        color: "#4DAA57",
                        label: "貯蓄残高"
                      }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={simulationResults}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="age"
                          label={{ value: '年齢', position: 'bottom', offset: 0 }}
                        />
                        <YAxis 
                          tickFormatter={(value) => {
                            if (value >= 10000000) return `${(value / 10000000).toFixed(0)}千万`;
                            if (value >= 1000000) return `${(value / 1000000).toFixed(0)}百万`;
                            return `${(value / 10000).toFixed(0)}万`;
                          }}
                        />
                        <Tooltip 
                          formatter={(value: any, name: any) => [formatCurrency(value), "貯蓄残高"]}
                          labelFormatter={(label) => `${label}歳`}
                        />
                        <Area 
                          type="monotone"
                          dataKey="savings"
                          stroke="#4DAA57"
                          fill="#4DAA57"
                          fillOpacity={0.3}
                        />
                        
                        {/* Mark retirement age */}
                        <ReferenceLine
                          x={retirementAge}
                          stroke="#FF6B6B"
                          strokeWidth={2}
                          strokeDasharray="3 3"
                          label={{
                            value: '退職',
                            position: 'top',
                            fill: '#FF6B6B',
                            fontSize: 12
                          }}
                        />
                        
                        {/* Mark major expense events */}
                        {events
                          .filter(e => e.cost > 1000000) // Only mark significant expenses
                          .map(event => (
                            <ReferenceDot
                              key={`event-${event.id}`}
                              x={event.age}
                              y={simulationResults.find(r => r.age === event.age)?.savings || 0}
                              r={4}
                              fill="#FF6B6B"
                              stroke="none"
                            />
                          ))
                        }
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  * 赤いポイントはライフイベントのタイミング、赤い線は退職予定年齢を示しています
                </div>
              </div>
            )}
            
            {/* Financial preparation tips */}
            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-3">ライフイベントに向けた資金準備ヒント</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white rounded border">
                  <div className="font-medium mb-1">教育資金</div>
                  <p className="text-sm text-gray-600 mb-1">
                    子どもの教育費用は早めに準備するのが効果的です。
                  </p>
                  <div className="text-xs text-gray-500">
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded mr-1">学資保険</span>
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded mr-1">教育ローン</span>
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded">奨学金</span>
                  </div>
                </div>
                
                <div className="p-3 bg-white rounded border">
                  <div className="font-medium mb-1">住宅資金</div>
                  <p className="text-sm text-gray-600 mb-1">
                    住宅購入は人生最大の買い物。頭金の準備が重要です。
                  </p>
                  <div className="text-xs text-gray-500">
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded mr-1">住宅ローン</span>
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded">財形住宅貯蓄</span>
                  </div>
                </div>
                
                <div className="p-3 bg-white rounded border">
                  <div className="font-medium mb-1">老後資金</div>
                  <p className="text-sm text-gray-600 mb-1">
                    公的年金だけでは不足する可能性が高く、自助努力が必要です。
                  </p>
                  <div className="text-xs text-gray-500">
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded mr-1">iDeCo</span>
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded mr-1">つみたてNISA</span>
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded">個人年金</span>
                  </div>
                </div>
                
                <div className="p-3 bg-white rounded border">
                  <div className="font-medium mb-1">緊急資金</div>
                  <p className="text-sm text-gray-600 mb-1">
                    突発的な出費に備え、生活費3〜6ヶ月分を確保しましょう。
                  </p>
                  <div className="text-xs text-gray-500">
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded mr-1">普通預金</span>
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded">定期預金</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleComplete}
                disabled={!isSimulated}
              >
                シミュレーション完了
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SimulationAdjuster;
