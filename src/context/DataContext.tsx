import React, { createContext, useContext, useState } from 'react';
import { Product, Order, OrderItem, WholesalerRequest, Notification, Company } from '../types';

interface DataContextType {
  products: Product[];
  orders: Order[];
  wholesalerRequests: WholesalerRequest[];
  notifications: Notification[];
  companies: Company[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addWholesalerRequest: (request: Omit<WholesalerRequest, 'id'>) => void;
  updateWholesalerRequest: (id: string, updates: Partial<WholesalerRequest>) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationAsRead: (id: string) => void;
  addCompany: (company: Omit<Company, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock companies data
const mockCompanies: Company[] = [
  {
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
  },
  {
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
];

// Mock products data with IRD compliance
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wai Wai Noodles - Chicken',
    sku: 'WW-CHK-001',
    barcode: '8850100129016',
    category: 'Food & Beverages',
    brand: 'Wai Wai',
    price: 25,
    stock: 500,
    minStock: 50,
    description: 'Instant noodles with chicken flavor',
    image: 'https://images.pexels.com/photos/4518654/pexels-photo-4518654.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    distributorId: '1',
    hsCode: '1902.30.00',
    vatRate: 13,
    manufacturerName: 'Thai President Foods Public Company Limited',
    manufacturerAddress: 'Bangkok, Thailand',
    importerName: 'Nepal Food Imports Pvt. Ltd.',
    importerPAN: '123456789',
    batchNumber: 'WW2025001',
    manufacturingDate: '2025-01-01',
    expiryDate: '2025-12-31',
    unitOfMeasure: 'pieces',
    netWeight: 60,
    grossWeight: 65
  },
  {
    id: '2',
    name: 'Coca Cola - 250ml',
    sku: 'CC-250-001',
    barcode: '5000112545029',
    category: 'Beverages',
    brand: 'Coca Cola',
    price: 35,
    stock: 200,
    minStock: 30,
    description: 'Refreshing cola drink',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    distributorId: '1',
    hsCode: '2202.10.00',
    vatRate: 13,
    manufacturerName: 'Coca Cola Nepal Pvt. Ltd.',
    manufacturerAddress: 'Kathmandu, Nepal',
    batchNumber: 'CC2025001',
    manufacturingDate: '2025-01-10',
    expiryDate: '2025-07-10',
    unitOfMeasure: 'bottles',
    netWeight: 250,
    grossWeight: 280
  },
  {
    id: '3',
    name: 'Sunsilk Shampoo - 200ml',
    sku: 'SS-200-001',
    barcode: '8901030875472',
    category: 'Personal Care',
    brand: 'Sunsilk',
    price: 180,
    stock: 150,
    minStock: 25,
    description: 'Hair care shampoo for silky hair',
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    distributorId: '1',
    hsCode: '3305.10.00',
    vatRate: 13,
    manufacturerName: 'Unilever Nepal Limited',
    manufacturerAddress: 'Hetauda, Nepal',
    batchNumber: 'SS2025001',
    manufacturingDate: '2024-12-15',
    expiryDate: '2026-12-15',
    unitOfMeasure: 'bottles',
    netWeight: 200,
    grossWeight: 220
  },
  {
    id: '4',
    name: 'Biscuits - Tiger',
    sku: 'TG-BIS-001',
    barcode: '8901030001234',
    category: 'Snacks',
    brand: 'Britannia',
    price: 15,
    stock: 800,
    minStock: 100,
    description: 'Crunchy glucose biscuits',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    distributorId: '1',
    hsCode: '1905.31.00',
    vatRate: 13,
    manufacturerName: 'Britannia Industries Nepal Pvt. Ltd.',
    manufacturerAddress: 'Birgunj, Nepal',
    batchNumber: 'TG2025001',
    manufacturingDate: '2025-01-05',
    expiryDate: '2025-07-05',
    unitOfMeasure: 'packets',
    netWeight: 100,
    grossWeight: 105
  },
  {
    id: '5',
    name: 'Daal - Moong',
    sku: 'DL-MNG-001',
    barcode: '8901030002345',
    category: 'Groceries',
    brand: 'Tata',
    price: 120,
    stock: 75,
    minStock: 20,
    description: 'Premium quality moong dal',
    image: 'https://images.pexels.com/photos/1393095/pexels-photo-1393095.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    distributorId: '1',
    hsCode: '0713.31.00',
    vatRate: 0,
    manufacturerName: 'Local Farmers Cooperative',
    manufacturerAddress: 'Chitwan, Nepal',
    batchNumber: 'DL2025001',
    manufacturingDate: '2024-11-01',
    expiryDate: '2025-11-01',
    unitOfMeasure: 'kg',
    netWeight: 1000,
    grossWeight: 1020
  },
  {
    id: '6',
    name: 'Cooking Oil - Fortune',
    sku: 'FT-OIL-001',
    barcode: '8901030003456',
    category: 'Groceries',
    brand: 'Fortune',
    price: 250,
    stock: 120,
    minStock: 15,
    description: 'Refined sunflower oil',
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    distributorId: '1',
    hsCode: '1512.11.00',
    vatRate: 5,
    manufacturerName: 'Adani Wilmar Limited',
    manufacturerAddress: 'Gujarat, India',
    importerName: 'Nepal Edible Oil Imports',
    importerPAN: '987654321',
    batchNumber: 'FT2025001',
    manufacturingDate: '2024-12-01',
    expiryDate: '2025-12-01',
    unitOfMeasure: 'liters',
    netWeight: 1000,
    grossWeight: 1050
  }
];

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    customerId: '2',
    customerName: 'Valley Wholesale Mart',
    products: [
      { productId: '1', productName: 'Wai Wai Noodles - Chicken', quantity: 100, price: 25, total: 2500, vatAmount: 325 },
      { productId: '2', productName: 'Coca Cola - 250ml', quantity: 50, price: 35, total: 1750, vatAmount: 227.5 }
    ],
    total: 4802.5,
    status: 'processing',
    date: '2025-01-15T10:30:00Z',
    invoiceNumber: 'INV-2025-001',
    vatAmount: 552.5,
    deliveryAddress: 'Thamel, Kathmandu',
    paymentTerms: 'Net 30 days',
    createdBy: '1'
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-002',
    customerId: '4',
    customerName: 'Mountain Trading Co.',
    products: [
      { productId: '3', productName: 'Sunsilk Shampoo - 200ml', quantity: 25, price: 180, total: 4500, vatAmount: 585 },
      { productId: '4', productName: 'Biscuits - Tiger', quantity: 200, price: 15, total: 3000, vatAmount: 390 }
    ],
    total: 8475,
    status: 'shipped',
    date: '2025-01-14T14:20:00Z',
    invoiceNumber: 'INV-2025-002',
    vatAmount: 975,
    deliveryAddress: 'Patan, Lalitpur',
    paymentTerms: 'Net 15 days',
    createdBy: '1'
  }
];

