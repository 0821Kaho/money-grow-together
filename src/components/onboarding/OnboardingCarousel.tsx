
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MascotCharacter from '../mascot/MascotCharacter';

const onboardingSteps = [
  {
    title: "ピギペへようこそ！",
    description: "ピギペと一緒に金融リテラシーを楽しく学ぼう！お金の知識を身につけて、夢を叶える力をつけよう🌟",
    image: "pigipe", // Special identifier for the Pigipe character
    isWelcome: true
  },
  {
    title: "学習モジュールで実践力を身につけよう",
    description: "家計管理、投資、リスク管理など実用的な金融スキルを段階的に学べます。",
    image: "📚"
  },
  {
    title: "実績を獲得し、習慣を身につけよう",
    description: "毎日の学習を続け、コインを貯めて新しい知識とスキルを解放しましょう！",
    image: "🏅"
  }
];

const OnboardingCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding and redirect to modules instead of home
      navigate('/modules');
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-yellow-50 to-white">
      {/* Floating coins background for welcome page */}
      {currentStep === 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-32 right-16 w-6 h-6 bg-yellow-500 rounded-full opacity-15 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-60 left-1/4 w-5 h-5 bg-yellow-300 rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 right-1/4 w-7 h-7 bg-yellow-400 rounded-full opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>
      )}
      
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 flex justify-center">
                {onboardingSteps[currentStep].image === "pigipe" ? (
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <img 
                      src="/lovable-uploads/c797724e-aa32-4e6a-905c-d829f0829736.png" 
                      alt="ピギペ"
                      className="h-40 w-40 animate-bounce-in"
                      style={{
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                      }}
                    />
                    {/* Sparkle effects around Pigipe */}
                    <div className="absolute -top-2 -right-2 text-yellow-400 text-2xl animate-pulse">✨</div>
                    <div className="absolute -bottom-1 -left-2 text-pink-400 text-xl animate-pulse" style={{animationDelay: '0.5s'}}>💫</div>
                    <div className="absolute top-1/4 -right-4 text-yellow-300 text-lg animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
                  </motion.div>
                ) : currentStep === 0 ? (
                  <MascotCharacter size="large" className="h-32 w-32" />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-game-primary text-white text-6xl">
                    {onboardingSteps[currentStep].image}
                  </div>
                )}
              </div>
              
              <motion.h1 
                className={`mb-4 text-center font-bold text-game-dark ${
                  currentStep === 0 ? "text-3xl bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent" : "text-2xl"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {onboardingSteps[currentStep].title}
              </motion.h1>
              
              <motion.p 
                className={`text-center ${
                  currentStep === 0 ? "text-gray-700 text-lg leading-relaxed" : "text-gray-600"
                } mb-8`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {onboardingSteps[currentStep].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`rounded-xl border border-gray-200 bg-white px-5 py-2 transition-all ${
                currentStep === 0
                  ? "invisible"
                  : "visible hover:bg-gray-50"
              }`}
            >
              戻る
            </button>
            
            <div className="flex space-x-1">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentStep === index ? "bg-game-primary w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextStep}
              className="rounded-xl bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-medium px-6 py-3 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep === onboardingSteps.length - 1 ? "はじめる🚀" : "次へ"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
