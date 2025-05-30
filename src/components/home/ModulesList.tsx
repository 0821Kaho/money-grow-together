

import { motion } from "framer-motion";
import ModuleCard from "../modules/ModuleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MascotCharacter from "../mascot/MascotCharacter";
import { ArrowRight } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "家計管理マスター",
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
    title: "投資マスター",
    description: "少額からでも始められる投資の基本と長期的な資産形成",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
    color: "#60B8D4",
    progress: 10,
    isLocked: false,
    illustration: "/lovable-uploads/d4d69757-fa8b-4792-b80c-3a101f92b01b.png"
  },
  {
    id: 3,
    title: "リスク管理マスター",
    description: "突然の出費や将来の不安に備えるリスク対策を学ぼう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
    color: "#FFD166",
    progress: 0,
    isLocked: false,
    illustration: "/lovable-uploads/9c9d440d-3eab-4a1e-913f-6152729a6ff8.png"
  },
  {
    id: 4,
    title: "ライフプランマスター",
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
    title: "副業・起業マスター",
    description: "小さなビジネスや副収入を得るためのスキルを身につけよう",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    color: "#4D96FF",
    progress: 0,
    isLocked: false,
    illustration: "/lovable-uploads/536dafe2-25ff-4564-9aab-e16afe5152f8.png"
  },
];

// Get background gradient based on color
const getBgGradient = (color: string) => {
  if (color === "#4DAA57") return "from-[#E8F5EA] to-[#F5F9F6]"; // Green
  if (color === "#60B8D4") return "from-[#E6F4F9] to-[#F5FAFC]"; // Blue 
  if (color === "#FFD166") return "from-[#FFF5E6] to-[#FFFBF5]"; // Yellow
  if (color === "#FF6B6B") return "from-[#FFEBEB] to-[#FFF5F5]"; // Red
  if (color === "#4D96FF") return "from-[#EBF5FF] to-[#F5F9FF]"; // Blue
  return "from-[#F5F5F5] to-[#FFFFFF]"; // Default
};

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

      {/* Featured modules - consistent cards with illustrations */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {modules.map((module) => (
          <motion.div
            key={module.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 * module.id / 5 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)" }}
            className={`rounded-2xl p-5 shadow-sm relative overflow-hidden border-4 bg-gradient-to-br ${getBgGradient(module.color)}`}
            style={{ borderColor: `${module.color}85` }}
          >
            <div className="flex flex-col gap-4 relative z-10">
              <div className="relative">
                <img 
                  src={module.illustration} 
                  alt={`${module.title}イメージ`} 
                  className="rounded-xl h-32 w-full object-contain mx-auto"
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-bold" style={{ color: module.color }}>{module.title}</h3>
                
                <p className="text-sm text-gray-600">
                  {module.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="w-full mr-3">
                    <div className="mb-1 flex justify-between">
                      <span className="text-xs font-medium">進捗</span>
                      <span className="text-xs font-medium">{module.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full"
                        style={{ 
                          width: `${module.progress}%`, 
                          backgroundColor: module.progress === 100 ? "#4CAF50" : module.color
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Updated button design */}
                  <motion.button 
                    className="w-[104px] px-0 py-1.5 bg-game-primary hover:bg-game-primary/90 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1 whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = `/module/${module.id}`}
                  >
                    始める
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
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

