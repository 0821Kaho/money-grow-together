
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
      if (!user) {
        // User is not logged in
        toast("ログインが必要です");
        navigate('/login');
      } else if (!user.isAdmin) {
        // User is logged in but not an admin
        toast("管理者権限が必要です");
        navigate('/');
      }
      // If user is logged in and is an admin, do nothing (allow access)
    }
  }, [user, isLoading, navigate]);

  // Return isAdmin status to component so it can use it for UI decisions
  return { isAdmin: user?.isAdmin === true, isLoading };
}
