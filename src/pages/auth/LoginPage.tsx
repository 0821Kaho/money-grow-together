
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if the user is already logged in and redirect based on role
  useEffect(() => {
    if (user && profile) {
      // Get the return path from localStorage or default based on role
      const returnPath = localStorage.getItem('returnPath');
      // Clear the return path
      localStorage.removeItem('returnPath');
      
      // Admin users go to admin dashboard, regular users go to modules
      if (profile.role === 'admin') {
        console.log("管理者としてログインしました。管理者ページへ遷移します。");
        navigate(returnPath && returnPath.startsWith('/admin') ? returnPath : "/admin");
      } else {
        console.log("一般ユーザーとしてログインしました。学習ページへ遷移します。");
        navigate(returnPath && !returnPath.startsWith('/admin') ? returnPath : "/modules");
      }
    }
  }, [user, profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      
      toast({
        title: "ログイン成功",
        description: "Pigipeへようこそ！",
      });
      
      // Navigation will be handled by the useEffect above
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "ログイン失敗",
        description: "メールアドレスまたはパスワードが正しくありません",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-[#F5F5F5]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">ログイン</CardTitle>
        <CardDescription className="text-center">
          あなたの学習を続けましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">パスワード</Label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                パスワードをお忘れですか？
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
          アカウントをお持ちでないですか？{" "}
          <Link to="/signup" className="text-primary hover:underline">
            新規登録
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
