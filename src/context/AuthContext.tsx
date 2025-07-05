import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'distributor' | 'wholesaler';
  company: string;
  pan?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    email: 'distributor@demo.com',
    role: 'distributor',
    company: 'Himalayan Distributors Pvt. Ltd.',
    pan: '301234567',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    name: 'Sita Patel',
    email: 'wholesaler@demo.com',
    role: 'wholesaler',
    company: 'Valley Wholesale Mart',
    pan: '401234567',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '3',
    name: 'Amit Thapa',
    email: 'distributor2@demo.com',
    role: 'distributor',
    company: 'Everest Supply Chain Ltd.',
    pan: '501234567',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '4',
    name: 'Priya Gurung',
    email: 'wholesaler2@demo.com',
    role: 'wholesaler',
    company: 'Mountain Trading Co.',
    pan: '601234567',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('orionNexusUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('orionNexusUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('orionNexusUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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