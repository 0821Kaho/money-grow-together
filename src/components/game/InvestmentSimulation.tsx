
import { useState } from "react";
import InvestmentPlantGarden from "./InvestmentPlantGarden";
import InvestmentStoryIntro from "./investment/InvestmentStoryIntro";
import InvestmentCalculator from "./investment/InvestmentCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const InvestmentSimulation = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [goal, setGoal] = useState(1000000); // Default to 1,000,000 yen (1 million)
  
  const handleIntroComplete = () => {
    setShowIntro(false);
    toast({
      title: "魔法の植物園へようこそ！",
      description: "資産形成の冒険を始めましょう",
    });
  };

  const handleGoalSet = (newGoal: number) => {
    // Ensure minimum goal of 100,000 yen
    setGoal(Math.max(100000, newGoal));
  };

  if (showIntro) {
    return (
      <InvestmentStoryIntro 
        onComplete={handleIntroComplete} 
        initialGoal={goal}
        onGoalSet={handleGoalSet}
      />
    );
  }

  return (
    <Tabs defaultValue="garden" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="garden">投資の庭</TabsTrigger>
        <TabsTrigger value="calculator">積立シミュレーター</TabsTrigger>
      </TabsList>
      <TabsContent value="garden">
        <InvestmentPlantGarden initialGoal={goal} />
      </TabsContent>
      <TabsContent value="calculator">
        <InvestmentCalculator />
      </TabsContent>
    </Tabs>
  );
};

export default InvestmentSimulation;
