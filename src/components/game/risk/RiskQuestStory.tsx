
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import { CheckCircle2, ArrowLeft, ChevronRight, HelpCircle, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface TopicType {
  id: string;
  title: string;
  icon: string;
  description: string;
  progressPercent: number;
  badgeLevel: string;
  isLocked: boolean;
  quizCompleted: boolean;
  gameCompleted: boolean;
  actionCompleted: boolean;
}

interface RiskQuestStoryProps {
  topic: TopicType;
  onComplete: (stepType: 'quiz' | 'game' | 'action') => void;
  onBack: () => void;
}

// Quiz questions (simplified example for health topic)
const healthQuizQuestions = [
  {
    question: "公的医療保険で入院時にカバーされる保障は？",
    options: [
      "食事代とベッド代の全額",
      "入院費用の70%と食事代の一部",
      "入院費用の100%",
      "入院前の検査費用のみ"
    ],
    correctAnswer: 1
  },
  {
    question: "民間の医療保険に加入する主な目的は？",
    options: [
      "税金の控除を受けるため",
      "公的保険の窓口負担をなくすため",
      "公的保険でカバーされない部分を補うため",
      "健康診断を無料で受けるため"
    ],
    correctAnswer: 2
  },
  {
    question: "日本の公的医療保険制度の特徴として正しいのは？",
    options: [
      "加入は任意である",
      "全ての国民が何らかの公的医療保険に加入している",
      "高額な治療は保障されない",
      "外国人は加入できない"
    ],
    correctAnswer: 1
  }
];

// SimulationGame component placeholder
const SimulationGame = ({ topic, onComplete }: { topic: TopicType, onComplete: () => void }) => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl">
      <h3 className="font-medium mb-4">最適な保険選びシミュレーション</h3>
      
      <div className="bg-white p-4 rounded-lg mb-4">
        <h4 className="font-medium text-sm mb-2">あなたの状況</h4>
        <ul className="text-sm space-y-2">
          <li>• 年齢：28歳</li>
          <li>• 収入：月25万円</li>
          <li>• 家族構成：独身</li>
          <li>• 持病：なし</li>
        </ul>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-sm">スタンダード医療保険</h5>
              <p className="text-xs text-muted-foreground">月額：4,500円</p>
            </div>
            <input type="radio" name="insurance" className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            入院日額5,000円、手術給付金10万円〜
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-sm">若年層向け医療保険</h5>
              <p className="text-xs text-muted-foreground">月額：3,200円</p>
            </div>
            <input type="radio" name="insurance" className="h-4 w-4 text-primary" checked />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            入院日額5,000円、手術給付金8万円〜<br />
            <span className="text-primary text-xs">おすすめ！あなたの年齢ならこのプランがお得です</span>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-sm">プレミアム医療保険</h5>
              <p className="text-xs text-muted-foreground">月額：8,900円</p>
            </div>
            <input type="radio" name="insurance" className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            入院日額10,000円、手術給付金20万円〜、先進医療特約付き
          </div>
        </div>
      </div>
      
      <Button onClick={onComplete} className="w-full">
        保険を選択する
      </Button>
    </div>
  );
};

// Action component placeholder
const ActionTask = ({ topic, onComplete }: { topic: TopicType, onComplete: () => void }) => {
  const [checked, setChecked] = useState([false, false, false]);
  
  const allChecked = checked.every(c => c);
  
  const toggleCheck = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };
  
  return (
    <div className="p-4 bg-slate-50 rounded-xl">
      <h3 className="font-medium mb-1">実践チェックリスト</h3>
      <p className="text-sm text-muted-foreground mb-4">
        下記の行動を実践して、チェックを入れてください
      </p>
      
      <div className="space-y-3 mb-6">
        <div 
          className={`p-3 rounded-lg border ${checked[0] ? 'bg-primary/5 border-primary/30' : 'bg-white border-gray-200'}`}
          onClick={() => toggleCheck(0)}
        >
          <div className="flex gap-3">
            <div className={`w-5 h-5 rounded border flex items-center justify-center ${checked[0] ? 'bg-primary border-primary' : 'border-gray-300'}`}>
              {checked[0] && <CheckCircle2 className="h-4 w-4 text-white" />}
            </div>
            <div>
              <h4 className="text-sm font-medium">保険証券を確認する</h4>
              <p className="text-xs text-muted-foreground">
                あなたの保険証券を取り出して、補償内容を確認しましょう
              </p>
            </div>
          </div>
        </div>
        
        <div 
          className={`p-3 rounded-lg border ${checked[1] ? 'bg-primary/5 border-primary/30' : 'bg-white border-gray-200'}`}
          onClick={() => toggleCheck(1)}
        >
          <div className="flex gap-3">
            <div className={`w-5 h-5 rounded border flex items-center justify-center ${checked[1] ? 'bg-primary border-primary' : 'border-gray-300'}`}>
              {checked[1] && <CheckCircle2 className="h-4 w-4 text-white" />}
            </div>
            <div>
              <h4 className="text-sm font-medium">家族と共有する</h4>
              <p className="text-xs text-muted-foreground">
                保険内容を家族に共有し、もしもの時の対応を話し合いましょう
              </p>
            </div>
          </div>
        </div>
        
        <div 
          className={`p-3 rounded-lg border ${checked[2] ? 'bg-primary/5 border-primary/30' : 'bg-white border-gray-200'}`}
          onClick={() => toggleCheck(2)}
        >
          <div className="flex gap-3">
            <div className={`w-5 h-5 rounded border flex items-center justify-center ${checked[2] ? 'bg-primary border-primary' : 'border-gray-300'}`}>
              {checked[2] && <CheckCircle2 className="h-4 w-4 text-white" />}
            </div>
            <div>
              <h4 className="text-sm font-medium">医療費控除をリサーチ</h4>
              <p className="text-xs text-muted-foreground">
                医療費控除の対象になる費用を調べて、家計管理に備えましょう
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onComplete}
        disabled={!allChecked}
        className="w-full"
      >
        全てのタスクを完了した
      </Button>
    </div>
  );
};

