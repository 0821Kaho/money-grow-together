
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TontonGameSoundEffect from "../TontonGameSoundEffect";

interface CardInfo {
  title: string;
  icon: React.ReactNode;
  description: string;
  merits: string[];
  cautions: string[];
}

interface CreditCardEducationProps {
  onComplete?: () => void;
}

const CreditCardEducation = ({ onComplete }: CreditCardEducationProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "quiz">("info");

  // Card infographics
  const cardTypes: CardInfo[] = [
    {
      title: "クレジットカード",
      icon: <CreditCard className="text-blue-500" />,
      description: "買い物をして、後で支払う仕組みのカード。ポイントが貯まる特典もあります。",
      merits: [
        "ポイントが貯まる",
        "支払いが1ヶ月後（翌月）にできる",
        "紛失・盗難時の保険がある"
      ],
      cautions: [
        "使いすぎると返済が大変",
        "リボ払いは金利が高い",
        "支払い忘れは信用情報に傷がつく"
      ]
    },
    {
      title: "デビットカード",
      icon: <CreditCard className="text-green-500" />,
      description: "買い物すると、即座に銀行口座から引き落とされるカード。使いすぎ防止に。",
      merits: [
        "使った分だけ即引き落とし",
        "使いすぎ防止になる", 
        "審査不要で作れる"
      ],
      cautions: [
        "口座残高以上は使えない", 
        "ポイント還元が少ない場合が多い",
        "海外や一部店舗で使えないことも"
      ]
    },
    {
      title: "プリペイドカード",
      icon: <CreditCard className="text-amber-500" />,
      description: "前もってチャージしておき、そのチャージ分だけ使えるカード。予算管理に便利。",
      merits: [
        "チャージした金額以上は使えない",
        "審査なしで作れる",
        "個人情報不要のものも多い"
      ],
      cautions: [
        "チャージ残高の管理が必要",
        "紛失時にチャージ金額を失う可能性",
        "ポイント還元が少ない場合が多い"
      ]
    }
  ];
  
  // Quiz questions
  const quizQuestions = [
    {
      question: "クレジットカードの「リボ払い」の特徴として、最も正しいのはどれ？",
      options: [
        "毎月の支払額が一定で、金利がかからない",
        "一括払いよりも毎月の支払負担は少ないが、金利が高い",
        "必ず2か月以内に完済しなければならない", 
        "ポイントが3倍貯まる特典がある"
      ],
      correctAnswer: "一括払いよりも毎月の支払負担は少ないが、金利が高い",
      explanation: "リボ払いは毎月の支払額が一定で負担が少ない反面、金利（年率15%程度）がかかり、長期間返済すると総支払額が大きくなります。"
    },
    {
      question: "予算管理が苦手な人におすすめのカードは？",
      options: [
        "ゴールドクレジットカード", 
        "デビットカード", 
        "提携カード（マイル付き）",
        "リボ払い専用カード"
      ],
      correctAnswer: "デビットカード",
      explanation: "デビットカードは使うとすぐに銀行口座から引き落とされるため、使いすぎを防ぎやすく、予算管理が苦手な人に向いています。"
    },
    {
      question: "クレジットカードの支払いを遅延すると起こる可能性があるのは？",
      options: [
        "ポイントが2倍になる", 
        "次回から利用限度額が上がる", 
        "個人信用情報に記録され、ローンが組みにくくなる",
        "特に何も起こらない"
      ],
      correctAnswer: "個人信用情報に記録され、ローンが組みにくくなる",
      explanation: "支払遅延は個人信用情報機関に記録され、住宅ローンなど将来の借入れに影響することがあります。支払いは必ず期日までに行いましょう。"
    }
  ];
  
  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
    TontonGameSoundEffect.playClick();
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      TontonGameSoundEffect.playClick();
    } else {
      setShowResults(true);
      
      // Play completion sound
      TontonGameSoundEffect.playSuccess();
      
      // Notify parent component
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  const handleTabChange = (tab: "info" | "quiz") => {
    setActiveTab(tab);
    TontonGameSoundEffect.playClick();
  };
  
  // Calculate score
  const calculateScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };
  
  return (
    <div className="space-y-6">
      {/* Tab navigation */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === "info" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("info")}
        >
          カードの基本知識
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === "quiz" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("quiz")}
        >
          クイズに挑戦
        </button>
      </div>
      
      {activeTab === "info" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-lg font-medium mb-2">支払いカードの種類</h3>
            <p className="text-gray-600 text-sm mb-6">
              用途や目的に合わせて、自分に合ったカードを選びましょう。それぞれの特徴を学んでおくことが大切です。
            </p>
          </div>
          
          {/* Card illustrations with pig character */}
          <div className="relative mb-6">
            <img
              src="/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png"
              alt="Pigipe with cards"
              className="mx-auto h-40 object-contain"
            />
            <motion.div
              className="absolute bottom-0 right-1/4 bg-white rounded-full p-1 shadow-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <CreditCard className="h-6 w-6 text-blue-500" />
            </motion.div>
            <motion.div
              className="absolute bottom-5 left-1/4 bg-white rounded-full p-1 shadow-md"
              animate={{ 
                y: [0, -3, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            >
              <CreditCard className="h-6 w-6 text-amber-500" />
            </motion.div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {cardTypes.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 p-2 bg-slate-100 rounded-full">
                          {card.icon}
                        </div>
                        <h3 className="font-medium">{card.title}</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">Card {index + 1}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center text-sm font-medium text-green-600 mb-2">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          メリット
                        </div>
                        <ul className="text-xs space-y-1 pl-6 list-disc">
                          {card.merits.map((merit, i) => (
                            <li key={i}>{merit}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="flex items-center text-sm font-medium text-amber-600 mb-2">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          注意点
                        </div>
                        <ul className="text-xs space-y-1 pl-6 list-disc">
                          {card.cautions.map((caution, i) => (
                            <li key={i}>{caution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center pt-4">
            <Button onClick={() => handleTabChange("quiz")}>
              クイズに進む
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {!showResults ? (
            <div className="bg-white p-6 rounded-lg border">
              {/* Progress indicator */}
              <div className="mb-4 flex items-center">
                <div className="text-sm text-gray-500">質問 {currentQuestion + 1}/{quizQuestions.length}</div>
                <div className="ml-auto flex space-x-1">
                  {quizQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-6 rounded-full ${
                        index === currentQuestion ? "bg-primary" : 
                        index < currentQuestion ? "bg-primary/50" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">
                {quizQuestions[currentQuestion].question}
              </h3>
              
              <RadioGroup
                value={selectedAnswers[currentQuestion] || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 p-3 rounded-md border ${
                      selectedAnswers[currentQuestion] === option 
                        ? "border-primary bg-primary/5" 
                        : "border-gray-200"
                    }`}
                  >
                    <Radio
                      id={`option-${index}`}
                      value={option}
                      className="text-primary"
                    />
                    <label htmlFor={`option-${index}`} className="text-sm w-full cursor-pointer">
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="mt-6">
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswers[currentQuestion]}
                  className="w-full"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "結果を見る" : "次の問題へ"}
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-lg border"
            >
              <h3 className="text-xl font-medium text-center mb-4">
                クイズ結果
              </h3>
              
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{calculateScore()}</div>
                    <div className="text-sm text-gray-500">/ {quizQuestions.length}点</div>
                  </div>
                </div>
              </div>
              
              {/* Pigipe reaction based on score */}
              <div className="flex justify-center mb-6">
                <div className="text-center">
                  <motion.img
                    src="/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png"
                    alt="Pigipe reaction"
                    className="h-24 mx-auto"
                    animate={
                      calculateScore() === quizQuestions.length 
                        ? { y: [0, -10, 0], rotate: [0, 5, -5, 0] }
                        : calculateScore() >= quizQuestions.length / 2
                        ? { y: [0, -5, 0] }
                        : { rotate: [0, -5, 0, 5, 0] }
                    }
                    transition={{ repeat: 2, duration: 1 }}
                  />
                  <div className="mt-2 text-sm font-medium">
                    {calculateScore() === quizQuestions.length 
                      ? "すごい！満点だブー！カードの知識バッチリだね！" 
                      : calculateScore() >= quizQuestions.length / 2
                      ? "よくがんばったブー！もう一度挑戦してみようブー！"
                      : "もう少し勉強して、また挑戦してみようブー！"}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">解説：</h4>
                {quizQuestions.map((q, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg ${
                      selectedAnswers[index] === q.correctAnswer
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-1 rounded-full mr-2 ${
                        selectedAnswers[index] === q.correctAnswer
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {selectedAnswers[index] === q.correctAnswer ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">問題{index + 1}：{q.question}</div>
                        <div className="text-xs mt-1">
                          <span className="font-medium">正解：</span> {q.correctAnswer}
                        </div>
                        <div className="text-xs mt-2 text-gray-600">{q.explanation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CreditCardEducation;
