
/**
 * StoryPigipeIntro Component
 * 
 * Interactive 9-scene story module for Pigipe's financial education journey
 * 
 * Props:
 * - onFinish: () => void - Callback when story completes
 * 
 * Usage:
 * ```tsx
 * <StoryPigipeIntro onFinish={() => router.push('/module/budget-survival')} />
 * ```
 * 
 * Features:
 * - Tap/click or keyboard navigation (Space, Enter, Arrow keys)
 * - Branching choice at scene 4
 * - Fade transitions between scenes
 * - Accessibility compliant
 * - Full responsive design
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene } from '@/types/story';
import StoryPage from './StoryPage';
import ChoiceButton from './ChoiceButton';

interface StoryPigipeIntroProps {
  onFinish: () => void;
}

const StoryPigipeIntro: React.FC<StoryPigipeIntroProps> = ({ onFinish }) => {
  const [currentSceneId, setCurrentSceneId] = useState<string>('s1');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Story data embedded inline
  const scenes: Scene[] = [
    {
      id: 's1',
      img: 1,
      text: 'ピギペは今月も金欠…。\n「また足りないブヒ…💧」'
    },
    {
      id: 's2', 
      img: 2,
      text: '図書館で「お金の本」を発見。\n「なるほど…知らないことばかりブヒ！」'
    },
    {
      id: 's3',
      img: 3, 
      text: '壁の張り紙には "一攫千金！" ✨\nピギペの心がざわつく…'
    },
    {
      id: 's4',
      img: 4,
      text: '【選択肢】',
      branch: { A: 's5', B: 's5' },
      choiceA: '怪しい…やめて本を読む📖',
      choiceB: 'チャンス！飛びつく✨'
    },
    {
      id: 's5',
      img: 5,
      text: '結果は——マイナス900万円😱\n「甘い話は危険ブヒ…」'
    },
    {
      id: 's6',
      img: 6,
      text: '「このままじゃダメだ！🔥」\nピギペは本気で学ぶ決意を固めた。'
    },
    {
      id: 's7',
      img: 7,
      text: '夕日に向かい旅立つピギペ。\n"お金の知恵を身に付ける旅が始まる…"'
    },
    {
      id: 's8',
      img: 8,
      text: '森で道に迷うプレイヤーと遭遇。\nピギペ「一緒にどうブヒ？」🤝'
    },
    {
      id: 's9',
      img: 9,
      text: '「一緒に頑張ろう！」✊\nここから家計管理チャレンジがスタート！'
    }
  ];

  const getCurrentScene = (): Scene | undefined => {
    return scenes.find(scene => scene.id === currentSceneId);
  };

  const getImagePath = (imgNumber: number): string => {
    const imageMap: { [key: number]: string } = {
      1: '/lovable-uploads/3e465fa4-ef5b-4694-9ab1-319a6b464cf0.png', // empty coins
      2: '/lovable-uploads/608af87d-23ce-4ae8-a808-36848dfd5f46.png', // reading book
      3: '/lovable-uploads/ca21315b-37be-4496-aa15-c637c0421ccf.png', // chance poster
      4: '/lovable-uploads/115d44cd-0839-4336-aee8-0ce2ca634550.png', // jump chance
      5: '/lovable-uploads/7ec7f42b-2b20-4464-aabc-8d3f7f30afb0.png', // minus 9m
      6: '/lovable-uploads/7966506e-2748-4aa5-b281-d449975d2171.png', // fire determined
      7: '/lovable-uploads/e78bf72c-5c75-4d12-9506-5f744a0273c6.png', // sunset journey
      8: '/lovable-uploads/a9c39796-6609-4a98-860f-d2821c140662.png', // meets player
      9: '/lovable-uploads/f2f4fd1d-4f56-4526-a963-8945192c85d6.png'  // fist bump
    };
    return imageMap[imgNumber] || '/lovable-uploads/3e465fa4-ef5b-4694-9ab1-319a6b464cf0.png';
  };

  const advanceScene = useCallback((nextSceneId?: string) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (nextSceneId) {
        setCurrentSceneId(nextSceneId);
      } else {
        const currentIndex = scenes.findIndex(scene => scene.id === currentSceneId);
        if (currentIndex < scenes.length - 1) {
          setCurrentSceneId(scenes[currentIndex + 1].id);
        } else {
          // Story finished
          onFinish();
          return;
        }
      }
      setIsTransitioning(false);
    }, 300);
  }, [currentSceneId, isTransitioning, onFinish, scenes]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const currentScene = getCurrentScene();
    if (!currentScene || currentScene.branch || isTransitioning) return;
    
    if (event.code === 'Space' || event.code === 'Enter' || event.code === 'ArrowRight') {
      event.preventDefault();
      advanceScene();
    }
  }, [advanceScene, isTransitioning]);

  const handleChoice = (choice: 'A' | 'B') => {
    const currentScene = getCurrentScene();
    if (!currentScene?.branch) return;
    
    advanceScene(currentScene.branch[choice]);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const currentScene = getCurrentScene();
  
  if (!currentScene) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-pink-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">ストーリーを読み込み中...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-pink-100 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl"
        >
          <StoryPage
            scene={currentScene}
            imagePath={getImagePath(currentScene.img)}
            onAdvance={() => advanceScene()}
            showAdvanceHint={!currentScene.branch}
          />
          
          {currentScene.branch && (
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ChoiceButton
                choice="A"
                text={currentScene.choiceA || '選択肢A'}
                onClick={() => handleChoice('A')}
              />
              <ChoiceButton
                choice="B" 
                text={currentScene.choiceB || '選択肢B'}
                onClick={() => handleChoice('B')}
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {scenes.map((scene, index) => (
            <div
              key={scene.id}
              className={`w-2 h-2 rounded-full transition-colors ${
                scene.id === currentSceneId 
                  ? 'bg-pigipe-primary' 
                  : scenes.findIndex(s => s.id === currentSceneId) > index
                    ? 'bg-pigipe-primary/60'
                    : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryPigipeIntro;
