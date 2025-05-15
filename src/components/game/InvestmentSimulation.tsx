
import { useState } from "react";
import InvestmentPlantGarden from "./InvestmentPlantGarden";
import InvestmentStoryIntro from "./investment/InvestmentStoryIntro";
import { toast } from "@/components/ui/use-toast";

const InvestmentSimulation = () => {
  const [showIntro, setShowIntro] = useState(true);
  
  const handleIntroComplete = () => {
    setShowIntro(false);
    toast({
      title: "魔法の植物園へようこそ！",
      description: "資産形成の冒険を始めましょう",
    });
  };

  return (
    <>
      {showIntro ? (
        <InvestmentStoryIntro onComplete={handleIntroComplete} />
      ) : (
        <InvestmentPlantGarden />
      )}
    </>
  );
};

export default InvestmentSimulation;
