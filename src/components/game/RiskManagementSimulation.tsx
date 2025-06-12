import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Trophy, Bell, CheckCircle2, Book, Flame, AlertTriangle } from "lucide-react";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import RiskQuestStory from "./risk/RiskQuestStory";
import AmuletsCollection from "./risk/AmuletsCollection";
import PreparednessMeter from "./risk/PreparednessMeter";
import { motion } from "framer-motion";

// Define the risk topics that will be covered in this module
const riskTopics = [
  {
    id: "health",
    title: "病気・ケガへの備え",
    icon: "🏥",
    description: "公的医療保険・民間保険の基礎知識と、最適な保障の選び方",
    progressPercent: 0,
    badgeLevel: "bronze",
    isLocked: false,
    quizCompleted: false,
    gameCompleted: false,
    actionCompleted: false
  },
  {
    id: "disaster",
    title: "災害リスクへの備え",
    icon: "🌊",
    description: "災害時の公的支援や保険、防災準備チェックリスト",
    progressPercent: 0,
    badgeLevel: "none",
    isLocked: false,
    quizCompleted: false,
    gameCompleted: false,
    actionCompleted: false
  },
  {
    id: "fraud",
    title: "詐欺・金融トラブル対策",
    icon: "🔒",
    description: "よくある詐欺の手口と、怪しい勧誘や詐欺メールの見分け方",
    progressPercent: 0,
    badgeLevel: "none",
    isLocked: true,
    quizCompleted: false,
    gameCompleted: false,
    actionCompleted: false
  },
  {
    id: "debt",
    title: "借入・多重債務のリスク",
    icon: "💸",
    description: "借入の仕組みと怖さ、返済計画と相談先",
    progressPercent: 0,
    badgeLevel: "none",
    isLocked: true,
    quizCompleted: false,
    gameCompleted: false,
    actionCompleted: false
  },
  {
    id: "emergency",
    title: "予期せぬ出費への備え",
    icon: "💰",
    description: "緊急予備資金の重要性と積立方法",
    progressPercent: 0, 
    badgeLevel: "none",
    isLocked: true,
    quizCompleted: false,
    gameCompleted: false,
    actionCompleted: false
  }
];

// Daily challenges to encourage user engagement
const dailyChallenges = [
  {
    id: "challenge1",
    title: "保険証券を確認しよう",
    description: "あなたの保険証券を確認し、どんな保障があるか家族と共有してみましょう",
    reward: "10ポイント + 経験値",
    isCompleted: false
  },
  {
    id: "challenge2",
    title: "非常用持ち出し袋の中身チェック",
    description: "自宅の非常用持ち出し袋の中身を確認し、足りないものをリストアップしましょう",
    reward: "15ポイント + 経験値",
    isCompleted: false
  },
  {
    id: "challenge3",
    title: "詐欺対策クイズに挑戦",
    description: "今日の詐欺対策クイズに挑戦して、知識を深めましょう",
    reward: "5ポイント + アイテム",
    isCompleted: false
  }
];

// Amulet collection - user earns these by completing topics
const amulets = [
  {
    id: "amulet1",
    name: "健康のお守り",
    description: "病気・ケガのリスクから身を守る",
    image: "🧿",
    isCollected: false,
    topicId: "health"
  },
  {
    id: "amulet2",
    name: "災害安全のお守り",
    description: "災害リスクから家族と財産を守る",
    image: "📿",
    isCollected: false,
    topicId: "disaster"
  },
  {
    id: "amulet3",
    name: "詐欺防止のお守り",
    description: "詐欺や金融トラブルから資産を守る",
    image: "🔮",
    isCollected: false,
    topicId: "fraud"
  },
  {
    id: "amulet4", 
    name: "借金回避のお守り",
    description: "危険な借入から将来を守る",
    image: "🪬",
    isCollected: false,
    topicId: "debt"
  },
  {
    id: "amulet5",
    name: "備蓄のお守り",
    description: "予期せぬ出費に備える力を授ける",
    image: "💎",
    isCollected: false,
    topicId: "emergency"
  }
];