const mockWholesalerRequests: WholesalerRequest[] = [
  {
    id: '1',
    distributorId: '1',
    distributorName: 'Himalayan Distributors Pvt. Ltd.',
    wholesalerId: '2',
    wholesalerName: 'Valley Wholesale Mart',
    products: mockProducts,
    status: 'pending',
    requestDate: '2025-01-15T09:00:00Z',
    message: 'Request for product partnership'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'low_stock',
    title: 'Low Stock Alert',
    message: 'Daal - Moong stock is running low (75 units remaining)',
    timestamp: '2025-01-15T10:30:00Z',
    read: false,
    priority: 'high',
    product: 'Daal - Moong'
  },
  {
    id: '2',
    type: 'wholesaler_request',
    title: 'New Wholesaler Request',
    message: 'Valley Wholesale Mart has sent a partnership request',
    timestamp: '2025-01-15T09:00:00Z',
    read: false,
    priority: 'medium',
    wholesaler: 'Valley Wholesale Mart',
    requestId: '1'
  },
  {
    id: '3',
    type: 'order_placed',
    title: 'New Order Received',
    message: 'Mountain Trading Co. has placed order #ORD-2025-002',
    timestamp: '2025-01-14T14:20:00Z',
    read: true,
    priority: 'medium',
    wholesaler: 'Mountain Trading Co.',
    orderNumber: 'ORD-2025-002'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [wholesalerRequests, setWholesalerRequests] = useState<WholesalerRequest[]>(mockWholesalerRequests);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder = {
      ...order,
      id: Date.now().toString()
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addWholesalerRequest = (request: Omit<WholesalerRequest, 'id'>) => {
    const newRequest = {
      ...request,
      id: Date.now().toString()
    };
    setWholesalerRequests(prev => [...prev, newRequest]);
  };

  const updateWholesalerRequest = (id: string, updates: Partial<WholesalerRequest>) => {
    setWholesalerRequests(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addCompany = (company: Omit<Company, 'id'>) => {
    const newCompany = {
      ...company,
      id: Date.now().toString()
    };
    setCompanies(prev => [...prev, newCompany]);
  };

  return (
    <DataContext.Provider value={{
      products,
      orders,
      wholesalerRequests,
      notifications,
      companies,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
      addWholesalerRequest,
      updateWholesalerRequest,
      addNotification,
      markNotificationAsRead,
      addCompany
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};