import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  user_id: number;
  name: string;
  email: string;
  role: 'user';
}

interface Admin {
  admin_id: number;
  username: string;
  role: 'admin';
}

type AuthUser = User | Admin | null;

interface AuthContextType {
  currentUser: AuthUser;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (username: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  async function login(email: string, password: string) {
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate a successful login
    const mockUser: User = {
      user_id: 1,
      name: 'Test User',
      email: email,
      role: 'user',
    };

    setCurrentUser(mockUser);
  }

  async function adminLogin(username: string, password: string) {
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate a successful login
    const mockAdmin: Admin = {
      admin_id: 1,
      username: username,
      role: 'admin',
    };

    setCurrentUser(mockAdmin);
  }

  async function register(name: string, email: string, phone: string, password: string) {
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate a successful registration
    const mockUser: User = {
      user_id: 1,
      name: name,
      email: email,
      role: 'user',
    };

    setCurrentUser(mockUser);
  }

  function logout() {
    setCurrentUser(null);
  }

  function isAdmin() {
    return currentUser?.role === 'admin';
  }

  const value = {
    currentUser,
    login,
    adminLogin,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}