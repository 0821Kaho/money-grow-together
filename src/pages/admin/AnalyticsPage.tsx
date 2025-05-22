
/**
 * Admin Analytics Page
 * 
 * This page is a placeholder for future analytics functionality.
 */
import React from 'react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, BarChart3, LineChart, PieChart, Activity } from 'lucide-react';

const AnalyticsPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">分析</h1>
        <p className="text-muted-foreground">
          ユーザー活動と学習データの詳細分析。このページは現在開発中です。
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand-pink" />
              ユーザーアクティビティ
            </CardTitle>
            <CardDescription>
              直近30日間のユーザーアクティビティ
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">この機能は開発中です</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-500" />
              モジュール完了率
            </CardTitle>
            <CardDescription>
              各モジュールの完了状況
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">この機能は開発中です</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-green-500" />
              ユーザー成長
            </CardTitle>
            <CardDescription>
              登録ユーザー数の推移
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">この機能は開発中です</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-amber-500" />
              バッジ獲得分布
            </CardTitle>
            <CardDescription>
              獲得されたバッジの分布
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">この機能は開発中です</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>分析レポート</CardTitle>
          <CardDescription>
            アプリケーションの利用状況とユーザーデータのサマリー
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[150px] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">この機能は開発中です</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled>レポートを生成</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
