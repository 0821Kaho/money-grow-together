
/**
 * Admin User Detail Page
 * 
 * Displays detailed information about a specific user and allows editing
 * their role and other settings
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow, format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getUserById, updateUser } from '@/data/users';

// Form schema for user editing
const userFormSchema = z.object({
  name: z.string().optional(),
  role: z.enum(['admin', 'user']),
});

type UserFormValues = z.infer<typeof userFormSchema>;

type UserProgress = {
  id: string;
  user_id: string;
  module_id: string;
  status: 'completed' | 'in-progress' | 'not-started';
  completed_at?: string;
  score?: number;
};

type UserBadge = {
  id: string;
  user_id: string;
  badge_id: string;
  awarded_at: string;
  badge_name: string;
  badge_description: string;
};

type UserDetails = {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  created_at: string;
};

const UserDetailPage = () => {
  useAdminGuard();
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form setup
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      role: 'user',
    },
  });
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // In a real implementation, this would be fetched from the admin API
        const userData = await getUserById(id);
        
        // For demo purposes, we'll use mock data
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.full_name,
          role: userData.role as 'admin' | 'user',
          created_at: userData.created_at,
        });
        
        // Set form values
        form.reset({
          name: userData.full_name,
          role: userData.role as 'admin' | 'user',
        });
        
        // Mock progress data
        setProgress([
          {
            id: '1',
            user_id: id,
            module_id: 'budget-basics',
            status: 'completed',
            completed_at: '2023-01-15T00:00:00.000Z',
            score: 85,
          },
          {
            id: '2',
            user_id: id,
            module_id: 'investment-101',
            status: 'in-progress',
          },
          {
            id: '3',
            user_id: id,
            module_id: 'retirement-planning',
            status: 'not-started',
          },
        ]);
        
        // Mock badges data
        setBadges([
          {
            id: '1',
            user_id: id,
            badge_id: 'first-login',
            awarded_at: '2023-01-01T00:00:00.000Z',
            badge_name: '初ログイン',
            badge_description: 'アプリに初めてログインしました',
          },
          {
            id: '2',
            user_id: id,
            badge_id: 'budget-master',
            awarded_at: '2023-01-15T00:00:00.000Z',
            badge_name: '予算マスター',
            badge_description: '予算管理モジュールを完了しました',
          },
        ]);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('ユーザーデータの取得に失敗しました');
        navigate('/admin/users');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [id, navigate, form]);
  
  // Handle form submission
  const onSubmit = async (data: UserFormValues) => {
    if (!id || !user) return;
    
    setIsSaving(true);
    try {
      // In a real implementation, this would be sent to the admin API
      await updateUser(id, {
        full_name: data.name,
        role: data.role,
      });
      
      // Update local state
      setUser({
        ...user,
        name: data.name,
        role: data.role,
      });
      
      toast.success('ユーザー情報を更新しました');
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
        return <Badge className="bg-green-500">完了</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">進行中</Badge>;
      case 'not-started':
        return <Badge variant="outline">未開始</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/admin/users')}
          >
            ← ユーザー一覧に戻る
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-72 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/admin/users')}
        >
          ← ユーザー一覧に戻る
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* User Information */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{user?.name || user?.email}</CardTitle>
            <CardDescription>
              ユーザーID: {user?.id} •&nbsp;
              {user?.created_at && (
                <>
                  登録日: {format(new Date(user.created_at), 'yyyy年MM月dd日')}
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>名前</FormLabel>
                        <FormControl>
                          <Input placeholder="名前" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>権限</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value} 
                            onValueChange={(value) => field.onChange(value as 'admin' | 'user')}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="権限を選択" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">一般ユーザー</SelectItem>
                              <SelectItem value="admin">管理者</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          管理者は全ての機能にアクセスできます
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? '保存中...' : '変更を保存'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Progress and Badges Tabs */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>ユーザーデータ</CardTitle>
            <CardDescription>
              学習進捗と獲得バッジ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="progress">
              <TabsList className="mb-4">
                <TabsTrigger value="progress">学習進捗</TabsTrigger>
                <TabsTrigger value="badges">バッジ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress">
                {progress.length > 0 ? (
                  <div className="space-y-4">
                    {progress.map((item) => (
                      <div key={item.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.module_id}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.completed_at && (
                                <>
                                  完了日: {format(new Date(item.completed_at), 'yyyy年MM月dd日')}
                                </>
                              )}
                              {item.score && ` • スコア: ${item.score}点`}
                            </p>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">学習記録がありません</p>
                )}
              </TabsContent>
              
              <TabsContent value="badges">
                {badges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {badges.map((badge) => (
                      <div key={badge.id} className="border rounded-md p-4 bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className="bg-brand-pink rounded-full w-10 h-10 flex items-center justify-center text-white">
                            🏆
                          </div>
                          <div>
                            <h4 className="font-medium">{badge.badge_name}</h4>
                            <p className="text-sm text-muted-foreground">{badge.badge_description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              獲得日: {format(new Date(badge.awarded_at), 'yyyy年MM月dd日')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">バッジがありません</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailPage;
