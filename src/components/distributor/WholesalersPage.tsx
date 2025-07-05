import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const WholesalersPage: React.FC = () => {
  const { companies, products, addWholesalerRequest, addNotification } = useData();
  const { user } = useAuth();
  const [selectedWholesaler, setSelectedWholesaler] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [requestMessage, setRequestMessage] = useState('');

  // Mock linked wholesalers data with products
  const linkedWholesalers = [
    {
      id: '2',
      name: 'Sita Patel',
      company: companies.find(c => c.id === '2') || companies[1],
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
        { 
          ...products[0], 
          stock: 150, 
          lastOrder: '2025-01-14',
          wholesalerPrice: 22,
          orderStatus: 'delivered'
        },
        { 
          ...products[1], 
          stock: 80, 
          lastOrder: '2025-01-13',
          wholesalerPrice: 32,
          orderStatus: 'pending'
        },
        { 
          ...products[2], 
          stock: 25, 
          lastOrder: '2025-01-12',
          wholesalerPrice: 165,
          orderStatus: 'shipped'
        }
      ]
    },
    {
      id: '4',
      name: 'Priya Gurung',
      company: companies.find(c => c.id === '4') || companies[1],
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
        { 
          ...products[3], 
          stock: 200, 
          lastOrder: '2025-01-15',
          wholesalerPrice: 13,
          orderStatus: 'delivered'
        },
        { 
          ...products[4], 
          stock: 45, 
          lastOrder: '2025-01-14',
          wholesalerPrice: 110,
          orderStatus: 'processing'
        },
        { 
          ...products[5], 
          stock: 30, 
          lastOrder: '2025-01-13',
          wholesalerPrice: 230,
          orderStatus: 'delivered'
        }
      ]
    }
  ];

  const availableWholesalers = companies.filter(c => 
    c.businessType === 'wholesaler' && 
    !linkedWholesalers.some(lw => lw.company.id === c.id)
  );

  const totalWholesalers = linkedWholesalers.length;
  const activeWholesalers = linkedWholesalers.filter(w => w.status === 'active').length;
  const totalRevenue = linkedWholesalers.reduce((sum, w) => sum + w.totalPurchases, 0);
  const avgOrderValue = totalRevenue / linkedWholesalers.reduce((sum, w) => sum + w.totalOrders, 0);

  const handleRequestWholesaler = (wholesaler: any) => {
    setSelectedWholesaler(wholesaler);
    setShowRequestModal(true);
  };

  const handleSendRequest = () => {
    if (!selectedWholesaler || !user) return;

    const request = {
      distributorId: user.id,
      distributorName: user.company.name,
      wholesalerId: selectedWholesaler.id,
      wholesalerName: selectedWholesaler.name,
      products: products, // Send all products
      status: 'pending' as const,
      requestDate: new Date().toISOString(),
      message: requestMessage
    };

    addWholesalerRequest(request);

    // Add notification for the wholesaler
    addNotification({
      type: 'wholesaler_request',
      title: 'New Partnership Request',
      message: `${user.company.name} has sent you a partnership request`,
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'medium',
      wholesaler: selectedWholesaler.name,
      requestId: Date.now().toString()
    });

    toast.success('Partnership request sent successfully!');
    setShowRequestModal(false);
    setSelectedWholesaler(null);
    setRequestMessage('');
  };

  const handleViewDetails = (wholesaler: any) => {
    setSelectedWholesaler(wholesaler);
    setShowDetailsModal(true);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Wholesalers</h1>
        <button 
          onClick={() => setShowRequestModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Request Wholesaler
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

      {/* Linked Wholesalers List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Linked Wholesalers</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {linkedWholesalers.map((wholesaler) => (
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
                    <p className="text-sm text-gray-600">{wholesaler.company.name}</p>
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
                      onClick={() => handleViewDetails(wholesaler)}
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

      {/* Request Wholesaler Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Request Wholesaler Partnership</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {!selectedWholesaler ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Wholesalers</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {availableWholesalers.map((wholesaler) => (
                    <div
                      key={wholesaler.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRequestWholesaler(wholesaler)}
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{wholesaler.name}</h4>
                        <p className="text-sm text-gray-600">{wholesaler.address}</p>
                        <p className="text-sm text-gray-500">PAN: {wholesaler.pan}</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Selected Wholesaler</h3>
                  <p className="text-lg font-medium">{selectedWholesaler.name}</p>
                  <p className="text-sm text-gray-600">{selectedWholesaler.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Products to be Shared ({products.length} products)</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      All your products will be shared with this wholesaler. They can then select which products they want to deal with and set initial quantities.
                    </p>
                  </div>
                  <div className="mt-4 max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {products.slice(0, 6).map((product) => (
                        <div key={product.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                          <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.sku}</p>
                          </div>
                        </div>
                      ))}
                      {products.length > 6 && (
                        <div className="flex items-center justify-center p-2 bg-gray-100 rounded">
                          <p className="text-sm text-gray-600">+{products.length - 6} more products</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a message to your partnership request..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedWholesaler(null)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wholesaler Details Modal */}
      {showDetailsModal && selectedWholesaler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Wholesaler Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Wholesaler Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Wholesaler Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={selectedWholesaler.avatar}
                      alt={selectedWholesaler.name}
                    />
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{selectedWholesaler.name}</h4>
                      <p className="text-lg text-gray-600">{selectedWholesaler.company.name}</p>
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
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Business Details</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">PAN Number:</span>
                        <span className="font-medium">{selectedWholesaler.company.pan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT Number:</span>
                        <span className="font-medium">{selectedWholesaler.company.vatNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registration:</span>
                        <span className="font-medium">{selectedWholesaler.company.registrationNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Join Date:</span>
                        <span className="font-medium">{new Date(selectedWholesaler.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

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
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wholesaler Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedWholesaler.products.map((product: any) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt={product.name} />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sku}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            NPR {product.wholesalerPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(product.lastOrder).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                              product.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              product.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {product.orderStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleViewProduct(product)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <EyeIcon className="h-4 w-4 inline mr-1" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Product Details</h2>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-lg text-gray-600">{selectedProduct.brand}</p>
                  <p className="text-sm text-gray-500">{selectedProduct.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">SKU</p>
                  <p className="text-gray-900">{selectedProduct.sku}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Barcode</p>
                  <p className="text-gray-900">{selectedProduct.barcode}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Stock</p>
                  <p className="text-gray-900">{selectedProduct.stock} units</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Wholesaler Price</p>
                  <p className="text-green-600 font-semibold">NPR {selectedProduct.wholesalerPrice}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Order Date</p>
                  <p className="text-gray-900">{new Date(selectedProduct.lastOrder).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Status</p>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedProduct.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                    selectedProduct.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    selectedProduct.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedProduct.orderStatus}
                  </span>
                </div>
              </div>

              {selectedProduct.description && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                  <p className="text-gray-900">{selectedProduct.description}</p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Additional Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">HS Code:</p>
                    <p className="text-gray-900">{selectedProduct.hsCode}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">VAT Rate:</p>
                    <p className="text-gray-900">{selectedProduct.vatRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Unit of Measure:</p>
                    <p className="text-gray-900">{selectedProduct.unitOfMeasure}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Manufacturer:</p>
                    <p className="text-gray-900">{selectedProduct.manufacturerName}</p>
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