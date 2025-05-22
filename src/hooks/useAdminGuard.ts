
/**
 * Hook that checks if the current user has admin role
 * and redirects to login page if not
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function useAdminGuard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect after authentication check is complete
    if (!isLoading) {
      const isAdmin = user?.isAdmin === true;
      console.log('Admin check:', { user, isAdmin });
      
      if (!isAdmin) {
        toast.error("管理者権限が必要です");
        navigate('/login');
      }
    }
  }, [user, isLoading, navigate]);

  return { isAdmin: user?.isAdmin === true, isLoading };
}
