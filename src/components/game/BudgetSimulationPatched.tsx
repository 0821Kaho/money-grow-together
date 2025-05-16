
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BudgetModules from "./budget/BudgetModules";
import BudgetSimulation from "./BudgetSimulation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CalendarCheck2 } from "lucide-react";

const BudgetSimulationPatched = () => {
  const [activeTab, setActiveTab] = useState<string>("simulation");

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">家計管理サバイバル</h2>
          <p className="text-gray-600 break-words whitespace-normal">
            一ヶ月を乗り切る家計管理チャレンジに挑戦しましょう！給料から生活費をやりくりし、借金せずに月末までサバイバルできれば成功です。
            日々のイベントに対して賢い選択をして所持金を管理し、もしもの時に誘惑してくる高金利ローンを回避しましょう。
            計画的な家計管理で「家計サバイバー」バッジを目指せ！
          </p>
        </div>

        <Tabs defaultValue="simulation" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <CalendarCheck2 className="h-4 w-4" />
              <span className="text-sm sm:text-base">カレンダーシミュレーション</span>
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm sm:text-base">学習モジュール</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="simulation" className="mt-0">
            <BudgetSimulation />
          </TabsContent>
          
          <TabsContent value="modules" className="mt-0">
            <BudgetModules />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BudgetSimulationPatched;
