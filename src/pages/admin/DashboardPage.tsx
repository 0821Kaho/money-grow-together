
/**
 * Admin Dashboard Home Page
 * 
 * A simple overview dashboard that serves as the home page for the admin area.
 * This is a placeholder that would typically show stats and charts.
 */
import React from 'react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart3, Settings, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  // Mock data for the dashboard
  const stats = [
    {
      title: 'ユーザー数',
      value: '2,832',
      change: '+12%',
      icon: Users,
      path: '/admin/users'
    },
    {
      title: 'アクティブユーザー',
      value: '1,245',
      change: '+5.2%',
      icon: Activity,
      path: '/admin/analytics'
    },
    {
      title: '完了モジュール数',
      value: '12,453',
      change: '+18%',
      icon: BarChart3,
      path: '/admin/analytics'
    },
    {
      title: '設定オプション',
      value: '設定を編集',
      change: '',
      icon: Settings,
      path: '/admin/settings'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">管理者ダッシュボード</h1>
        <p className="text-muted-foreground">
          Pigipe 管理者向けダッシュボードへようこそ。管理機能にアクセスするには以下のカードからお選びください。
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="rounded-2xl shadow-sm">
            <Link to={stat.path} className="block h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.change && (
                  <p className="text-xs text-muted-foreground">
                    {stat.change} 先月比
                  </p>
                )}
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>実装されている機能</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>管理者認証 (useAdminGuard)</li>
              <li>レスポンシブサイドバー (デスクトップ/モバイル)</li>
              <li>ユーザー一覧表示と検索機能</li>
              <li>ユーザー情報編集 (権限、ステータス)</li>
              <li>ダークモード/ライトモードの切り替え</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>今後の開発予定</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>分析機能 (ユーザー活動・モジュール完了率)</li>
              <li>ユーザー作成機能</li>
              <li>ユーザーフィルタとエクスポート</li>
              <li>管理者設定ページ</li>
              <li>通知システム</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
