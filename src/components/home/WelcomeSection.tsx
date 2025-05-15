
import { motion } from "framer-motion";

const WelcomeSection = () => {
  return (
    <motion.div 
      className="mb-8 rounded-2xl bg-gradient-to-br from-game-primary to-game-secondary p-6 text-white"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold">ようこそ、ユーザーさん！</h1>
          <p className="text-white/90">
            お金について学びながら楽しく実践的なスキルを身につけましょう。
          </p>
        </div>
        <motion.div 
          className="ml-4 hidden sm:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <div className="relative h-16 w-16">
            <div className="absolute coin animate-coin-spin">¥</div>
          </div>
        </motion.div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-game-primary shadow-sm transition-all hover:bg-opacity-90">
          今日のチャレンジ
        </button>
        <button className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/30">
          続きから始める
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;
