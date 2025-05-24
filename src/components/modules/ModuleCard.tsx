
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge"; 
import { motion } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";
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

  // Calculate background gradient based on color
  const getBgGradient = () => {
    if (color === "#4DAA57") return "from-[#E8F5EA] to-[#F5F9F6]"; // Green
    if (color === "#60B8D4") return "from-[#E6F4F9] to-[#FFFBF5]"; // Blue 
    if (color === "#FFD166") return "from-[#FFF5E6] to-[#FFFBF5]"; // Yellow
    if (color === "#FF6B6B") return "from-[#FFEBEB] to-[#FFF5F5]"; // Red
    if (color === "#4D96FF") return "from-[#EBF5FF] to-[#F5F9FF]"; // Blue
    return "from-[#F5F5F5] to-[#FFFFFF]"; // Default
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
      className={`module-card relative ${isLocked ? "locked" : ""} cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
      onClick={handleClick}
      layout
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBgGradient()} z-0`}></div>
      
      {/* Border */}
      <div className="absolute inset-0 border-4 rounded-xl z-0" style={{ borderColor: `${color}85` }}></div>
      
      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl z-20">
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

      <div className="p-5 relative z-10">
        {/* Module illustration */}
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

        <div className="mb-3">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: isLocked ? "#9CA3AF" : color }}>{title}</h3>
            
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

        <div className="flex items-center">
          {/* Progress bar */}
          <div className="w-20 mr-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">進捗</span>
              <span className="font-medium">{progress}%</span>
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

          {/* Fixed-width button with no text wrapping */}
          <motion.button
            className="px-0 py-1.5 bg-game-primary hover:bg-game-primary/90 text-white rounded-lg text-xs font-medium flex items-center justify-center ml-auto w-[104px] h-9 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <span className="text-sm font-semibold">始める</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </div>
      </div>
      
      {/* Confetti animation for 100% progress */}
      {progress === 100 && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
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
