
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

// Extended user type to include additional properties needed throughout the app
interface ExtendedUser extends User {
  isAdmin?: boolean;
  displayName?: string;
}

interface AuthContextType {
  session: Session | null;
  user: ExtendedUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email?: string) => Promise<any>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, displayName?: string, age?: number) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          console.log("Auth state changed, user email:", currentSession.user.email);
          
          // Add any custom properties to the user object here
          const extendedUser: ExtendedUser = {
            ...currentSession.user,
            // Make sure kahosatoyoshi@gmail.com is definitely recognized as admin
            isAdmin: currentSession.user.email === 'kahosatoyoshi@gmail.com' || 
                    currentSession.user.email?.endsWith('@admin.com') || false,
            // Add displayName if needed from user metadata
            displayName: currentSession.user.user_metadata?.displayName || ''
          };
          
          console.log("User admin status:", extendedUser.isAdmin);
          setUser(extendedUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        console.log("Initial session check, user email:", currentSession.user.email);
        
        // Add any custom properties to the user object here
        const extendedUser: ExtendedUser = {
          ...currentSession.user,
          // Make sure kahosatoyoshi@gmail.com is definitely recognized as admin
          isAdmin: currentSession.user.email === 'kahosatoyoshi@gmail.com' || 
                  currentSession.user.email?.endsWith('@admin.com') || false,
          // Add displayName if needed from user metadata
          displayName: currentSession.user.user_metadata?.displayName || ''
        };
        
        console.log("User admin status:", extendedUser.isAdmin);
        setUser(extendedUser);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email?: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
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
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
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

      const { data, error } = await supabase.auth.signUp({
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
    session,
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
