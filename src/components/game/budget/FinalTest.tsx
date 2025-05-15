
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface FinalTestProps {
  onComplete: (score: number) => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "収入に対する適切な貯蓄割合として推奨されるのはいくらでしょうか？",
    options: ["5%程度", "10～20%程度", "30～40%程度", "50%以上"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "以下のうち、変動費として最も適切なものはどれでしょうか？",
    options: ["家賃", "食費", "保険料", "住宅ローン"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "予算を立てる際に最初に考えるべきことは何でしょうか？",
    options: ["投資の方法", "固定費の把握", "娯楽費の確保", "クレジットカードの限度額"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "消費者金融と銀行ローンを比較した場合、一般的に言えることは？",
    options: [
      "消費者金融の方が金利が低い",
      "銀行ローンの方が審査が緩い",
      "消費者金融の方が審査が早い",
      "銀行ローンの方が限度額が低い",
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "「イノシシのローン屋」のような高金利貸付業者の金利はどのくらいになることがありますか？",
    options: ["年5～10%", "年15～20%", "年30%以上", "年1～3%"],
    correctAnswer: 2,
  },
];

const FinalTest = ({ onComplete }: FinalTestProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    const currentQ = questions[currentQuestion];
    const isCorrect = answerIndex === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "正解！",
        description: "素晴らしい！",
      });
    } else {
      toast({
        title: "不正解",
        description: `正解は「${currentQ.options[currentQ.correctAnswer]}」です`,
        variant: "destructive",
      });
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg bg-white p-6"
    >
      {!showResult ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold">まとめテスト</h3>
            <div className="flex items-center gap-1 rounded-full bg-[#F7F7F7] px-3 py-1">
              <span className="font-medium text-game-primary">{currentQuestion + 1}</span>
              <span className="text-gray-500">/ {questions.length}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="mb-4 text-lg font-medium break-words whitespace-normal">
              {questions[currentQuestion].question}
            </h4>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                  className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition 
                    ${
                      selectedAnswer === index
                        ? answered
                          ? index === questions[currentQuestion].correctAnswer
                            ? "border-[#25B589] bg-[#E8F5E9]"
                            : "border-game-danger bg-[#FFEBEE]"
                          : "border-game-primary bg-[#FFF8F8]"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <span className="break-words whitespace-normal">{option}</span>
                  {answered && selectedAnswer === index && (
                    index === questions[currentQuestion].correctAnswer ? (
                      <Check className="h-5 w-5 text-[#25B589]" />
                    ) : (
                      <X className="h-5 w-5 text-game-danger" />
                    )
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-game-primary transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-4 text-6xl">
            {score === questions.length ? "🏆" : score >= questions.length * 0.6 ? "🎉" : "📚"}
          </div>
          <h3 className="mb-4 text-xl font-bold">テスト結果</h3>
          
          <div className="mb-6 w-32 h-32 relative">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#EEEEEE"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={score / questions.length >= 0.8 ? "#25B589" : "#FF6F6F"}
                strokeWidth="3"
                strokeDasharray={`${(score / questions.length) * 100}, 100`}
              />
              <text x="18" y="21" textAnchor="middle" fontSize="10" fill="#333333" fontWeight="bold">
                {score}/{questions.length}
              </text>
            </svg>
          </div>
          
          <p className="mb-6 text-center text-lg break-words whitespace-normal">
            {score === questions.length
              ? "素晴らしい！全問正解です！"
              : score >= questions.length * 0.6
              ? "よくできました！"
              : "もう少し復習しましょう！"}
          </p>
          
          <button
            onClick={() => onComplete(score)}
            className="rounded-xl bg-game-primary px-6 py-3 font-medium text-white transition-all hover:brightness-105"
          >
            結果を確定する
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default FinalTest;
