
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
import { useModules } from "@/hooks/useModules";

const ModulesSection = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<any>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { once: false, amount: 0.3 });
  const { modules } = useModules();
  
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

  const handleModuleClick = (id: number) => {
    navigate(`/module/${id}`);
  };

  // Get background gradient based on Pigipe colors
  const getBgGradient = (color: string) => {
    // Always use Pigipe brand colors for consistent branding
    return "from-pigipePink/5 to-pigipeGreen/5";
  };

  return (
    <section id="modules-section" className="container mx-auto px-4 py-16">
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
                  <Card className={`h-full border-2 border-pigipePinkLight hover:border-pigipePink shadow-sm hover:shadow transition-all bg-gradient-to-br ${getBgGradient(module.color)}`}>
                    <CardContent className="p-6 relative">
                      {/* Module illustration with Pigipe green ring */}
                      {module.illustration && (
                        <motion.div 
                          className="flex justify-center mb-4"
                          initial={{ scale: 0.9, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="ring-4 ring-pigipeGreen/20 rounded-full p-2 bg-white">
                            <img
                              src={module.illustration}
                              alt={`${module.title}イラスト`}
                              className="h-16 w-auto object-contain"
                            />
                          </div>
                        </motion.div>
                      )}
                      
                      <h3 className="text-lg font-bold mb-2 text-gray-800">{module.title}</h3>
                      
                      <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                      
                      {/* Updated button with Pigipe green */}
                      <motion.button
                        className="mt-2 w-[104px] px-0 py-1.5 bg-pigipeGreen hover:bg-pigipeGreenDark text-white rounded-full text-sm font-medium flex items-center justify-center gap-1 ml-auto whitespace-nowrap transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        始める
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
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

        {/* Mobile scroll indicator with Pigipe pink active state */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex space-x-1">
            {modules.map((_, index) => (
              <div 
                key={index} 
                className={`h-1 rounded-full w-4 bg-gray-300 ${index === 0 ? "bg-pigipePink" : ""}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
