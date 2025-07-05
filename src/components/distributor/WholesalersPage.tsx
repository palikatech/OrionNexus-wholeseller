import React, { useState } from 'react';
import { EyeIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const WholesalersPage: React.FC = () => {
  const [selectedWholesaler, setSelectedWholesaler] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock wholesaler data
  const wholesalers = [
    {
      id: '2',
      name: 'Sita Patel',
      company: 'Valley Wholesale Mart',
      email: 'sita@valleywholesale.com',
      phone: '+977-1-4567890',
      address: 'Thamel, Kathmandu',
      pan: '401234567',
      joinDate: '2024-01-15',
      totalOrders: 45,
      totalPurchases: 125000,
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      products: [
        { id: '1', name: 'Wai Wai Noodles - Chicken', stock: 150, lastOrder: '2025-01-14' },
        { id: '2', name: 'Coca Cola - 250ml', stock: 80, lastOrder: '2025-01-13' },
        { id: '3', name: 'Sunsilk Shampoo - 200ml', stock: 25, lastOrder: '2025-01-12' }
      ]
    },
    {
      id: '4',
      name: 'Priya Gurung',
      company: 'Mountain Trading Co.',
      email: 'priya@mountaintrading.com',
      phone: '+977-1-9876543',
      address: 'Patan, Lalitpur',
      pan: '601234567',
      joinDate: '2024-02-20',
      totalOrders: 32,
      totalPurchases: 87500,
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      products: [
        { id: '4', name: 'Biscuits - Tiger', stock: 200, lastOrder: '2025-01-15' },
        { id: '5', name: 'Daal - Moong', stock: 45, lastOrder: '2025-01-14' },
        { id: '6', name: 'Cooking Oil - Fortune', stock: 30, lastOrder: '2025-01-13' }
      ]
    },
    {
      id: '5',
      name: 'Ram Thapa',
      company: 'Sunrise Wholesale',
      email: 'ram@sunrisewholesale.com',
      phone: '+977-1-5551234',
      address: 'Bhaktapur',
      pan: '701234567',
      joinDate: '2024-03-10',
      totalOrders: 18,
      totalPurchases: 52000,
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      products: [
        { id: '1', name: 'Wai Wai Noodles - Chicken', stock: 75, lastOrder: '2025-01-10' },
        { id: '3', name: 'Sunsilk Shampoo - 200ml', stock: 12, lastOrder: '2025-01-09' }
      ]
    }
  ];

  const totalWholesalers = wholesalers.length;
  const activeWholesalers = wholesalers.filter(w => w.status === 'active').length;
  const totalRevenue = wholesalers.reduce((sum, w) => sum + w.totalPurchases, 0);
  const avgOrderValue = totalRevenue / wholesalers.reduce((sum, w) => sum + w.totalOrders, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Wholesalers</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Wholesaler
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Wholesalers</p>
              <p className="text-2xl font-bold text-gray-900">{totalWholesalers}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Wholesalers</p>
              <p className="text-2xl font-bold text-green-600">{activeWholesalers}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">NPR {totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">NPR {Math.round(avgOrderValue).toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Wholesalers List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Wholesaler Directory</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {wholesalers.map((wholesaler) => (
            <div key={wholesaler.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={wholesaler.avatar}
                    alt={wholesaler.name}
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{wholesaler.name}</h4>
                    <p className="text-sm text-gray-600">{wholesaler.company}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{wholesaler.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{wholesaler.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{wholesaler.totalOrders}</p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        NPR {wholesaler.totalPurchases.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Total Purchases</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{wholesaler.products.length}</p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedWholesaler(wholesaler);
                        setShowDetailsModal(true);
                      }}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-1"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wholesaler Details Modal */}
      {showDetailsModal && selectedWholesaler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Wholesaler Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-20 w-20 rounded-full object-cover"
                    src={selectedWholesaler.avatar}
                    alt={selectedWholesaler.name}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedWholesaler.name}</h3>
                    <p className="text-lg text-gray-600">{selectedWholesaler.company}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {selectedWholesaler.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{selectedWholesaler.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{selectedWholesaler.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{selectedWholesaler.address}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">PAN Number:</span>
                      <span className="font-medium">{selectedWholesaler.pan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Join Date:</span>
                      <span className="font-medium">{new Date(selectedWholesaler.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats and Products */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedWholesaler.totalOrders}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">
                      NPR {selectedWholesaler.totalPurchases.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Purchases</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Current Stock</h4>
                  <div className="space-y-3">
                    {selectedWholesaler.products.map((product: any) => (
                      <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">Last ordered: {new Date(product.lastOrder).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{product.stock} units</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            product.stock <= 30 ? 'bg-red-100 text-red-800' : 
                            product.stock <= 50 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {product.stock <= 30 ? 'Low' : product.stock <= 50 ? 'Medium' : 'Good'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesalersPage;