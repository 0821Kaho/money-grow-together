
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";

interface BudgetQuizProps {
  onComplete: (isCorrect: boolean) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "収入に対して毎月の固定費の割合が理想的なのは次のうちどれ？",
    options: ["70%以上", "50～60%程度", "30%以下", "80～90%程度"],
    correctIndex: 1,
    explanation: "固定費は収入の50～60%程度に抑えると、変動費や貯蓄のバランスが取りやすくなります。"
  },
  {
    question: "以下のうち「固定費」に分類されるものはどれ？",
    options: ["外食代", "家賃", "洋服代", "交際費"],
    correctIndex: 1,
    explanation: "家賃は毎月定額で支払う典型的な固定費です。他の選択肢は変動費に分類されます。"
  },
  {
    question: "貯蓄の基本的な考え方として正しいのはどれ？",
    options: ["収入が増えたら貯蓄を始める", "先に貯蓄し、残りを使う", "若いうちは貯蓄より消費優先", "貯蓄は年収の1%程度"],
    correctIndex: 1,
    explanation: "「先に貯蓄、後で消費」の原則は効果的な貯蓄法です。収入を得たらまず一定額を貯蓄に回しましょう。"
  },
  {
    question: "急な出費に備えた「緊急資金」の理想的な金額は？",
    options: ["月収の1倍程度", "生活費の3～6ヶ月分", "年収の50%程度", "貯金総額の10%程度"],
    correctIndex: 1,
    explanation: "生活費の3～6ヶ月分が緊急資金の目安です。失業や病気などの万が一の事態に備えましょう。"
  },
  {
    question: "収支管理で最も効果的な方法は？",
    options: ["レシートを保管する", "家計簿や家計簿アプリで記録する", "銀行口座の残高を確認する", "財布の中身で管理する"],
    correctIndex: 1,
    explanation: "家計簿で継続的に収支を記録することで、支出パターンの把握や無駄の発見ができます。"
  },
  {
    question: "お金を借りる際に最も注目すべき数字は？",
    options: ["融資限度額", "金利（年率）", "返済期間", "審査にかかる日数"],
    correctIndex: 1,
    explanation: "借入の総コストに最も影響するのは金利です。わずかな金利差でも長期的には大きな差になります。"
  },
  {
    question: "無駄遣いを減らすために最も効果的なのは？",
    options: ["現金だけを使う", "購入前に24時間考える習慣をつける", "買い物リストを作らない", "クレジットカードの限度額を上げる"],
    correctIndex: 1,
    explanation: "衝動買いを防ぐには、購入前に一定時間置いて本当に必要かどうか考えることが効果的です。"
  },
  {
    question: "固定費を見直すときに最もおすすめなのは？",
    options: ["すべてのサブスクを解約する", "定期的に各費用を比較検討する", "最安値のサービスに切り替える", "家賃の安い地域に引っ越す"],
    correctIndex: 1,
    explanation: "費用対効果を定期的に見直し、必要性や代替手段を検討することが賢明な固定費管理です。"
  },
  {
    question: "将来の大きな支出に備える最良の方法は？",
    options: ["その時にローンを組む", "目標金額と期間を決めて計画的に貯める", "投資で一発当てる", "親や身内からお金を借りる"],
    correctIndex: 1,
    explanation: "計画的な貯蓄が最も確実な方法です。目標と期間を明確にして少しずつ積み立てましょう。"
  },
  {
    question: "お金の使い方で幸福度を高めるのに効果的なのは？",
    options: ["高級ブランド品を買う", "体験や思い出に使う", "常に最新のガジェットを持つ", "人に見せびらかせるものに使う"],
    correctIndex: 1,
    explanation: "研究によると、モノよりも経験や体験に使ったお金の方が、長期的な幸福度を高める効果があります。"
  }
];

// ランダムなクイズ質問を取得する関数
const getRandomQuestion = (excludeIds: number[]): { question: QuizQuestion; id: number } => {
  // まだ出題していない質問からランダムに選ぶ
  const availableQuestions = quizQuestions.filter((_, index) => !excludeIds.includes(index));
  
  // すべての質問を出題した場合はリセット
  if (availableQuestions.length === 0) {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    return { question: quizQuestions[randomIndex], id: randomIndex };
  }
  
  // ランダムに質問を選ぶ
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const questionIndex = quizQuestions.indexOf(availableQuestions[randomIndex]);
  
  return { question: availableQuestions[randomIndex], id: questionIndex };
};

const BudgetQuiz = ({ onComplete }: BudgetQuizProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(-1);

  // 過去に出題した問題のIDをlocalStorageから取得
  useEffect(() => {
    // localStorageから過去の問題IDを取得
    const askedQuestionsString = localStorage.getItem('askedBudgetQuestions');
    const askedQuestions = askedQuestionsString ? JSON.parse(askedQuestionsString) : [];
    
    // ランダムな質問を取得
    const { question, id } = getRandomQuestion(askedQuestions);
    setCurrentQuestion(question);
    setCurrentQuestionId(id);
    
    // 出題した問題IDを保存
    const updatedAskedQuestions = [...askedQuestions, id];
    // 最大10個までIDを保存（古いものから削除）
    if (updatedAskedQuestions.length > 10) {
      updatedAskedQuestions.shift();
    }
    localStorage.setItem('askedBudgetQuestions', JSON.stringify(updatedAskedQuestions));
  }, []);

  const handleOptionSelect = (index: number) => {
    if (showAnswer) return;
    
    setSelectedOption(index);
    setShowAnswer(true);
    
    // 3秒後に結果を表示して次に進む
    setTimeout(() => {
      if (currentQuestion) {
        onComplete(index === currentQuestion.correctIndex);
      }
    }, 3000);
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-game-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-gray-200 p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">週末クイズチャレンジ！</h3>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F7F7]">
          <HelpCircle className="h-5 w-5 text-game-primary" />
        </div>
      </div>
      
      <p className="mb-6 text-gray-700 break-words whitespace-normal">{currentQuestion.question}</p>
      
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={showAnswer}
            className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition ${
              selectedOption === index
                ? showAnswer
                  ? index === currentQuestion.correctIndex
                    ? "border-[#25B589] bg-[#E8F5E9]"
                    : "border-game-danger bg-[#FFEBEE]"
                  : "border-game-primary bg-[#FFF8F8]"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            } ${showAnswer && index === currentQuestion.correctIndex ? "border-[#25B589] bg-[#E8F5E9]" : ""}`}
          >
            <span className="break-words whitespace-normal">{option}</span>
            {showAnswer && index === selectedOption && (
              <>
                {index === currentQuestion.correctIndex ? (
                  <Check className="h-5 w-5 text-[#25B589]" />
                ) : (
                  <X className="h-5 w-5 text-game-danger" />
                )}
              </>
            )}
            {showAnswer && index === currentQuestion.correctIndex && index !== selectedOption && (
              <Check className="h-5 w-5 text-[#25B589]" />
            )}
          </button>
        ))}
      </div>
      
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 rounded-lg bg-[#F7F7F7] p-3"
        >
          <p className="text-sm font-medium break-words whitespace-normal">
            {selectedOption === currentQuestion.correctIndex
              ? "正解です！"
              : `正解は「${currentQuestion.options[currentQuestion.correctIndex]}」です。`}
          </p>
          <p className="mt-1 text-sm text-gray-600 break-words whitespace-normal">{currentQuestion.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BudgetQuiz;
