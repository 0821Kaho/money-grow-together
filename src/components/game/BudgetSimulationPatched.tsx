
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BudgetModules from "./budget/BudgetModules";
import BudgetSimulation from "./BudgetSimulation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CalendarCheck2, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MascotCharacter from "../mascot/MascotCharacter";
import { useIsMobile } from "@/hooks/use-mobile";

const BudgetSimulationPatched = () => {
  const [activeTab, setActiveTab] = useState<string>("simulation");
  const [mascotPosition, setMascotPosition] = useState<"left" | "right">("left");
  const [hasNewContent, setHasNewContent] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Animate mascot when tab changes
    setMascotPosition(activeTab === "simulation" ? "left" : "right");
    
    // Reset new content notification when visiting a tab
    if (activeTab === "modules") {
      setHasNewContent(false);
    }
  }, [activeTab]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">家計管理サバイバル</h2>
            
            {/* Encouraging phrase from Pigipe */}
            <div className="flex items-center">
              <MascotCharacter 
                size="small" 
                className="mr-2 h-8 w-8"
              />
              <span className="text-sm text-game-primary font-semibold italic">
                1か月乗り切ろうブー！
              </span>
            </div>
          </div>
          <p className="text-gray-600 break-words whitespace-normal leading-relaxed">
            一ヶ月を乗り切る<span className="text-game-primary font-medium">家計管理チャレンジ</span>に挑戦しましょう！
            <span className="text-game-accent font-medium">給料</span>から<span className="text-game-secondary font-medium">生活費</span>をやりくりし、
            <span className="text-game-danger font-medium">借金</span>せずに月末までサバイバルできれば成功です。
            日々のイベントに対して賢い選択をして所持金を管理し、もしもの時に誘惑してくる高金利ローンを回避しましょう。
            計画的な<span className="text-[#25B589] font-medium">家計管理</span>で「家計サバイバー」バッジを目指せ！
          </p>
        </div>

        <Tabs defaultValue="simulation" className="w-full" onValueChange={setActiveTab}>
          <div className="relative">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="simulation" className="flex items-center gap-2 relative">
                <CalendarCheck2 className="h-4 w-4" />
                <span className="text-sm sm:text-base">カレンダーシミュレーション</span>
              </TabsTrigger>
              <TabsTrigger value="modules" className="flex items-center gap-2 relative">
                <Calendar className="h-4 w-4" />
                <span className="text-sm sm:text-base">学習モジュール</span>
                
                {/* New content notification badge */}
                {hasNewContent && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    <Bell className="h-2 w-2" />
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            {/* Jumping mascot animation */}
            <AnimatePresence>
              <motion.div
                key={mascotPosition}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="absolute top-0"
                style={{ 
                  left: mascotPosition === "left" ? "15%" : "65%",
                  transform: "translateX(-50%) translateY(-100%)"
                }}
              >
                <MascotCharacter size="small" className="h-6 w-6" />
              </motion.div>
            </AnimatePresence>
          </div>
          
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
