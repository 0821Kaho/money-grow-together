
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

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
      className={`module-card relative ${isLocked ? "locked" : ""} cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
      onClick={handleClick}
      layout
    >
      {/* Background with Pigipe gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pigipePink/5 to-pigipeGreen/5 z-0"></div>
      
      {/* Border with Pigipe colors */}
      <div className="absolute inset-0 border-2 border-pigipePinkLight hover:border-pigipePink rounded-2xl z-0 transition-colors duration-300"></div>
      
      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl z-20">
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
        {/* Module illustration with Pigipe green ring */}
        {illustration && (
          <div className="mb-4 flex justify-center">
            <motion.div
              className="ring-4 ring-pigipeGreen/20 rounded-full p-3 bg-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={illustration}
                alt={`${title}イラスト`}
                className="h-20 w-auto object-contain"
              />
            </motion.div>
          </div>
        )}

        <div className="mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            
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

        <p className="mb-5 text-sm text-gray-600">{description}</p>

        <div className="flex items-center">
          {/* Progress bar with Pigipe pink */}
          <div className="w-20 mr-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-600">進捗</span>
              <span className="font-medium text-gray-600">{progress}%</span>
            </div>
            <div className="progress-bar bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: prefersReducedMotion ? `${progress}%` : 0 }}
                animate={{ width: `${progress}%` }}
                transition={prefersReducedMotion ? 
                  { duration: 0 } : 
                  { type: 'spring', stiffness: 200, damping: 30 }
                }
                className={`h-full rounded-full ${progress === 100 ? 'bg-pigipeGreen' : 'bg-pigipePink'}`}
              />
            </div>
          </div>

          {/* Button with Pigipe green */}
          <motion.button
            className="px-0 py-1.5 bg-pigipeGreen hover:bg-pigipeGreenDark text-white rounded-full text-xs font-medium flex items-center justify-center ml-auto w-[104px] h-9 whitespace-nowrap transition-colors duration-200"
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
      
      {/* Confetti animation for 100% progress with Pigipe colors */}
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
                backgroundColor: ['#FF708A', '#7ADFA2', '#FFD66E', '#4CC985'][Math.floor(Math.random() * 4)],
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
