import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Trophy, Coins } from "lucide-react";

// 副業シミュレーションのステップ
const simulationSteps = [
  {
    id: 1,
    title: "準備フェーズ",
    description: "副業を始める前の準備と計画",
    tasks: [
      { id: 11, title: "スキルの棚卸し", completed: false },
      { id: 12, title: "市場調査", completed: false },
      { id: 13, title: "事業計画作成", completed: false }
    ]
  },
  {
    id: 2,
    title: "スタートアップフェーズ",
    description: "小さく始めて学びながら進む",
    tasks: [
      { id: 21, title: "初めての顧客獲得", completed: false },
      { id: 22, title: "フィードバック収集", completed: false },
      { id: 23, title: "サービス改善", completed: false }
    ]
  },
  {
    id: 3,
    title: "成長フェーズ",
    description: "事業の拡大と安定化",
    tasks: [
      { id: 31, title: "マーケティング施策", completed: false },
      { id: 32, title: "リピーター獲得", completed: false },
      { id: 33, title: "収益安定化", completed: false }
    ]
  }
];

// 副業シミュレーション
const StartupSimulation = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [taskStatus, setTaskStatus] = useState<Record<number, boolean>>({});
  const [coins, setCoins] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const completeTask = (taskId: number) => {
    setTaskStatus(prev => ({ ...prev, [taskId]: true }));
    setCoins(prev => prev + 10);
    
    toast({
      title: "タスク完了！",
      description: "+10コイン獲得しました",
    });

    // フェーズの全タスクが完了したか確認
    const currentStepTasks = simulationSteps.find(step => step.id === currentPhase)?.tasks || [];
    const allTasksCompleted = currentStepTasks.every(task => taskStatus[task.id] || task.id === taskId);
    
    if (allTasksCompleted) {
      // 次のフェーズがあれば進む
      if (currentPhase < simulationSteps.length) {
        setTimeout(() => {
          setCurrentPhase(prev => prev + 1);
          toast({
            title: "フェーズ完了！",
            description: "次のフェーズに進みます！",
          });
        }, 1000);
      } else {
        // すべてのフェーズが完了
        setTimeout(() => {
          setCompleted(true);
          toast({
            title: "おめでとうございます！",
            description: "副業シミュレーションを完了しました！",
          });
        }, 1000);
      }
    }
  };

  // 進捗状況の計算
  const calculateProgress = () => {
    const totalTasks = simulationSteps.flatMap(step => step.tasks).length;
    const completedTasks = Object.values(taskStatus).filter(Boolean).length;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">副業シミュレーション</h3>
            <div className="flex items-center">
              <Coins className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="font-bold">{coins}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">進捗状況</span>
              <span className="text-sm font-medium">{calculateProgress()}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>

          {completed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">シミュレーション完了！</h3>
              <p className="mb-4">
                おめでとうございます！あなたは副業シミュレーションをクリアしました。
                獲得したコイン: {coins}
              </p>
              <div className="flex justify-center">
                <Badge variant="gold" className="px-3 py-1 text-base">
                  <Trophy className="h-4 w-4 mr-1" />
                  副業マスター
                </Badge>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex mb-6 relative">
                {simulationSteps.map((step, index) => (
                  <div key={step.id} className="flex-1 text-center">
                    <div 
                      className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                        step.id < currentPhase ? 'bg-green-100' : 
                        step.id === currentPhase ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    >
                      {step.id < currentPhase ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <span className={`text-sm ${
                          step.id === currentPhase ? 'text-blue-600' : 'text-gray-600'
                        }`}>{step.id}</span>
                      )}
                    </div>
                    <div className="mt-2 text-xs font-medium">
                      {step.title}
                    </div>
                    
                    {/* ステップ間の線 */}
                    {index < simulationSteps.length - 1 && (
                      <div className={`absolute top-4 left-0 h-0.5 ${
                        step.id < currentPhase ? 'bg-green-500' : 'bg-gray-200'
                      }`} style={{
                        width: `calc(100% / ${simulationSteps.length - 1})`,
                        left: `calc(${(index + 0.5) * 100 / simulationSteps.length}% - 2rem)`,
                        transform: 'translateY(-50%)'
                      }}></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-lg mb-2">
                  {simulationSteps.find(s => s.id === currentPhase)?.title} - 
                  {simulationSteps.find(s => s.id === currentPhase)?.description}
                </h4>
                
                <div className="space-y-3">
                  {simulationSteps.find(s => s.id === currentPhase)?.tasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`p-4 border rounded-lg ${taskStatus[task.id] ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            taskStatus[task.id] ? 'bg-green-100' : 'bg-gray-100'
                          } mr-3`}>
                            {taskStatus[task.id] ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <span className="text-xs">{task.id}</span>
                            )}
                          </div>
                          <span className={`${taskStatus[task.id] ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </span>
                        </div>
                        
                        {!taskStatus[task.id] && (
                          <Button 
                            size="sm" 
                            onClick={() => completeTask(task.id)}
                            className="game-button"
                          >
                            完了
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StartupSimulation;
