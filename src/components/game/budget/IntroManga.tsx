
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const mangaPages = [
  {
    image: "/lovable-uploads/baee6be4-6d46-4b16-bdcf-f8f2c76d55ae.png",
    title: "お金の見える化しよう",
    text: "家計管理の第一歩は、自分のお金がどこから来て、どこに使われているのかを把握すること。",
  },
  {
    image: "/lovable-uploads/0aa2da66-e60f-4046-ab60-94b720acc331.png",
    title: "収入と支出を整理しよう",
    text: "毎月の収入から固定費や変動費を引いて、どれだけ自由に使えるお金があるのかを確認しましょう。",
  },
  {
    image: "/lovable-uploads/fd1beb09-5194-4c92-9101-d421ec49545c.png",
    title: "予算を立てる大切さ",
    text: "計画的に支出をコントロールすれば、将来のために貯蓄することも、今を楽しむことも両立できます。",
  },
  {
    image: "⚠️",
    title: "高金利ローンに注意",
    text: "一時的に便利でも、返済時の金利負担が重く、長期的な家計を圧迫することがあります。",
  },
  {
    image: "🎯",
    title: "目標を持って管理しよう",
    text: "単なる節約ではなく、あなたの価値観や目標に合わせた「お金の使い方」を考えましょう。",
  },
];

interface IntroMangaProps {
  onComplete: () => void;
}

const IntroManga = ({ onComplete }: IntroMangaProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < mangaPages.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-sm">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg bg-white p-6 shadow-md"
        >
          <div className="mb-4 flex justify-center">
            {currentPage === 0 || currentPage === 1 || currentPage === 2 ? (
              <div className="h-32 w-32 flex items-center justify-center">
                <img 
                  src={mangaPages[currentPage].image} 
                  alt={mangaPages[currentPage].title} 
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#F7F7F7] text-5xl">
                {mangaPages[currentPage].image}
              </div>
            )}
          </div>
          <h3 className="mb-2 text-center text-lg font-bold break-words whitespace-normal">
            {mangaPages[currentPage].title}
          </h3>
          <p className="text-center text-gray-700 break-words whitespace-normal">
            {mangaPages[currentPage].text}
          </p>
        </motion.div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`flex items-center rounded-lg p-2 ${
              currentPage === 0 ? "text-gray-400" : "text-game-primary"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1">前へ</span>
          </button>

          <div className="flex gap-1">
            {mangaPages.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentPage ? "bg-game-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            className="flex items-center rounded-lg p-2 text-game-primary"
          >
            <span className="mr-1">
              {currentPage === mangaPages.length - 1 ? "完了" : "次へ"}
            </span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroManga;
