import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PigipeGuide from '@/components/common/PigipeGuide';
import MoneyBar from '@/components/common/MoneyBar';
import Confetti from '@/components/common/Confetti';
import { useInvestmentGameStore } from '@/stores/investmentGameStore';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import GameLayout from '@/components/layout/GameLayout';

const InvestmentWeek1Page = () => {
  const navigate = useNavigate();
  const {
    week1Money,
    setWeek1Money,
    addWeek1Choice,
    resetWeek1,
    week1Choices
  } = useInvestmentGameStore();

  const [hasChosen, setHasChosen] = useState(false);
  const [delta, setDelta] = useState(0);
  const [pigMessage, setPigMessage] = useState("給料が入ったブー！この1000円を貯金に回すか、投資に挑戦するか決めるブー！");
  const [mood, setMood] = useState<"happy" | "warning" | "sad" | "excited" | "normal">("excited");
  const [showConfetti, setShowConfetti] = useState(false);

  // 「貯金する」を選択した場合の処理
  const handleSave = () => {
    // 利息計算（5%利息）
    const interest = Math.round(week1Money * 0.05);
    const newMoney = week1Money + interest;
    
    setWeek1Money(newMoney);
    setDelta(interest);
    addWeek1Choice('save', interest);
    
    setPigMessage("利息が付いてお金が少し増えたブー！貯金は安心だけど、ちょっと退屈ブー...");
    setMood("happy");
    setHasChosen(true);
  };

  // 「投資する」を選択した場合の処理
  const handleInvest = () => {
    const isWin = Math.random() < 0.6; // 60%の確率で成功
    
    if (isWin) {
      // 投資成功（+15%）
      const gain = Math.round(week1Money * 0.15);
      const newMoney = week1Money + gain;
      
      setWeek1Money(newMoney);
      setDelta(gain);
      addWeek1Choice('invest', gain);
      
      setPigMessage("やったブー！投資がうまくいって、お金が増えたブー！リスクがあるけど、こうやって増えることもあるブー！");
      setMood("excited");
      setShowConfetti(true);
    } else {
      // 投資失敗（-10%）
      const loss = Math.round(week1Money * 0.1);
      const newMoney = week1Money - loss;
      
      setWeek1Money(newMoney);
      setDelta(-loss);
      addWeek1Choice('invest', -loss);
      
      setPigMessage("あー、お金が減っちゃったブー...でも大丈夫ブー！誰でも最初は失敗するものブー。これも勉強ブー！");
      setMood("sad");
    }
    
    setHasChosen(true);
  };

  // リセットしてもう一度試す
  const handleReset = () => {
    resetWeek1();
    setDelta(0);
    setPigMessage("給料が入ったブー！この1000円を貯金に回すか、投資に挑戦するか決めるブー！");
    setMood("excited");
    setHasChosen(false);
    setShowConfetti(false);
  };

  const handleBackToInvestment = () => {
    navigate('/module/2');
  };

  return (
    <GameLayout showNav={false}>
      <div className="min-h-screen bg-gradient-to-b from-pigipePinkLight/20 to-white p-4">
        <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
        
        <div className="max-w-2xl mx-auto space-y-6">
          {/* ヘッダー */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleBackToInvestment}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">投資マスター Week1</h1>
          </div>

          {/* 所持金バー */}
          <div className="flex justify-center">
            <MoneyBar 
              amount={week1Money} 
              showChange={hasChosen}
              change={delta}
              size="large"
            />
          </div>

          {/* Pigipeのガイド */}
          <PigipeGuide message={pigMessage} mood={mood} />

          {/* メインコンテンツカード */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {!hasChosen ? "どちらを選ぶ？" : "結果"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!hasChosen ? (
                /* 選択前: 貯金/投資ボタンを表示 */
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={handleSave}
                      size="lg"
                      className="bg-pigipeGreen hover:bg-pigipeGreenDark text-white w-full sm:w-auto"
                    >
                      💰 貯金する
                      <div className="text-xs opacity-80 block">安全・低リターン</div>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={handleInvest}
                      size="lg"
                      className="bg-pigipePink hover:bg-pigipePinkLight text-white w-full sm:w-auto"
                    >
                      📈 投資する
                      <div className="text-xs opacity-80 block">リスク・高リターン</div>
                    </Button>
                  </motion.div>
                </div>
              ) : (
                /* 選択後: 結果表示 */
                <div className="text-center space-y-4">
                  {/* 増減額の表示 */}
                  {delta !== 0 && (
                    <motion.div
                      className={`text-3xl font-bold ${delta > 0 ? 'text-pigipeGreen' : 'text-red-600'}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {delta > 0 ? `+¥${delta} 🎉` : `-¥${Math.abs(delta)}`}
                    </motion.div>
                  )}
                  
                  {/* アクションボタン */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      もう一度試す
                    </Button>
                    
                    <Button
                      onClick={handleBackToInvestment}
                      className="bg-pigipeGreen hover:bg-pigipeGreenDark text-white"
                    >
                      投資モジュールに戻る
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 試行履歴 */}
          {week1Choices.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">今回の履歴</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {week1Choices.slice(-3).map((choice, index) => (
                    <div key={index} className="flex justify-between items-center text-sm p-2 bg-pigipePinkLight/20 rounded">
                      <span>{choice.choice === 'save' ? '💰 貯金' : '📈 投資'}</span>
                      <span className={choice.result > 0 ? 'text-pigipeGreen' : 'text-red-600'}>
                        {choice.result > 0 ? '+' : ''}¥{choice.result}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </GameLayout>
  );
};

export default InvestmentWeek1Page;
