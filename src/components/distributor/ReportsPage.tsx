import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { CalendarIcon, DocumentArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline';

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('7d');

  // Mock data for different report types
  const salesData = [
    { name: 'Mon', sales: 4000, orders: 24, revenue: 4000 },
    { name: 'Tue', sales: 3000, orders: 18, revenue: 3000 },
    { name: 'Wed', sales: 2000, orders: 15, revenue: 2000 },
    { name: 'Thu', sales: 2780, orders: 22, revenue: 2780 },
    { name: 'Fri', sales: 1890, orders: 16, revenue: 1890 },
    { name: 'Sat', sales: 2390, orders: 20, revenue: 2390 },
    { name: 'Sun', sales: 3490, orders: 28, revenue: 3490 }
  ];

  const inventoryData = [
    { category: 'Food & Beverages', inStock: 1250, lowStock: 45, value: 156000 },
    { category: 'Personal Care', inStock: 680, lowStock: 23, value: 98000 },
    { category: 'Groceries', inStock: 890, lowStock: 12, value: 134000 },
    { category: 'Snacks', inStock: 1420, lowStock: 67, value: 89000 },
    { category: 'Others', inStock: 340, lowStock: 8, value: 45000 }
  ];

  const customerData = [
    { name: 'Valley Wholesale Mart', orders: 45, revenue: 125000, growth: 15.3 },
    { name: 'Mountain Trading Co.', orders: 32, revenue: 87500, growth: 8.7 },
    { name: 'Sunrise Wholesale', orders: 18, revenue: 52000, growth: -2.1 },
    { name: 'Kathmandu Mart', orders: 24, revenue: 68000, growth: 12.4 },
    { name: 'Everest Traders', orders: 21, revenue: 59000, growth: 6.8 }
  ];

  const paymentData = [
    { method: 'Khalti', amount: 125000, percentage: 35, color: '#8B5CF6' },
    { method: 'eSewa', amount: 98000, percentage: 27, color: '#10B981' },
    { method: 'Bank Transfer', amount: 87000, percentage: 24, color: '#3B82F6' },
    { method: 'Cash', amount: 50000, percentage: 14, color: '#F59E0B' }
  ];

  const monthlyTrends = [
    { month: 'Jan', sales: 125000, purchases: 95000, profit: 30000 },
    { month: 'Feb', sales: 135000, purchases: 105000, profit: 30000 },
    { month: 'Mar', sales: 148000, purchases: 115000, profit: 33000 },
    { month: 'Apr', sales: 162000, purchases: 125000, profit: 37000 },
    { month: 'May', sales: 178000, purchases: 135000, profit: 43000 },
    { month: 'Jun', sales: 195000, purchases: 145000, profit: 50000 }
  ];

  const reportTypes = [
    { key: 'sales', label: 'Sales Report', icon: '📊' },
    { key: 'inventory', label: 'Inventory Report', icon: '📦' },
    { key: 'customers', label: 'Customer Report', icon: '👥' },
    { key: 'payments', label: 'Payment Report', icon: '💳' },
    { key: 'trends', label: 'Trend Analysis', icon: '📈' }
  ];

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-green-600">NPR 19,550</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">143</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Order</h3>
          <p className="text-3xl font-bold text-purple-600">NPR 1,367</p>
          <p className="text-sm text-gray-500 mt-1">Per order</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderInventoryReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Levels by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inStock" fill="#3B82F6" />
              <Bar dataKey="lowStock" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Value</h3>
          <div className="space-y-4">
            {inventoryData.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.category}</p>
                  <p className="text-sm text-gray-600">{item.inStock} items in stock</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">NPR {item.value.toLocaleString()}</p>
                  {item.lowStock > 0 && (
                    <p className="text-sm text-red-600">{item.lowStock} low stock items</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customers</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Orders</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Revenue</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Growth</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="py-3 text-sm text-gray-600">{customer.orders}</td>
                  <td className="py-3 text-sm font-bold text-green-600">NPR {customer.revenue.toLocaleString()}</td>
                  <td className="py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.growth > 0 ? '+' : ''}{customer.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPaymentReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `NPR ${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
          <div className="space-y-4">
            {paymentData.map((payment, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: payment.color }}></div>
                  <span className="font-medium text-gray-900">{payment.method}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">NPR {payment.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{payment.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrendAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="sales" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
            <Area type="monotone" dataKey="purchases" stackId="2" stroke="#EF4444" fill="#EF4444" />
            <Area type="monotone" dataKey="profit" stackId="3" stroke="#10B981" fill="#10B981" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Monthly Growth</h3>
          <p className="text-3xl font-bold text-green-600">+12.5%</p>
          <p className="text-sm text-gray-500 mt-1">Sales growth rate</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Profit Margin</h3>
          <p className="text-3xl font-bold text-purple-600">25.6%</p>
          <p className="text-sm text-gray-500 mt-1">Average margin</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Month</h3>
          <p className="text-3xl font-bold text-blue-600">June</p>
          <p className="text-sm text-gray-500 mt-1">Highest revenue</p>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'sales':
        return renderSalesReport();
      case 'inventory':
        return renderInventoryReport();
      case 'customers':
        return renderCustomerReport();
      case 'payments':
        return renderPaymentReport();
      case 'trends':
        return renderTrendAnalysis();
      default:
        return renderSalesReport();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <DocumentArrowDownIcon className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <PrinterIcon className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {reportTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setSelectedReport(type.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                selectedReport === type.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Date Range:</span>
            </div>
            <div className="flex space-x-2">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    dateRange === range
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range === '7d' ? 'Last 7 Days' : 
                   range === '30d' ? 'Last 30 Days' : 
                   range === '90d' ? 'Last 90 Days' : 
                   'Last Year'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  );
};

export default ReportsPage;