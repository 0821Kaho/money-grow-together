
import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface BudgetQuizProps {
  onComplete: (isCorrect: boolean) => void;
}

// クイズのデータ
const quizzes = [
  {
    question: "節約を続けるための最も効果的な方法は？",
    options: [
      "すべての出費を記録する",
      "クレジットカードだけを使う",
      "収入が増えるのを待つ",
      "すべての娯楽費を削る"
    ],
    correctIndex: 0,
    explanation: "支出を記録することで、あなたのお金がどこに使われているかを把握でき、節約できる箇所を特定しやすくなります。"
  },
  {
    question: "緊急資金はいくら準備すべき？",
    options: [
      "月収の1倍",
      "月収の3〜6倍",
      "年収の半分",
      "貯金は必要ない"
    ],
    correctIndex: 1,
    explanation: "専門家は一般的に、緊急時に備えて3〜6ヶ月分の生活費を貯めておくことを推奨しています。"
  },
  {
    question: "家計における「固定費」とは？",
    options: [
      "毎月変動する費用",
      "一度きりの大きな出費",
      "毎月一定額が必要な費用",
      "趣味や娯楽にかかる費用"
    ],
    correctIndex: 2,
    explanation: "固定費は家賃、サブスクリプション、ローンなど、毎月ほぼ同じ金額が発生する費用のことです。"
  },
  {
    question: "消費者ローンの金利が年15%の場合、10万円借りると1年後の返済総額は約いくら？",
    options: [
      "10万円",
      "10万5千円",
      "11万円",
      "11万5千円"
    ],
    correctIndex: 3,
    explanation: "年利15%の場合、1年後には元金10万円に加えて1万5千円の利息が発生します。"
  }
];

const BudgetQuiz = ({ onComplete }: BudgetQuizProps) => {
  const [selectedQuiz] = useState(quizzes[Math.floor(Math.random() * quizzes.length)]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    setShowResult(true);
  };
  
  const handleContinue = () => {
    const isCorrect = selectedOption === selectedQuiz.correctIndex;
    onComplete(isCorrect);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-gray-200 p-5"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F7F7] text-[#25B589]">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold">週間クイズ</h3>
      </div>
      
      <p className="mb-5 text-gray-700">
        {selectedQuiz.question}
      </p>
      
      <div className="mb-5 flex flex-col gap-3">
        {selectedQuiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && handleOptionSelect(index)}
            disabled={showResult}
            className={`flex items-center rounded-lg border ${
              selectedOption === index 
                ? 'border-[#25B589] bg-[#25B589]/10' 
                : 'border-gray-200'
            } ${
              showResult && index === selectedQuiz.correctIndex
                ? 'border-[#25B589] bg-[#25B589]/10'
                : ''
            } ${
              showResult && selectedOption === index && index !== selectedQuiz.correctIndex
                ? 'border-game-danger bg-game-danger/10'
                : ''
            } p-4 text-left hover:bg-gray-50`}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-current mr-3">
              {String.fromCharCode(65 + index)}
            </div>
            <span>{option}</span>
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className={`mb-4 rounded-lg p-3 ${
          selectedOption === selectedQuiz.correctIndex
            ? 'bg-[#25B589]/10 text-[#25B589]'
            : 'bg-game-danger/10 text-game-danger'
        }`}>
          <p className="font-medium">
            {selectedOption === selectedQuiz.correctIndex 
              ? '正解です！' 
              : '残念、不正解です。'}
          </p>
          <p className="mt-1 text-sm">
            {selectedQuiz.explanation}
          </p>
        </div>
      )}
      
      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className={`game-button w-full ${selectedOption === null ? 'opacity-50' : ''}`}
        >
          回答する
        </button>
      ) : (
        <button
          onClick={handleContinue}
          className="game-button w-full"
        >
          続ける
        </button>
      )}
    </motion.div>
  );
};

export default BudgetQuiz;
