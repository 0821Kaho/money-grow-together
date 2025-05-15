
import { useState } from "react";
import { motion } from "framer-motion";
import { PiggyBank } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
      <h3 className="mb-4 text-xl font-bold">収支の棚卸しをしよう</h3>
      
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">収入</span>
          <span className="font-medium">{totalIncome.toLocaleString()}円</span>
        </div>
        
        {items
          .filter(item => item.category === "income")
          .map(item => (
            <div key={item.id} className="mb-1 flex items-center justify-between rounded-md bg-[#F7F7F7] p-2">
              <span>{item.name}</span>
              <div className="flex items-center">
                <span>{item.amount.toLocaleString()}円</span>
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
          <span className="font-medium">固定費</span>
          <span className="font-medium">{totalFixedExpenses.toLocaleString()}円</span>
        </div>
        
        {items
          .filter(item => item.category === "fixedExpense")
          .map(item => (
            <div key={item.id} className="mb-1 flex items-center justify-between rounded-md bg-[#F7F7F7] p-2">
              <span>{item.name}</span>
              <div className="flex items-center">
                <span>{item.amount.toLocaleString()}円</span>
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
          <span className="font-medium">変動費</span>
          <span className="font-medium">{totalVariableExpenses.toLocaleString()}円</span>
        </div>
        
        {items
          .filter(item => item.category === "variableExpense")
          .map(item => (
            <div key={item.id} className="mb-1 flex items-center justify-between rounded-md bg-[#F7F7F7] p-2">
              <span>{item.name}</span>
              <div className="flex items-center">
                <span>{item.amount.toLocaleString()}円</span>
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
      
      <div className="mb-6 rounded-lg border border-dashed border-gray-300 p-4">
        <h4 className="mb-3 font-medium">新しい項目を追加</h4>
        <div className="mb-2 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="項目名"
            className="flex-1 rounded-md border border-gray-300 p-2"
          />
          <div className="flex flex-1 items-center rounded-md border border-gray-300 px-2">
            <input
              type="number"
              value={newItem.amount || ""}
              onChange={e => setNewItem({ ...newItem, amount: parseInt(e.target.value) || 0 })}
              placeholder="金額"
              className="w-full border-none p-2 focus:outline-none"
            />
            <span className="text-gray-500">円</span>
          </div>
        </div>
        
        <div className="mb-3 flex gap-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              checked={newItem.category === "income"}
              onChange={() => setNewItem({ ...newItem, category: "income" })}
              className="mr-1"
            />
            <span>収入</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              checked={newItem.category === "fixedExpense"}
              onChange={() => setNewItem({ ...newItem, category: "fixedExpense" })}
              className="mr-1"
            />
            <span>固定費</span>
          </label>
          <label className="flex items-center">
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
          className={`w-full rounded-md p-2 text-white ${
            !newItem.name || !newItem.amount ? "bg-gray-400" : "bg-[#25B589]"
          }`}
        >
          追加する
        </button>
      </div>
      
      <div className="mb-6 rounded-lg bg-[#F7F7F7] p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">収入合計</span>
          <span className="font-medium">{totalIncome.toLocaleString()}円</span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">支出合計</span>
          <span className="font-medium">{(totalFixedExpenses + totalVariableExpenses).toLocaleString()}円</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">残高</span>
          <span className={`font-bold ${balance >= 0 ? "text-[#25B589]" : "text-game-danger"}`}>
            {balance.toLocaleString()}円
          </span>
        </div>
      </div>
      
      <div className="mb-4 flex items-center gap-2">
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
        className="w-full rounded-xl bg-game-primary px-6 py-3 font-medium text-white transition-all hover:brightness-105"
      >
        収支の確認を完了する
      </button>
    </motion.div>
  );
};

export default ExpenseCalculator;
