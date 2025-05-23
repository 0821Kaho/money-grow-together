
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
    image: "🔢",
    title: "金利の仕組みを理解しよう",
    text: "お金を借りる時も貸す時も重要な「金利」。複利の力を味方につければ、お金が自然に増えていきます。",
  },
  {
    image: "/lovable-uploads/c751bfdb-2a92-43b3-8dfc-687a375bebef.png",
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
  onInterestRateEducation?: () => void;
}

const IntroManga = ({ onComplete, onInterestRateEducation }: IntroMangaProps) => {
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

  const handlePageAction = () => {
    // 金利の説明ページで、金利教育モードに切り替え
    if (currentPage === 3 && onInterestRateEducation) {
      onInterestRateEducation();
    } else {
      nextPage();
    }
  };

  const renderImage = () => {
    const image = mangaPages[currentPage].image;
    
    // Check if the image is a URL (starts with / or http)
    if (typeof image === 'string' && (image.startsWith('/') || image.startsWith('http'))) {
      return (
        <img 
          src={image} 
          alt={mangaPages[currentPage].title} 
          className="h-full w-full object-contain"
        />
      );
    } else {
      // Render emoji or other content
      return (
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#F7F7F7] text-5xl">
          {image}
        </div>
      );
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
            <div className="h-32 w-32 flex items-center justify-center">
              {renderImage()}
            </div>
          </div>
          <h3 className="mb-2 text-center text-lg font-bold break-words whitespace-normal">
            {mangaPages[currentPage].title}
          </h3>
          <p className="text-center text-gray-700 break-words whitespace-normal">
            {mangaPages[currentPage].text}
          </p>
          
          {currentPage === 3 && onInterestRateEducation && (
            <button 
              onClick={onInterestRateEducation}
              className="mt-4 w-full rounded-md bg-blue-100 px-3 py-2 text-sm text-blue-700 hover:bg-blue-200"
            >
              金利についてもっと詳しく学ぶ →
            </button>
          )}
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
            onClick={handlePageAction}
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