// Main component
const RiskQuestStory = ({ topic, onComplete, onBack }: RiskQuestStoryProps) => {
  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Story content depends on the topic
  const storyContent = [
    {
      text: `「${topic.title}」の分野へようこそ！この学習では、${topic.description.slice(0, -1)}について学びます。`,
      speaker: "mascot"
    },
    {
      text: "まずは、基本的な知識を学んで、クイズに挑戦しましょう。",
      speaker: "mascot"
    },
    {
      text: "日本の公的医療保険は、すべての国民が何らかの保険に加入する「国民皆保険制度」です。病気やケガをしたとき、医療費の一部（通常3割）を支払うだけで医療を受けられますが、入院費用や手術費などで自己負担が大きくなる場合があります。",
      speaker: "system"
    },
    {
      text: "民間の医療保険は、こうした公的保険でカバーされない部分を補うためのものです。例えば、入院時の差額ベッド代や、収入が減った場合の生活費などをカバーします。",
      speaker: "system"
    },
    {
      text: "それでは、クイズで理解度を確認してみましょう！",
      speaker: "mascot"
    }
  ];
  
  // Handle next step in story
  const handleNextStep = () => {
    if (currentStep < storyContent.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowQuiz(true);
    }
  };
  
  // Handle quiz answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setQuizAnswers(newAnswers);
    
    // Short delay before showing next question or results
    setTimeout(() => {
      if (currentQuestion < healthQuizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowQuiz(false);
        onComplete('quiz');
        setShowGame(true);
      }
    }, 1000);
  };
  
  // Handle simulation game completion
  const handleGameComplete = () => {
    setShowGame(false);
    onComplete('game');
    setShowAction(true);
  };
  
  // Handle action task completion
  const handleActionComplete = () => {
    setShowAction(false);
    onComplete('action');
    onBack();
  };
  
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="absolute left-4 top-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3 mt-4">
          <div className="text-2xl">{topic.icon}</div>
          <CardTitle>{topic.title}</CardTitle>
        </div>
        
        <CardDescription>{topic.description}</CardDescription>
        
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">進捗</span>
            </div>
            <span className="text-xs font-medium">{topic.progressPercent.toFixed(0)}%</span>
          </div>
          <Progress value={topic.progressPercent} className="h-1.5" />
        </div>
      </CardHeader>
      
      <CardContent>
        <AnimatePresence mode="wait">
          {/* Story view */}
          {!showQuiz && !showGame && !showAction && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex gap-4">
                {storyContent[currentStep].speaker === "mascot" && (
                  <MascotCharacter size="medium" />
                )}
                <div className={`p-4 rounded-lg max-w-[80%] ${
                  storyContent[currentStep].speaker === "mascot" 
                    ? "bg-primary/10" 
                    : "bg-slate-100"
                }`}>
                  <p className="text-sm">
                    {storyContent[currentStep].text}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Quiz view */}
          {showQuiz && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">知識チェッククイズ</h3>
                  <span className="text-sm">{currentQuestion + 1}/{healthQuizQuestions.length}</span>
                </div>
                
                <p className="text-sm font-medium mb-4">
                  {healthQuizQuestions[currentQuestion].question}
                </p>
                
                <div className="space-y-2">
                  {healthQuizQuestions[currentQuestion].options.map((option, index) => {
                    const isSelected = quizAnswers[currentQuestion] === index;
                    const isCorrect = index === healthQuizQuestions[currentQuestion].correctAnswer;
                    
                    let buttonClass = "w-full text-left p-3 rounded-lg border text-sm";
                    
                    if (isSelected) {
                      buttonClass += isCorrect 
                        ? " bg-green-50 border-green-300" 
                        : " bg-red-50 border-red-300";
                    } else {
                      buttonClass += " bg-white border-gray-200 hover:bg-slate-50";
                    }
                    
                    return (
                      <button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={quizAnswers[currentQuestion] !== undefined}
                      >
                        {option}
                        {isSelected && isCorrect && (
                          <span className="ml-2 text-green-600">✓ 正解</span>
                        )}
                        {isSelected && !isCorrect && (
                          <span className="ml-2 text-red-600">✗ 不正解</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Simulation game view */}
          {showGame && (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SimulationGame 
                topic={topic} 
                onComplete={handleGameComplete} 
              />
            </motion.div>
          )}
          
          {/* Action task view */}
          {showAction && (
            <motion.div
              key="action"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ActionTask 
                topic={topic} 
                onComplete={handleActionComplete} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        {!showQuiz && !showGame && !showAction && (
          <Button 
            onClick={handleNextStep}
            className="w-full flex items-center gap-1"
          >
            {currentStep < storyContent.length - 1 ? (
              <>次へ <ChevronRight className="h-4 w-4" /></>
            ) : (
              <>クイズに挑戦する <Award className="h-4 w-4 ml-1" /></>
            )}
          </Button>
        )}
        
        {/* Help button */}
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-4 top-4"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RiskQuestStory;
