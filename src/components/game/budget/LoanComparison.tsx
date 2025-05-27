
import { useState } from "react";
import { motion } from "framer-motion";
import { PiggyBank, BadgeAlert } from "lucide-react";

interface LoanComparisonProps {
  onComplete: () => void;
}

// 融資情報の型定義
interface LoanInfo {
  name: string;
  interest: number;
  period: string;
  requirements: string;
  warning: string;
  color: string;
}

const loanTypes: LoanInfo[] = [
  {
    name: "銀行ローン",
    interest: 3.5,
    period: "1年～10年",
    requirements: "安定した収入、信用情報の審査あり",
    warning: "審査が厳格で時間がかかることも",
    color: "#E8F5E9",
  },
  {
    name: "カードローン",
    interest: 12,
    period: "1ヶ月～5年",
    requirements: "20歳以上、収入証明書類が必要な場合あり",
    warning: "限度額内で何度でも借入可、複数利用で返済負担増大のリスク",
    color: "#FFF8E1",
  },
  {
    name: "消費者金融",
    interest: 15,
    period: "1週間～5年",
    requirements: "年齢確認、収入があれば比較的審査が通りやすい",
    warning: "金利が高く、返済が長期化すると総支払額が大きくなる",
    color: "#FFF8E1",
  },
  {
    name: "イノシシのローン屋",
    interest: 30,
    period: "即日～1ヶ月",
    requirements: "身分証明書のみ（審査なし）",
    warning: "超高金利、滞納時のペナルティが厳しい、法外な取立ての可能性",
    color: "#FFEBEE",
  },
];

// 10万円を1年間借りた場合の毎月の支払額と総支払額を計算
const calculatePayment = (principal: number, interestRate: number, months: number) => {
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  
  return {
    monthly: Math.round(monthlyPayment),
    total: Math.round(totalPayment),
    interest: Math.round(totalPayment - principal),
  };
};

