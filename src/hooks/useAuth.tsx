
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type User = {
  id: string;
  email: string;
  name?: string;
  role: 'seeker' | 'provider';
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: 'seeker' | 'provider', name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('skillscape_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock authentication functions - would connect to Supabase in production
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from authentication service
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email,
        name: email.split('@')[0],
        role: Math.random() > 0.5 ? 'provider' : 'seeker',
      };
      
      setUser(mockUser);
      localStorage.setItem('skillscape_user', JSON.stringify(mockUser));
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${mockUser.name}!`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, role: 'seeker' | 'provider', name: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const newUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email,
        name,
        role,
      };
      
      setUser(newUser);
      localStorage.setItem('skillscape_user', JSON.stringify(newUser));
      toast({
        title: "Account created successfully",
        description: "Welcome to SkillScape!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please try again with a different email.",
      });
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillscape_user');
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
