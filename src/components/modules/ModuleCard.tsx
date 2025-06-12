
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Lock, Play, CheckCircle2 } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { motion } from "framer-motion";
import { useCelebration } from "@/hooks/useCelebration";

interface ModuleCardProps {
  module: {
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: "初級" | "中級" | "上級";
    estimatedTime: string;
    isLocked: boolean;
    completionRate: number;
    tags?: string[];
  };
}

const ModuleCard = ({ module }: ModuleCardProps) => {
  const navigate = useNavigate();
  const { celebrate } = useCelebration();

  const handleClick = () => {
    if (!module.isLocked) {
      celebrate();
      navigate(`/module/${module.id}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "初級": return "bg-gradient-to-r from-pigipeGreen to-pigipeBlue text-white";
      case "中級": return "bg-gradient-to-r from-pigipePink to-pigipeYellow text-white";
      case "上級": return "bg-gradient-to-r from-gray-700 to-gray-900 text-white";
      default: return "bg-gradient-to-r from-pigipePink to-pigipeYellow text-white";
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto relative">
      {/* Background ornaments */}
      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-pigipeYellow/20 animate-pulse" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pigipeBlue/20 transform rotate-12" />
      
      <Card className={`h-full transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
        module.isLocked ? 'opacity-60' : 'hover:border-pigipePink cursor-pointer hover:scale-[1.02]'
      }`}>
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pigipeYellow/3 via-transparent to-pigipeBlue/3 pointer-events-none" />
        
        <CardHeader className="pb-3 relative z-10">
          <section className="px-4 py-section">
            <div className="flex justify-between items-start mb-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className={`${getDifficultyColor(module.difficulty)} shadow-md`}>
                  {module.difficulty}
                </Badge>
              </motion.div>
              {module.completionRate === 100 && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle2 className="h-5 w-5 text-pigipeGreen" />
                </motion.div>
              )}
            </div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <CardTitle className="text-lg leading-tight text-center">{module.title}</CardTitle>
              <CardDescription className="text-sm text-center leading-relaxed">{module.description}</CardDescription>
            </motion.div>
          </section>
        </CardHeader>
        
        <CardContent className="pt-0 relative z-10">
          {/* Tags */}
          {module.tags && module.tags.length > 0 && (
            <section className="px-4 py-section">
              <div className="flex flex-col gap-2 items-center">
                {module.tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Tag>
                      {tag}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Progress */}
          <section className="px-4 py-section">
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>完了率</span>
                <span className="text-[11px] font-medium">{module.completionRate}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-gradient-to-r from-gray-200 to-gray-100">
                <motion.div 
                  className="h-full bg-gradient-to-r from-pigipePink to-pigipeGreen rounded-full transition-all duration-300 relative overflow-hidden"
                  style={{ width: `${module.completionRate}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${module.completionRate}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="px-4 py-section">
            <div className="flex flex-col gap-3 items-center">
              <span className="text-xs text-gray-500">{module.estimatedTime}</span>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button
                  onClick={handleClick}
                  disabled={module.isLocked}
                  className={`w-full max-w-xs mx-auto py-3 flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ${
                    module.isLocked 
                      ? "bg-gray-400 text-white cursor-not-allowed" 
                      : "bg-gradient-to-r from-pigipeGreen to-pigipeBlue hover:from-pigipeGreenDark hover:to-pigipeBlueDark text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {module.isLocked ? (
                    <>
                      <Lock className="h-4 w-4 shrink-0" />
                      ロック中
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 shrink-0" />
                      開始
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleCard;
