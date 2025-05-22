
import { motion } from "framer-motion";
import ModuleCard from "../modules/ModuleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star } from "lucide-react";
import MascotCharacter from "../mascot/MascotCharacter";

const modules = [
  {
    id: 1,
    title: "家計管理",
    description: "予算を立てて収支を管理し、借入に頼らない生活を目指そう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    color: "#4DAA57",
    progress: 65,
    isLocked: false,
    badge: "bronze" as const,
    illustration: "/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png"
  },
  {
    id: 2,
    title: "投資",
    description: "少額からでも始められる投資の基本と長期的な資産形成",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
    color: "#60B8D4",
    progress: 10,
    isLocked: false,
    illustration: "/lovable-uploads/d4d69757-fa8b-4792-b80c-3a101f92b01b.png"
  },
  {
    id: 3,
    title: "リスク管理",
    description: "突然の出費や将来の不安に備えるリスク対策を学ぼう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
    color: "#FFD166",
    progress: 0,
    isLocked: false,
    illustration: "/lovable-uploads/9c9d440d-3eab-4a1e-913f-6152729a6ff8.png"
  },
  {
    id: 4,
    title: "ライフプラン",
    description: "人生の重要イベントに向けた長期的な資金計画を立てよう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    color: "#FF6B6B",
    progress: 10,
    isLocked: false,
    badge: "bronze" as const,
    illustration: "/lovable-uploads/c02ccb40-c19f-48d7-a805-8c3e5ac584e6.png"
  },
  {
    id: 5,
    title: "起業・副業",
    description: "小さなビジネスや副収入を得るためのスキルを身につけよう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    color: "#4D96FF",
    progress: 0,
    isLocked: false,
    illustration: "/lovable-uploads/536dafe2-25ff-4564-9aab-e16afe5152f8.png"
  },
];

const ModulesList = () => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="relative"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">学習モジュール</h2>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            <Star className="h-3 w-3 mr-1" />
            楽しく学ぼう
          </Badge>
        </div>
        
        <Tabs defaultValue="grid" className="w-auto">
          <TabsList className="h-8">
            <TabsTrigger value="grid" className="text-xs px-2 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </TabsTrigger>
            <TabsTrigger value="list" className="text-xs px-2 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Featured module with illustration - おすすめ badge removed */}
      <motion.div 
        className="mb-8 bg-gradient-to-br from-[#FFF5E6] to-[#FFEBEB] rounded-2xl p-5 shadow-sm relative overflow-hidden border border-amber-200/30"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
          <div className="md:w-1/2 relative">
            <img 
              src="/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png" 
              alt="家計管理イメージ" 
              className="rounded-xl h-36 md:h-48 w-full object-contain mx-auto"
            />
          </div>
          
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-xl font-bold text-primary">家計管理マスター</h3>
            <p className="text-sm text-gray-600">
              計算機とPigipeと一緒に、楽しく家計簿をつけながら節約のコツを学びましょう！毎月の収支をバランスよく管理する方法を身につけられます。
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500 mb-1">進捗</div>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '65%' }}></div>
                </div>
              </div>
              <motion.button 
                className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "/module/1"}
              >
                始める
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/30 to-primary/10 rounded-full blur-2xl -z-0"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/30 to-blue-200/20 rounded-full blur-xl -z-0"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </motion.div>
      
      {/* Module grid with illustrations */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.filter(module => module.id !== 1).map((module) => (
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
            illustration={module.illustration}
          />
        ))}
      </div>
      
      {/* Floating mascot character */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <MascotCharacter size="large" tooltip="モジュールを選んでね！お手伝いするブー！" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModulesList;
