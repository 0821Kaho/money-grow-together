
import BudgetPlanner from "./BudgetPlanner";
import BudgetQuiz from "./BudgetQuiz";
import DragDropSaving from "./DragDropSaving";
import ExpenseCalculator from "./ExpenseCalculator";
import IntroManga from "./IntroManga";
import LoanComparison from "./LoanComparison";
import CreditCardEducation from "./CreditCardEducation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, BookOpen, CreditCard, DollarSign, Calculator, PiggyBank } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import TontonGameSoundEffect from "../TontonGameSoundEffect";
import { useIsMobile } from "@/hooks/use-mobile";

// This component acts as a container for all budget-related modules
const BudgetModules = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // State to track which sections are expanded/collapsed
  const [expandedSections, setExpandedSections] = useState({
    intro: true,
    expenses: false,
    budget: false,
    saving: false,
    credit: false,
    loans: false,
    quiz: false
  });
  
  // State to track module completion status
  const [completedModules, setCompletedModules] = useState({
    intro: false,
    expenses: false,
    budget: false,
    saving: false,
    credit: false,
    loans: false,
    quiz: false
  });
  
  // State for animated background
  const [showSparks, setShowSparks] = useState(false);
  
  // Toggle section visibility
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
    
    // Play sound
    TontonGameSoundEffect.playClick();
  };
  
  // Generic completion handler for all modules
  const handleModuleComplete = (module: keyof typeof completedModules, data?: any) => {
    // Mark module as completed
    setCompletedModules({
      ...completedModules,
      [module]: true
    });
    
    // Show sparks animation
    setShowSparks(true);
    setTimeout(() => setShowSparks(false), 2000);
    
    // Display appropriate toast message based on module
    if (module === "intro") {
      toast({ title: "基礎知識を習得しました！", description: "次のステップに進みましょう" });
    } else if (module === "expenses") {
      const balance = data as number;
      toast({ 
        title: "収支の把握が完了しました", 
        description: balance >= 0 
          ? `残高: +${balance.toLocaleString()}円` 
          : `残高: ${balance.toLocaleString()}円（赤字です）`
      });
      
      // Expand next section automatically
      setTimeout(() => {
        setExpandedSections(prev => ({
          ...prev,
          budget: true
        }));
      }, 500);
    } else if (module === "budget") {
      const isSuccessful = data as boolean;
      toast({
        title: isSuccessful ? "予算シミュレーション成功！" : "予算シミュレーション完了",
        description: isSuccessful 
          ? "予算内で1週間を生活できました！" 
          : "次回はより計画的な予算を立ててみましょう",
        variant: isSuccessful ? "default" : "destructive"
      });
    } else if (module === "saving") {
      const savedAmount = data as number;
      toast({
        title: "節約プラン作成完了！",
        description: `月間 ${savedAmount.toLocaleString()}円 の節約に成功しました`,
      });
    } else if (module === "credit") {
      // Credit card education doesn't need special handling
      toast({ title: "クレジットカードの知識を習得しました", description: "賢い利用方法を学びました" });
    } else if (module === "loans") {
      toast({ title: "ローンの比較学習完了", description: "金利の違いによる影響を理解しました" });
    } else if (module === "quiz") {
      const isCorrect = data as boolean;
      toast({
        title: isCorrect ? "クイズ正解！" : "クイズ回答完了",
        description: isCorrect 
          ? "素晴らしい知識です！" 
          : "次回も挑戦してみましょう",
        variant: isCorrect ? "default" : "destructive"
      });
    }
    
    // Add bounce animation and play sound
    TontonGameSoundEffect.playLevelUp();
  };
  
  // Progress visualization
  const calculateProgress = () => {
    const totalModules = Object.keys(completedModules).length;
    const completedCount = Object.values(completedModules).filter(Boolean).length;
    return Math.round((completedCount / totalModules) * 100);
  };
  
  // Section wrapper component
  const Section = ({ 
    id, 
    title,
    icon,
    children 
  }: { 
    id: keyof typeof expandedSections; 
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode 
  }) => (
    <div className="mb-6">
      <motion.div 
        className={`flex justify-between items-center p-4 rounded-lg mb-2 cursor-pointer transition-colors ${
          expandedSections[id] ? 'bg-primary/10' : 'bg-slate-50 hover:bg-slate-100'
        }`}
        onClick={() => toggleSection(id)}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${expandedSections[id] ? 'bg-primary/20' : 'bg-slate-200'}`}>
            {icon}
          </div>
          <div>
            <h2 className="font-semibold">{title}</h2>
            {completedModules[id] && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                完了
              </span>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm">
          {expandedSections[id] ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </motion.div>
      
      <AnimatePresence>
        {expandedSections[id] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="border border-muted p-4">
              {children}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
  // Show Pigipe learning progress assistant
  const PigipeLearningAssistant = () => (
    <motion.div 
      className="sticky top-4 bg-white rounded-xl shadow-sm p-4 border border-blue-100"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-blue-100 p-2 mr-3 relative">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              y: [0, -2, 0, -2, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              repeatType: "loop"
            }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png"
                alt="Pigipeアシスタント"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
          
          {/* Decorative light effect */}
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              repeatType: "loop" 
            }}
          />
        </div>
        <div>
          <h3 className="font-bold text-blue-700">Pigipe学習アシスタント</h3>
          <div className="text-xs text-blue-600">
            あと{7 - Object.values(completedModules).filter(Boolean).length}モジュールで完了ブー！
          </div>
        </div>
      </div>
      
      <div className="py-3 px-4 bg-blue-50 rounded-md mb-4 text-sm relative">
        <div className="absolute left-2 top-0 w-0 h-0 transform -translate-y-full" style={{
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: '6px solid #EFF6FF'
        }}></div>
        <p className="text-blue-700">
          {Object.values(completedModules).filter(Boolean).length === 0 
            ? "まずは基礎知識から始めようブー！カードをクリックしてね！" 
            : Object.values(completedModules).filter(Boolean).length >= 3
            ? "すごい進捗だブー！あと少しだブー！" 
            : "次のステップも頑張るブー！応援してるよ！"}
        </p>
      </div>
      
      {/* Progress visualization */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>学習進捗</span>
          <span>{calculateProgress()}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* Pigipe on progress bar */}
          {calculateProgress() > 0 && (
            <motion.div
              className="absolute top-0 h-5 w-5"
              style={{ 
                left: `${Math.min(Math.max(calculateProgress() - 5, 0), 95)}%`,
                transform: "translateY(-30%)"
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <img 
                src="/lovable-uploads/f16647ff-53c6-496c-b2f2-802971b6936e.png" 
                alt="Pigipe" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Celebration for completed modules */}
      {showSparks && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                top: "50%",
                left: "50%",
                width: Math.random() * 6 + 3,
                height: Math.random() * 6 + 3,
                backgroundColor: ['#FFD700', '#FF6347', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)],
                borderRadius: "50%",
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: [1, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: 1 + Math.random(),
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Daily challenge */}
      <div className="border border-blue-200 rounded-md p-3">
        <h4 className="font-medium text-sm mb-2 flex items-center">
          <DollarSign className="h-3.5 w-3.5 mr-1 text-blue-600" />
          今日のチャレンジ
        </h4>
        <p className="text-xs text-gray-600 mb-3">
          コンビニコーヒーの代わりに水筒を持参して1週間でいくら節約できるか計算してみよう！
        </p>
        <div className="text-xs text-blue-700 font-medium">
          完了で10ポイントゲット！
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <div className={`${isMobile ? 'space-y-6' : 'lg:grid lg:grid-cols-3 gap-6'}`}>
      <div className={`${isMobile ? '' : 'lg:col-span-2'} space-y-4`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Section 
            id="intro" 
            title="家計管理の基本" 
            icon={<BookOpen className="h-5 w-5 text-primary" />}
          >
            <IntroManga onComplete={() => handleModuleComplete("intro")} />
          </Section>
          
          <Section 
            id="expenses" 
            title="支出の把握" 
            icon={<Calculator className="h-5 w-5 text-blue-600" />}
          >
            <ExpenseCalculator onComplete={(balance) => handleModuleComplete("expenses", balance)} />
          </Section>
          
          <Section 
            id="budget" 
            title="予算の立て方" 
            icon={<DollarSign className="h-5 w-5 text-green-600" />}
          >
            <BudgetPlanner onComplete={(success) => handleModuleComplete("budget", success)} />
          </Section>
          
          <Section 
            id="saving" 
            title="貯蓄方法" 
            icon={<PiggyBank className="h-5 w-5 text-amber-600" />}
          >
            <DragDropSaving onComplete={(savedAmount) => handleModuleComplete("saving", savedAmount)} />
          </Section>
          
          <Section 
            id="credit" 
            title="クレジットカードと借金管理" 
            icon={<CreditCard className="h-5 w-5 text-purple-600" />}
          >
            <CreditCardEducation onComplete={() => handleModuleComplete("credit")} />
          </Section>
          
          <Section 
            id="loans" 
            title="ローンの比較" 
            icon={<Calculator className="h-5 w-5 text-red-600" />}
          >
            <LoanComparison onComplete={() => handleModuleComplete("loans")} />
          </Section>
          
          <Section 
            id="quiz" 
            title="知識チェックテスト" 
            icon={<BookOpen className="h-5 w-5 text-indigo-600" />}
          >
            <BudgetQuiz onComplete={(isCorrect) => handleModuleComplete("quiz", isCorrect)} />
          </Section>
        </motion.div>
      </div>
      
      {/* 学習アシスタント - モバイル表示時は下部に表示 */}
      {isMobile ? (
        <div className="mt-8">
          <PigipeLearningAssistant />
        </div>
      ) : (
        <div className="hidden lg:block">
          <PigipeLearningAssistant />
        </div>
      )}
    </div>
  );
};

export default BudgetModules;
