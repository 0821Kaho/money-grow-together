
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface LoanOfferProps {
  onDecision: (accepted: boolean) => void;
  amount: number;
  interestRate: number;
}

const LoanOffer = ({ onDecision, amount, interestRate }: LoanOfferProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-lg border border-gray-200 bg-[#F7F7F7] p-5"
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-game-danger/10 text-game-danger">
          <AlertTriangle className="h-6 w-6" />
        </div>
        
        <div>
          <h3 className="mb-1 text-lg font-bold">緊急ローンのご案内</h3>
          <p className="mb-3 text-gray-700">
            所持金が少なくなっています。今だけ特別金利で{amount.toLocaleString()}円をお貸しできます。
          </p>
          
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
              <p className="text-sm">毎月10日と25日に利息のみ支払い</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onDecision(true)}
              className="flex-1 rounded-lg border border-game-danger bg-white px-4 py-2 text-game-danger hover:bg-game-danger/5"
            >
              借りる
            </button>
            <button
              onClick={() => onDecision(false)}
              className="flex-1 rounded-lg bg-[#25B589] px-4 py-2 text-white hover:brightness-105"
            >
              他の方法を考える
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanOffer;
