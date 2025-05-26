import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PiggyBank, DollarSign, Percent } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import ExpenseGuideBox from "./ExpenseGuideBox";

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: "income" | "fixedExpense" | "variableExpense";
}

interface ExpenseCalculatorProps {
  onComplete: (balance: number) => void;
}

const ExpenseCalculator = ({ onComplete }: ExpenseCalculatorProps) => {
  const [items, setItems] = useState<ExpenseItem[]>([
    { id: "salary", name: "給料", amount: 200000, category: "income" },
    { id: "rent", name: "家賃", amount: 60000, category: "fixedExpense" },
    { id: "utilities", name: "光熱費", amount: 15000, category: "fixedExpense" },
    { id: "phone", name: "通信費", amount: 8000, category: "fixedExpense" },
    { id: "food", name: "食費", amount: 40000, category: "variableExpense" },
    { id: "entertainment", name: "娯楽費", amount: 20000, category: "variableExpense" },
    { id: "transportation", name: "交通費", amount: 10000, category: "variableExpense" },
  ]);

  const [newItem, setNewItem] = useState<Partial<ExpenseItem>>({
    name: "",
    amount: 0,
    category: "variableExpense",
  });
  
  const [showTutorial, setShowTutorial] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!localStorage.getItem('pigipe.budget.tutorial.done')) {
      setShowTutorial(true);
    }
  }, []);

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('pigipe.budget.tutorial.done', 'true');
  };

  const addItem = () => {
    if (!newItem.name || !newItem.amount) return;
    
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        name: newItem.name,
        amount: newItem.amount,
        category: newItem.category as "income" | "fixedExpense" | "variableExpense",
      },
    ]);
    
    setNewItem({
      name: "",
      amount: 0,
      category: "variableExpense",
    });
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalIncome = items
    .filter(item => item.category === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalFixedExpenses = items
    .filter(item => item.category === "fixedExpense")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalVariableExpenses = items
    .filter(item => item.category === "variableExpense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalFixedExpenses - totalVariableExpenses;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg bg-white p-6"
    >
      <h3 className="mb-5 text-lg font-medium">
        <span className="font-bold text-game-primary">STEP 1</span> <span className="text-sm">家計を"自分色"に塗り替えよう</span>
      </h3>
      
      {/* Add the guide box at the top */}
      <ExpenseGuideBox />
      
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-sm">収入</span>
          <span className="font-medium text-sm">{totalIncome.toLocaleString()}円</span>
        </div>
        
        {items
          .filter(item => item.category === "income")
          .map(item => (
            <div key={item.id} className="mb-1 flex items-center justify-between rounded-md bg-[#F7F7F7] p-1.5">
              <span className="text-xs">{item.name}</span>
              <div className="flex items-center">
                <span className="text-xs">{item.amount.toLocaleString()}円</span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-2 text-gray-500 hover:text-game-danger"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
      </div>
      
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-sm">固定費</span>
          <span className="font-medium text-sm">{totalFixedExpenses.toLocaleString()}円</span>
        </div>
        
        {items
          .filter(item => item.category === "fixedExpense")
          .map(item => (
            <div key={item.id} className="mb-1 flex items-center justify-between rounded-md bg-[#F7F7F7] p-1.5">
              <span className="text-xs">{item.name}</span>
              <div className="flex items-center">
                <span className="text-xs">{item.amount.toLocaleString()}円</span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-2 text-gray-500 hover:text-game-danger"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
      </div>
      
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-sm">変動費</span>
          <span className="font-medium text-sm">{totalVariableExpenses.toLocaleString()}円</span>
        </div>
        
        {items
          .filter(item => item.category === "variableExpense")
          .map(item => (
            <div key={item.id} className="mb-1 flex items-center justify-between rounded-md bg-[#F7F7F7] p-1.5">
              <span className="text-xs">{item.name}</span>
              <div className="flex items-center">
                <span className="text-xs">{item.amount.toLocaleString()}円</span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-2 text-gray-500 hover:text-game-danger"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
      </div>
      
      <div className="mb-6 rounded-lg border border-dashed border-gray-300 p-3">
        <h4 className="mb-2 font-medium text-xs">新しい項目を追加</h4>
        <div className="mb-2 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="例：推し活・サブスク"
            autoFocus
            className="flex-1 rounded-md border border-gray-300 p-2 text-xs"
          />
          <div className="flex flex-1 items-center rounded-md border border-gray-300 px-2">
            <input
              type="number"
              inputMode="numeric"
              value={newItem.amount || ""}
              onChange={e => setNewItem({ ...newItem, amount: parseInt(e.target.value) || 0 })}
              placeholder="金額"
              className="w-full border-none p-2 focus:outline-none text-xs"
            />
            <span className="text-gray-500 text-xs">円</span>
          </div>
        </div>
        
        <div className="mb-3 flex flex-wrap items-center text-xs">
          <label className="mr-4 inline-flex items-center">
            <input
              type="radio"
              name="category"
              checked={newItem.category === "income"}
              onChange={() => setNewItem({ ...newItem, category: "income" })}
              className="mr-1"
            />
            <span>収入</span>
          </label>
          <label className="mr-4 inline-flex items-center">
            <input
              type="radio"
              name="category"
              checked={newItem.category === "fixedExpense"}
              onChange={() => setNewItem({ ...newItem, category: "fixedExpense" })}
              className="mr-1"
            />
            <span>固定費</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="category"
              checked={newItem.category === "variableExpense"}
              onChange={() => setNewItem({ ...newItem, category: "variableExpense" })}
              className="mr-1"
            />
            <span>変動費</span>
          </label>
        </div>
        
        <button
          onClick={addItem}
          disabled={!newItem.name || !newItem.amount}
          className={`w-full min-w-[96px] whitespace-nowrap justify-center rounded-md p-2 text-white text-xs ${
            !newItem.name || !newItem.amount ? "bg-gray-400" : "bg-[#25B589]"
          }`}
        >
          ＋追加する
        </button>
      </div>
      
      <div className="mb-6 rounded-lg bg-[#F7F7F7] p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-xs">今の残高</span>
          <span className="font-medium text-xs">{totalIncome.toLocaleString()}円</span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-xs">ここまで使った分</span>
          <span className="font-medium text-xs">{(totalFixedExpenses + totalVariableExpenses).toLocaleString()}円</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs">残高</span>
          <span className={`font-bold text-xs ${balance >= 0 ? "text-[#25B589]" : "text-game-danger"}`}>
            {balance.toLocaleString()}円
          </span>
        </div>
      </div>
      
      <div className="mb-6 flex items-center gap-2">
        <PiggyBank className="h-5 w-5 text-game-primary" />
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs">収支バランス</span>
            <span className="text-xs">{Math.min(100, Math.max(0, (balance / totalIncome) * 100)).toFixed(0)}%</span>
          </div>
          <Progress 
            value={Math.min(100, Math.max(0, (balance / totalIncome) * 100))} 
            className="h-2" 
            indicatorClassName={balance < 0 ? "bg-game-danger" : "bg-[#25B589]"}
          />
        </div>
      </div>
      
      <button
        onClick={() => onComplete(balance)}
        className="w-full rounded-lg bg-game-primary hover:bg-game-primary/90 px-5 py-3 text-white font-bold transition-colors shadow-lg border-2 border-game-primary hover:border-game-primary/90 text-sm"
      >
        収支の確認を完了する
      </button>
      
      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative max-w-md rounded-lg bg-white p-6">
            <button 
              className="absolute right-2 top-2 text-gray-500"
              onClick={closeTutorial}
            >
              ✕
            </button>
            <h3 className="mb-4 text-lg font-bold">収支の棚卸しの使い方</h3>
            <div className="mb-4 flex justify-center">
              <img 
                src="/lovable-uploads/5f45fe44-5e1b-4d66-81d9-1171ab40e98a.png" 
                alt="収入の管理" 
                className="h-48 object-contain"
              />
            </div>
            <p className="mb-4 text-sm">
              Pigipeと一緒に、あなた専用の家計簿を作りましょう！
              サンプルの項目を削除して、実際のあなたの収支を入力してみてください。
            </p>
            <div className="text-center">
              <button 
                onClick={closeTutorial}
                className="rounded-lg bg-[#F37B83] hover:bg-[#F37B83]/90 px-5 py-2.5 text-white font-semibold transition-colors shadow-md border border-[#F37B83] hover:border-[#F37B83]/90"
              >
                使ってみる
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ExpenseCalculator;
