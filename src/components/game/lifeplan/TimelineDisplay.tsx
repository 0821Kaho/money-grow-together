
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LifeEvent } from "./LifePlanModules";
import { ChartContainer } from "@/components/ui/chart";
import { School, Briefcase, Heart, Baby, Home, Coffee, Calendar } from "lucide-react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  ReferenceDot,
  Label
} from "recharts";

interface TimelineDisplayProps {
  events: LifeEvent[];
  onComplete: () => void;
  disabled?: boolean;
}

const TimelineDisplay = ({ events, onComplete, disabled = false }: TimelineDisplayProps) => {
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  
  // Helper to get icon component
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case "School": return <School className="h-5 w-5" />;
      case "Briefcase": return <Briefcase className="h-5 w-5" />;
      case "Heart": return <Heart className="h-5 w-5" />;
      case "Baby": return <Baby className="h-5 w-5" />;
      case "Home": return <Home className="h-5 w-5" />;
      case "Coffee": return <Coffee className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };
  
  // Generate timeline data when events change
  useEffect(() => {
    if (events.length === 0) return;
    
    // Find min and max age to create a complete timeline
    const minAge = Math.min(...events.map(e => e.age));
    const maxAge = Math.max(...events.map(e => e.age)) + 5;
    
    // Create data points for each year
    const data = [];
    
    for (let age = Math.max(18, minAge - 2); age <= maxAge; age++) {
      // Get events for this age
      const eventsAtThisAge = events.filter(e => e.age === age);
      
      data.push({
        age,
        year: events[0].year - (events[0].age - age),
        events: eventsAtThisAge,
        markers: eventsAtThisAge.length > 0,
        totalCost: eventsAtThisAge.reduce((sum, e) => sum + e.cost, 0),
      });
    }
    
    setTimelineData(data);
  }, [events]);
  
  const formatCost = (cost: number) => {
    if (cost >= 10000000) {
      return `${(cost / 10000000).toFixed(1)}億円`;
    } else {
      return `${(cost / 10000).toLocaleString()}万円`;
    }
  };
  
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
              <h3 className="text-md font-medium mb-2">あなたのライフプラン・タイムライン</h3>
              <p className="text-sm text-gray-500 mb-4">
                選択したライフイベントに基づいて、あなたの人生のタイムラインを確認しましょう。
                イベントをクリックすると詳細が表示されます。
              </p>
            </div>
            
            {/* Timeline chart */}
            <div className="mb-8 bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium mb-4">ライフイベント年表</h4>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    primary: {
                      color: "#BE123C",
                      label: "イベントポイント"
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="age"
                        label={{ value: '年齢', position: 'bottom', offset: 0 }}
                      />
                      <YAxis 
                        label={{ 
                          value: '人生イベント', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { textAnchor: 'middle' } 
                        }}
                        tick={false}
                        domain={[0, 1]}
                        hide
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length && payload[0].payload.events?.length > 0) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 shadow-md rounded-md border">
                                <p className="text-sm font-medium">{data.age}歳（{data.year}年）</p>
                                <div className="mt-2 space-y-2">
                                  {data.events.map((event: LifeEvent) => (
                                    <div key={event.id} className="flex items-center">
                                      <span className="flex-shrink-0 mr-2 text-primary">
                                        {getIconComponent(event.icon)}
                                      </span>
                                      <div>
                                        <p className="text-sm font-medium">{event.title}</p>
                                        <p className="text-xs text-gray-500">
                                          {formatCost(event.cost)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="markers"
                        stroke="transparent"
                        isAnimationActive={false}
                        dot={false}
                      />
                      {timelineData
                        .filter(point => point.events?.length > 0)
                        .map((point, index) => (
                          <ReferenceDot
                            key={`dot-${index}`}
                            x={point.age}
                            y={0.5}
                            r={6}
                            fill="#BE123C"
                            stroke="white"
                            strokeWidth={2}
                            onClick={() => setSelectedEvent(point.events[0])}
                            className="cursor-pointer"
                          />
                        ))
                      }
                      {/* Add key life stage references */}
                      <ReferenceLine
                        x={20}
                        stroke="#ccc"
                        strokeDasharray="3 3"
                        label={{ value: '成人', position: 'top' }}
                      />
                      <ReferenceLine
                        x={40}
                        stroke="#ccc"
                        strokeDasharray="3 3"
                        label={{ value: '中年期', position: 'top' }}
                      />
                      <ReferenceLine
                        x={65}
                        stroke="#ccc"
                        strokeDasharray="3 3"
                        label={{ value: '退職', position: 'top' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            
            {/* Event cards */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">主要ライフイベント</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.map(event => (
                  <button
                    key={event.id}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      selectedEvent?.id === event.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="rounded-full p-1 bg-primary/10 mr-2 text-primary">
                        {getIconComponent(event.icon)}
                      </div>
                      <div className="font-medium">{event.title}</div>
                      <div className="ml-auto text-sm font-medium">{event.age}歳</div>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{formatCost(event.cost)}</div>
                    <div className="text-xs text-gray-500">{event.year}年</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Event details */}
            {selectedEvent && (
              <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium mb-2">{selectedEvent.title} の詳細</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">年齢:</span> {selectedEvent.age}歳
                  </div>
                  <div>
                    <span className="text-gray-500">年:</span> {selectedEvent.year}年
                  </div>
                  <div>
                    <span className="text-gray-500">費用:</span> {formatCost(selectedEvent.cost)}
                  </div>
                  {selectedEvent.description && (
                    <div className="col-span-2">
                      <span className="text-gray-500">メモ:</span> {selectedEvent.description}
                    </div>
                  )}
                </div>
                
                {/* Tips based on event type */}
                <div className="mt-4 text-xs bg-white p-3 rounded border">
                  <div className="font-medium mb-1">準備のヒント</div>
                  {selectedEvent.type === "education" && (
                    <p>教育費用の準備には、奨学金や教育ローン、学資保険などの選択肢があります。早めに貯蓄を始めると負担が軽減されます。</p>
                  )}
                  {selectedEvent.type === "job" && (
                    <p>新しい職場での始まりは、キャリア計画と資産形成の重要な出発点です。初期からの積立投資をご検討ください。</p>
                  )}
                  {selectedEvent.type === "marriage" && (
                    <p>結婚費用は事前の貯蓄計画が重要です。式の規模や予算を柔軟に考え、二人で話し合って決めましょう。</p>
                  )}
                  {selectedEvent.type === "childbirth" && (
                    <p>出産費用には健康保険から出産育児一時金が支給されます。また育児には児童手当や、教育費の積立も検討しましょう。</p>
                  )}
                  {selectedEvent.type === "housing" && (
                    <p>住宅購入には頭金の準備と住宅ローンの金利比較が重要です。無理のない返済計画を立てましょう。</p>
                  )}
                  {selectedEvent.type === "retirement" && (
                    <p>老後資金は公的年金に加え、個人年金やiDeCo、つみたてNISAなどの制度を活用した長期的な資産形成が効果的です。</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <Button onClick={onComplete}>
                タイムライン確認完了
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TimelineDisplay;
