
/**
 * Admin Analytics Page Placeholder
 * 
 * This page is a placeholder for future analytics functionality.
 */
import React from 'react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const AnalyticsPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">分析</h1>
        <p className="text-muted-foreground">
          このページは現在開発中です。将来的にユーザー活動の分析データを表示します。
        </p>
      </div>
      
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>利用統計</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center justify-center p-16">
            <div className="text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">この機能は開発中です</p>
              <p className="text-xs text-muted-foreground mt-2">Recharts を使用したグラフ表示を予定しています</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
