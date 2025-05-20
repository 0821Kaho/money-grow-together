
import { motion } from "framer-motion";
import MascotTooltip from "../mascot/MascotTooltip";
import MascotImage from "../mascot/MascotImage";
import MoneyVisual from "@/components/ui/MoneyVisual";
import LeafVisual from "@/components/ui/LeafVisual";

const WelcomeSection = () => {
  const welcomeMessages = [
    "ようこそ、マネゴローへ！お金について楽しく学びましょう！",
    "トントンがお待ちかね🐽 予算を入力しよう！",
    "毎日少しずつ学習して、お金の知識を身につけましょう！"
  ];
  
  return (
    <motion.div 
      className="mb-8 rounded-xl bg-gradient-to-r from-game-primary to-[#FF9BA4] p-6 text-white overflow-hidden relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-20">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/vimeo/529857546/84326.mp4?width=640&hash=c602c244077e03aaaacd1f6cd4e25f46e50df788" type="video/mp4" />
        </video>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <h1 className="mb-2 text-2xl font-heading font-bold">ようこそ、ユーザーさん！</h1>
          <p className="text-white/90 font-body">
            お金について学びながら楽しく実践的なスキルを身につけましょう。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-xl bg-white px-4 py-2 text-sm font-number font-bold text-game-primary transition-all hover:bg-opacity-90">
              今日のチャレンジ
            </button>
            <button className="rounded-xl bg-white/20 px-4 py-2 text-sm font-number font-bold text-white transition-all hover:bg-white/30">
              続きから始める
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3 ml-4">
          <motion.div 
            className="hidden sm:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <MascotTooltip messages={welcomeMessages} characterSize="small" />
          </motion.div>
          
          <div className="hidden sm:flex items-end gap-2">
            <MascotImage variant="coin" size="small" alt="コインを持つピギペ" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;
