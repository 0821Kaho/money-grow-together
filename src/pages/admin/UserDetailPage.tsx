
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Award, Check, Clock, XCircle } from 'lucide-react';

type User = {
  id: string;
  email: string;
  created_at: string;
  name?: string;
  role: 'admin' | 'user';
};

type Progress = {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completed_at?: string;
  score?: number;
};

type Badge = {
  id: string;
  user_id: string;
  badge_id: string;
  name: string;
  icon: string;
  earned_at: string;
};

const UserDetailPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    role: 'user',
  });
  
  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      
      const data = await response.json();
      
      // Transform user data
      const userData: User = {
        id: data.user.auth.users.id,
        email: data.user.auth.users.email,
        created_at: data.user.auth.users.created_at,
        name: data.user.profiles.name,
        role: data.user.profiles.role,
      };
      
      setUser(userData);
      setFormData({
        name: userData.name || '',
        role: userData.role,
      });
      setProgress(data.progress || []);
      setBadges(data.badges || []);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('ユーザー詳細の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value as 'admin' | 'user',
    });
  };
  
  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      toast.success('ユーザー情報を更新しました');
      
      // Update local user data
      setUser({
        ...user,
        name: formData.name,
        role: formData.role,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('ユーザー情報の更新に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600"><Check className="mr-1 h-3 w-3" /> 完了</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-brand-pink text-brand-pink"><Clock className="mr-1 h-3 w-3" /> 進行中</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-300 text-gray-500"><XCircle className="mr-1 h-3 w-3" /> 未開始</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-10 w-64" />
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-4">
              <Skeleton className="h-7 w-64 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <Skeleton className="h-7 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">ユーザーが見つかりませんでした</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/admin/users')}>
          ユーザー一覧に戻る
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/users')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{user.name || user.email}</h1>
      </div>
      
      <div className="grid gap-6">
        {/* User Information Card */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>ユーザー情報</CardTitle>
            <CardDescription>
              ユーザー情報の確認・編集
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                メールアドレス
              </label>
              <Input
                id="email"
                value={user.email}
                readOnly
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                名前
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="role">
                権限
              </label>
              <Select
                value={formData.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="権限を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">一般ユーザー</SelectItem>
                  <SelectItem value="admin">管理者</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                登録日時
              </label>
              <p className="text-muted-foreground">
                {format(new Date(user.created_at), 'PPP HH:mm', { locale: ja })}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? '保存中...' : '変更を保存'}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Badges */}
        {badges.length > 0 && (
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>獲得バッジ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {badges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className="flex flex-col items-center justify-center gap-2 p-2 text-center"
                  >
                    <div className="bg-brand-light rounded-full p-3">
                      <Award className="h-8 w-8 text-brand-pink" />
                    </div>
                    <span className="text-sm font-medium">{badge.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(badge.earned_at), 'PP', { locale: ja })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Progress Table */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>学習進捗</CardTitle>
          </CardHeader>
          <CardContent>
            {progress.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>レッスンID</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>完了日時</TableHead>
                    <TableHead>スコア</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {progress.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.lesson_id}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.completed_at ? 
                          format(new Date(item.completed_at), 'PPP', { locale: ja }) : 
                          '-'
                        }
                      </TableCell>
                      <TableCell>
                        {item.score !== undefined ? `${item.score}点` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                学習記録がありません
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailPage;
