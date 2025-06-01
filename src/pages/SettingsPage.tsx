
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, User, Bell, Shield, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const SettingsPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-logo font-bold text-[#333333]">Pigipe</h1>
          </Link>
          <Link to="/" className="ml-auto flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>トップへ戻る</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">設定</Badge>
            <h1 className={`${isMobile ? "text-2xl" : "text-3xl"} font-heading font-bold mb-3 text-[#333333]`}>
              アプリ設定
            </h1>
            <p className="text-muted-foreground">
              Pigipeの学習体験をカスタマイズしましょう
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  プロフィール
                </CardTitle>
                <CardDescription>
                  アカウント情報の管理
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">表示名</p>
                    <p className="text-sm text-muted-foreground">学習者</p>
                  </div>
                  <Button variant="outline" size="sm">編集</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">学習レベル</p>
                    <p className="text-sm text-muted-foreground">初級者</p>
                  </div>
                  <Button variant="outline" size="sm">変更</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  通知設定
                </CardTitle>
                <CardDescription>
                  学習リマインダーと進捗通知の管理
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">学習リマインダー</p>
                    <p className="text-sm text-muted-foreground">毎日の学習時間をお知らせ</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">進捗通知</p>
                    <p className="text-sm text-muted-foreground">達成バッジやレベルアップ</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">新機能のお知らせ</p>
                    <p className="text-sm text-muted-foreground">アップデート情報</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  プライバシー
                </CardTitle>
                <CardDescription>
                  データ利用とプライバシーの設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">学習データの利用</p>
                    <p className="text-sm text-muted-foreground">サービス改善のための利用を許可</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">匿名統計データ</p>
                    <p className="text-sm text-muted-foreground">匿名化された利用統計の提供</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  表示設定
                </CardTitle>
                <CardDescription>
                  アプリの見た目をカスタマイズ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">ダークモード</p>
                    <p className="text-sm text-muted-foreground">暗い背景色で表示</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">アニメーション</p>
                    <p className="text-sm text-muted-foreground">画面遷移時のアニメーション</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>サポート</CardTitle>
                <CardDescription>
                  ヘルプとお問い合わせ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  よくある質問
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  お問い合わせ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  利用規約
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  プライバシーポリシー
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