const RiskManagementSimulation = () => {
  // State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [userTopics, setUserTopics] = useState(riskTopics);
  const [userChallenges, setUserChallenges] = useState(dailyChallenges);
  const [userAmulets, setUserAmulets] = useState(amulets);
  const [userLevel, setUserLevel] = useState(1);
  const [userExp, setUserExp] = useState(0);
  const [userPoints, setUserPoints] = useState(50);
  const [preparednessMeter, setPreparednessMeter] = useState(10); // Overall preparedness score 0-100
  const [showQuest, setShowQuest] = useState(false);
  const [streakDays, setStreakDays] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Handler for completing a challenge
  const handleCompleteChallenge = (challengeId: string) => {
    const updatedChallenges = userChallenges.map(challenge => 
      challenge.id === challengeId ? { ...challenge, isCompleted: true } : challenge
    );
    
    setUserChallenges(updatedChallenges);
    setUserPoints(prev => prev + 10);
    setUserExp(prev => prev + 15);
    
    // Check if user should level up
    if (userExp + 15 >= 100) {
      setUserLevel(prev => prev + 1);
      setUserExp((userExp + 15) - 100);
      
      toast({
        title: "🎉 レベルアップ！",
        description: `レベル${userLevel + 1}になりました！新しいクエストが解放されました`,
      });
    } else {
      toast({
        title: "チャレンジ完了！",
        description: "10ポイントと経験値を獲得しました",
      });
    }
    
    // Update preparedness meter
    setPreparednessMeter(prev => Math.min(100, prev + 5));
  };
  
  // Handler for starting a quest
  const handleStartQuest = (topicId: string) => {
    setSelectedTopic(topicId);
    setShowQuest(true);
    setActiveTab("quest");
  };
  
  // Handler for completing a quest step
  const handleCompleteQuestStep = (stepType: 'quiz' | 'game' | 'action') => {
    if (!selectedTopic) return;
    
    const updatedTopics = userTopics.map(topic => {
      if (topic.id === selectedTopic) {
        const updatedTopic = { ...topic };
        
        // Update the specific completed flag
        if (stepType === 'quiz') updatedTopic.quizCompleted = true;
        if (stepType === 'game') updatedTopic.gameCompleted = true;
        if (stepType === 'action') updatedTopic.actionCompleted = true;
        
        // Calculate new progress based on completed steps
        const completedSteps = [
          updatedTopic.quizCompleted,
          updatedTopic.gameCompleted,
          updatedTopic.actionCompleted
        ].filter(Boolean).length;
        
        updatedTopic.progressPercent = (completedSteps / 3) * 100;
        
        // Update badge if all steps completed
        if (completedSteps === 3) {
          updatedTopic.badgeLevel = 'silver';
          
          // Unlock the amulet for this topic
          const updatedAmulets = userAmulets.map(amulet => 
            amulet.topicId === topic.id ? { ...amulet, isCollected: true } : amulet
          );
          setUserAmulets(updatedAmulets);
          
          toast({
            title: "🎊 新しいお守りを獲得！",
            description: `${amulets.find(a => a.topicId === topic.id)?.name}を手に入れました！`,
          });
          
          // Unlock the next topic if applicable
          const topicIndex = userTopics.findIndex(t => t.id === topic.id);
          if (topicIndex < userTopics.length - 1) {
            updatedTopics[topicIndex + 1].isLocked = false;
          }
        }
        
        return updatedTopic;
      }
      return topic;
    });
    
    setUserTopics(updatedTopics);
    setUserPoints(prev => prev + 15);
    setUserExp(prev => prev + 25);
    
    // Update preparedness meter based on overall progress
    const overallProgress = updatedTopics.reduce((sum, topic) => sum + topic.progressPercent, 0) / updatedTopics.length;
    setPreparednessMeter(overallProgress);
  };
  
  // Welcome screen component
  const WelcomeScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-xl text-center"
    >
      <div className="flex justify-center mb-4">
        <MascotCharacter size="large" />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">暮らし安心お守りコレクション</h1>
      <p className="text-gray-600 mb-6">
        生活の様々なリスクに対する「お守り」を集めて、あなただけの安心図鑑を完成させましょう！
        リスク対策の知識を身につけ、実践すると、お守りやバッジがゲットできます。
      </p>
      
      <div className="flex justify-center gap-4 mb-6">
        {amulets.slice(0, 3).map(amulet => (
          <div key={amulet.id} className="text-3xl opacity-50">
            {amulet.image}
          </div>
        ))}
      </div>
      
      <Button 
        onClick={() => setShowWelcome(false)}
        className="w-full bg-pigipeGreen hover:bg-pigipeGreenDark text-white"
      >
        お守り集めを始める
      </Button>
    </motion.div>
  );

  // Dashboard component
  const Dashboard = () => (
    <div className="space-y-6">
      {/* Preparedness meter */}
      <PreparednessMeter score={preparednessMeter} />
      
      {/* Topics grid */}
      <div>
        <h3 className="font-semibold mb-3">安心のテーマ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userTopics.map((topic) => (
            <Card 
              key={topic.id} 
              className={`relative ${topic.isLocked ? 'opacity-60' : ''}`}
            >
              {topic.isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl">
                  <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">前のテーマをクリア</span>
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{topic.icon}</div>
                    <CardTitle className="text-base">{topic.title}</CardTitle>
                  </div>
                  
                  {topic.badgeLevel !== 'none' && (
                    <Badge variant={topic.badgeLevel === 'bronze' ? 'outline' : 'silver'} className="ml-auto">
                      <Trophy className="h-3 w-3 mr-1" />
                      {topic.badgeLevel === 'bronze' ? 'ブロンズ' : 'シルバー'}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-xs">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>進捗</span>
                    <span>{topic.progressPercent}%</span>
                  </div>
                  <Progress value={topic.progressPercent} className="h-1.5" />
                </div>
                
                <Button 
                  onClick={() => handleStartQuest(topic.id)}
                  disabled={topic.isLocked}
                  size="sm" 
                  className="w-full bg-pigipeGreen hover:bg-pigipeGreenDark text-white"
                >
                  {topic.progressPercent > 0 ? '続ける' : '始める'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Daily challenges */}
      <div>
        <h3 className="font-semibold mb-3">今日のチャレンジ</h3>
        <div className="space-y-3">
          {userChallenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden">
              <div className="border-l-4 border-l-pigipePink p-3 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">{challenge.title}</h4>
                  <p className="text-xs text-muted-foreground">{challenge.description}</p>
                  <div className="text-xs text-pigipePink mt-1 flex items-center">
                    <Award className="h-3 w-3 mr-1" /> {challenge.reward}
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant={challenge.isCompleted ? "outline" : "default"}
                  onClick={() => handleCompleteChallenge(challenge.id)}
                  disabled={challenge.isCompleted}
                  className={challenge.isCompleted ? "" : "bg-pigipeGreen hover:bg-pigipeGreenDark text-white"}
                >
                  {challenge.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-pigipePink" />
                  ) : (
                    '完了'
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-3xl mx-auto">
      {showWelcome ? (
        <WelcomeScreen />
      ) : (
        <>
          {/* Header with stats */}
          <div className="mb-6 flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="bg-pigipePink/10 rounded-full p-2">
                  <Shield className="h-5 w-5 text-pigipePink" />
                </div>
                <span className="text-xs font-medium mt-1">お守り守</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Book className="h-3 w-3" />
                    <span>Lv{userLevel}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    <span>{streakDays}日連続</span>
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-muted-foreground">経験値：</span>
                  <div className="w-24 h-1.5 bg-muted rounded-full">
                    <div 
                      className="h-full bg-pigipePink rounded-full" 
                      style={{width: `${userExp}%`}}
                    ></div>
                  </div>
                  <span className="text-xs">{userExp}/100</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                <span className="text-amber-600 text-sm font-medium">{userPoints}</span>
                <span className="text-amber-600">pt</span>
              </div>
              
              <button className="p-1.5 hover:bg-muted rounded-full">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
      
          {/* Main content area */}
          {showQuest ? (
            <RiskQuestStory 
              topic={userTopics.find(t => t.id === selectedTopic) || userTopics[0]}
              onComplete={(stepType) => handleCompleteQuestStep(stepType)}
              onBack={() => {
                setShowQuest(false);
                setActiveTab("dashboard");
              }}
            />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dashboard">ダッシュボード</TabsTrigger>
                <TabsTrigger value="amulets">お守りコレクション</TabsTrigger>
                <TabsTrigger value="rewards">報酬とバッジ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-4">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="amulets" className="mt-4">
                <AmuletsCollection amulets={userAmulets} />
              </TabsContent>
              
              <TabsContent value="rewards" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-500" />
                      あなたの称号とバッジ
                    </CardTitle>
                    <CardDescription>
                      学習を進めてバッジを集めましょう
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                      {userTopics.map(topic => (
                        <div key={topic.id} className="flex flex-col items-center p-3 rounded-lg border">
                          <div className={`text-2xl mb-2 ${topic.badgeLevel === 'none' ? 'opacity-40' : ''}`}>
                            {topic.icon}
                          </div>
                          <span className="text-sm font-medium text-center">{topic.title}</span>
                          <div className="mt-2">
                            {topic.badgeLevel === 'none' ? (
                              <Badge variant="outline" className="opacity-40">未獲得</Badge>
                            ) : topic.badgeLevel === 'bronze' ? (
                              <Badge>ブロンズ</Badge>
                            ) : (
                              <Badge variant="silver">シルバー</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </>
      )}
    </div>
  );
};

export default RiskManagementSimulation;
