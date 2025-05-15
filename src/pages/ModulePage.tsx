
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GameLayout from "@/components/layout/GameLayout";
import BudgetSimulation from "@/components/game/BudgetSimulation";
import InvestmentSimulation from "@/components/game/InvestmentSimulation";

const modules = [
  {
    id: 1,
    title: "家計管理",
    description: "予算を立てて収支を管理し、借入に頼らない生活を目指そう",
    component: BudgetSimulation,
  },
  {
    id: 2,
    title: "投資",
    description: "少額からでも始められる投資の基本と長期的な資産形成",
    component: InvestmentSimulation,
  },
  {
    id: 3,
    title: "リスク管理",
    description: "突然の出費や将来の不安に備えるリスク対策を学ぼう",
    component: null, // Will be implemented later
  },
  {
    id: 4,
    title: "ライフプラン",
    description: "人生の重要イベントに向けた長期的な資金計画を立てよう",
    component: null, // Will be implemented later
  },
  {
    id: 5,
    title: "起業・副業",
    description: "小さなビジネスや副収入を得るためのスキルを身につけよう",
    component: null, // Will be implemented later
  },
];

const ModulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState<any>(null);
  
  useEffect(() => {
    if (!id) return;
    
    const moduleId = parseInt(id);
    const foundModule = modules.find((m) => m.id === moduleId);
    
    if (foundModule) {
      setModule(foundModule);
    } else {
      navigate("/modules");
    }
  }, [id, navigate]);
  
  if (!module) {
    return null;
  }
  
  const ModuleComponent = module.component;
  
  return (
    <GameLayout currentModule={module.id}>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{module.title}</h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-sm font-medium text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            戻る
          </button>
        </div>
        <p className="text-gray-600">{module.description}</p>
      </div>
      
      {ModuleComponent ? (
        <ModuleComponent />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 shadow-sm">
          <div className="mb-4 text-5xl">🚧</div>
          <h2 className="mb-2 text-xl font-bold">準備中</h2>
          <p className="mb-6 text-center text-gray-600">
            このモジュールはまだ開発中です。もうしばらくお待ちください。
          </p>
          <button
            onClick={() => navigate("/")}
            className="game-button"
          >
            ホームに戻る
          </button>
        </div>
      )}
    </GameLayout>
  );
};

export default ModulePage;
