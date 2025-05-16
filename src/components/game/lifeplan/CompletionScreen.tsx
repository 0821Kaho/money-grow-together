
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LifeEvent, FinancialPlan } from "./LifePlanModules";
import { motion } from "framer-motion";
import { Trophy, Download, Check, ArrowRight } from "lucide-react";

interface CompletionScreenProps {
  events: LifeEvent[];
  financialPlan: FinancialPlan;
  onComplete: () => void;
  disabled?: boolean;
}

const CompletionScreen = ({ 
  events, 
  financialPlan, 
  onComplete, 
  disabled = false 
}: CompletionScreenProps) => {
  const [showBadge, setShowBadge] = useState(false);
  
  // Show badge animation after a short delay
  useEffect(() => {
    if (!disabled) {
      const timer = setTimeout(() => {
        setShowBadge(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [disabled]);
  
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
  
  // Generate personalized summary
  const generateSummary = () => {
    if (!events.length || !financialPlan.simulationResults) return null;
    
    const firstEvent = events.sort((a, b) => a.age - b.age)[0];
    const lastEvent = events.sort((a, b) => b.age - a.age)[0];
    const hasEducation = events.some(e => e.type === "education");
    const hasHousing = events.some(e => e.type === "housing");
    const hasRetirement = events.some(e => e.type === "retirement");
    const hasFamily = events.some(e => e.type === "marriage" || e.type === "childbirth");
    
    const results = financialPlan.simulationResults;
    const finalResult = results[results.length - 1];
    const isSavingPositive = finalResult.savings > 0;
    
    let summary = "";
    
    // Personalized intro
    summary += `あなたの人生設計では${firstEvent.age}歳から${lastEvent.age}歳までの${lastEvent.age - firstEvent.age}年間における`;
    
    // Key events mention
    const eventTypes = [];
    if (hasEducation) eventTypes.push("教育");
    if (hasHousing) eventTypes.push("住宅購入");
    if (hasFamily) eventTypes.push("家族形成");
    if (hasRetirement) eventTypes.push("退職後の生活");
    
    if (eventTypes.length > 0) {
      summary += `${eventTypes.join('、')}`;
    }
    
    summary += "などの重要なライフイベントに向けた資金計画を立てました。";
    
    // Financial assessment
    if (isSavingPositive) {
      summary += `月々${formatCurrency(financialPlan.monthlySavings)}の貯蓄を続けることで、将来に必要な資金を確保できる見通しです。`;
    } else {
      summary += `計画では資金が不足する可能性があります。月々の貯蓄額を増やすか、支出を見直すことをお勧めします。`;
    }
    
    // Next steps recommendation
    summary += "この計画をもとに、定期的な見直しを行いながら着実に資産形成を進めていくことが大切です。";
    
    return summary;
  };
  
  const summary = generateSummary();
  
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
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: showBadge ? 1 : 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="mx-auto mb-6"
              >
                <div className="relative inline-block">
                  <div className="bg-primary/20 rounded-full p-8">
                    <div className="bg-primary/30 rounded-full p-6">
                      <div className="bg-primary text-white rounded-full p-5">
                        <Trophy className="h-12 w-12" />
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: showBadge ? 1 : 0, opacity: showBadge ? 1 : 0 }}
                    transition={{ delay: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showBadge ? 1 : 0, y: showBadge ? 0 : 20 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-bold mb-2">おめでとうございます！</h3>
                <p className="text-gray-600 mb-6">
                  ライフプランの作成が完了し、「ライフプランナー」バッジを獲得しました！
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showBadge ? 1 : 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium mb-3">あなたのライフプラン・サマリー</h4>
                
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {summary}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-xs text-gray-500 mb-1">計画イベント数</div>
                    <div className="text-xl font-bold">{events.length}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-xs text-gray-500 mb-1">合計必要資金</div>
                    <div className="text-xl font-bold">
                      {formatCurrency(events.reduce((sum, e) => sum + e.cost, 0))}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-xs text-gray-500 mb-1">月間貯蓄計画</div>
                    <div className="text-xl font-bold">{formatCurrency(financialPlan.monthlySavings)}</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8 p-4 bg-white rounded-lg border">
                <h4 className="font-medium mb-3">これからのステップ</h4>
                
                <div className="space-y-3">
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">
                      1
                    </div>
                    <div>
                      <div className="font-medium">計画を実行に移しましょう</div>
                      <p className="text-sm text-gray-600">
                        設定した月々の貯蓄額を実際に積み立て始めましょう。銀行の自動振替などを活用すると継続しやすくなります。
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">
                      2
                    </div>
                    <div>
                      <div className="font-medium">定期的に計画を見直す</div>
                      <p className="text-sm text-gray-600">
                        ライフプランは固定ではありません。収入の変化や新たなイベントに応じて、定期的に見直しましょう。
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">
                      3
                    </div>
                    <div>
                      <div className="font-medium">他の金融知識を深める</div>
                      <p className="text-sm text-gray-600">
                        投資や保険についてもっと学んで、より効率的な資産形成を目指しましょう。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  プランを保存
                </Button>
                
                <Button 
                  onClick={onComplete} 
                  className="flex items-center gap-1"
                >
                  完了 
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CompletionScreen;
