
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
      console.log("Admin guard checking user:", user);
      
      if (!user) {
        // User is not logged in
        console.log("No user found, redirecting to login");
        toast.error("ログインが必要です");
        navigate('/login');
        return;
      } 
      
      // Double check the isAdmin flag explicitly
      const isUserAdmin = user.email === 'kahosatoyoshi@gmail.com' || 
                         user.email?.endsWith('@admin.com') || 
                         user.isAdmin === true;
      
      console.log("User email:", user.email);
      console.log("Is admin check result:", isUserAdmin);
      
      if (!isUserAdmin) {
        // User is logged in but not an admin
        console.log("User not admin, redirecting to home");
        toast.error("管理者権限が必要です");
        navigate('/');
        return;
      }
      
      console.log("User is admin, allowing access");
      // If user is logged in and is an admin, do nothing (allow access)
    }
  }, [user, isLoading, navigate]);

  // Enhanced logic to check admin status
  const isUserAdmin = user?.email === 'kahosatoyoshi@gmail.com' || 
                     user?.email?.endsWith('@admin.com') || 
                     user?.isAdmin === true;

  // Return isAdmin status to component so it can use it for UI decisions
  return { isAdmin: isUserAdmin, isLoading };
}
