
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Rocket } from "lucide-react";
import StartupLearningModules from "./startup/StartupLearningModules";
import StartupSimulation from "./startup/StartupSimulation";

const StartupSideBusinessSimulation = () => {
  const [activeTab, setActiveTab] = useState<string>("introduction");

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">起業・副業スキルマスター</h2>
          <p className="text-gray-600 break-words whitespace-normal">
            あなたの得意なことや好きなことを活かして副収入を得るスキルを身につけましょう。
            このモジュールでは、ライフプランの作成から実践的な副業アイデアの発想まで、
            「自分にもできそうだ」と感じられるステップで学べます。
            小さな一歩から始めて、将来の夢を叶える資金計画を立てましょう！
          </p>
        </div>

        <Tabs defaultValue="introduction" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="introduction" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className="text-sm sm:text-base">学習モジュール</span>
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              <span className="text-sm sm:text-base">副業シミュレーション</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="introduction" className="mt-0">
            <StartupLearningModules />
          </TabsContent>
          
          <TabsContent value="simulation" className="mt-0">
            <StartupSimulation />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StartupSideBusinessSimulation;
