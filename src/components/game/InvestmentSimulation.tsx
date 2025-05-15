
import { useState } from "react";
import InvestmentPlantGarden from "./InvestmentPlantGarden";
import InvestmentStoryIntro from "./investment/InvestmentStoryIntro";
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

  return (
    <>
      {showIntro ? (
        <InvestmentStoryIntro 
          onComplete={handleIntroComplete} 
          initialGoal={goal}
          onGoalSet={handleGoalSet}
        />
      ) : (
        <InvestmentPlantGarden initialGoal={goal} />
      )}
    </>
  );
};

export default InvestmentSimulation;
