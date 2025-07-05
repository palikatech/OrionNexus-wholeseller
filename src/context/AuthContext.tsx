import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Company } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo with IRD compliance
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    email: 'distributor@demo.com',
    role: 'distributor',
    citizenshipNumber: '12-34-56-78901',
    phoneNumber: '+977-9841234567',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    company: {
      id: '1',
      name: 'Himalayan Distributors Pvt. Ltd.',
      pan: '301234567',
      vatNumber: 'VAT-301234567',
      address: 'Kathmandu, Nepal',
      phone: '+977-1-4567890',
      email: 'info@himalayandist.com',
      registrationNumber: 'REG-2020-001',
      establishmentDate: '2020-01-15',
      businessType: 'distributor',
      ownerName: 'Rajesh Sharma',
      ownerCitizenship: '12-34-56-78901',
      bankAccountNumber: '1234567890',
      bankName: 'Nepal Bank Limited',
      licenseNumber: 'LIC-2020-001',
      licenseExpiryDate: '2025-01-15'
    }
  },
  {
    id: '2',
    name: 'Sita Patel',
    email: 'wholesaler@demo.com',
    role: 'wholesaler',
    citizenshipNumber: '12-34-56-78902',
    phoneNumber: '+977-9841234568',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    company: {
      id: '2',
      name: 'Valley Wholesale Mart',
      pan: '401234567',
      vatNumber: 'VAT-401234567',
      address: 'Thamel, Kathmandu',
      phone: '+977-1-4567891',
      email: 'info@valleywholesale.com',
      registrationNumber: 'REG-2021-002',
      establishmentDate: '2021-02-20',
      businessType: 'wholesaler',
      ownerName: 'Sita Patel',
      ownerCitizenship: '12-34-56-78902',
      bankAccountNumber: '2345678901',
      bankName: 'Rastriya Banijya Bank'
    }
  },
  {
    id: '3',
    name: 'Amit Thapa',
    email: 'distributor2@demo.com',
    role: 'distributor',
    citizenshipNumber: '12-34-56-78903',
    phoneNumber: '+977-9841234569',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    company: {
      id: '3',
      name: 'Everest Supply Chain Ltd.',
      pan: '501234567',
      vatNumber: 'VAT-501234567',
      address: 'Bhaktapur, Nepal',
      phone: '+977-1-4567892',
      email: 'info@everestsupply.com',
      registrationNumber: 'REG-2019-003',
      establishmentDate: '2019-03-10',
      businessType: 'distributor',
      ownerName: 'Amit Thapa',
      ownerCitizenship: '12-34-56-78903',
      bankAccountNumber: '3456789012',
      bankName: 'Nepal Investment Bank',
      licenseNumber: 'LIC-2019-003',
      licenseExpiryDate: '2024-03-10'
    }
  },
  {
    id: '4',
    name: 'Priya Gurung',
    email: 'wholesaler2@demo.com',
    role: 'wholesaler',
    citizenshipNumber: '12-34-56-78904',
    phoneNumber: '+977-9841234570',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    company: {
      id: '4',
      name: 'Mountain Trading Co.',
      pan: '601234567',
      vatNumber: 'VAT-601234567',
      address: 'Patan, Lalitpur',
      phone: '+977-1-4567893',
      email: 'info@mountaintrading.com',
      registrationNumber: 'REG-2022-004',
      establishmentDate: '2022-04-15',
      businessType: 'wholesaler',
      ownerName: 'Priya Gurung',
      ownerCitizenship: '12-34-56-78904',
      bankAccountNumber: '4567890123',
      bankName: 'Himalayan Bank Limited'
    }
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