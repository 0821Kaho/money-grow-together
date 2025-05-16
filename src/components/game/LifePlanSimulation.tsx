
import LifePlanModules from "./lifeplan/LifePlanModules";

const LifePlanSimulation = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold mb-2">ライフプラン・シミュレーション</h1>
        <p className="text-gray-600 mb-4">
          人生の主要なイベントに必要なお金を計画し、将来への備えを学びましょう。
          未来のライフイベントを選択して、そのための資金計画を立てていきます。
        </p>
        
        <LifePlanModules />
      </div>
    </div>
  );
};

export default LifePlanSimulation;
