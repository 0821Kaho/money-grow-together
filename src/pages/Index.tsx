
import { motion } from "framer-motion";
import GameLayout from "@/components/layout/GameLayout";
import WelcomeSection from "@/components/home/WelcomeSection";
import AchievementPreview from "@/components/home/AchievementPreview";
import ModulesList from "@/components/home/ModulesList";

const Index = () => {
  return (
    <GameLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WelcomeSection />
        <AchievementPreview />
        <ModulesList />
      </motion.div>
    </GameLayout>
  );
};

export default Index;
