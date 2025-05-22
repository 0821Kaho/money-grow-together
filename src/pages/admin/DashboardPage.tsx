
/**
 * Admin Dashboard Home Page
 * 
 * A simple overview dashboard that serves as the home page for the admin area.
 * Displays key metrics and navigation cards.
 */
import React, { useState, useEffect } from 'react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, BookOpen, Award, BarChart3, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

type DashboardStats = {
  totalUsers: number;
  activeUsers: number;
  completedModules: number;
  unreadFeedback: number;
};

const DashboardPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    completedModules: 0,
    unreadFeedback: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real implementation, we would fetch actual stats from the admin API
    // For now, we'll just simulate loading and set some mock data
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - would be replaced with actual API call
        setStats({
          totalUsers: 2832,
          activeUsers: 1245,
          completedModules: 12453,
          unreadFeedback: 18
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('データの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  // Stats cards with icons and links
  const statCards = [
    {
      title: 'ユーザー数',
      value: stats.totalUsers.toLocaleString(),
      change: '+12%',
      icon: Users,
      path: '/admin/users',
      color: 'text-brand-pink',
      bgColor: 'bg-brand-light'
    },
    {
      title: 'アクティブユーザー',
      value: stats.activeUsers.toLocaleString(),
      change: '+5.2%',
      icon: Users,
      path: '/admin/analytics',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: '完了モジュール数',
      value: stats.completedModules.toLocaleString(),
      change: '+18%',
      icon: BookOpen,
      path: '/admin/analytics',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: '未読フィードバック',
      value: stats.unreadFeedback.toLocaleString(),
      change: 'new',
      icon: MessageSquare,
      path: '/admin/feedback',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    }
  ];
  
  // Feature cards for quick navigation
  const featureCards = [
    {
      title: 'ユーザー管理',
      description: 'ユーザー情報の確認・編集',
      icon: Users,
      path: '/admin/users',
      color: 'text-brand-pink',
      bgColor: 'bg-brand-light'
    },
    {
      title: 'フィードバック',
      description: 'ユーザーからのフィードバック確認',
      icon: MessageSquare,
      path: '/admin/feedback',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: '分析',
      description: 'ユーザー活動と学習データ分析',
      icon: BarChart3,
      path: '/admin/analytics',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: '設定',
      description: 'アプリケーション設定',
      icon: Settings,
      path: '/admin/settings',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">管理者ダッシュボード</h1>
        <p className="text-muted-foreground">
          Pigipe 管理者向けダッシュボードへようこそ。主要なメトリクスと管理機能にアクセスできます。
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          // Loading skeleton
          Array(4).fill(null).map((_, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-20 mb-1" />
                <Skeleton className="h-4 w-16" />
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual stats cards
          statCards.map((stat) => (
            <Link to={stat.path} key={stat.title}>
              <Card className="rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change === 'new' ? (
                      <span className="text-brand-pink font-medium">New</span>
                    ) : (
                      <span>{stat.change} 先月比</span>
                    )}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
      
      {/* Feature Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((feature) => (
          <Link to={feature.path} key={feature.title}>
            <Card className="rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className={`rounded-full w-12 h-12 ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </Link>
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
              <li>ユーザー情報編集 (名前、権限)</li>
              <li>フィードバック管理</li>
              <li>システム設定</li>
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
              <li>詳細な分析機能 (ユーザー活動・モジュール完了率)</li>
              <li>バッチ処理 (定期的なデータ集計や通知)</li>
              <li>ユーザー作成機能</li>
              <li>コンテンツ管理システム</li>
              <li>ダッシュボードのカスタマイズ</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
