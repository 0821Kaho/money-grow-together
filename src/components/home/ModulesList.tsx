
import { motion } from "framer-motion";
import ModuleCard from "../modules/ModuleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MascotCharacter from "../mascot/MascotCharacter";
import { ArrowRight } from "lucide-react";
import { useModules } from "@/hooks/useModules";

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
  const { modules, isLoading } = useModules();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">学習モジュールを読み込み中...</p>
        </div>
      </div>
    );
  }

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
