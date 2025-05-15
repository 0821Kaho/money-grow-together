
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: number;
  day: number;
  title: string;
  description: string;
  options: {
    text: string;
    cost: number;
    reward: number;
    happiness: number;
    consequence: string;
  }[];
}

const events: Event[] = [
  {
    id: 1,
    day: 5,
    title: "友達からの誘い",
    description: "友達から食事に誘われました。どうしますか？",
    options: [
      {
        text: "行く（3000円）",
        cost: 3000,
        reward: 0,
        happiness: 10,
        consequence: "楽しい時間を過ごしました！しかし出費がかさみました。",
      },
      {
        text: "断る（0円）",
        cost: 0,
        reward: 0,
        happiness: -5,
        consequence: "お金は節約できましたが、少し寂しい気持ちになりました。",
      },
      {
        text: "安い店に行こうと提案（1000円）",
        cost: 1000,
        reward: 0,
        happiness: 5,
        consequence: "予算内で楽しめる方法を見つけました！これぞスマートな節約！",
      },
    ],
  },
  {
    id: 2,
    day: 12,
    title: "突然の出費",
    description: "スマホが故障してしまいました。どうしますか？",
    options: [
      {
        text: "新品を購入（60000円）",
        cost: 60000,
        reward: 0,
        happiness: 15,
        consequence: "最新型のスマホを手に入れました！しかし大きな出費に…",
      },
      {
        text: "修理する（15000円）",
        cost: 15000,
        reward: 0,
        happiness: 5,
        consequence: "修理して使い続けることにしました。賢い選択です！",
      },
      {
        text: "友人から中古を譲ってもらう（5000円）",
        cost: 5000,
        reward: 0,
        happiness: 0,
        consequence: "友人から中古のスマホをもらうことができました。大きな出費を避けられました！",
      },
    ],
  },
  {
    id: 3,
    day: 18,
    title: "臨時収入のチャンス",
    description: "週末にアルバイトの募集を見つけました。どうしますか？",
    options: [
      {
        text: "引き受ける（+10000円）",
        cost: 0,
        reward: 10000,
        happiness: 0,
        consequence: "少し疲れましたが、10000円の臨時収入を得ることができました！",
      },
      {
        text: "断る（0円）",
        cost: 0,
        reward: 0,
        happiness: 5,
        consequence: "休日をゆっくり過ごすことを選びました。心の余裕も大切です。",
      },
    ],
  },
];

const BudgetSimulation = () => {
  const [currentMoney, setCurrentMoney] = useState(50000);
  const [happiness, setHappiness] = useState(50);
  const [day, setDay] = useState(1);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const { toast } = useToast();
  
  const handleNextDay = () => {
    // Check if there is an event for the next day
    const nextEvent = events.find((event) => event.day === day + 1);
    
    if (nextEvent) {
      setCurrentEvent(nextEvent);
    } else {
      setCurrentEvent(null);
    }
    
    setDay((prevDay) => prevDay + 1);
    
    // End of month
    if (day + 1 > 30) {
      let result = "";
      if (currentMoney >= 10000) {
        result = "素晴らしい！月末まで上手に予算管理ができました。";
      } else if (currentMoney >= 0) {
        result = "なんとか借金せずに月末を迎えることができました。";
      } else {
        result = "残念ながら借金してしまいました。次回はもっと計画的に！";
      }
      setResultMessage(result);
      setShowResult(true);
    }
  };
  
  const handleOption = (option: any) => {
    const newMoney = currentMoney - option.cost + option.reward;
    const newHappiness = happiness + option.happiness;
    
    setCurrentMoney(newMoney);
    setHappiness(Math.max(0, Math.min(100, newHappiness)));
    
    toast({
      title: "選択結果",
      description: option.consequence,
    });
    
    setCurrentEvent(null);
  };
  
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {showResult ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 text-4xl">
            {currentMoney >= 10000 ? "🎉" : currentMoney >= 0 ? "😌" : "😓"}
          </div>
          <h2 className="mb-4 text-xl font-bold">1ヶ月のシミュレーション終了</h2>
          <p className="mb-6 text-center">{resultMessage}</p>
          <p className="mb-6 text-center font-medium">
            最終残高: <span className={currentMoney >= 0 ? "text-game-primary" : "text-game-danger"}>{currentMoney.toLocaleString()}円</span>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="game-button"
          >
            もう一度プレイ
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">家計管理シミュレーション</h2>
              <p className="text-sm text-gray-600">残り日数: {30 - day}日</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-game-primary">
                {currentMoney.toLocaleString()}円
              </p>
              <div className="flex items-center gap-1">
                <span className="text-sm">満足度:</span>
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-game-accent"
                    style={{ width: `${happiness}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {currentEvent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-gray-200 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-game-primary text-white">
                  <span className="text-sm font-bold">{currentEvent.day}日</span>
                </div>
                <h3 className="text-lg font-bold">{currentEvent.title}</h3>
              </div>
              <p className="mb-4 text-gray-700">{currentEvent.description}</p>
              <div className="flex flex-col gap-2">
                {currentEvent.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOption(option)}
                    className="rounded-lg border border-gray-200 p-3 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      <span className={option.cost > 0 ? "text-game-danger" : option.reward > 0 ? "text-game-success" : ""}>
                        {option.cost > 0 ? `-${option.cost.toLocaleString()}円` : option.reward > 0 ? `+${option.reward.toLocaleString()}円` : ""}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center p-8">
              <div className="mb-4 text-4xl">📆</div>
              <p className="mb-6 text-center">
                {day}日目：今日は特別なイベントはありません。
              </p>
              <button onClick={handleNextDay} className="game-button">
                次の日へ
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BudgetSimulation;
