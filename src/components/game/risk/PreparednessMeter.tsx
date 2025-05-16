
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";

interface PreparednessMeterProps {
  score: number;
}

const PreparednessMeter = ({ score }: PreparednessMeterProps) => {
  // Helper function to get color and title based on score
  const getMeterInfo = (score: number) => {
    if (score < 20) {
      return {
        color: 'bg-red-500',
        title: '危険',
        message: 'リスク対策を始めましょう'
      };
    } else if (score < 40) {
      return {
        color: 'bg-orange-500',
        title: '注意',
        message: 'まだまだ安心には遠い状態です'
      };
    } else if (score < 60) {
      return {
        color: 'bg-yellow-500',
        title: '基本対策中',
        message: '基本的な備えができつつあります'
      };
    } else if (score < 80) {
      return {
        color: 'bg-blue-500',
        title: '備え充実',
        message: '多くのリスクに備えができています'
      };
    } else {
      return {
        color: 'bg-green-500',
        title: '万全',
        message: 'リスクに包括的に備えができています'
      };
    }
  };
  
  const { color, title, message } = getMeterInfo(score);
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">備え度メーター</h3>
        </div>
        <span className="text-sm font-bold">{score.toFixed(0)}%</span>
      </div>
      
      <Progress 
        value={score} 
        className="h-3" 
        indicatorClassName={color} 
      />
      
      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};

export default PreparednessMeter;
