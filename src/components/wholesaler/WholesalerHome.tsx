import React from 'react';
import { useData } from '../../context/DataContext';
import StatsCard from '../common/StatsCard';
import POSIntegration from './POSIntegration';
import { 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  DocumentTextIcon, 
  CreditCardIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const WholesalerHome: React.FC = () => {
  const { products, orders, wholesalerRequests } = useData();

  const todaySales = 8750;
  const monthlyRevenue = 185000;
  const totalInvoices = 24;
  const pendingPayments = 15000;
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const pendingRequests = wholesalerRequests.filter(r => r.status === 'pending').length;

  // Enhanced chart data for wholesaler business
  const salesPerformanceData = [
    { day: 'Mon', sales: 2400, customers: 8, profit: 480, margin: 20 },
    { day: 'Tue', sales: 1398, customers: 5, profit: 279, margin: 20 },
    { day: 'Wed', sales: 3800, customers: 12, profit: 760, margin: 20 },
    { day: 'Thu', sales: 3908, customers: 9, profit: 781, margin: 20 },
    { day: 'Fri', sales: 4800, customers: 15, profit: 960, margin: 20 },
    { day: 'Sat', sales: 3800, customers: 11, profit: 760, margin: 20 },
    { day: 'Sun', sales: 2400, customers: 7, profit: 480, margin: 20 }
  ];

  const customerSegmentData = [
    { name: 'Retail Customers', value: 45, revenue: 83250, color: '#3B82F6', growth: '+12%' },
    { name: 'Small Shops', value: 30, revenue: 55500, color: '#10B981', growth: '+8%' },
    { name: 'Grocery Stores', value: 15, revenue: 27750, color: '#F59E0B', growth: '+15%' },
    { name: 'Mini Marts', value: 10, revenue: 18500, color: '#EF4444', growth: '+5%' }
  ];

  const topProducts = [
    { name: 'Wai Wai Noodles', sold: 150, revenue: 3750, margin: '18%', trend: '+15%', stock: 500 },
    { name: 'Coca Cola', sold: 120, revenue: 4200, margin: '22%', trend: '+8%', stock: 200 },
    { name: 'Sunsilk Shampoo', sold: 45, revenue: 8100, margin: '35%', trend: '+25%', stock: 150 },
    { name: 'Tiger Biscuits', sold: 300, revenue: 4500, margin: '15%', trend: '+12%', stock: 800 },
    { name: 'Cooking Oil', sold: 25, revenue: 6250, margin: '28%', trend: '+18%', stock: 120 }
  ];

  const recentInvoices = [
    { id: 'INV-2025-024', customer: 'Retail Customer', amount: 850, date: '2025-01-15', status: 'paid', paymentMethod: 'khalti' },
    { id: 'INV-2025-023', customer: 'Grocery Store', amount: 1200, date: '2025-01-15', status: 'pending', paymentMethod: 'bank_transfer' },
    { id: 'INV-2025-022', customer: 'Mini Mart', amount: 650, date: '2025-01-14', status: 'paid', paymentMethod: 'cash' },
    { id: 'INV-2025-021', customer: 'Local Shop', amount: 950, date: '2025-01-14', status: 'overdue', paymentMethod: 'esewa' }
  ];

  const monthlyTrends = [
    { month: 'Jan', sales: 125000, purchases: 95000, profit: 30000, customers: 180 },
    { month: 'Feb', sales: 135000, purchases: 105000, profit: 30000, customers: 195 },
    { month: 'Mar', sales: 148000, purchases: 115000, profit: 33000, customers: 210 },
    { month: 'Apr', sales: 162000, purchases: 125000, profit: 37000, customers: 225 },
    { month: 'May', sales: 178000, purchases: 135000, profit: 43000, customers: 240 },
    { month: 'Jun', sales: 195000, purchases: 145000, profit: 50000, customers: 255 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Wholesaler!</h1>
        <p className="text-blue-100">Here's your business overview for today.</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-blue-100 text-sm">Daily Target</p>
            <p className="text-2xl font-bold">85%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-blue-100 text-sm">Customer Retention</p>
            <p className="text-2xl font-bold">94%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-blue-100 text-sm">Avg Order Value</p>
            <p className="text-2xl font-bold">NPR 1,250</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-blue-100 text-sm">Profit Margin</p>
            <p className="text-2xl font-bold">22.5%</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatsCard
          title="Today's Sales"
          value={`NPR ${todaySales.toLocaleString()}`}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={{ value: '15.3%', isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`NPR ${monthlyRevenue.toLocaleString()}`}
          icon={<ArrowTrendingUpIcon className="h-6 w-6" />}
          trend={{ value: '8.7%', isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Total Invoices"
          value={totalInvoices}
          icon={<DocumentTextIcon className="h-6 w-6" />}
          color="purple"
        />
        <StatsCard
          title="Pending Payments"
          value={`NPR ${pendingPayments.toLocaleString()}`}
          icon={<CreditCardIcon className="h-6 w-6" />}
          color="yellow"
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockCount}
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
          color="red"
        />
        <StatsCard
          title="Partnership Requests"
          value={pendingRequests}
          icon={<UserGroupIcon className="h-6 w-6" />}
          color="indigo"
        />
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Profit Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Sales & Profit</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesPerformanceData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => `NPR ${value.toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSales)" />
              <Area type="monotone" dataKey="profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={customerSegmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {customerSegmentData.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                    <span className="text-sm font-medium text-gray-900">{segment.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">NPR {segment.revenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">{segment.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sold} sold • {product.margin} margin • {product.stock} in stock</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">NPR {product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
          <div className="space-y-3">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{invoice.id}</p>
                    <p className="text-sm text-gray-600">{invoice.customer}</p>
                    <p className="text-xs text-gray-400">{new Date(invoice.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">NPR {invoice.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Business Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Business Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `NPR ${value.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} />
            <Line type="monotone" dataKey="purchases" stroke="#EF4444" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 text-center transition-colors">
            <ShoppingCartIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-900">New Sale</p>
          </button>
          <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 text-center transition-colors">
            <DocumentTextIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900">Create Invoice</p>
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg border border-purple-200 text-center transition-colors">
            <CreditCardIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-purple-900">Record Payment</p>
          </button>
          <button className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg border border-yellow-200 text-center transition-colors">
            <ArrowTrendingUpIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-yellow-900">View Reports</p>
          </button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Low Stock Alert</h3>
          </div>
          <p className="text-red-700 mb-4">
            You have {lowStockCount} items running low on stock. Consider placing orders with your distributors.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            View Low Stock Items
          </button>
        </div>
      )}

      {/* POS Integration Section */}
      <POSIntegration />
    </div>
  );
};

export default WholesalerHome;