
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GameLayout from "@/components/layout/GameLayout";
import BudgetSimulationPatched from "@/components/game/BudgetSimulationPatched";
import InvestmentSimulation from "@/components/game/InvestmentSimulation";
import RiskManagementSimulation from "@/components/game/RiskManagementSimulation";
import LifePlanSimulation from "@/components/game/LifePlanSimulation";
import StartupSideBusinessSimulation from "@/components/game/StartupSideBusinessSimulation";
import MascotTooltip from "@/components/mascot/MascotTooltip";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import { useModules } from "@/hooks/useModules";

const modules = [
  {
    id: 1,
    title: "家計管理",
    description: "予算を立てて収支を管理し、借入に頼らない生活を目指そう。カレンダー形式で1か月のサバイバルチャレンジを体験！",
    component: BudgetSimulationPatched,
    mascotMessages: [
      "家計管理の基本を学んでいきましょう！",
      "収入と支出のバランスが大切です！",
      "予算を立てることで無駄遣いを減らせますよ！",
      "高金利のローンには要注意！計画的な支出を心がけましょう！"
    ]
  },
  {
    id: 2,
    title: "投資",
    description: "少額からでも始められる投資の基本と長期的な資産形成",
    component: InvestmentSimulation,
    mascotMessages: [
      "投資の世界へようこそ！",
      "長期的な視点で考えることが大切です！",
      "分散投資でリスクを減らしましょう！"
    ]
  },
  {
    id: 3,
    title: "リスク管理",
    description: "突然の出費や将来の不安に備えるリスク対策を学ぼう",
    component: RiskManagementSimulation,
    mascotMessages: [
      "リスク管理は将来の安心につながります！",
      "備えあれば憂いなしです！",
      "万が一の事態に備えておきましょう！"
    ]
  },
  {
    id: 4,
    title: "ライフプラン",
    description: "人生の重要イベントに向けた長期的な資金計画を立てよう",
    component: LifePlanSimulation,
    mascotMessages: [
      "人生の重要イベントにはお金が必要です！",
      "計画的に貯蓄することが大切です！",
      "将来を見据えて今からできることを始めましょう！"
    ]
  },
  {
    id: 5,
    title: "起業・副業",
    description: "小さなビジネスや副収入を得るためのスキルを身につけよう",
    component: StartupSideBusinessSimulation,
    mascotMessages: [
      "新しい収入源を見つけましょう！",
      "あなたのスキルを活かす方法を考えてみましょう！",
      "小さく始めて、徐々に成長させていくのがコツです！",
      "副業は特別なものではなく、誰でも始められるものです！"
    ]
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
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">モジュールを読み込み中...</p>
        </div>
      </div>
    );
  }
  
  const ModuleComponent = module.component;
  
  return (
    <GameLayout currentModule={module.id}>
      <div className="mb-6 relative">
        {/* Background ornaments */}
        <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-pigipeYellow/5 blur-xl" />
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-pigipeBlue/10 transform rotate-45 blur-sm" />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <motion.h1 
              className="text-2xl font-heading font-bold -mt-4"
              initial={{ scale: 0.9, y: -8, opacity: 0.8 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {module.title}
            </motion.h1>
            <MascotTooltip messages={module.mascotMessages} position="bottom" characterSize="small" />
          </div>
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-sm font-body font-medium text-gray-500 hover:text-pigipePink transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
          </motion.button>
        </div>
        <p className="font-body text-gray-600">{module.description}</p>
      </div>
      
      {ModuleComponent ? (
        <ModuleComponent />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 shadow-sm">
          <div className="mb-4 text-5xl">🚧</div>
          <h2 className="mb-2 text-xl font-heading font-subheading">準備中</h2>
          <p className="mb-6 text-center font-body text-gray-600">
            このモジュールはまだ開発中です。もうしばらくお待ちください。
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="game-button font-number font-bold"
            >
              ホームに戻る
            </button>
            <MascotCharacter size="small" />
          </div>
        </div>
      )}
    </GameLayout>
  );
};

export default ModulePage;
