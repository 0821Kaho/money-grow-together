
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

type User = {
  id: string;
  email: string;
  displayName?: string;
  isAdmin?: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>; 
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => void;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in, with improved error handling
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // For now, we'll use a mock implementation
          // In a real implementation, we would validate the token with the server
          const savedEmail = localStorage.getItem('userEmail') || 'user@example.com';
          // Check if the email is the admin email
          const isAdmin = savedEmail === 'kahosatoyoshi@gmail.com';
          console.log('User authenticated:', { email: savedEmail, isAdmin });
          
          setUser({ 
            id: '1', 
            email: savedEmail,
            isAdmin
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid tokens
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // Mock implementation - would be replaced with actual API call
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      
      // For demo purposes
      const token = 'mock-token';
      const isAdmin = email === 'kahosatoyoshi@gmail.com';
      console.log('Logging in:', { email, isAdmin });
      
      const userData = { 
        id: '1', 
        email,
        isAdmin
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email); // Save email for demo purposes
      setUser(userData);

      return userData; // Return the user data for use in the login page
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('ログインに失敗しました');
    }
  };

  const signup = async (email: string, password: string, displayName?: string) => {
    try {
      // Mock implementation - would be replaced with actual API call
      // const response = await api.post('/auth/signup', { email, password, displayName });
      // const { token, user } = response.data;
      
      // For demo purposes
      const token = 'mock-token';
      const isAdmin = email === 'kahosatoyoshi@gmail.com';
      const userData = { 
        id: '1', 
        email, 
        displayName,
        isAdmin
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email); // Save email for demo purposes
      setUser(userData);
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('アカウント作成に失敗しました');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
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
