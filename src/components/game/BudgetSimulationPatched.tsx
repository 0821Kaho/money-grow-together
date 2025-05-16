
import { Card, CardContent } from "@/components/ui/card";
import BudgetModules from "./budget/BudgetModules";

const BudgetSimulationPatched = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">家計管理サバイバル</h2>
          <p className="text-gray-600">
            一ヶ月を乗り切る家計管理チャレンジに挑戦しましょう！給料から生活費をやりくりし、借金せずに月末までサバイバルできれば成功です。
            日々のイベントに対して賢い選択をして所持金を管理し、もしもの時に誘惑してくる高金利ローンを回避しましょう。
            計画的な家計管理で「家計サバイバー」バッジを目指せ！
          </p>
        </div>
        <BudgetModules />
      </CardContent>
    </Card>
  );
};

export default BudgetSimulationPatched;
