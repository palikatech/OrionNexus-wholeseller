import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import DistributorHome from './DistributorHome';
import ProductsPage from './ProductsPage';
import InventoryPage from './InventoryPage';
import OrdersPage from './OrdersPage';
import WholesalersPage from './WholesalersPage';
import PaymentsPage from './PaymentsPage';
import ReportsPage from './ReportsPage';
import NotificationsPage from './NotificationsPage';

const DistributorDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<DistributorHome />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="wholesalers" element={<WholesalersPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DistributorDashboard;