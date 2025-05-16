
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Amulet {
  id: string;
  name: string;
  description: string;
  image: string;
  isCollected: boolean;
  topicId: string;
}

interface AmuletsCollectionProps {
  amulets: Amulet[];
}

const AmuletsCollection = ({ amulets }: AmuletsCollectionProps) => {
  // Count collected amulets
  const collectedCount = amulets.filter(amulet => amulet.isCollected).length;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">お守りコレクション</CardTitle>
          <CardDescription>
            リスク対策を学び、実践するとお守りが手に入ります。
            お守りはあなたの安心資産になります。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">コレクション進捗</span>
            <span className="text-sm font-medium">{collectedCount}/{amulets.length}</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {amulets.map((amulet) => (
              <motion.div
                key={amulet.id}
                whileHover={{ scale: 1.05 }}
                className={`relative bg-gradient-to-br ${amulet.isCollected ? 'from-amber-50 to-amber-100' : 'from-gray-50 to-gray-100'} p-4 rounded-xl text-center border ${amulet.isCollected ? 'border-amber-200' : 'border-gray-200'}`}
              >
                <div className="mb-2 text-4xl">
                  {amulet.isCollected ? amulet.image : '❓'}
                </div>
                <h4 className="text-sm font-medium">
                  {amulet.isCollected ? amulet.name : '未取得のお守り'}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {amulet.isCollected ? amulet.description : 'トピックを完了して獲得しよう'}
                </p>
                
                {/* Shine effect for collected amulets */}
                {amulet.isCollected && (
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-white opacity-10 rounded-full blur-md animate-pulse"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Additional information section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">お守りを増やすには</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>各テーマのクエストを完了してお守りをゲット</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>毎日のチャレンジに挑戦してポイントを貯める</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>レアなお守りはイベント参加やバッジ獲得で入手可能</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmuletsCollection;
