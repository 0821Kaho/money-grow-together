
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign } from "lucide-react";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import { motion, AnimatePresence } from "framer-motion";

const CreditCardEducation = () => {
  // State for the purchase amount and payment settings
  const [purchaseAmount, setPurchaseAmount] = useState<number>(50000);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(10000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(15);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [animateAttention, setAnimateAttention] = useState<boolean>(false);
  
  // Calculated values
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [monthsToPayOff, setMonthsToPayOff] = useState<number>(0);
  
  // Function to calculate the total repayment cost
  const calculateRepayment = () => {
    // Monthly interest rate
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    let balance = purchaseAmount;
    let months = 0;
    let totalPaid = 0;
    
    while (balance > 0) {
      // Calculate interest for this month
      const interestThisMonth = balance * monthlyInterestRate;
      
      // Apply payment, but don't pay more than the remaining balance + interest
      const paymentThisMonth = Math.min(monthlyPayment, balance + interestThisMonth);
      
      // Update balance: add interest, subtract payment
      balance = balance + interestThisMonth - paymentThisMonth;
      totalPaid += paymentThisMonth;
      months++;
      
      // Safety check to prevent infinite loop
      if (months > 300) {
        break;
      }
    }
    
    setTotalCost(Math.round(totalPaid));
    setTotalInterest(Math.round(totalPaid - purchaseAmount));
    setMonthsToPayOff(months);
    setShowResults(true);
  };
  
  // Effect to recalculate if inputs change while results are shown
  useEffect(() => {
    if (showResults) {
      calculateRepayment();
    }
  }, [purchaseAmount, monthlyPayment, annualInterestRate, showResults]);
  
  // Format number as Japanese yen
  const formatYen = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Handle animation for attention to the interest amount
  const handleAnimateAttention = () => {
    setAnimateAttention(true);
    setTimeout(() => setAnimateAttention(false), 1000);
  };
  
  return (
    <Card className="mb-6 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">クレジットカードの仕組みを学ぼう</CardTitle>
          </div>
          <Badge variant="outline" className="bg-amber-50">
            借金管理
          </Badge>
        </div>
        <CardDescription>
          一括払いとリボ払いの違いを理解して、賢い選択をしましょう
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-2">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">ケーススタディ：スマートフォン購入</h3>
          <p className="text-sm text-muted-foreground mb-4">
            欲しかったスマートフォンをクレジットカードで購入する場合、
            支払い方法によって総支払額が大きく変わります。
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">
                商品金額
              </label>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                  className="w-full"
                  min="1000"
                  max="1000000"
                />
                <span className="flex items-center text-sm">円</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">
                毎月の支払額
              </label>
              <div className="flex gap-2 items-center">
                <Input 
                  type="number" 
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  className="w-full"
                  min="1000"
                  max={purchaseAmount}
                />
                <span className="flex items-center text-sm">円</span>
              </div>
              <Slider 
                value={[monthlyPayment]} 
                min={1000}
                max={Math.max(purchaseAmount, 1000)}
                step={1000}
                className="mt-2"
                onValueChange={(value) => setMonthlyPayment(value[0])}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">
                年間金利
              </label>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  value={annualInterestRate}
                  onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                  className="w-full"
                  min="0"
                  max="25"
                  step="0.1"
                />
                <span className="flex items-center text-sm">%</span>
              </div>
              <Slider 
                value={[annualInterestRate]} 
                min={0}
                max={25}
                step={0.5}
                className="mt-2"
                onValueChange={(value) => setAnnualInterestRate(value[0])}
              />
            </div>
            
            {!showResults && (
              <Button 
                onClick={calculateRepayment}
                className="w-full mt-2"
              >
                支払いをシミュレーションする
              </Button>
            )}
          </div>
        </div>
        
        {showResults && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-medium mb-2">一括払いの場合</h4>
                  <div className="text-xl font-bold">{formatYen(purchaseAmount)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    総支払額 = 商品価格
                  </p>
                </div>
                
                <div className="flex-1 bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h4 className="text-sm font-medium mb-2">リボ払いの場合</h4>
                  <motion.div 
                    className="text-xl font-bold"
                    animate={animateAttention ? { scale: [1, 1.1, 1] } : {}}
                  >
                    {formatYen(totalCost)}
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-1">
                    毎月{formatYen(monthlyPayment)}を{monthsToPayOff}ヶ月間支払う
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="bg-red-50 p-4 rounded-lg border border-red-100"
                animate={animateAttention ? { scale: [1, 1.05, 1] } : {}}
              >
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-red-500" />
                  金利の影響
                </h4>
                <p className="text-sm">
                  リボ払いでは、<span className="font-bold text-red-600">{formatYen(totalInterest)}</span> の金利が発生します！
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  これは商品価格の <span className="font-medium">{Math.round((totalInterest / purchaseAmount) * 100)}%</span> にもなります
                </p>
              </motion.div>
              
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <MascotCharacter size="small" />
                <div className="flex-1">
                  <p className="text-sm font-medium">どうして金額が増えたのかな？</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setShowExplanation(true);
                      handleAnimateAttention();
                    }}
                    className="text-xs p-2 h-auto mt-1"
                  >
                    理由を確認する
                  </Button>
                </div>
              </div>
              
              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-4 rounded-lg border border-gray-200"
                >
                  <h4 className="text-sm font-medium mb-2">クレジットカードの仕組み</h4>
                  <div className="space-y-3 text-sm">
                    <p>
                      <span className="font-medium">お金を借りると元本に利子をつけて返さなければなりません。</span> 
                      クレジットカードの分割手数料も利息の一種です。
                    </p>
                    <p>
                      リボ払いは、毎月の支払額が一定になる便利な仕組みですが、
                      支払いが長期間に渡るため、その間ずっと金利が発生します。
                    </p>
                    <p>
                      年利{annualInterestRate}%の場合、月々{formatYen(monthlyPayment)}の返済では
                      完済までに{monthsToPayOff}ヶ月（約{Math.round(monthsToPayOff/12*10)/10}年）かかり、
                      総額で{formatYen(totalInterest)}もの金利を支払うことになります。
                    </p>
                    <p className="font-medium text-primary">
                      カードは便利ですが、一括払いが基本。分割やリボは金利が発生する「借金」と理解しましょう。
                    </p>
                  </div>
                </motion.div>
              )}
              
              <Button 
                onClick={() => {
                  setShowResults(false);
                  setShowExplanation(false);
                }}
                variant="outline"
                className="w-full"
              >
                別のケースをシミュレーションする
              </Button>
            </motion.div>
          </AnimatePresence>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <div className="w-full text-xs text-muted-foreground">
          <span className="block">
            ※このシミュレーションは簡易的な計算に基づいており、実際のクレジットカード会社の計算方法とは異なる場合があります。
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreditCardEducation;
