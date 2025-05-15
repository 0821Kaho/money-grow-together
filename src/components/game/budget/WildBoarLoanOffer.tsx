
import { motion } from "framer-motion";
import { AlertTriangle, PiggyBank } from "lucide-react";

interface WildBoarLoanOfferProps {
  onDecision: (accepted: boolean) => void;
  amount: number;
  interestRate: number;
}

const WildBoarLoanOffer = ({ onDecision, amount, interestRate }: WildBoarLoanOfferProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-lg border border-game-danger bg-[#FFF8F8] p-5"
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-game-danger/20 text-game-danger">
          <PiggyBank className="h-6 w-6" />
        </div>
        
        <div>
          <h3 className="mb-1 text-lg font-bold">イノシシのローン屋 登場！</h3>
          <p className="mb-2 text-gray-700">
            苦しい時は助け合い！今だけお得な特別金利で{amount.toLocaleString()}円を即日融資します。
          </p>
          
          <div className="mb-3 flex items-center gap-1 rounded-md bg-game-danger/10 p-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-game-danger" />
            <span className="text-game-danger font-medium">高金利にご注意！返済条件をよく確認してください</span>
          </div>
          
          <div className="mb-4 rounded-lg bg-white p-3">
            <div className="mb-2 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">融資額</p>
                <p className="font-medium">{amount.toLocaleString()}円</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">金利（年率）</p>
                <p className="font-medium text-game-danger">{interestRate}%</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">返済方法</p>
              <p className="text-sm">毎週金曜日に利息の支払いが必要</p>
              <p className="mt-1 text-xs text-game-danger">※返済を怠ると追加ペナルティが発生します</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onDecision(true)}
              className="flex-1 rounded-lg border border-game-danger bg-white px-4 py-2 text-game-danger hover:bg-game-danger/5"
            >
              借りる（リスク覚悟）
            </button>
            <button
              onClick={() => onDecision(false)}
              className="flex-1 rounded-lg bg-[#25B589] px-4 py-2 text-white hover:brightness-105"
            >
              断る（安全策）
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WildBoarLoanOffer;
