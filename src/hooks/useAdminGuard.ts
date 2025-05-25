
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
        return;
      }

      try {
        console.log('Checking admin role for user:', user.id);
        
        // First check if profile exists
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        console.log('Profile query result:', { profile, error });

        if (error) {
          console.error('Error fetching profile:', error);
          
          // If profile doesn't exist, create one with user role
          if (error.code === 'PGRST116') {
            console.log('Profile not found, creating default profile...');
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({ id: user.id, role: 'user' });
            
            if (insertError) {
              console.error('Error creating profile:', insertError);
              toast.error("プロフィールの作成に失敗しました");
              navigate('/');
              return;
            }
            
            toast.error("管理者権限が必要です");
            navigate('/');
            return;
          }
          
          toast.error("権限の確認に失敗しました");
          navigate('/');
          return;
        }

        if (!profile || profile.role !== 'admin') {
          console.log('User is not admin:', profile);
          toast.error("管理者権限が必要です");
          navigate('/');
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
