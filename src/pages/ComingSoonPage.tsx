
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

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
          <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">Pigipeリリース中</h1>
          <p className="text-muted-foreground mb-8">
            Pigipeは2025年5月23日に公開されました！
            トップページから登録して今すぐご利用いただけます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="w-full bg-primary hover:bg-primary/90">
                登録する
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">
                トップページへ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
