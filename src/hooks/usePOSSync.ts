import { useState, useEffect, useCallback } from 'react';
import { posApiService, POSProduct, POSSale } from '../services/posApi';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export const usePOSSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(
    localStorage.getItem('lastPOSSync')
  );
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  
  const { products, updateProduct, addNotification } = useData();
  const { user } = useAuth();

  // Test POS connection
  const testConnection = useCallback(async () => {
    setConnectionStatus('checking');
    const result = await posApiService.testConnection();
    setConnectionStatus(result.success ? 'connected' : 'disconnected');
    return result.success;
  }, []);

  // Sync all products to POS
  const syncProductsToPOS = useCallback(async () => {
    if (!user) return false;
    
    setIsSyncing(true);
    try {
      const posProducts: POSProduct[] = products.map(product => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        barcode: product.barcode,
        price: product.price,
        stock: product.stock,
        category: product.category,
        brand: product.brand,
        image: product.image,
        vatRate: product.vatRate,
        wholesalerId: user.id,
        distributorId: product.distributorId,
      }));

      const result = await posApiService.syncProductsToPOS(posProducts);
      
      if (result.success) {
        const now = new Date().toISOString();
        setLastSyncTime(now);
        localStorage.setItem('lastPOSSync', now);
        toast.success(`${posProducts.length} products synced to POS successfully!`);
        
        addNotification({
          type: 'system',
          title: 'POS Sync Completed',
          message: `${posProducts.length} products synced to POS system`,
          timestamp: now,
          read: false,
          priority: 'low'
        });
        
        return true;
      } else {
        toast.error(`POS sync failed: ${result.error}`);
        return false;
      }
    } catch (error) {
      toast.error('Failed to sync products to POS');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [products, user, addNotification]);

  // Sync individual product to POS
  const syncProductToPOS = useCallback(async (product: any) => {
    if (!user) return false;
    
    const posProduct: POSProduct = {
      id: product.id,
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      price: product.price,
      stock: product.stock,
      category: product.category,
      brand: product.brand,
      image: product.image,
      vatRate: product.vatRate,
      wholesalerId: user.id,
      distributorId: product.distributorId,
    };

    const result = await posApiService.syncProductToPOS(posProduct);
    
    if (result.success) {
      toast.success(`${product.name} synced to POS`);
      return true;
    } else {
      toast.error(`Failed to sync ${product.name}: ${result.error}`);
      return false;
    }
  }, [user]);

  // Get sales from POS and update inventory
  const syncSalesFromPOS = useCallback(async () => {
    if (!user) return;
    
    setIsSyncing(true);
    try {
      const result = await posApiService.getSalesFromPOS(user.id, lastSyncTime || undefined);
      
      if (result.success && result.data) {
        const sales = result.data;
        let totalSales = 0;
        let totalRevenue = 0;
        
        // Process each sale and update inventory
        for (const sale of sales) {
          totalSales++;
          totalRevenue += sale.total;
          
          // Update stock for each product in the sale
          for (const saleItem of sale.products) {
            const product = products.find(p => p.id === saleItem.productId);
            if (product) {
              const newStock = product.stock - saleItem.quantity;
              updateProduct(product.id, { stock: Math.max(0, newStock) });
              
              // Check for low stock
              if (newStock <= product.minStock) {
                addNotification({
                  type: 'low_stock',
                  title: 'Low Stock Alert from POS',
                  message: `${product.name} is running low after POS sale (${newStock} remaining)`,
                  timestamp: new Date().toISOString(),
                  read: false,
                  priority: 'high',
                  product: product.name
                });
              }
            }
          }
        }
        
        if (totalSales > 0) {
          toast.success(`Synced ${totalSales} sales from POS (NPR ${totalRevenue.toLocaleString()})`);
          
          addNotification({
            type: 'system',
            title: 'POS Sales Synced',
            message: `${totalSales} sales synced from POS system. Revenue: NPR ${totalRevenue.toLocaleString()}`,
            timestamp: new Date().toISOString(),
            read: false,
            priority: 'medium'
          });
          
          // Acknowledge processed sales
          const saleIds = sales.map(sale => sale.id);
          await posApiService.acknowledgeSales(saleIds);
        }
        
        const now = new Date().toISOString();
        setLastSyncTime(now);
        localStorage.setItem('lastPOSSync', now);
      }
    } catch (error) {
      toast.error('Failed to sync sales from POS');
    } finally {
      setIsSyncing(false);
    }
  }, [user, lastSyncTime, products, updateProduct, addNotification]);

  // Auto-sync every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === 'connected') {
        syncSalesFromPOS();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [connectionStatus, syncSalesFromPOS]);

  // Test connection on mount
  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    isSyncing,
    lastSyncTime,
    connectionStatus,
    testConnection,
    syncProductsToPOS,
    syncProductToPOS,
    syncSalesFromPOS,
  };
};