
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export function useAdminGuard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      console.log('Admin guard checking...', { user: user?.email, isLoading });
      
      if (isLoading) {
        console.log('Still loading authentication...');
        return;
      }

      if (!user) {
        console.log('No user found, redirecting to login');
        toast.error("ログインが必要です");
        navigate('/login');
        setIsCheckingAdmin(false);
        return;
      }

      try {
        console.log('Checking admin role for user:', user.id);
        
        // まずapp_metadataから管理者権限をチェック
        if (user.app_metadata?.isAdmin) {
          console.log('User is admin via app_metadata');
          setIsAdmin(true);
          setIsCheckingAdmin(false);
          return;
        }

        // profilesテーブルからroleを確認（無限再帰を避けるため慎重に）
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        console.log('Profile query result:', { profile, error });

        if (error) {
          console.error('Error fetching profile:', error);
          // profilesテーブルにエラーがある場合、特定の管理者ユーザーのみ許可
          const adminEmails = ['kahosatoyoshi@gmail.com'];
          if (adminEmails.includes(user.email || '')) {
            console.log('User is admin via hardcoded email list');
            setIsAdmin(true);
          } else {
            toast.error("権限の確認に失敗しました");
            navigate('/');
          }
          setIsCheckingAdmin(false);
          return;
        }

        if (!profile) {
          console.log('Profile not found, checking if user should be admin');
          // 特定のメールアドレスの場合は管理者として扱う
          const adminEmails = ['kahosatoyoshi@gmail.com'];
          if (adminEmails.includes(user.email || '')) {
            console.log('Creating admin profile for privileged user');
            // 管理者プロファイルを作成
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({ id: user.id, name: user.email?.split('@')[0] || 'Admin', role: 'admin' });
            
            if (insertError) {
              console.error('Error creating admin profile:', insertError);
            }
            setIsAdmin(true);
          } else {
            console.log('Creating default user profile');
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({ id: user.id, name: user.email?.split('@')[0] || 'User', role: 'user' });
            
            if (insertError) {
              console.error('Error creating profile:', insertError);
            }
            toast.error("管理者権限が必要です");
            navigate('/');
          }
          setIsCheckingAdmin(false);
          return;
        }

        if (profile.role !== 'admin') {
          console.log('User is not admin:', profile);
          toast.error("管理者権限が必要です");
          navigate('/');
          setIsCheckingAdmin(false);
          return;
        }

        console.log('User confirmed as admin');
        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin role:', error);
        toast.error("権限の確認に失敗しました");
        navigate('/');
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdminRole();
  }, [user, isLoading, navigate]);

  return { 
    isAdmin: isAdmin && user && !isLoading, 
    isLoading: isLoading || isCheckingAdmin,
    user 
  };
}
