
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export function useAdminGuard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only check admin status after authentication loading completes
    const checkAdminRole = async () => {
      if (isLoading) return;

      if (!user) {
        // User is not logged in
        toast.error("ログインが必要です");
        navigate('/login');
        return;
      }

      try {
        // Query profiles table to check admin role
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        // Check if user has admin role
        if (!data || data.role !== 'admin') {
          toast.error("管理者権限が必要です");
          navigate('/');
          return;
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        toast.error("権限の確認に失敗しました");
        navigate('/');
      }
    };

    checkAdminRole();
  }, [user, isLoading, navigate]);

  return { isAdmin: user && !isLoading, isLoading };
}
