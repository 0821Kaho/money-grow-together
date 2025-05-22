
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import { useToast } from "@/hooks/use-toast";

interface BoardGameProps {
  days: number;
  onDayComplete: (day: number, reward: number) => void;
  onGameComplete: (totalReward: number) => void;
}

const BoardGame = ({ days = 30, onDayComplete, onGameComplete }: BoardGameProps) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [totalReward, setTotalReward] = useState(0);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const { toast } = useToast();
  
  // Define board events (simplified version - can be expanded)
  const boardEvents = [
    { position: 3, title: "お友達と食事", options: [
      { text: "安いお店を提案", reward: 2000, happiness: 5 },
      { text: "奢ってしまう", reward: -3000, happiness: 2 }
    ]},
    { position: 7, title: "セール情報", options: [
      { text: "本当に必要なものだけ買う", reward: -1000, happiness: 5 },
      { text: "誘惑に負けて買いすぎる", reward: -5000, happiness: -5 }
    ]},
    { position: 12, title: "急な出費", options: [
      { text: "貯金から出す", reward: -2000, happiness: 0 },
      { text: "今月の娯楽費を削る", reward: 0, happiness: -5 }
    ]},
    { position: 18, title: "副業のチャンス", options: [
      { text: "時間を使って挑戦", reward: 5000, happiness: 5 },
      { text: "今は見送る", reward: 0, happiness: 0 }
    ]},
    { position: 23, title: "友人からの誘い", options: [
      { text: "低予算の遊びを提案", reward: -1000, happiness: 5 },
      { text: "断る", reward: 0, happiness: -2 }
    ]},
    { position: 28, title: "ボーナス", options: [
      { text: "全額貯金", reward: 5000, happiness: 3 },
      { text: "半分使って半分貯める", reward: 2500, happiness: 5 }
    ]}
  ];
  
  // Roll the dice
  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Animate dice rolling
    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        
        // Final dice value
        const finalDiceValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalDiceValue);
        
        // Move player
        const newPosition = Math.min(currentPosition + finalDiceValue, days);
        setCurrentPosition(newPosition);
        
        // Check for events at the new position
        const event = boardEvents.find(e => e.position === newPosition);
        if (event) {
          setCurrentEvent(event);
        } else {
          // No event, just proceed
          handleNoEvent(newPosition);
        }
        
        setIsRolling(false);
      }
    }, 100);
  };
  
  // Handle option selection
  const selectOption = (option: any) => {
    // Update total reward
    const newTotalReward = totalReward + option.reward;
    setTotalReward(newTotalReward);
    
    // Toast notification
    toast({
      title: option.reward >= 0 ? "良い選択です！" : "コストがかかりました",
      description: `${Math.abs(option.reward).toLocaleString()}円を${option.reward >= 0 ? "得" : "使い"}ました！`,
      variant: option.reward >= 0 ? "default" : "destructive"
    });
    
    // Clear current event
    setCurrentEvent(null);
    
    // Call day completion callback
    onDayComplete(currentPosition, option.reward);
    
    // Check if game is complete
    if (currentPosition >= days) {
      onGameComplete(newTotalReward);
    }
  };
  
  // Handle when there's no event
  const handleNoEvent = (position: number) => {
    // Call day completion callback with no reward
    onDayComplete(position, 0);
    
    // Check if game is complete
    if (position >= days) {
      onGameComplete(totalReward);
    }
  };
  
  // Render dice icon based on value
  const renderDiceIcon = () => {
    switch(diceValue) {
      case 1: return <Dice1 className="w-12 h-12" />;
      case 2: return <Dice2 className="w-12 h-12" />;
      case 3: return <Dice3 className="w-12 h-12" />;
      case 4: return <Dice4 className="w-12 h-12" />;
      case 5: return <Dice5 className="w-12 h-12" />;
      case 6: return <Dice6 className="w-12 h-12" />;
      default: return <Dice1 className="w-12 h-12 opacity-50" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold mb-4">家計サバイバルすごろく</h2>
      
      {/* Game board */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex flex-wrap min-w-[600px]">
          {Array.from({ length: days }).map((_, index) => (
            <div 
              key={index}
              className={`w-16 h-16 border flex items-center justify-center relative ${
                index === currentPosition ? 'bg-blue-100 border-blue-500' : 
                index < currentPosition ? 'bg-green-50' : 'bg-white'
              } ${
                boardEvents.some(e => e.position === index) ? 'bg-yellow-50' : ''
              }`}
            >
              <span className="text-sm">{index + 1}日</span>
              {index === currentPosition && (
                <div className="absolute -top-1 -translate-y-full">
                  <MascotCharacter size="small" className="h-8 w-8" />
                </div>
              )}
              {boardEvents.some(e => e.position === index) && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Event display */}
      {currentEvent ? (
        <div className="mb-6 p-4 border rounded-lg bg-yellow-50">
          <h3 className="font-bold mb-2">{currentEvent.title}</h3>
          <div className="space-y-2">
            {currentEvent.options.map((option: any, index: number) => (
              <button 
                key={index}
                className="w-full text-left p-3 border rounded-md bg-white hover:bg-gray-50"
                onClick={() => selectOption(option)}
              >
                <div className="flex justify-between">
                  <span>{option.text}</span>
                  <span className={option.reward >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {option.reward >= 0 ? '+' : '-'}{Math.abs(option.reward).toLocaleString()}円
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-center">
          <motion.div
            animate={isRolling ? { rotate: 360 } : {}}
            transition={{ repeat: isRolling ? Infinity : 0, duration: 0.5 }}
            className="mb-3"
          >
            {renderDiceIcon()}
          </motion.div>
          
          <button
            onClick={rollDice}
            disabled={isRolling || currentPosition >= days}
            className={`px-6 py-2 rounded-lg ${
              isRolling || currentPosition >= days
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-game-primary text-white hover:bg-game-primary/90'
            }`}
          >
            {isRolling ? 'サイコロを振っています...' : 
             currentPosition >= days ? 'ゴールしました！' : 'サイコロを振る'}
          </button>
        </div>
      )}
      
      {/* Status display */}
      <div className="flex justify-between text-sm">
        <div>
          <span className="font-medium">現在地: </span>
          <span>{currentPosition}/{days}日目</span>
        </div>
        <div>
          <span className="font-medium">合計: </span>
          <span className={totalReward >= 0 ? 'text-green-600' : 'text-red-600'}>
            {totalReward.toLocaleString()}円
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoardGame;
