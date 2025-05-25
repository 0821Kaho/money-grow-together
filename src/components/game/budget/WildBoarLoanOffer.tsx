
import { motion } from "framer-motion";
import { PiggyBank } from "lucide-react";

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
        <div className="mt-1 flex h-24 w-24 shrink-0 items-center justify-center">
          <img 
            src="/lovable-uploads/af92a0d0-b8c6-4697-9438-ea17b4840474.png"
            alt="イノシシのローン屋"
            className="h-full w-full object-contain"
          />
        </div>
        
        <div>
          <h3 className="mb-1 text-lg font-bold">イノシシのローン屋 登場！</h3>
          <p className="mb-2 text-sm text-gray-700">
            苦しい時は助け合い！今だけお得な特別金利で{amount.toLocaleString()}円を即日融資します。
          </p>
          
          <div className="mb-4 rounded-lg bg-white p-3">
            <div className="mb-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">融資額</p>
                <p className="font-medium">{amount.toLocaleString()}円</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">金利（年率）</p>
                <p className="font-medium text-game-danger">{interestRate}%</p>
              </div>
            </div>
            <div className="relative">
              <p className="text-xs text-gray-500">返済方法</p>
              <p className="text-xs">毎週金曜日に利息の支払いが必要</p>
              <p className="mt-1 text-xs text-game-danger">※返済を怠ると追加ペナルティが発生します</p>
              
              {/* Inserted loan warning image */}
              <div className="mt-3 flex justify-center">
                <img 
                  src="/lovable-uploads/85cbe6fd-2d0c-4b82-8966-c93d0fd957bf.png" 
                  alt="法外な金利と厳しいペナルティにご注意！" 
                  className="h-28 object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onDecision(true)}
              className="flex-1 rounded-lg border border-game-danger bg-white px-4 py-2 text-xs text-game-danger hover:bg-game-danger/5"
            >
              借りる（リスク覚悟）
            </button>
            <button
              onClick={() => onDecision(false)}
              className="flex-1 rounded-lg bg-game-primary px-4 py-2 text-xs text-white hover:bg-game-primary/90"
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
