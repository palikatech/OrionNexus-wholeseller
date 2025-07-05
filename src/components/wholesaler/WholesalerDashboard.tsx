import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import WholesalerHome from './WholesalerHome';
import WholesalerProducts from './WholesalerProducts';
import SalesPage from './SalesPage';
import PurchaseOrdersPage from './PurchaseOrdersPage';
import WholesalerInventory from './WholesalerInventory';
import InvoicesPage from './InvoicesPage';
import WholesalerPayments from './WholesalerPayments';
import WholesalerReports from './WholesalerReports';

const WholesalerDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<WholesalerHome />} />
            <Route path="products" element={<WholesalerProducts />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="purchase-orders" element={<PurchaseOrdersPage />} />
            <Route path="inventory" element={<WholesalerInventory />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="payments" element={<WholesalerPayments />} />
            <Route path="reports" element={<WholesalerReports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default WholesalerDashboard;