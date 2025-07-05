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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DistributorHome: React.FC = () => {
  const { products, orders, notifications } = useData();

  const lowStockProducts = products.filter(p => p.stock <= p.minStock);
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeWholesalers = 4; // Mock data
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Mock chart data
  const salesData = [
    { name: 'Jan', sales: 4000, orders: 24 },
    { name: 'Feb', sales: 3000, orders: 18 },
    { name: 'Mar', sales: 2000, orders: 15 },
    { name: 'Apr', sales: 2780, orders: 22 },
    { name: 'May', sales: 1890, orders: 16 },
    { name: 'Jun', sales: 2390, orders: 20 },
    { name: 'Jul', sales: 3490, orders: 28 }
  ];

  const categoryData = [
    { name: 'Food & Beverages', value: 35, color: '#3B82F6' },
    { name: 'Personal Care', value: 25, color: '#10B981' },
    { name: 'Groceries', value: 20, color: '#F59E0B' },
    { name: 'Snacks', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' }
  ];

  const topProducts = [
    { name: 'Wai Wai Noodles', sales: 1250, revenue: 31250 },
    { name: 'Coca Cola', sales: 850, revenue: 29750 },
    { name: 'Sunsilk Shampoo', sales: 425, revenue: 76500 },
    { name: 'Tiger Biscuits', sales: 2100, revenue: 31500 },
    { name: 'Moong Daal', sales: 320, revenue: 38400 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Distributor!</h1>
        <p className="text-blue-100">Here's what's happening with your distribution network today.</p>
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

      {/* Notification Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.slice(0, 5).map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">NPR {product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">{order.customerName}</p>
                  <p className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
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

      {/* Low Stock Alert with Wholesaler Details */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Low Stock Alert</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-red-200">
                  <th className="text-left py-2 text-sm font-medium text-red-700">Product Name</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Company</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Remaining Qty</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Min Stock</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Order Taken</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Order Status</th>
                  <th className="text-left py-2 text-sm font-medium text-red-700">Wholesaler</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product.id} className="border-b border-red-100">
                    <td className="py-3 text-sm text-red-900">{product.name}</td>
                    <td className="py-3 text-sm text-red-700">{product.brand}</td>
                    <td className="py-3 text-sm font-medium text-red-900">{product.stock}</td>
                    <td className="py-3 text-sm text-red-700">{product.minStock}</td>
                    <td className="py-3 text-sm">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Pending
                      </span>
                    </td>
                    <td className="py-3 text-sm">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        Not Ordered
                      </span>
                    </td>
                    <td className="py-3 text-sm text-red-700">Valley Wholesale Mart</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DistributorHome;