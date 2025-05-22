
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { waitlistApi } from '@/lib/api';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
}

const WaitlistAdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // 管理者かどうかを確認（例：特定のメールアドレスを持つユーザー）
  // 実際のアプリでは、ユーザーロールなどを確認する必要があります
  const isAdmin = user?.email === 'admin@pigipe.com';
  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) return;
    
    const fetchWaitlistEntries = async () => {
      try {
        setLoading(true);
        const response = await waitlistApi.getAllEntries();
        setEntries(response.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch waitlist entries:', error);
        setError('ウェイトリストの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWaitlistEntries();
  }, [isAuthenticated, isAdmin]);
  
  // 登録日時をフォーマットする関数
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // CSVエクスポート機能
  const exportToCSV = () => {
    if (entries.length === 0) return;
    
    const headers = ['ID', 'メールアドレス', '登録日時'];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.id,
        entry.email,
        formatDate(entry.createdAt)
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `waitlist-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'エクスポート完了',
      description: 'CSVファイルがダウンロードされました',
    });
  };
  
  // 管理者じゃない場合はホームページにリダイレクト
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">ウェイトリスト管理</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500">合計登録者数: {entries.length}</p>
        </div>
        <Button onClick={exportToCSV} disabled={entries.length === 0}>
          CSVエクスポート
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <p>読み込み中...</p>
      ) : entries.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>登録日時</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-xs">{entry.id}</TableCell>
                  <TableCell>{entry.email}</TableCell>
                  <TableCell>{formatDate(entry.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">登録者はまだいません</p>
      )}
    </div>
  );
};

export default WaitlistAdminPage;
