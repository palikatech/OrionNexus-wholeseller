import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { CalendarIcon, DocumentArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline';

const WholesalerReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('7d');

  // Mock data for wholesaler reports
  const salesData = [
    { day: 'Mon', sales: 2400, profit: 480, customers: 8 },
    { day: 'Tue', sales: 1398, profit: 279, customers: 5 },
    { day: 'Wed', sales: 3800, profit: 760, customers: 12 },
    { day: 'Thu', sales: 3908, profit: 781, customers: 9 },
    { day: 'Fri', sales: 4800, profit: 960, customers: 15 },
    { day: 'Sat', sales: 3800, profit: 760, customers: 11 },
    { day: 'Sun', sales: 2400, profit: 480, customers: 7 }
  ];

  const productPerformance = [
    { name: 'Wai Wai Noodles', sold: 150, revenue: 3750, profit: 750 },
    { name: 'Coca Cola', sold: 120, revenue: 4200, profit: 840 },
    { name: 'Sunsilk Shampoo', sold: 45, revenue: 8100, profit: 1620 },
    { name: 'Tiger Biscuits', sold: 300, revenue: 4500, profit: 900 },
    { name: 'Cooking Oil', sold: 25, revenue: 6250, profit: 1250 }
  ];

  const customerSegments = [
    { name: 'Retail Customers', value: 45, color: '#3B82F6' },
    { name: 'Small Shops', value: 30, color: '#10B981' },
    { name: 'Grocery Stores', value: 15, color: '#F59E0B' },
    { name: 'Mini Marts', value: 10, color: '#EF4444' }
  ];

  const monthlyTrends = [
    { month: 'Jan', sales: 45000, purchases: 35000, profit: 10000 },
    { month: 'Feb', sales: 52000, purchases: 40000, profit: 12000 },
    { month: 'Mar', sales: 48000, purchases: 37000, profit: 11000 },
    { month: 'Apr', sales: 61000, purchases: 47000, profit: 14000 },
    { month: 'May', sales: 55000, purchases: 42000, profit: 13000 },
    { month: 'Jun', sales: 67000, purchases: 51000, profit: 16000 }
  ];

  const reportTypes = [
    { key: 'sales', label: 'Sales Report', icon: '💰' },
    { key: 'products', label: 'Product Performance', icon: '📦' },
    { key: 'customers', label: 'Customer Analysis', icon: '👥' },
    { key: 'profit', label: 'Profit Analysis', icon: '📈' },
    { key: 'inventory', label: 'Inventory Report', icon: '🏪' }
  ];

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Sales</h3>
          <p className="text-3xl font-bold text-green-600">NPR 22,506</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-blue-600">67</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Sale</h3>
          <p className="text-3xl font-bold text-purple-600">NPR 336</p>
          <p className="text-sm text-gray-500 mt-1">Per transaction</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderProductReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={productPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" />
            <Bar dataKey="profit" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
        <div className="space-y-4">
          {productPerformance.map((product, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sold} units sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">NPR {product.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Profit: NPR {product.profit.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCustomerReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Most Frequent Customers</h4>
              <p className="text-blue-700">Retail customers make up 45% of your sales</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Highest Value Segment</h4>
              <p className="text-green-700">Grocery stores have highest average order value</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900">Growth Opportunity</h4>
              <p className="text-yellow-700">Mini marts show 25% month-over-month growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfitReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Profit</h3>
          <p className="text-3xl font-bold text-green-600">NPR 16,000</p>
          <p className="text-sm text-green-600 mt-1">+23% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Profit Margin</h3>
          <p className="text-3xl font-bold text-blue-600">23.9%</p>
          <p className="text-sm text-gray-500 mt-1">Average margin</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Month</h3>
          <p className="text-3xl font-bold text-purple-600">June</p>
          <p className="text-sm text-gray-500 mt-1">Highest profit</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Profit Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="purchases" stroke="#EF4444" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderInventoryReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900">6</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Stock</h3>
          <p className="text-3xl font-bold text-blue-600">1,945</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Stock Value</h3>
          <p className="text-3xl font-bold text-green-600">NPR 522K</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Low Stock Items</h3>
          <p className="text-3xl font-bold text-red-600">2</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-900">Well Stocked Items</span>
            <span className="text-green-600 font-bold">4 products</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <span className="font-medium text-yellow-900">Low Stock Items</span>
            <span className="text-yellow-600 font-bold">2 products</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
            <span className="font-medium text-red-900">Out of Stock</span>
            <span className="text-red-600 font-bold">0 products</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'sales':
        return renderSalesReport();
      case 'products':
        return renderProductReport();
      case 'customers':
        return renderCustomerReport();
      case 'profit':
        return renderProfitReport();
      case 'inventory':
        return renderInventoryReport();
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

export default WholesalerReports;