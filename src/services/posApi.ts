// POS System API Integration Service
export interface POSProduct {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  image: string;
  vatRate: number;
  wholesalerId: string;
  distributorId?: string;
}

export interface POSSale {
  id: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
  vatAmount: number;
  paymentMethod: string;
  customerName?: string;
  timestamp: string;
  wholesalerId: string;
}

export interface POSResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class POSApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // Configure these based on your POS system
    this.baseUrl = process.env.VITE_POS_API_URL || 'http://localhost:3001/api';
    this.apiKey = process.env.VITE_POS_API_KEY || 'your-pos-api-key';
  }

  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
    data?: any
  ): Promise<POSResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Key': this.apiKey,
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error('POS API Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Sync all products to POS system
  async syncProductsToPOS(products: POSProduct[]): Promise<POSResponse<any>> {
    return this.makeRequest('/products/sync', 'POST', { products });
  }

  // Sync individual product to POS
  async syncProductToPOS(product: POSProduct): Promise<POSResponse<any>> {
    return this.makeRequest(`/products/${product.id}/sync`, 'PUT', product);
  }

  // Get sales data from POS system
  async getSalesFromPOS(wholesalerId: string, fromDate?: string): Promise<POSResponse<POSSale[]>> {
    const params = new URLSearchParams({ wholesalerId });
    if (fromDate) params.append('fromDate', fromDate);
    
    return this.makeRequest(`/sales?${params.toString()}`);
  }

  // Get updated stock levels from POS
  async getStockUpdatesFromPOS(wholesalerId: string): Promise<POSResponse<{ productId: string; stock: number }[]>> {
    return this.makeRequest(`/stock/updates?wholesalerId=${wholesalerId}`);
  }

  // Acknowledge processed sales (mark as synced)
  async acknowledgeSales(saleIds: string[]): Promise<POSResponse<any>> {
    return this.makeRequest('/sales/acknowledge', 'POST', { saleIds });
  }

  // Real-time webhook endpoint for POS updates
  async setupWebhook(webhookUrl: string, events: string[]): Promise<POSResponse<any>> {
    return this.makeRequest('/webhooks/setup', 'POST', {
      url: webhookUrl,
      events, // ['sale_completed', 'stock_updated', 'product_added']
    });
  }

  // Test POS connection
  async testConnection(): Promise<POSResponse<{ status: string; timestamp: string }>> {
    return this.makeRequest('/health');
  }
}

export const posApiService = new POSApiService();

// Webhook handler for real-time POS updates
export const handlePOSWebhook = async (event: any, updateCallback: (data: any) => void) => {
  try {
    switch (event.type) {
      case 'sale_completed':
        // Handle completed sale from POS
        updateCallback({
          type: 'SALE_COMPLETED',
          sale: event.data,
        });
        break;
        
      case 'stock_updated':
        // Handle stock update from POS
        updateCallback({
          type: 'STOCK_UPDATED',
          updates: event.data,
        });
        break;
        
      case 'product_added':
        // Handle new product added in POS
        updateCallback({
          type: 'PRODUCT_ADDED',
          product: event.data,
        });
        break;
        
      default:
        console.log('Unknown POS webhook event:', event.type);
    }
  } catch (error) {
    console.error('Error handling POS webhook:', error);
  }
};