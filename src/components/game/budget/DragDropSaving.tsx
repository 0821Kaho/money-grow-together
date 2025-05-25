
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: "essential" | "optional" | "waste";
  icon: string;
}

interface DragDropSavingProps {
  onComplete: (savedAmount: number) => void;
}

const DragDropSaving = ({ onComplete }: DragDropSavingProps) => {
  const { toast } = useToast();

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: "1", name: "コンビニコーヒー（毎日）", amount: 150 * 30, category: "waste", icon: "☕" },
    { id: "2", name: "映画鑑賞", amount: 1800, category: "optional", icon: "🎬" },
    { id: "3", name: "フードデリバリー", amount: 1200 * 8, category: "optional", icon: "🍔" },
    { id: "4", name: "サブスク（動画）", amount: 1500, category: "optional", icon: "📺" },
    { id: "5", name: "サブスク（音楽）", amount: 980, category: "optional", icon: "🎵" },
    { id: "6", name: "ジム会員費", amount: 8800, category: "essential", icon: "💪" },
    { id: "7", name: "スマホゲーム課金", amount: 5000, category: "waste", icon: "📱" },
    { id: "8", name: "通勤・通学費", amount: 10000, category: "essential", icon: "🚃" },
    { id: "9", name: "衣類購入", amount: 15000, category: "optional", icon: "👕" },
    { id: "10", name: "飲み会", amount: 4000 * 3, category: "optional", icon: "🍻" },
  ]);

  const [selectedExpenses, setSelectedExpenses] = useState<ExpenseItem[]>([]);
  const totalSaved = selectedExpenses.reduce((sum, item) => sum + item.amount, 0);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // ドロップ先がない場合は何もしない
    if (!destination) return;

    // 同じリスト内での順序変更
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "expenses") {
        // 支出リスト内での並び替え
        const newExpenses = [...expenses];
        const [removed] = newExpenses.splice(source.index, 1);
        newExpenses.splice(destination.index, 0, removed);
        setExpenses(newExpenses);
      } else if (source.droppableId === "selected") {
        // 選択済みリスト内での並び替え
        const newSelected = [...selectedExpenses];
        const [removed] = newSelected.splice(source.index, 1);
        newSelected.splice(destination.index, 0, removed);
        setSelectedExpenses(newSelected);
      }
    } else {
      // 異なるリスト間での移動
      if (source.droppableId === "expenses" && destination.droppableId === "selected") {
        // 支出から選択済みへの移動
        const newExpenses = [...expenses];
        const [removed] = newExpenses.splice(source.index, 1);
        const newSelected = [...selectedExpenses];
        newSelected.splice(destination.index, 0, removed);
        
        setExpenses(newExpenses);
        setSelectedExpenses(newSelected);
        
        toast({
          title: `${removed.amount.toLocaleString()}円を節約`,
          description: `${removed.name}を削減リストに追加しました`,
        });
      } else if (source.droppableId === "selected" && destination.droppableId === "expenses") {
        // 選択済みから支出への移動（戻す）
        const newSelected = [...selectedExpenses];
        const [removed] = newSelected.splice(source.index, 1);
        const newExpenses = [...expenses];
        newExpenses.splice(destination.index, 0, removed);
        
        setSelectedExpenses(newSelected);
        setExpenses(newExpenses);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg bg-white p-6"
    >
      <h3 className="mb-4 text-lg font-bold">変動費カットに挑戦！</h3>
      <p className="mb-6 text-sm text-gray-700 break-words whitespace-normal">
        節約できそうな支出項目を「削減リスト」にドラッグしてください。
        どの支出を減らせば効果的に貯金できるか考えてみましょう。
      </p>
      
      <div className="mb-4 rounded-lg bg-[#F7F7F7] p-4 text-center">
        <p className="text-xs text-gray-600">現在の節約額</p>
        <p className="text-xl font-bold text-[#25B589]">{totalSaved.toLocaleString()}円</p>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-sm font-medium">支出リスト</h4>
            <Droppable droppableId="expenses">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[200px] rounded-lg border border-dashed border-gray-300 p-3"
                >
                  {expenses.length === 0 ? (
                    <div className="flex h-full items-center justify-center p-4 text-center text-xs text-gray-500">
                      すべての項目が削減リストに移動されました
                    </div>
                  ) : (
                    expenses.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-2 flex items-center justify-between rounded-md p-2.5 break-words whitespace-normal
                              ${
                                item.category === "waste"
                                  ? "bg-[#FFEBEE]"
                                  : item.category === "optional"
                                  ? "bg-[#FFF8E1]"
                                  : "bg-[#E8F5E9]"
                              }
                            `}
                          >
                            <div className="flex items-center">
                              <span className="mr-2 text-base">{item.icon}</span>
                              <div>
                                <p className="text-xs font-medium">{item.name}</p>
                                <p className="text-xs text-gray-700">
                                  {item.amount.toLocaleString()}円
                                </p>
                              </div>
                            </div>
                            <div className="ml-2 rounded-full px-1.5 py-0.5 text-[10px]">
                              {item.category === "waste" ? (
                                <span className="text-game-danger">浪費</span>
                              ) : item.category === "optional" ? (
                                <span className="text-[#FFB547]">オプション</span>
                              ) : (
                                <span className="text-[#25B589]">必要</span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          
          <div>
            <h4 className="mb-3 text-sm font-medium">削減リスト</h4>
            <Droppable droppableId="selected">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[200px] rounded-lg border-2 border-dashed border-[#25B589] bg-[#F7FFF9] p-3"
                >
                  {selectedExpenses.length === 0 ? (
                    <div className="flex h-full items-center justify-center p-4 text-center text-xs text-gray-500">
                      削減したい項目をここにドラッグしてください
                    </div>
                  ) : (
                    selectedExpenses.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-2 flex items-center justify-between rounded-md p-2.5 break-words whitespace-normal
                              ${
                                item.category === "waste"
                                  ? "bg-[#FFEBEE]"
                                  : item.category === "optional"
                                  ? "bg-[#FFF8E1]"
                                  : "bg-[#E8F5E9]"
                              }
                            `}
                          >
                            <div className="flex items-center">
                              <span className="mr-2 text-base">{item.icon}</span>
                              <div>
                                <p className="text-xs font-medium">{item.name}</p>
                                <p className="text-xs text-gray-700">
                                  {item.amount.toLocaleString()}円
                                </p>
                              </div>
                            </div>
                            <div className="ml-2 rounded-full bg-[#25B589] px-1.5 py-0.5 text-[10px] text-white">
                              節約
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
      
      <div className="mt-6">
        <button
          onClick={() => onComplete(totalSaved)}
          className="w-full rounded-xl bg-[#25B589] hover:bg-[#1E9A73] text-white font-medium px-6 py-3 transition-colors shadow-lg"
        >
          節約プランを確定する
        </button>
      </div>
    </motion.div>
  );
};

export default DragDropSaving;
