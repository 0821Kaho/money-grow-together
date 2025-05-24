import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Coins, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface InterestRateExplainerProps {
  onComplete: () => void;
}

const InterestRateExplainer = ({ onComplete }: InterestRateExplainerProps) => {
  const [step, setStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(3);

  // 複利計算用の関数
  const calculateCompoundInterest = (principal: number, rate: number, years: number) => {
    const compoundAmount = principal * Math.pow(1 + rate / 100, years);
    return {
      total: Math.round(compoundAmount),
      interest: Math.round(compoundAmount - principal),
    };
  };

  // 単利計算用の関数
  const calculateSimpleInterest = (principal: number, rate: number, years: number) => {
    const interest = principal * (rate / 100) * years;
    return {
      total: Math.round(principal + interest),
      interest: Math.round(interest),
    };
  };

  const compoundResult = calculateCompoundInterest(amount, rate, years);
  const simpleResult = calculateSimpleInterest(amount, rate, years);

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h3 className="mb-4 text-xl font-bold">金利の仕組み</h3>

      {step === 0 && (
        <div>
          <div className="mb-4 flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium">金利とは何か？</h4>
              <p className="text-gray-600 text-sm break-words whitespace-normal">
                金利とは、お金を貸す・借りる際の「お金の価格」のようなものです。
                銀行にお金を預けると、銀行はそのお金を使う代わりに金利を支払います。
                逆に、ローンを組むと、そのお金を使う代わりに金利を支払う必要があります。
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-sm h-40"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 0, 10, -10, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="w-32 h-32"
                >
                  <img 
                    src="/lovable-uploads/d5ca595a-44cb-4a30-a00d-6e9ba2394360.png" 
                    alt="金利の説明" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>
              <motion.div
                className="absolute top-5 left-12"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 1,
                }}
              >
                <div className="text-2xl">+3%</div>
              </motion.div>
              <motion.div
                className="absolute bottom-5 right-12"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.5,
                }}
              >
                <div className="text-xl text-green-500">¥</div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mb-4 rounded-lg border border-dashed border-amber-300 bg-amber-50 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 break-words whitespace-normal">
                金利はパーセント（%）で表され、元金に対する割合として計算されます。
                例えば、100万円を年利3%で預けると、1年で3万円の利息がつきます。
              </p>
            </div>
          </div>

          <button
            onClick={nextStep}
            className="w-full rounded-lg bg-game-primary px-4 py-2 text-white hover:brightness-105 text-xs"
          >
            次へ：単利と複利
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-medium">単利</h4>
              </div>
              <p className="text-gray-600 text-sm mb-2 break-words whitespace-normal">
                元金にのみ金利がつく方式。
                利息は最初の預け入れ額（元金）のみに対して計算されます。
              </p>
              <div className="flex">
                <div className="text-left text-xs p-2 border border-dashed border-gray-300 rounded-lg">
                  <div>例：100万円を年利3%で5年間</div>
                  <div className="font-bold text-blue-600">利息 = 100万円 × 3% × 5年 = 15万円</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Coins className="h-4 w-4 text-green-600" />
                </div>
                <h4 className="font-medium">複利</h4>
              </div>
              <p className="text-gray-600 text-sm mb-2 break-words whitespace-normal">
                元金だけでなく、すでについた利息にも金利がつく方式。
                時間とともに加速度的に増えていきます。
              </p>
              <div className="flex">
                <div className="text-left text-xs p-2 border border-dashed border-gray-300 rounded-lg">
                  <div>例：100万円を年利3%で5年間</div>
                  <div className="font-bold text-green-600">元利合計 = 100万円 × (1+3%)^5 = 約116万円</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <button
              onClick={() => setShowAnimation(!showAnimation)}
              className="text-sm text-game-primary underline"
            >
              {showAnimation ? "グラフを閉じる" : "単利と複利の違いを見る"}
            </button>
          </div>

          {showAnimation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4 overflow-hidden"
            >
              <div className="rounded-lg bg-gray-50 p-4">
                <h5 className="mb-3 text-center text-sm font-medium">10年間の複利と単利の比較</h5>
                <div className="relative h-40">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const year = i + 1;
                    const compoundValue = 1000 * Math.pow(1 + 0.05, year);
                    const simpleValue = 1000 * (1 + 0.05 * year);
                    const maxHeight = 120;
                    
                    const compoundHeight = (compoundValue / (1000 * Math.pow(1 + 0.05, 10))) * maxHeight;
                    const simpleHeight = (simpleValue / (1000 * Math.pow(1 + 0.05, 10))) * maxHeight;

                    return (
                      <div 
                        key={i}
                        className="absolute flex items-end"
                        style={{ 
                          left: `${i * (100 / 9)}%`,
                          bottom: 0,
                          width: "8%"
                        }}
                      >
                        <div className="flex flex-col items-center w-full">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: compoundHeight }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="w-full bg-green-500 rounded-t-sm"
                          />
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: simpleHeight }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="w-full bg-blue-500 rounded-t-sm"
                            style={{ marginTop: -simpleHeight }}
                          />
                          <div className="mt-1 text-xs">{year}年</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-center gap-4 text-xs">
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-sm bg-green-500" />
                    <span>複利</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-sm bg-blue-500" />
                    <span>単利</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex gap-3">
            <button
              onClick={prevStep}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-1.5 text-xs hover:bg-gray-50"
            >
              戻る
            </button>
            <button
              onClick={nextStep}
              className="flex-1 rounded-lg bg-game-primary px-4 py-1.5 text-xs hover:brightness-105 text-white"
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-4 text-sm text-gray-600 break-words whitespace-normal">
            あなたのお金がどのように増えるか、シミュレーションしてみましょう。
            金額、年数、金利を調整して、単利と複利の違いを実感してください。
          </p>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">元金</label>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-xs">
              <span>1万円</span>
              <span className="font-medium">{amount.toLocaleString()}円</span>
              <span>100万円</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">期間</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-xs">
              <span>1年</span>
              <span className="font-medium">{years}年</span>
              <span>20年</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">年利率</label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-xs">
              <span>1%</span>
              <span className="font-medium">{rate}%</span>
              <span>10%</span>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
              <h5 className="mb-2 text-center text-sm font-medium">単利の場合</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>元金:</span>
                  <span className="font-medium">{amount.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>利息:</span>
                  <span className="font-medium">+{simpleResult.interest.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>{years}年後の金額:</span>
                  <span>{simpleResult.total.toLocaleString()}円</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-100 bg-green-50 p-3">
              <h5 className="mb-2 text-center text-sm font-medium">複利の場合</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>元金:</span>
                  <span className="font-medium">{amount.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>利息:</span>
                  <span className="font-medium">+{compoundResult.interest.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>{years}年後の金額:</span>
                  <span>{compoundResult.total.toLocaleString()}円</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span>複利と単利の差</span>
              <span>+{(compoundResult.interest - simpleResult.interest).toLocaleString()}円</span>
            </div>
            <Progress 
              value={(compoundResult.interest - simpleResult.interest) / compoundResult.interest * 100} 
              className="h-2" 
              indicatorClassName="bg-green-500"
            />
          </div>

          <div className="mb-4 rounded-lg border border-dashed border-amber-300 bg-amber-50 p-3">
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 break-words whitespace-normal">
                <span className="font-medium">時間は最大の味方：</span>
                複利の効果は時間が長いほど大きくなります。若いうちから少額でも投資を始めることで、時間の力を味方につけることができます。
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevStep}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-1.5 text-xs hover:bg-gray-50"
            >
              戻る
            </button>
            <button
              onClick={onComplete}
              className="flex-1 rounded-lg bg-game-primary px-4 py-1.5 text-xs hover:brightness-105 text-white"
            >
              理解した
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InterestRateExplainer;
