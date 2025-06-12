
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

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

  return (
    <section className="px-4 py-section">
      <div className="bg-white p-5 rounded-lg max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">{moduleNames[currentModule - 1] || "モジュール"}</span>
            
            {/* Module completion tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[11px] font-medium bg-pigipeGreen/20 text-pigipeGreenDark px-2 py-0.5 rounded-full cursor-help">
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
          <div className="h-2.5 rounded-full bg-gray-200">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                progress === 100 ? "bg-pigipeGreen" : "bg-pigipePink"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleProgress;
