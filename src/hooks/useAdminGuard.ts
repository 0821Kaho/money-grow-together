
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
    const checkAdminRole = () => {
      console.log('Admin guard checking...', { user: user?.email, profile, isLoading });
      
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

      // Check if profile exists and role is admin
      if (!profile) {
        console.log('Profile not loaded yet...');
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
      setIsCheckingAdmin(false);
    };

    checkAdminRole();
  }, [user, profile, isLoading, navigate]);

  return { 
    isAdmin: profile?.role === 'admin' && user && !isLoading, 
    isLoading: isLoading || isCheckingAdmin,
    user,
    profile
  };
}
