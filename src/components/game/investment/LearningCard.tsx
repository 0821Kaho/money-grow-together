
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, X, Coins, Info, Shield, TrendingUp, ChartPie } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface LearningCardProps {
  title: string;
  description: string;
  coinReward?: number;
  onClose: () => void;
  tipType?: "nisa" | "tax" | "compound" | "diversification" | "fees";
  icon?: React.ReactNode;
}

const LearningCard = ({ 
  title, 
  description, 
  coinReward = 5, 
  onClose,
  tipType = "nisa",
  icon
}: LearningCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  const handleClose = () => {
    setIsRevealed(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  // Get badge label based on tip type
  const getBadgeLabel = () => {
    switch (tipType) {
      case "nisa":
        return "税制優遇";
      case "tax":
        return "節税効果";
      case "compound":
        return "複利の力";
      case "diversification":
        return "分散投資";
      case "fees":
        return "コスト削減";
      default:
        return "投資の知恵";
    }
  };
  
  // Get icon and colors based on tip type
  const getTipIcon = () => {
    switch (tipType) {
      case "nisa":
        return {
          icon: icon || <Shield className="h-5 w-5" />,
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          tooltipText: "税金がかからず、長期的に大きな差になります"
        };
      case "tax":
        return {
          icon: icon || <Coins className="h-5 w-5" />,
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          tooltipText: "支払う税金を減らして、手元に残るお金を増やします"
        };
      case "compound":
        return {
          icon: icon || <TrendingUp className="h-5 w-5" />,
          bgColor: "bg-purple-100",
          textColor: "text-purple-700",
          tooltipText: "利益が利益を生み、時間とともに加速度的に増えます"
        };
      case "diversification":
        return {
          icon: icon || <ChartPie className="h-5 w-5" />,
          bgColor: "bg-amber-100",
          textColor: "text-amber-700",
          tooltipText: "卵を複数のカゴに分けて、リスクを減らします"
        };
      case "fees":
        return {
          icon: icon || <Coins className="h-5 w-5" />,
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          tooltipText: "小さな手数料の差も、長期では大きな金額になります"
        };
      default:
        return {
          icon: icon || <GraduationCap className="h-5 w-5" />,
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          tooltipText: "投資の基本を学んで、賢い選択をしましょう"
        };
    }
  };

  const tipStyle = getTipIcon();

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
          <div className={`${tipStyle.bgColor} ${tipStyle.textColor} p-2 rounded-full`}>
            {tipStyle.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h3 className="text-sm font-medium mr-2">{title}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {getBadgeLabel()}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[200px]">{tipStyle.tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
