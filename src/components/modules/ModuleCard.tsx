
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge"; 
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface ModuleCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  isLocked?: boolean;
  badge?: "bronze" | "silver" | "gold" | null;
}

const ModuleCard = ({
  id,
  title,
  description,
  icon,
  color,
  progress,
  isLocked = false,
  badge = null,
}: ModuleCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLocked) {
      navigate(`/module/${id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`module-card relative ${isLocked ? "locked" : ""} cursor-pointer p-5 bg-white rounded-xl shadow-sm border-l-4`}
      style={{ borderLeftColor: isLocked ? "#D1D5DB" : color }}
      onClick={handleClick}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
          <div className="rounded-full bg-white/90 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0h-2m8-12H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2z"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: isLocked ? "#9CA3AF" : color }}
        >
          <div dangerouslySetInnerHTML={{ __html: icon }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          
          {badge && (
            <Badge 
              variant={badge === "bronze" ? "default" : badge}
              className="mt-1 flex items-center gap-1 text-xs"
            >
              <Trophy className="h-3 w-3" />
              {badge === "bronze" ? "ブロンズ" : badge === "silver" ? "シルバー" : "ゴールド"}
            </Badge>
          )}
        </div>
      </div>

      <p className="mb-5 text-sm text-game-dark">{description}</p>

      <div className="mt-auto">
        <div className="mb-2 flex justify-between">
          <span className="text-xs font-medium">進捗</span>
          <span className="text-xs font-medium">{progress}%</span>
        </div>
        <div className="progress-bar bg-gray-100 rounded-full h-2 overflow-hidden">
          {progress === 100 ? (
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            ></div>
          ) : (
            <div
              className="h-full"
              style={{ width: `${progress}%`, backgroundColor: color }}
            ></div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
