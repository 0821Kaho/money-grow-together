
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, X, Coins } from "lucide-react";

interface LearningCardProps {
  title: string;
  description: string;
  coinReward?: number;
  onClose: () => void;
  tipType?: "nisa" | "tax" | "compound" | "diversification" | "fees";
}

const LearningCard = ({ 
  title, 
  description, 
  coinReward = 5, 
  onClose,
  tipType = "nisa"
}: LearningCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  const handleClose = () => {
    setIsRevealed(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };
  
  // Get icon based on tip type
  const getTipIcon = () => {
    switch (tipType) {
      case "nisa":
        return <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
          <GraduationCap className="h-5 w-5" />
        </div>;
      case "tax":
        return <div className="bg-green-100 text-green-700 p-2 rounded-full">
          <Coins className="h-5 w-5" />
        </div>;
      case "compound":
        return <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
          <GraduationCap className="h-5 w-5" />
        </div>;
      case "diversification":
        return <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
          <GraduationCap className="h-5 w-5" />
        </div>;
      case "fees":
        return <div className="bg-red-100 text-red-700 p-2 rounded-full">
          <Coins className="h-5 w-5" />
        </div>;
      default:
        return <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
          <GraduationCap className="h-5 w-5" />
        </div>;
    }
  };

  return (
    <Card className="relative border-l-4 border-l-accent">
      <button 
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        onClick={handleClose}
        aria-label="閉じる"
      >
        <X className="h-4 w-4" />
      </button>
      
      <CardContent className="pt-6 pb-4">
        <div className="flex items-start space-x-3">
          {getTipIcon()}
          
          <div className="flex-1">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            
            {!isRevealed ? (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs"
                onClick={handleClose}
              >
                <span>読んだよ！</span>
                <div className="ml-1 flex items-center">
                  <Coins className="h-3.5 w-3.5 mr-0.5 text-amber-500" />
                  <span>+{coinReward}</span>
                </div>
              </Button>
            ) : (
              <div className="mt-2 text-xs flex items-center text-amber-500 font-medium">
                <Coins className="h-3.5 w-3.5 mr-0.5" />
                <span>+{coinReward} コイン獲得！</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningCard;
