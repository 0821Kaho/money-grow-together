
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import MascotCharacter from "../mascot/MascotCharacter";
import { motion } from "framer-motion";

interface ModuleProgressProps {
  currentModule: number;
}

const ModuleProgress = ({ currentModule }: ModuleProgressProps) => {
  const totalModules = 5;
  const progress = (currentModule / totalModules) * 100;
  const remainingModules = totalModules - currentModule;

  const moduleNames = [
    "家計管理",
    "投資",
    "リスク管理",
    "ライフプラン",
    "起業"
  ];

  // Mascot position based on progress
  const mascotPosition = `${Math.min(Math.max(progress - 5, 0), 95)}%`;

  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">{moduleNames[currentModule - 1] || "モジュール"}</span>
          
          {/* Module completion tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs bg-game-accent/20 text-game-accent px-2 py-0.5 rounded-full cursor-help">
                  あと{remainingModules}モジュールで完了！
                </span>
              </TooltipTrigger>
              <TooltipContent className="font-bubble">
                <p>頑張ってるブー！{remainingModules === 0 ? "全部完了したブー！" : `残りは${remainingModules}つだブー！`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="text-sm font-medium">{currentModule}/{totalModules}</span>
      </div>
      
      <div className="relative">
        <Progress 
          value={progress} 
          className="bg-[#E0E0E0] h-4"
          indicatorClassName={progress === 100 ? "bg-[#FFD700]" : "bg-primary"}
        />
        
        {/* Mascot character moving along progress bar */}
        <motion.div 
          className="absolute top-0 transform -translate-y-1/2"
          style={{ left: mascotPosition }}
          initial={{ x: 0 }}
          animate={{ x: 0, y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <MascotCharacter 
            size="small" 
            className="h-8 w-8"
            tooltip={progress >= 90 ? "もうすぐ完了ブー！" : 
                    progress >= 50 ? "半分終わったブー！" : 
                    "頑張ろうブー！"}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ModuleProgress;
