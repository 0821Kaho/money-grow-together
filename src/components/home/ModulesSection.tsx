
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import TontonGameVisuals from "@/components/game/TontonGameVisuals";
import { motion } from "framer-motion";

const modules = [
  { 
    id: "budget", 
    title: "家計管理", 
    description: "お金の使い方を見直し、貯金体質になるための基礎を学びます", 
    color: "bg-primary/10",
    illustration: "/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png"
  },
  { 
    id: "investment", 
    title: "投資", 
    description: "長期的な資産形成のための投資の基本を学びます", 
    color: "bg-secondary/10",
    illustration: "/lovable-uploads/d4d69757-fa8b-4792-b80c-3a101f92b01b.png"
  },
  { 
    id: "risk", 
    title: "リスク管理", 
    description: "お金のリスクを理解し、適切に対策する方法を学びます", 
    color: "bg-accent/10",
    illustration: "/lovable-uploads/9c9d440d-3eab-4a1e-913f-6152729a6ff8.png"
  },
  { 
    id: "lifeplan", 
    title: "ライフプラン", 
    description: "将来の人生設計と必要な資金計画について学びます", 
    color: "bg-primary/10",
    illustration: "/lovable-uploads/c02ccb40-c19f-48d7-a805-8c3e5ac584e6.png"
  },
  { 
    id: "startup", 
    title: "副業・起業", 
    description: "小さな一歩から始める副業や起業の考え方を学びます", 
    color: "bg-secondary/10",
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

      <div className="overflow-hidden px-4">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {modules.map((module) => (
              <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className={`h-full ${module.color} border-none shadow-sm hover:shadow transition-all`}>
                  <CardContent className="p-6">
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
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-muted-foreground text-sm">{module.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="static mx-2 translate-y-0" />
            <CarouselNext className="static mx-2 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ModulesSection;
