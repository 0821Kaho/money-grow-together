
import { Card, CardContent } from "@/components/ui/card";
import TontonGameVisuals from "@/components/game/TontonGameVisuals";
import { motion, useInView } from "framer-motion";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const modules = [
  { 
    id: "1", // budgetから1に変更
    title: "家計管理マスター", 
    description: "お金の使い方を見直し、貯金体質になるための基礎を学びます", 
    color: "bg-primary/10",
    background: "from-[#E8F5EA] to-[#F5F9F6]",
    iconColor: "#4DAA57",
    illustration: "/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png"
  },
  { 
    id: "2", // investmentから2に変更
    title: "投資マスター", 
    description: "長期的な資産形成のための投資の基本を学びます", 
    color: "bg-secondary/10",
    background: "from-[#E6F4F9] to-[#F5FAFC]",
    iconColor: "#60B8D4",
    illustration: "/lovable-uploads/d4d69757-fa8b-4792-b80c-3a101f92b01b.png"
  },
  { 
    id: "3", // riskから3に変更
    title: "リスク管理マスター", 
    description: "お金のリスクを理解し、適切に対策する方法を学びます", 
    color: "bg-accent/10",
    background: "from-[#FFF5E6] to-[#FFFBF5]",
    iconColor: "#FFD166",
    illustration: "/lovable-uploads/9c9d440d-3eab-4a1e-913f-6152729a6ff8.png"
  },
  { 
    id: "4", // lifeplanから4に変更
    title: "ライフプランマスター", 
    description: "将来の人生設計と必要な資金計画について学びます", 
    color: "bg-primary/10",
    background: "from-[#FFEBEB] to-[#FFF5F5]",
    iconColor: "#FF6B6B",
    illustration: "/lovable-uploads/c02ccb40-c19f-48d7-a805-8c3e5ac584e6.png"
  },
  { 
    id: "5", // startupから5に変更
    title: "副業・起業マスター", 
    description: "小さな一歩から始める副業や起業の考え方を学びます", 
    color: "bg-secondary/10",
    background: "from-[#EBF5FF] to-[#F5F9FF]",
    iconColor: "#4D96FF",
    illustration: "/lovable-uploads/536dafe2-25ff-4564-9aab-e16afe5152f8.png"
  },
];

const ModulesSection = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<any>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { once: false, amount: 0.3 });
  
  // Auto-swiping functionality
  useEffect(() => {
    if (!api || !isInView) return;
    
    // Set up interval for auto-swiping
    const autoSwipeInterval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Change slide every 3 seconds
    
    // Clean up interval on component unmount or when carousel is not in view
    return () => clearInterval(autoSwipeInterval);
  }, [api, isInView]);

  const handleModuleClick = (id: string) => {
    navigate(`/module/${id}`);
  };

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

      <div className="relative px-4 py-4" ref={carouselRef}>
        <Carousel
          opts={{
            align: "center",
            loop: true,
            dragFree: true,
            containScroll: "trimSnaps",
            skipSnaps: false,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="-ml-2 -mr-2">
            {modules.map((module) => (
              <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4 flex items-stretch">
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)" }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleModuleClick(module.id)}
                  className="cursor-pointer h-full w-full"
                >
                  <Card className={`h-full border-4 shadow-sm hover:shadow transition-all bg-gradient-to-br ${module.background}`} 
                        style={{ borderColor: `${module.iconColor}85` }}>
                    <CardContent className="p-6 relative flex flex-col h-full">
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
                      
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">{module.description}</p>
                      
                      {/* Button positioned consistently at bottom */}
                      <div className="mt-auto">
                        <motion.button
                          className="w-full px-4 py-2 bg-[#F37B83] hover:bg-[#F37B83]/90 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          始める
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>

        {/* Mobile scroll indicator with active state */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex space-x-1">
            {modules.map((_, index) => (
              <div 
                key={index} 
                className={`h-1 rounded-full w-4 bg-gray-300 ${index === 0 ? "bg-primary" : ""}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
