
/**
 * Admin Settings Page Placeholder
 * 
 * This page is a placeholder for future admin settings functionality.
 */
import React from 'react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const SettingsPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">システム設定</h1>
        <p className="text-muted-foreground">
          このページは現在開発中です。将来的にシステム設定を管理できるようになります。
        </p>
      </div>
      
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>設定管理</CardTitle>
          <CardDescription>アプリケーションの設定を管理します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">この機能は開発中です</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled>設定を保存</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;
