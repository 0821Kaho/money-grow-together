
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MascotCharacter from '../mascot/MascotCharacter';

const onboardingSteps = [
  {
    title: "マネゴローへようこそ！",
    description: "金融リテラシーを楽しく学べるアプリです。トントンと一緒に学びましょう！",
    image: "🏦"
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
      // Complete onboarding and redirect to home
      navigate('/');
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-light to-white">
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
                {currentStep === 0 && (
                  <MascotCharacter size="large" className="h-32 w-32" />
                )}
                {currentStep !== 0 && (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-game-primary text-white text-6xl">
                    {onboardingSteps[currentStep].image}
                  </div>
                )}
              </div>
              
              <h1 className="mb-4 text-center text-2xl font-bold text-game-dark">
                {onboardingSteps[currentStep].title}
              </h1>
              <p className="mb-8 text-center text-gray-600">
                {onboardingSteps[currentStep].description}
              </p>
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
                  className={`h-2 w-2 rounded-full ${
                    currentStep === index ? "bg-game-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextStep}
              className="game-button px-5 py-2"
            >
              {currentStep === onboardingSteps.length - 1 ? "はじめる" : "次へ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
