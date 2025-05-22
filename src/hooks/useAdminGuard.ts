
/**
 * Hook that checks if the current user has admin role
 * and redirects to login page if not
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

export function useAdminGuard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect after authentication check is complete
    if (!isLoading && user) {
      // Check if the user has admin role in profiles table
      const checkAdminRole = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          const isAdmin = data?.role === 'admin';
          console.log('Admin check from profiles:', { userId: user.id, role: data?.role, isAdmin });
          
          if (!isAdmin) {
            toast.error("管理者権限が必要です");
            navigate('/');
          }
        } catch (error) {
          console.error('Error checking admin role:', error);
          toast.error("権限確認エラー");
          navigate('/');
        }
      };

      checkAdminRole();
    } else if (!isLoading && !user) {
      // User is not logged in
      toast.error("ログインが必要です");
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  return { isAdmin: user?.isAdmin === true, isLoading };
}
