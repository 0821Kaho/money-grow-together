
import { motion } from "framer-motion";
import ModuleCard from "../modules/ModuleCard";

const modules = [
  {
    id: 1,
    title: "家計管理",
    description: "予算を立てて収支を管理し、借入に頼らない生活を目指そう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    color: "#4DAA57",
    progress: 65,
    isLocked: false,
  },
  {
    id: 2,
    title: "投資",
    description: "少額からでも始められる投資の基本と長期的な資産形成",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
    color: "#60B8D4",
    progress: 10,
    isLocked: false,
  },
  {
    id: 3,
    title: "リスク管理",
    description: "突然の出費や将来の不安に備えるリスク対策を学ぼう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
    color: "#FFD166",
    progress: 0,
    isLocked: false,
  },
  {
    id: 4,
    title: "ライフプラン",
    description: "人生の重要イベントに向けた長期的な資金計画を立てよう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h-2a2 2 0 00-2-2z" /></svg>',
    color: "#FF6B6B",
    progress: 10,
    isLocked: false,
    badge: "bronze"
  },
  {
    id: 5,
    title: "起業・副業",
    description: "小さなビジネスや副収入を得るためのスキルを身につけよう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    color: "#4D96FF",
    progress: 0,
    isLocked: true,
  },
];

const ModulesList = () => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">学習モジュール</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            id={module.id}
            title={module.title}
            description={module.description}
            icon={module.icon}
            color={module.color}
            progress={module.progress}
            isLocked={module.isLocked}
            badge={module.badge}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ModulesList;
