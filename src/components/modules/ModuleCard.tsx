
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge"; 
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import TontonGameSoundEffect from "../game/TontonGameSoundEffect";

interface ModuleCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  isLocked?: boolean;
  badge?: "bronze" | "silver" | "gold" | null;
  illustration?: string;
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
  illustration,
}: ModuleCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLocked) {
      // Play sound effect
      TontonGameSoundEffect.playClick();
      navigate(`/module/${id}`);
    }
  };

  // Get badge variant text
  const getBadgeLabel = (variant: "bronze" | "silver" | "gold") => {
    switch (variant) {
      case "bronze": return "ブロンズ";
      case "silver": return "シルバー";
      case "gold": return "ゴールド";
      default: return "";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
      className={`module-card relative ${isLocked ? "locked" : ""} cursor-pointer p-5 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300`}
      style={{ borderLeftColor: isLocked ? "#D1D5DB" : color, borderLeftWidth: "4px" }}
      onClick={handleClick}
      layout
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

      {illustration && (
        <div className="mb-4 flex justify-center">
          <motion.img
            src={illustration}
            alt={`${title}イラスト`}
            className="h-24 w-auto object-contain rounded-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        </div>
      )}

      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
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
              {getBadgeLabel(badge)}
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
      
      {/* Confetti animation for 100% progress */}
      {progress === 100 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#FFD700', '#FF6347', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)],
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1, 0],
                y: [0, Math.random() * -20 - 10],
                x: [0, (Math.random() - 0.5) * 40]
              }}
              transition={{
                duration: 1,
                delay: Math.random(),
                repeat: Infinity,
                repeatDelay: 5
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ModuleCard;
