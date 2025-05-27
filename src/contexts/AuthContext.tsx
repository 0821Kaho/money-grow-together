
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Profile } from '@/types/profile';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string, userEmail?: string) => {
    try {
      console.log('Fetching profile for user:', userId, userEmail);
      
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('id, name, role, created_at')
        .eq('id', userId)
        .single();
      
      console.log('Profile fetch result:', { profileData, error });
      
      if (error) {
        console.error('Error fetching profile:', error);
        
        // プロファイルが存在しない場合は作成を試行
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile...');
          
          // 管理者メールアドレスのチェック
          const isAdmin = userEmail === 'kahosatoyoshi@gmail.com';
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                role: isAdmin ? 'admin' : 'user',
                name: isAdmin ? 'Kaho Satoyoshi' : null
              }
            ])
            .select('id, name, role, created_at')
            .single();
          
          if (createError) {
            console.error('Error creating profile:', createError);
            return null;
          }
          
          console.log('Successfully created new profile:', newProfile);
          return {
            ...newProfile,
            role: newProfile.role as 'user' | 'admin'
          } as Profile;
        }
        
        return null;
      }
      
      if (!profileData) {
        console.log('No profile data returned');
        return null;
      }
      
      console.log('Successfully fetched profile:', profileData);
      return {
        ...profileData,
        role: profileData.role as 'user' | 'admin'
      } as Profile;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('User logged in, fetching profile...');
          // プロファイル取得を非同期で実行し、取得完了後にローディングを終了
          fetchProfile(session.user.id, session.user.email).then(profileData => {
            console.log('Setting profile data:', profileData);
            setProfile(profileData);
            setIsLoading(false);
          });
        } else {
          console.log('No session, clearing profile');
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    const getInitialSession = async () => {
      console.log('Checking for initial session...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Initial session check:', session?.user?.email);
      
      if (session) {
        setSession(session);
        setUser(session.user);
        const profileData = await fetchProfile(session.user.id, session.user.email);
        setProfile(profileData);
      }
      
      setIsLoading(false);
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, displayName?: string) => {
    try {
      const metadata = displayName ? { displayName } : undefined;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.session) {
        toast({
          title: "確認メールを送信しました",
          description: "メールを確認して、アカウント作成を完了してください",
        });
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
