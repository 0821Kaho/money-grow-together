
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Trophy, ArrowRight, CheckCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "startup_module_progress";

const modules = [
  {
    id: 1,
    title: "ストーリー導入",
    description: "日常でお金に悩む場面や将来の目標に向けた第一歩",
    completed: false,
  },
  {
    id: 2,
    title: "ライフプラン作成",
    description: "人生の重要イベントと必要資金の整理",
    completed: false,
  },
  {
    id: 3,
    title: "副業の基礎知識",
    description: "小さな副業から始める起業の考え方",
    completed: false,
  },
  {
    id: 4,
    title: "アイデア発想ワーク",
    description: "得意なことを活かした副業アイデアを考える",
    completed: false,
  },
  {
    id: 5,
    title: "ビジネスプラン作成",
    description: "選んだアイデアの実現計画を立てる",
    completed: false,
  },
  {
    id: 6,
    title: "アクションプラン",
    description: "実際に一歩踏み出すための具体的な行動計画",
    completed: false,
  },
];

interface ModuleProgress {
  activeModuleId: number;
  completedModules: number[];
  earnedBadge: boolean;
}

const StartupLearningModules = () => {
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [earnedBadge, setEarnedBadge] = useState(false);
  const { toast } = useToast();

  // Load saved progress on component mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const progress: ModuleProgress = JSON.parse(savedProgress);
        setActiveModuleId(progress.activeModuleId);
        setCompletedModules(progress.completedModules);
        setEarnedBadge(progress.earnedBadge);
        
        // Show a toast notification when resuming progress
        if (progress.completedModules.length > 0 && progress.completedModules.length < modules.length) {
          toast({
            title: "学習再開",
            description: "前回の続きから再開します",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error loading saved progress:", error);
    }
  }, []);

  // Save progress whenever relevant state changes
  useEffect(() => {
    try {
      const progress: ModuleProgress = {
        activeModuleId,
        completedModules,
        earnedBadge,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }, [activeModuleId, completedModules, earnedBadge]);

  const progress = Math.round((completedModules.length / modules.length) * 100);

  const handleCompleteModule = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      const newCompletedModules = [...completedModules, moduleId];
      setCompletedModules(newCompletedModules);
      
      // アニメーション付きのトースト通知
      toast({
        title: "モジュール完了！",
        description: "次のステップに進みましょう",
      });
      
      // 次のモジュールがあれば、それをアクティブにする
      const nextModuleId = moduleId + 1;
      if (modules.find(m => m.id === nextModuleId)) {
        setActiveModuleId(nextModuleId);
      }
      
      // すべてのモジュールが完了したらバッジを獲得
      if (newCompletedModules.length === modules.length) {
        setEarnedBadge(true);
        toast({
          title: "おめでとうございます！",
          description: "「副業チャレンジャー」バッジを獲得しました！",
        });
      }
    }
  };

  // Reset progress function
  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setActiveModuleId(1);
    setCompletedModules([]);
    setEarnedBadge(false);
    toast({
      title: "学習リセット",
      description: "最初から始めます",
      duration: 3000,
    });
  };

  const isModuleCompleted = (moduleId: number) => completedModules.includes(moduleId);
  const isModuleAccessible = (moduleId: number) => {
    // 最初のモジュールは常にアクセス可能
    if (moduleId === 1) return true;
    // それ以外は、前のモジュールが完了している場合にアクセス可能
    return completedModules.includes(moduleId - 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">学習の進捗状況</h3>
              {completedModules.length > 0 && completedModules.length < modules.length && (
                <button 
                  onClick={resetProgress}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 ml-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  リセット
                </button>
              )}
            </div>
            <div className="text-sm font-medium">{progress}%</div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {earnedBadge && (
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <Trophy className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="font-medium">獲得バッジ</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="gold" className="px-3 py-1">
                  <Trophy className="h-3 w-3 mr-1" />
                  副業チャレンジャー
                </Badge>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {modules.map((module) => {
            const isCompleted = isModuleCompleted(module.id);
            const isAccessible = isModuleAccessible(module.id);
            const isActive = activeModuleId === module.id;
            
            return (
              <Card
                key={module.id}
                className={`p-4 border ${isActive ? 'border-primary' : 'border-gray-200'} ${!isAccessible ? 'opacity-60' : ''}`}
              >
                <div 
                  className="flex items-start justify-between cursor-pointer" 
                  onClick={() => isAccessible && setActiveModuleId(module.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full ${isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <span className="text-sm font-medium">{module.id}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{module.title}</h4>
                      <p className="text-sm text-gray-500">{module.description}</p>
                    </div>
                  </div>
                  {isActive && (
                    <span className="text-primary">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </div>

                {isActive && isAccessible && (
                  <Collapsible defaultOpen>
                    <CollapsibleContent className="mt-4 pt-4 border-t">
                      <div className="prose max-w-none text-sm">
                        <ModuleContent 
                          moduleId={module.id} 
                          onComplete={() => handleCompleteModule(module.id)}
                          isCompleted={isCompleted}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </Card>
            );
          })}
        </div>

        {earnedBadge && (
          <div className="mt-6 flex justify-center">
            <button 
              onClick={resetProgress}
              className="text-sm text-primary hover:text-primary/90 border border-primary hover:border-primary/90 rounded-lg px-4 py-2"
            >
              コースをリセットする
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 各モジュールのコンテンツを表示するコンポーネント
const ModuleContent = ({ 
  moduleId, 
  onComplete,
  isCompleted 
}: { 
  moduleId: number;
  onComplete: () => void;
  isCompleted: boolean;
}) => {
  switch (moduleId) {
    case 1:
      return (
        <div className="space-y-4">
          <div className="bg-game-light p-4 rounded-lg">
            <h5 className="font-medium mb-2">佐藤つばさのストーリー</h5>
            <p>
              佐藤つばさ（28歳）は、正社員として働いていますが、毎月の給料だけではなかなか貯金ができず、将来の夢であるマイホーム購入に不安を感じていました。
              ある日、友人から「得意なイラスト制作で副収入を得ている」という話を聞き、自分も何か始められないかと考え始めます…
            </p>
          </div>
          <p>
            多くの人が経験する「お金の悩み」。しかし、副業や小さな起業は特別なスキルがなくても始められます。
            あなたも「得意なこと」や「好きなこと」から一歩踏み出してみませんか？
          </p>
          {!isCompleted && (
            <Button className="w-full mt-4" onClick={onComplete}>
              このステップを完了する
            </Button>
          )}
        </div>
      );
    
    case 2:
      return (
        <div className="space-y-4">
          <p>
            将来どのようなライフイベントがあり、いくらのお金が必要になるでしょうか？
            主要なイベントとおおよその必要資金を考えてみましょう。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2 text-left">ライフイベント</th>
                  <th className="border px-4 py-2 text-left">想定年齢</th>
                  <th className="border px-4 py-2 text-left">必要資金</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">結婚</td>
                  <td className="border px-4 py-2">30歳</td>
                  <td className="border px-4 py-2">200万円〜</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">マイホーム購入</td>
                  <td className="border px-4 py-2">35歳</td>
                  <td className="border px-4 py-2">頭金 300〜500万円</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">子どもの教育</td>
                  <td className="border px-4 py-2">6〜22歳</td>
                  <td className="border px-4 py-2">幼〜大学 約1,000万円/人</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">老後の備え</td>
                  <td className="border px-4 py-2">65歳〜</td>
                  <td className="border px-4 py-2">2,000〜3,000万円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600">
            ※金額はあくまで目安です。個人の状況やライフスタイルによって大きく変わります。
          </p>
          {!isCompleted && (
            <Button className="w-full mt-4" onClick={onComplete}>
              このステップを完了する
            </Button>
          )}
        </div>
      );
    
    case 3:
      return (
        <div className="space-y-4">
          <p>副業や小さな起業は、特別な人だけのものではありません。誰でも始められる第一歩があります。</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-2" />
                身近な成功例
              </h5>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>趣味のハンドメイド作品をオンラインショップで販売</li>
                <li>得意な語学を活かしたオンライン個人レッスン</li>
                <li>写真撮影スキルを活かした副業カメラマン</li>
                <li>日常の知識をブログやSNSで発信してアフィリエイト収入</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-2" />
                副業のメリット
              </h5>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>本業とは別の収入源を確保できる</li>
                <li>新しいスキルや人脈を獲得できる</li>
                <li>小さく始めてリスクを抑えられる</li>
                <li>将来の独立に向けた準備になる</li>
              </ul>
            </div>
          </div>
          
          {!isCompleted && (
            <Button className="w-full mt-4" onClick={onComplete}>
              このステップを完了する
            </Button>
          )}
        </div>
      );
    
    case 4:
      return (
        <div className="space-y-4">
          <p>あなた自身の「得意なこと」「好きなこと」「周りで困っていること」を組み合わせて、副業アイデアを考えてみましょう。</p>
          
          <div className="bg-game-light p-4 rounded-lg space-y-3">
            <div>
              <h6 className="font-medium text-sm mb-1">得意なこと・スキル</h6>
              <p className="text-sm">例：料理、写真撮影、語学、プログラミング、デザイン、話を聞くこと…</p>
            </div>
            <div>
              <h6 className="font-medium text-sm mb-1">好きなこと・興味</h6>
              <p className="text-sm">例：旅行、音楽、ペット、ファッション、読書、スポーツ…</p>
            </div>
            <div>
              <h6 className="font-medium text-sm mb-1">周りで困っていること</h6>
              <p className="text-sm">例：時間がない、専門知識がない、子育てと仕事の両立…</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h5 className="font-medium mb-2">副業アイデア例</h5>
            <ul className="list-disc pl-5 space-y-2">
              <li>料理が得意 × 時間がない人 → 時短レシピ集の作成・販売</li>
              <li>写真撮影が得意 × SNS運用に悩む店舗 → 商品写真撮影サービス</li>
              <li>語学が得意 × 海外旅行好き → 旅行者向け会話集の作成</li>
              <li>話を聞くのが得意 × 悩みを相談したい人 → オンライン相談サービス</li>
            </ul>
          </div>
          
          {!isCompleted && (
            <Button className="w-full mt-4" onClick={onComplete}>
              このステップを完了する
            </Button>
          )}
        </div>
      );
    
    case 5:
      return (
        <div className="space-y-4">
          <p>選んだアイデアを実現するための簡易ビジネスプランを考えてみましょう。</p>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h5 className="font-medium mb-2">提供するサービス・商品</h5>
              <p className="text-sm">何を、どのように提供するか具体的に考えましょう。</p>
              <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                例：「時間がない人向けの、15分で作れる健康的な夕食レシピ集（電子書籍）」
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h5 className="font-medium mb-2">ターゲット顧客</h5>
              <p className="text-sm">誰に向けたサービス・商品か具体的に描きましょう。</p>
              <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                例：「仕事で帰りが遅いが健康を意識している30代会社員」
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h5 className="font-medium mb-2">必要な準備と初期コスト</h5>
              <p className="text-sm">始めるために必要なものとおおよその費用を考えましょう。</p>
              <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                例：「レシピ開発・撮影に使う食材費（1万円程度）、電子書籍作成ツール（無料〜月額1,000円）」
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h5 className="font-medium mb-2">販売方法と価格設定</h5>
              <p className="text-sm">どのように売り、いくらで提供するか考えましょう。</p>
              <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                例：「電子書籍販売プラットフォームで販売、1冊500円」
              </div>
            </div>
          </div>
          
          {!isCompleted && (
            <Button className="w-full mt-4" onClick={onComplete}>
              このステップを完了する
            </Button>
          )}
        </div>
      );
    
    case 6:
      return (
        <div className="space-y-4">
          <p>計画を実行に移すための具体的な一歩を考えましょう。小さな行動から始めることが重要です。</p>
          
          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">最初の一歩（今日から1週間でできること）</h5>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>アイデアを家族や友人に話してフィードバックをもらう</li>
              <li>SNSで同じ分野の発信をしている人をフォローして研究する</li>
              <li>必要なスキルについて無料の学習リソースを探す</li>
              <li>試作品や簡単なサンプルを1つ作ってみる</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">1ヶ月以内にやること</h5>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>サービスや商品の具体的な内容を詳細化する</li>
              <li>必要な道具や材料を少量だけ揃える</li>
              <li>SNSやブログなどで情報発信を始める</li>
              <li>最初の顧客（知人など）に試験的に提供してみる</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 className="font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              始める際の注意点
            </h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>本業に支障が出ない範囲で取り組む</li>
              <li>無理な借入や大きな投資は避ける</li>
              <li>会社の副業規定を確認する</li>
              <li>確定申告など税務上の義務を理解する</li>
            </ul>
          </div>
          
          {!isCompleted && (
            <Button className="w-full mt-4" onClick={onComplete}>
              このステップを完了する
            </Button>
          )}
        </div>
      );
    
    default:
      return <p>このモジュールは準備中です。</p>;
  }
};

export default StartupLearningModules;
