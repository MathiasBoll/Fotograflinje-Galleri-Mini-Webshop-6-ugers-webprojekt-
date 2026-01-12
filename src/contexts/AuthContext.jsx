import { createContext, useContext, useState } from 'react';
import { getUserAuth, saveUserAuth, clearUserAuth } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUserAuth());

  const login = (email, password) => {
    // Simple authentication - in production, this would call an API
    if (email && password) {
      const isAdmin = email.includes('admin');
      const userData = {
        email,
        isAdmin,
        name: email.split('@')[0],
      };
      setUser(userData);
      saveUserAuth(userData);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    clearUserAuth();
  };

  const value = {
    user,
    login,
    logout,
    loading: false,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


