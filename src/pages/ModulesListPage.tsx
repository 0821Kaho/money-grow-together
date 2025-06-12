
import GameLayout from "@/components/layout/GameLayout";
import ModulesList from "@/components/home/ModulesList";

const ModulesListPage = () => {
  return (
    <GameLayout>
      <div className="bg-gradient-to-r from-pigipePink to-pigipePinkLight p-6 rounded-2xl mb-6">
        <div className="text-center text-white">
          <h1 className="text-3xl font-heading font-bold mb-2">学習モジュール</h1>
          <p className="text-white/80">あなたのペースで学べるお金の基礎知識</p>
        </div>
      </div>
      <ModulesList />
    </GameLayout>
  );
};

export default ModulesListPage;
