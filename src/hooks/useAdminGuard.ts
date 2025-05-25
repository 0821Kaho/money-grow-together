
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export function useAdminGuard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

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
        return;
      }

      try {
        console.log('Checking admin role for user:', user.id);
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        console.log('Profile query result:', { data, error });

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error("権限の確認に失敗しました");
          navigate('/');
          return;
        }

        if (!data || data.role !== 'admin') {
          console.log('User is not admin:', data);
          toast.error("管理者権限が必要です");
          navigate('/');
          return;
        }

        console.log('User confirmed as admin');
      } catch (error) {
        console.error('Error checking admin role:', error);
        toast.error("権限の確認に失敗しました");
        navigate('/');
      }
    };

    checkAdminRole();
  }, [user, isLoading, navigate]);

  return { 
    isAdmin: user && !isLoading, 
    isLoading,
    user 
  };
}
