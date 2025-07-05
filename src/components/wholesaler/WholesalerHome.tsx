import React from 'react';
import { useData } from '../../context/DataContext';
import StatsCard from '../common/StatsCard';
import { 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  DocumentTextIcon, 
  CreditCardIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const WholesalerHome: React.FC = () => {
  const { products, orders } = useData();

  const todaySales = 8750;
  const monthlyRevenue = 185000;
  const totalInvoices = 24;
  const pendingPayments = 15000;
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

  // Mock data for charts
  const salesData = [
    { day: 'Mon', sales: 2400, invoices: 8 },
    { day: 'Tue', sales: 1398, invoices: 5 },
    { day: 'Wed', sales: 3800, invoices: 12 },
    { day: 'Thu', sales: 3908, invoices: 9 },
    { day: 'Fri', sales: 4800, invoices: 15 },
    { day: 'Sat', sales: 3800, invoices: 11 },
    { day: 'Sun', sales: 2400, invoices: 7 }
  ];

  const topProducts = [
    { name: 'Wai Wai Noodles', sold: 150, revenue: 3750 },
    { name: 'Coca Cola', sold: 120, revenue: 4200 },
    { name: 'Sunsilk Shampoo', sold: 45, revenue: 8100 },
    { name: 'Tiger Biscuits', sold: 300, revenue: 4500 },
    { name: 'Cooking Oil', sold: 25, revenue: 6250 }
  ];

  const recentInvoices = [
    { id: 'INV-2025-024', customer: 'Retail Customer', amount: 850, date: '2025-01-15', status: 'paid' },
    { id: 'INV-2025-023', customer: 'Grocery Store', amount: 1200, date: '2025-01-15', status: 'pending' },
    { id: 'INV-2025-022', customer: 'Mini Mart', amount: 650, date: '2025-01-14', status: 'paid' },
    { id: 'INV-2025-021', customer: 'Local Shop', amount: 950, date: '2025-01-14', status: 'overdue' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Wholesaler!</h1>
        <p className="text-blue-100">Here's your business overview for today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
          <div className="space-y-3">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.customer}</p>
                  <p className="text-xs text-gray-400">{new Date(invoice.date).toLocaleDateString()}</p>
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

        {/* Product Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} units sold</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">NPR {product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
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
    </div>
  );
};

export default WholesalerHome;