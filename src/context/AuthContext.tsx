import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, AuthCredentials } from '../types/user';
import authService from '../modules/auth/services/authService';

// Define context shape
interface AuthContextType {
  authState: AuthState;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        setAuthState({
          isAuthenticated: true,
          user,
          token,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setAuthState({
          ...initialState,
          loading: false,
        });
      }
    } else {
      setAuthState({
        ...initialState,
        loading: false,
      });
    }
  }, []);

  // Login function
  const login = async (credentials: AuthCredentials): Promise<boolean> => {
    try {
      setAuthState((prev: AuthState) => ({ ...prev, loading: true, error: null }));
      
      const { user, token } = await authService.login(credentials);
      
      // Store auth data in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        isAuthenticated: true,
        user,
        token,
        loading: false,
        error: null,
      });
      
      return true;
    } catch (error) {
      setAuthState((prev: AuthState) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to login',
      }));
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  };

  // Check authentication status
  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    
    try {
      const isValid = await authService.validateToken(token);
      return isValid;
    } catch {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};