const LoanComparison = ({ onComplete }: LoanComparisonProps) => {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [loanPeriod, setLoanPeriod] = useState<number>(12); // 月数
  const [selectedLoan, setSelectedLoan] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  // アニメーションを表示
  const handleShowAnimation = (index: number) => {
    setSelectedLoan(index);
    setShowAnimation(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg bg-white p-6"
    >
      <h3 className="mb-4 text-xl font-bold">様々な借入方法と金利の仕組み</h3>
      
      {!showAnimation ? (
        <>
          <p className="mb-6 text-gray-700 break-words whitespace-normal">
            ローンには様々な種類があります。金利の違いが返済総額にどれだけ影響するか見てみましょう。
          </p>
          
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="loanAmount" className="font-medium">
                借入金額: {loanAmount.toLocaleString()}円
              </label>
            </div>
            <input
              id="loanAmount"
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="loanPeriod" className="font-medium">
                返済期間: {loanPeriod}ヶ月
              </label>
            </div>
            <input
              id="loanPeriod"
              type="range"
              min="1"
              max="60"
              step="1"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="mb-6 space-y-3">
            {loanTypes.map((loan, index) => {
              const payment = calculatePayment(loanAmount, loan.interest, loanPeriod);
              
              return (
                <div
                  key={loan.name}
                  className={`cursor-pointer rounded-lg p-4 transition-colors hover:brightness-95`}
                  style={{ backgroundColor: loan.color }}
                  onClick={() => handleShowAnimation(index)}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="h-5 w-5" />
                      <h4 className="font-bold break-words whitespace-normal">{loan.name}</h4>
                    </div>
                    <span className="font-bold text-game-danger">{loan.interest}%</span>
                  </div>
                  
                  <div className="mb-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">毎月の返済額</p>
                      <p className="font-medium">{payment.monthly.toLocaleString()}円</p>
                    </div>
                    <div>
                      <p className="text-gray-600">支払総額</p>
                      <p className="font-medium">{payment.total.toLocaleString()}円</p>
                    </div>
                  </div>
                  
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>元金: {loanAmount.toLocaleString()}円</span>
                    <span className="text-game-danger">利息合計: {payment.interest.toLocaleString()}円</span>
                  </div>
                  
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-game-danger"
                      style={{ width: `${(payment.interest / payment.total) * 100}%` }}
                    ></div>
                  </div>
                  
                  {index === 3 && (
                    <div className="mt-2 flex items-center gap-1 rounded-md bg-game-danger/10 p-2 text-xs text-game-danger">
                      <BadgeAlert className="h-4 w-4" />
                      <span className="break-words whitespace-normal">
                        法外な金利と厳しいペナルティにご注意！
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <button
            onClick={onComplete}
            className="w-full rounded-xl bg-game-primary px-6 py-3 font-medium text-white transition-all hover:brightness-105"
          >
            理解して次へ進む
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 w-full max-w-md"
          >
            <h4 className="mb-4 text-center text-lg font-bold">
              {loanTypes[selectedLoan].name}での借入シミュレーション
            </h4>
            
            <div className="mb-6 rounded-lg bg-white p-6 shadow">
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600">借入金額</p>
                <p className="text-2xl font-bold">{loanAmount.toLocaleString()}円</p>
              </div>
              
              <div className="mb-4">
                <div className="relative h-36">
                  {Array.from({ length: loanPeriod }).map((_, index) => {
                    const payment = calculatePayment(loanAmount, loanTypes[selectedLoan].interest, loanPeriod);
                    // 表示するのは最大12ヶ月分まで
                    if (index < 12) {
                      return (
                        <motion.div
                          key={index}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center"
                          style={{
                            left: `${(index / Math.min(11, loanPeriod - 1)) * 100}%`,
                          }}
                        >
                          <div
                            className={`mb-1 flex h-20 items-end justify-center ${
                              index === 0 ? "animate-pulse" : ""
                            }`}
                          >
                            <div className="flex flex-col items-center">
                              <span className="mb-1 text-xs">
                                {payment.monthly.toLocaleString()}円
                              </span>
                              <div className="relative h-16 w-8">
                                <div
                                  className="absolute bottom-0 w-8 rounded-t-sm bg-[#25B589]"
                                  style={{
                                    height: `${
                                      ((payment.monthly - payment.interest / loanPeriod) / payment.monthly) * 100
                                    }%`,
                                  }}
                                ></div>
                                <div
                                  className="absolute bottom-0 w-8 rounded-t-sm bg-game-danger"
                                  style={{
                                    height: `${(payment.interest / loanPeriod / payment.monthly) * 100}%`,
                                    top: `${
                                      ((payment.monthly - payment.interest / loanPeriod) / payment.monthly) * 100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs">{index + 1}月</span>
                        </motion.div>
                      );
                    }
                    return null;
                  })}
                </div>
                
                <div className="mt-2 flex justify-between text-xs">
                  <div>
                    <div className="mb-1 flex items-center">
                      <div className="mr-1 h-3 w-3 rounded-sm bg-[#25B589]"></div>
                      <span>元金返済分</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-1 h-3 w-3 rounded-sm bg-game-danger"></div>
                      <span>利息支払分</span>
                    </div>
                  </div>
                  {loanPeriod > 12 && (
                    <div className="text-right text-gray-500">
                      ※表示は12ヶ月分のみ
                      <br />
                      （全{loanPeriod}ヶ月）
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-4 rounded-lg bg-[#F7F7F7] p-3 text-sm">
                <p className="mb-2 font-medium">
                  金利{loanTypes[selectedLoan].interest}%の場合の支払総額:
                </p>
                <div className="flex items-center justify-between">
                  <span>元金</span>
                  <span>{loanAmount.toLocaleString()}円</span>
                </div>
                <div className="flex items-center justify-between text-game-danger">
                  <span>利息合計</span>
                  <span>
                    {calculatePayment(
                      loanAmount,
                      loanTypes[selectedLoan].interest,
                      loanPeriod
                    ).interest.toLocaleString()}円
                  </span>
                </div>
                <div className="mt-1 border-t border-gray-300 pt-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>支払総額</span>
                    <span>
                      {calculatePayment(
                        loanAmount,
                        loanTypes[selectedLoan].interest,
                        loanPeriod
                      ).total.toLocaleString()}円
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4 text-xs text-gray-700 break-words whitespace-normal">
                <p className="mb-1 font-medium">注意点:</p>
                <p>{loanTypes[selectedLoan].warning}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnimation(false)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2"
              >
                戻る
              </button>
              <button
                onClick={onComplete}
                className="flex-1 rounded-md bg-game-primary px-4 py-2 text-white"
              >
                理解して次へ
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default LoanComparison;
