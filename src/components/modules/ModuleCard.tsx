
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Lock, Play, CheckCircle2 } from "lucide-react";

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

  const handleClick = () => {
    if (!module.isLocked) {
      navigate(`/module/${module.id}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "初級": return "bg-pigipeGreen text-white";
      case "中級": return "bg-pigipePink text-white";
      case "上級": return "bg-gray-800 text-white";
      default: return "bg-pigipePink text-white";
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
        module.isLocked ? 'opacity-60' : 'hover:border-pigipePink cursor-pointer'
      }`}>
        <CardHeader className="pb-3">
          <section className="px-4 py-section">
            <div className="flex justify-between items-start mb-2">
              <Badge className={getDifficultyColor(module.difficulty)}>
                {module.difficulty}
              </Badge>
              {module.completionRate === 100 && (
                <CheckCircle2 className="h-5 w-5 text-pigipeGreen" />
              )}
            </div>
            
            <CardTitle className="text-lg leading-tight text-center">{module.title}</CardTitle>
            <CardDescription className="text-sm text-center leading-relaxed">{module.description}</CardDescription>
          </section>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Tags */}
          {module.tags && module.tags.length > 0 && (
            <section className="px-4 py-section">
              <div className="flex flex-col gap-2 items-center">
                {module.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center justify-center bg-pigipePinkLight/40 text-pigipePink text-xs px-3 py-1.5 rounded-full max-w-xs"
                  >
                    {tag}
                  </span>
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
              <div className="h-2.5 rounded-full bg-gray-200">
                <div 
                  className="h-full bg-pigipePink rounded-full transition-all duration-300"
                  style={{ width: `${module.completionRate}%` }}
                />
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="px-4 py-section">
            <div className="flex flex-col gap-3 items-center">
              <span className="text-xs text-gray-500">{module.estimatedTime}</span>
              
              <Button
                onClick={handleClick}
                disabled={module.isLocked}
                className={`w-full max-w-xs mx-auto py-3 flex items-center justify-center gap-2 rounded-full font-semibold ${
                  module.isLocked 
                    ? "bg-gray-400 text-white cursor-not-allowed" 
                    : "bg-pigipeGreen hover:bg-pigipeGreenDark text-white shadow-lg"
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
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleCard;
