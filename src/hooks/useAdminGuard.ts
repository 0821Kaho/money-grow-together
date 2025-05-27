
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Profile } from '@/types/profile';

interface AdminGuardReturn {
  isAdmin: boolean;
  isLoading: boolean;
  user: ReturnType<typeof useAuth>['user'];
  profile: Profile | null;
}

export function useAdminGuard(): AdminGuardReturn {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  useEffect(() => {
    // タイムアウト処理：5秒後にプロファイル読み込みを諦める
    const timeout = setTimeout(() => {
      if (!profile && user) {
        console.log('Profile loading timeout, redirecting to login');
        toast.error("プロファイルの読み込みに時間がかかっています。再度ログインしてください。");
        navigate('/login');
        setIsCheckingAdmin(false);
      }
    }, 5000);

    const checkAdminRole = () => {
      console.log('=== Admin Guard Check ===');
      console.log('User:', user?.email);
      console.log('Profile:', profile);
      console.log('Auth loading:', isLoading);
      console.log('Profile role:', profile?.role);
      console.log('========================');
      
      if (isLoading) {
        console.log('Still loading authentication...');
        return;
      }

      if (!user) {
        console.log('No user found, redirecting to login');
        toast.error("ログインが必要です");
        navigate('/login');
        setIsCheckingAdmin(false);
        clearTimeout(timeout);
        return;
      }

      if (!profile) {
        console.log('Profile not loaded yet, waiting...');
        return;
      }

      console.log('Profile loaded:', profile);
      console.log('Profile role:', profile.role);
      console.log('Is admin?', profile.role === 'admin');

      if (profile.role !== 'admin') {
        console.log('User is not admin, redirecting to home:', profile);
        toast.error("管理者権限が必要です");
        navigate('/');
        setIsCheckingAdmin(false);
        clearTimeout(timeout);
        return;
      }

      console.log('User confirmed as admin, allowing access');
      setIsCheckingAdmin(false);
      clearTimeout(timeout);
    };

    checkAdminRole();

    return () => {
      clearTimeout(timeout);
    };
  }, [user, profile, isLoading, navigate]);

  const isAdmin = !!(profile?.role === 'admin' && user && !isLoading);
  const totalLoading = isLoading || isCheckingAdmin;
  
  console.log('useAdminGuard return:', { 
    isAdmin, 
    isLoading: totalLoading, 
    profileRole: profile?.role,
    hasUser: !!user,
    hasProfile: !!profile
  });

  return { 
    isAdmin, 
    isLoading: totalLoading,
    user,
    profile
  };
}
