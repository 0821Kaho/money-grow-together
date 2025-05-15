
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
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{moduleNames[currentModule - 1] || "モジュール"}</span>
        <span className="text-sm font-medium">{currentModule}/{totalModules}</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ModuleProgress;
