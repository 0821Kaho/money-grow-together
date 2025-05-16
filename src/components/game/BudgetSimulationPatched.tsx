
import { Card, CardContent } from "@/components/ui/card";
import BudgetModules from "./budget/BudgetModules";

const BudgetSimulationPatched = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <BudgetModules />
      </CardContent>
    </Card>
  );
};

export default BudgetSimulationPatched;
