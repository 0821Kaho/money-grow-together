
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const achievements = [
  { 
    id: 1, 
    title: "予算達成", 
    icon: "/lovable-uploads/30d54ea7-18d3-4ce6-a80b-5e311b3de9f7.png", 
    description: "",
    isImage: true,
  },
  { 
    id: 2, 
    title: "貯金スタート", 
    icon: "💰", 
    description: "最初の貯金ステップ達成！"
  },
  { 
    id: 3, 
    title: "投資家デビュー", 
    icon: "📈", 
    description: "初めての投資シミュレーション完了"
  },
];

const AchievementPreview = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="mb-8 rounded-xl bg-white p-6 shadow-sm"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">あなたの実績</h2>
        <button 
          onClick={() => navigate('/achievements')}
          className="text-sm font-medium text-game-primary"
        >
          すべて見る
        </button>
      </div>
      
      <div className="flex gap-5 overflow-x-auto pb-2">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className="flex min-w-[110px] flex-col items-center"
          >
            <div className="achievement-badge mb-2 bg-game-secondary">
              <div className="achievement-badge-inner">
                {achievement.isImage ? (
                  <img 
                    src={achievement.icon} 
                    alt={achievement.title}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <span className="text-2xl">{achievement.icon}</span>
                )}
              </div>
            </div>
            <p className="text-center text-xs font-medium">{achievement.title}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementPreview;
