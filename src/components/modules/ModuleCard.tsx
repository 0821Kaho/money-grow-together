
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
    <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
      module.isLocked ? 'opacity-60' : 'hover:border-pigipePink cursor-pointer'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getDifficultyColor(module.difficulty)}>
            {module.difficulty}
          </Badge>
          {module.completionRate === 100 && (
            <CheckCircle2 className="h-5 w-5 text-pigipeGreen" />
          )}
        </div>
        
        <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
        <CardDescription className="text-sm">{module.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Tags */}
        {module.tags && module.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {module.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-pigipePinkLight/40 text-pigipePink text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>完了率</span>
            <span>{module.completionRate}%</span>
          </div>
          <Progress value={module.completionRate} className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{module.estimatedTime}</span>
          
          <Button
            onClick={handleClick}
            disabled={module.isLocked}
            size="sm"
            className={module.isLocked 
              ? "bg-gray-400 text-white cursor-not-allowed" 
              : "bg-pigipeGreen hover:bg-pigipeGreenDark text-white"
            }
          >
            {module.isLocked ? (
              <>
                <Lock className="h-4 w-4 mr-1" />
                ロック中
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                開始
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
