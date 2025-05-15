
import GameLayout from "@/components/layout/GameLayout";
import ModulesList from "@/components/home/ModulesList";

const ModulesListPage = () => {
  return (
    <GameLayout>
      <h1 className="mb-6 text-2xl font-bold">学習モジュール</h1>
      <ModulesList />
    </GameLayout>
  );
};

export default ModulesListPage;
