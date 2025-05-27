
import { motion } from "framer-motion";
import GameLayout from "@/components/layout/GameLayout";

const achievements = [
  {
    id: 1,
    title: "予算達成",
    icon: "🏆",
    description: "初めての予算管理を達成！",
    unlocked: true,
  },
  {
    id: 2,
    title: "貯金スタート",
    icon: "💰",
    description: "最初の貯金ステップ達成！",
    unlocked: true,
  },
  {
    id: 3,
    title: "投資家デビュー",
    icon: "📈",
    description: "初めての投資シミュレーション完了",
    unlocked: true,
  },
  {
    id: 4,
    title: "リスク管理マスター",
    icon: "🛡️",
    description: "リスク管理モジュールをクリア",
    unlocked: false,
  },
  {
    id: 5,
    title: "ライフプランナー",
    icon: "📅",
    description: "ライフプランモジュールをクリア",
    unlocked: false,
  },
  {
    id: 6,
    title: "アントレプレナー",
    icon: "💼",
    description: "起業モジュールをクリア",
    unlocked: false,
  },
  {
    id: 7,
    title: "家計管理の達人",
    icon: "⭐",
    description: "家計管理モジュールで満点を獲得",
    unlocked: false,
  },
  {
    id: 8,
    title: "投資の賢者",
    icon: "⚡",
    description: "投資で100%以上のリターンを達成",
    unlocked: false,
  },
  {
    id: 9,
    title: "マネーマスター",
    icon: "👑",
    description: "すべてのモジュールをクリア",
    unlocked: false,
  },
];

const AchievementsPage = () => {
  return (
    <GameLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">あなたの実績</h1>
        <p className="text-gray-600">
          実績を集めて、あなたの金融スキルを証明しましょう
        </p>
      </div>
      
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-medium">実績一覧</h2>
          <span className="rounded-full bg-game-light px-3 py-1 text-sm font-medium">
            {achievements.filter((a) => a.unlocked).length}/{achievements.length}達成
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center rounded-lg border border-gray-200 p-6"
            >
              <div
                className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full ${
                  achievement.unlocked
                    ? "bg-game-secondary" // Consistent green for all unlocked badges
                    : "bg-[#E0E0E0]" // Gray for locked badges (high contrast)
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                  <span className="text-2xl">
                    {achievement.unlocked ? achievement.icon : "🔒"}
                  </span>
                </div>
              </div>
              <h3 className="mb-1 text-center font-medium">
                {achievement.title}
              </h3>
              <p className="text-center text-xs text-[#5F5F5F]">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </GameLayout>
  );
};

export default AchievementsPage;
