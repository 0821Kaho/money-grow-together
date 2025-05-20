
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F5F5F5] to-white">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページへ戻る
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">ただいま準備中</h1>
          <p className="text-muted-foreground mb-8">
            Pigipeは現在準備中です。2023年5月22日20時の公開をお楽しみに！
            トップページから事前登録すると、公開時にお知らせをお送りします。
          </p>
          <Link to="/">
            <Button>トップページへ</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
