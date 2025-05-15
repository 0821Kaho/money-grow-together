
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileButton from "../ui/ProfileButton";
import ModuleProgress from "../ui/ModuleProgress";

interface GameLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  currentModule?: number;
}

const GameLayout = ({ children, showNav = true, currentModule }: GameLayoutProps) => {
  // Use conditional navigation to avoid the error
  const location = useLocation();
  const navigate = useNavigate();
  const [coins, setCoins] = useState(100);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-game-light to-white pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-game-primary text-white">
              <span className="text-lg font-bold">¥</span>
            </div>
            <h1 className="text-lg font-bold">マネゴロー</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-game-light px-4 py-1">
              <span className="text-sm font-medium text-game-dark">コイン:</span>
              <span className="font-bold text-game-primary">{coins}</span>
            </div>
            <ProfileButton />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {currentModule !== undefined && (
          <div className="mb-6">
            <ModuleProgress currentModule={currentModule} />
          </div>
        )}
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 z-30 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          <div className="container mx-auto grid grid-cols-4 gap-1">
            <button
              onClick={() => navigate('/modules')}
              className="flex flex-col items-center justify-center p-3 hover:text-game-primary"
            >
              <div className="h-6 w-6 rounded-md bg-game-primary text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="mt-1 text-xs font-medium">ホーム</span>
            </button>
            <button
              onClick={() => navigate('/achievements')}
              className="flex flex-col items-center justify-center p-3 hover:text-game-primary"
            >
              <div className="h-6 w-6 rounded-md bg-game-accent text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <span className="mt-1 text-xs font-medium">実績</span>
            </button>
            <button
              onClick={() => navigate('/learn')}
              className="flex flex-col items-center justify-center p-3 hover:text-game-primary"
            >
              <div className="h-6 w-6 rounded-md bg-game-secondary text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <span className="mt-1 text-xs font-medium">学ぶ</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center justify-center p-3 hover:text-game-primary"
            >
              <div className="h-6 w-6 rounded-md bg-game-info text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="mt-1 text-xs font-medium">プロフィール</span>
            </button>
          </div>
        </nav>
      )}
    </motion.div>
  );
};

export default GameLayout;
