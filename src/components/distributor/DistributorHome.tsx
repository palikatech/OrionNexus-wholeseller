import React from 'react';
import { useData } from '../../context/DataContext';
import StatsCard from '../common/StatsCard';
import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon,
  TruckIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const DistributorHome: React.FC = () => {
  const { products, orders, notifications, wholesalerRequests } = useData();

  const lowStockProducts = products.filter(p => p.stock <= p.minStock);
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeWholesalers = wholesalerRequests.filter(r => r.status === 'approved').length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Enhanced chart data with more realistic business metrics
  const salesTrendData = [
    { month: 'Jan', revenue: 125000, orders: 45, profit: 25000, growth: 8.5 },
    { month: 'Feb', revenue: 142000, orders: 52, profit: 28400, growth: 13.6 },
    { month: 'Mar', revenue: 138000, orders: 48, profit: 27600, growth: 10.4 },
    { month: 'Apr', revenue: 165000, orders: 58, profit: 33000, growth: 19.5 },
    { month: 'May', revenue: 178000, orders: 62, profit: 35600, growth: 7.9 },
    { month: 'Jun', revenue: 195000, orders: 68, profit: 39000, growth: 9.6 },
    { month: 'Jul', revenue: 210000, orders: 75, profit: 42000, growth: 7.7 }
  ];

  const categoryPerformanceData = [
    { name: 'Food & Beverages', value: 35, revenue: 73500, color: '#3B82F6', trend: '+12%' },
    { name: 'Personal Care', value: 25, revenue: 52500, color: '#10B981', trend: '+8%' },
    { name: 'Groceries', value: 20, revenue: 42000, color: '#F59E0B', trend: '+15%' },
    { name: 'Snacks', value: 15, revenue: 31500, color: '#EF4444', trend: '+5%' },
    { name: 'Others', value: 5, revenue: 10500, color: '#8B5CF6', trend: '+3%' }
  ];

  const wholesalerPerformanceData = [
    { name: 'Valley Wholesale', orders: 28, revenue: 85000, growth: 15.2 },
    { name: 'Mountain Trading', orders: 22, revenue: 68000, growth: 12.8 },
    { name: 'Kathmandu Hub', orders: 18, revenue: 52000, growth: 8.5 },
    { name: 'Pokhara Center', orders: 15, revenue: 45000, growth: 22.1 }
  ];

  const topProducts = [
    { name: 'Wai Wai Noodles', sales: 1250, revenue: 31250, margin: '18%', trend: '+15%' },
    { name: 'Coca Cola', sales: 850, revenue: 29750, margin: '22%', trend: '+8%' },
    { name: 'Sunsilk Shampoo', sales: 425, revenue: 76500, margin: '35%', trend: '+25%' },
    { name: 'Tiger Biscuits', sales: 2100, revenue: 31500, margin: '15%', trend: '+12%' },
    { name: 'Moong Daal', sales: 320, revenue: 38400, margin: '28%', trend: '+18%' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Distributor!</h1>
        <p className="text-blue-100">Here's what's happening with your distribution network today.</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-blue-100 text-sm">Monthly Growth</p>
            <p className="text-2xl font-bold">+12.5%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-blue-100 text-sm">Active Routes</p>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-blue-100 text-sm">Delivery Rate</p>
            <p className="text-2xl font-bold">98.5%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-blue-100 text-sm">Customer Satisfaction</p>
            <p className="text-2xl font-bold">4.8/5</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Revenue"
          value={`NPR ${totalRevenue.toLocaleString()}`}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={{ value: '12.5%', isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Total Orders"
          value={orders.length}
          icon={<ShoppingBagIcon className="h-6 w-6" />}
          trend={{ value: '8.2%', isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Active Wholesalers"
          value={activeWholesalers}
          icon={<UserGroupIcon className="h-6 w-6" />}
          trend={{ value: '2.1%', isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockProducts.length}
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
          color="red"
        />
        <StatsCard
          title="Notifications"
          value={unreadNotifications}
          icon={<BellIcon className="h-6 w-6" />}
          color="yellow"
        />
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Profit Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesTrendData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `NPR ${value.toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryPerformanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryPerformanceData.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">NPR {category.revenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">{category.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Intelligence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} units • {product.margin} margin</p>
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

        {/* Wholesaler Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wholesaler Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={wholesalerPerformanceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => `NPR ${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Alert with Enhanced Details */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Critical Stock Alert</h3>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              {lowStockProducts.length} items need attention
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-red-200">
                  <th className="text-left py-2 text-sm font-medium text-red-700">Product Name</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Brand</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Current Stock</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Min Required</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Shortage</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Reorder Status</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Preferred Wholesaler</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product.id} className="border-b border-red-100">
                    <td className="py-3 text-sm font-medium text-red-900">{product.name}</td>
                    <td className="py-3 text-sm text-red-700">{product.brand}</td>
                    <td className="py-3 text-sm font-bold text-red-900">{product.stock}</td>
                    <td className="py-3 text-sm text-red-700">{product.minStock}</td>
                    <td className="py-3 text-sm font-bold text-red-800">{product.minStock - product.stock}</td>
                    <td className="py-3 text-sm">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Pending
                      </span>
                    </td>
                    <td className="py-3 text-sm text-red-700">Valley Wholesale Mart</td>
                    <td className="py-3 text-sm">
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                        Reorder Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Activity Feed */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingBagIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                  <p className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">NPR {order.total.toLocaleString()}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistributorHome;