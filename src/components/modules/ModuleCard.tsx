
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

  // Calculate background gradient based on color
  const getBgGradient = () => {
    if (color === "#4DAA57") return "from-[#E8F5EA] to-[#F5F9F6]"; // Green
    if (color === "#60B8D4") return "from-[#E6F4F9] to-[#F5FAFC]"; // Blue 
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
      <div className="absolute inset-0 border-2 rounded-xl z-0" style={{ borderColor: `${color}70` }}></div>
      
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

        <div className="flex items-center justify-between">
          <div className="w-full mr-4">
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

          <motion.button
            className="px-3 py-1 bg-game-primary hover:bg-game-primary/90 text-white rounded-lg text-xs font-medium flex items-center gap-1 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            始める
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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

      {/* Pigipe character */}
      <motion.div 
        className="absolute bottom-2 right-2 h-10 w-10 opacity-30 z-0"
        animate={{ y: [0, -5, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <img 
          src="/lovable-uploads/3c41dd2d-2377-498b-bfd2-a107f7fa530d.png" 
          alt="Pigipe" 
          className="w-full h-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

export default ModuleCard;
