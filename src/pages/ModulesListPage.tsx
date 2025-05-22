
import GameLayout from "@/components/layout/GameLayout";
import ModulesList from "@/components/home/ModulesList";

const ModulesListPage = () => {
  return (
    <GameLayout>
      {/* Removed the duplicate heading */}
      <ModulesList />
    </GameLayout>
  );
};

export default ModulesListPage;
