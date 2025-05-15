
import { Progress } from "@/components/ui/progress";

const ModuleProgress = ({ currentModule }: { currentModule: number }) => {
  const totalModules = 5;
  const progress = (currentModule / totalModules) * 100;

  const moduleNames = [
    "家計管理",
    "投資",
    "リスク管理",
    "ライフプラン",
    "起業"
  ];

  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{moduleNames[currentModule - 1] || "モジュール"}</span>
        <span className="text-sm font-medium">{currentModule}/{totalModules}</span>
      </div>
      <Progress 
        value={progress} 
        className={progress === 100 ? "bg-[#E0E0E0]" : "bg-[#E0E0E0]"}
        indicatorClassName={progress === 100 ? "bg-[#FFD700]" : "bg-primary"}
      />
    </div>
  );
};

export default ModuleProgress;
