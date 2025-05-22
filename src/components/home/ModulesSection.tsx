
import { Card, CardContent } from "@/components/ui/card";
import TontonGameVisuals from "@/components/game/TontonGameVisuals";
import { motion } from "framer-motion";

const modules = [
  { 
    id: "budget", 
    title: "家計管理マスター", 
    description: "お金の使い方を見直し、貯金体質になるための基礎を学びます", 
    color: "bg-primary/10",
    background: "from-[#E8F5EA] to-[#F5F9F6]",
    iconColor: "#4DAA57",
    illustration: "/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png"
  },
  { 
    id: "investment", 
    title: "投資マスター", 
    description: "長期的な資産形成のための投資の基本を学びます", 
    color: "bg-secondary/10",
    background: "from-[#E6F4F9] to-[#F5FAFC]",
    iconColor: "#60B8D4",
    illustration: "/lovable-uploads/d4d69757-fa8b-4792-b80c-3a101f92b01b.png"
  },
  { 
    id: "risk", 
    title: "リスク管理マスター", 
    description: "お金のリスクを理解し、適切に対策する方法を学びます", 
    color: "bg-accent/10",
    background: "from-[#FFF5E6] to-[#FFFBF5]",
    iconColor: "#FFD166",
    illustration: "/lovable-uploads/9c9d440d-3eab-4a1e-913f-6152729a6ff8.png"
  },
  { 
    id: "lifeplan", 
    title: "ライフプランマスター", 
    description: "将来の人生設計と必要な資金計画について学びます", 
    color: "bg-primary/10",
    background: "from-[#FFEBEB] to-[#FFF5F5]",
    iconColor: "#FF6B6B",
    illustration: "/lovable-uploads/c02ccb40-c19f-48d7-a805-8c3e5ac584e6.png"
  },
  { 
    id: "startup", 
    title: "副業・起業マスター", 
    description: "小さな一歩から始める副業や起業の考え方を学びます", 
    color: "bg-secondary/10",
    background: "from-[#EBF5FF] to-[#F5F9FF]",
    iconColor: "#4D96FF",
    illustration: "/lovable-uploads/536dafe2-25ff-4564-9aab-e16afe5152f8.png"
  },
];

const ModulesSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">5つのお金の学習モジュール</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          <span className="sm:inline block">各モジュールは短時間で完了し、</span>
          <span className="sm:inline block">実践的なお金の知識を身につけられます</span>
        </p>
        <div className="flex justify-center mt-4">
          <TontonGameVisuals type="combined" size="small" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {modules.map((module) => (
          <motion.div
            key={module.id}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.2 }}
          >
            <Card className={`h-full border-4 shadow-sm hover:shadow transition-all bg-gradient-to-br ${module.background}`} style={{ borderColor: `${module.iconColor}85` }}>
              <CardContent className="p-6 relative">
                {/* Module illustration */}
                {module.illustration && (
                  <motion.div 
                    className="flex justify-center mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={module.illustration}
                      alt={`${module.title}イラスト`}
                      className="h-20 w-auto object-contain"
                    />
                  </motion.div>
                )}
                
                <h3 className="text-lg font-bold mb-2" style={{ color: module.iconColor }}>{module.title}</h3>
                
                <p className="text-muted-foreground text-sm mb-4">{module.description}</p>
                
                <motion.button
                  className="mt-2 px-4 py-1.5 bg-game-primary hover:bg-game-primary/90 text-white rounded-lg text-sm font-medium flex items-center gap-1 ml-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  始める
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ModulesSection;
