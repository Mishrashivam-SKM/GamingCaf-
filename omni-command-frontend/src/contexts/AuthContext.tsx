import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'ADMIN' | 'OPERATOR';

interface AuthContextType {
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(null);

  // Initialize from local storage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('omni_auth_role') as UserRole | null;
    if (savedRole === 'ADMIN' || savedRole === 'OPERATOR') {
      setRole(savedRole);
    }
  }, []);

  const login = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('omni_auth_role', newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('omni_auth_role');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, isAuthenticated: !!role }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
