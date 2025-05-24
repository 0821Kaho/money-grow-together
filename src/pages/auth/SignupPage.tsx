
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/modules');
    }
  }, [user, navigate]);

  // Get pre-registered email from localStorage if available
  useEffect(() => {
    const preregisteredEmail = localStorage.getItem("preregisteredEmail");
    if (preregisteredEmail) {
      setEmail(preregisteredEmail);
      // Clear the stored email to prevent it from being used multiple times
      localStorage.removeItem("preregisteredEmail");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("パスワードが一致しません");
      return;
    }
    
    if (!termsAccepted) {
      toast.error("利用規約に同意してください");
      return;
    }
    
    setIsLoading(true);

    try {
      await signup(email, password, displayName);
      toast.success("登録成功", {
        description: "Pigipeへようこそ！",
      });
      // Onboarding is the next step after signup
      navigate("/onboarding");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error("登録失敗", {
        description: error.message || "アカウントの作成に失敗しました",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-[#F5F5F5]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">アカウント登録</CardTitle>
        <CardDescription className="text-center">
          お金の学習をはじめましょう
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
            <Label htmlFor="displayName">ニックネーム (任意)</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="ニックネーム"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード (確認)</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                className="mt-1"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm leading-tight">
                <span className="text-muted-foreground">
                  登録をもって
                  <Link to="/terms" className="text-primary hover:underline mx-1" target="_blank" rel="noopener noreferrer">
                    利用規約
                  </Link>
                  と
                  <Link to="/privacy" className="text-primary hover:underline mx-1" target="_blank" rel="noopener noreferrer">
                    プライバシーポリシー
                  </Link>
                  に同意し、運営会社 NextGens株式会社が個人情報を取扱うことを承諾します。
                </span>
              </Label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading || !termsAccepted}
          >
            {isLoading ? "登録中..." : "アカウント作成"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
          すでにアカウントをお持ちですか？{" "}
          <Link to="/login" className="text-primary hover:underline">
            ログイン
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupPage;
