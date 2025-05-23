import { createContext, useContext, useState, useEffect } from 'react';
import {
  Session,
  SupabaseClient,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';

interface AuthContextType {
  supabaseClient: SupabaseClient | null;
  session: Session | null;
  user: any | null;
  isLoading: boolean;
  login: (email?: string) => Promise<any>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, displayName?: string, age?: number) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  supabaseClient: null,
  session: null,
  user: null,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [session]);

  const login = async (email?: string) => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          // emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        throw error;
      }
      console.log('Check your email for the magic link to sign in.');
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabaseClient.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Modify the signup function to accept the age parameter
  const signup = async (email: string, password: string, displayName?: string, age?: number) => {
    try {
      // Prepare metadata to include displayName and age if provided
      const metadata: Record<string, any> = {};
      if (displayName) metadata.displayName = displayName;
      if (age !== undefined) metadata.age = age;

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const value = {
    supabaseClient,
    session,
    user,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
