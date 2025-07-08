export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  image: string;
  distributorId?: string;
  wholesalerPrice?: number;
  // IRD Required fields
  hsCode: string;
  vatRate: number;
  manufacturerName: string;
  manufacturerAddress: string;
  importerName?: string;
  importerPAN?: string;
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  unitOfMeasure: string;
  netWeight?: number;
  grossWeight?: number;
}

export interface Company {
  id: string;
  name: string;
  pan: string;
  vatNumber: string;
  address: string;
  phone: string;
  email: string;
  registrationNumber: string;
  establishmentDate: string;
  businessType: 'distributor' | 'wholesaler' | 'retailer';
  ownerName: string;
  ownerCitizenship: string;
  bankAccountNumber: string;
  bankName: string;
  licenseNumber?: string;
  licenseExpiryDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'distributor' | 'wholesaler';
  company: Company;
  avatar?: string;
  citizenshipNumber: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  products: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  invoiceNumber?: string;
  vatAmount: number;
  discountAmount?: number;
  deliveryAddress: string;
  paymentTerms: string;
  createdBy: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  vatAmount: number;
  discountAmount?: number;
}

export interface WholesalerRequest {
  id: string;
  distributorId: string;
  distributorName: string;
  wholesalerId: string;
  wholesalerName: string;
  products: Product[];
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  responseDate?: string;
  selectedProducts?: { productId: string; quantity: number }[];
  message?: string;
}

export interface Notification {
  id: string;
  type: 'low_stock' | 'order_placed' | 'payment_received' | 'order_shipped' | 'system' | 'wholesaler_request';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  wholesaler?: string;
  product?: string;
  orderNumber?: string;
  amount?: number;
  requestId?: string;
  distributorId?: string;
  wholesalerId?: string;
}