import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, PlusIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const PartnershipDetails: React.FC = () => {
  const { products, companies, addOrder, addNotification } = useData();
  const { user } = useAuth();
  const [selectedDistributor, setSelectedDistributor] = useState<any>(null);
  const [showDistributorModal, setShowDistributorModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<{ productId: string; quantity: number; price: number }[]>([]);

  // Get distributors that have products
  const distributorsWithProducts = companies
    .filter(c => c.businessType === 'distributor')
    .map(distributor => {
      const distributorProducts = products.filter(p => p.distributorId === distributor.id);
      return {
        ...distributor,
        productCount: distributorProducts.length,
        products: distributorProducts
      };
    })
    .filter(d => d.productCount > 0);

  const handleViewDistributor = (distributor: any) => {
    setSelectedDistributor(distributor);
    setShowDistributorModal(true);
  };

  const handleProductSelection = (productId: string, selected: boolean, quantity: number = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (selected) {
      setSelectedProducts(prev => [...prev, { productId, quantity, price: product.price }]);
    } else {
      setSelectedProducts(prev => prev.filter(p => p.productId !== productId));
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev => 
      prev.map(p => p.productId === productId ? { ...p, quantity } : p)
    );
  };

  const handleCreateOrder = () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product');
      return;
    }

    if (!selectedDistributor || !user) return;

    const orderProducts = selectedProducts.map(sp => {
      const product = products.find(p => p.id === sp.productId);
      const total = sp.quantity * sp.price;
      const vatAmount = total * (product?.vatRate || 0) / 100;
      
      return {
        productId: sp.productId,
        productName: product?.name || '',
        quantity: sp.quantity,
        price: sp.price,
        total,
        vatAmount
      };
    });

    const subtotal = orderProducts.reduce((sum, p) => sum + p.total, 0);
    const totalVat = orderProducts.reduce((sum, p) => sum + p.vatAmount, 0);
    const total = subtotal + totalVat;

    const newOrder = {
      orderNumber: `PO-${Date.now()}`,
      customerId: selectedDistributor.id,
      customerName: selectedDistributor.name,
      products: orderProducts,
      total,
      status: 'pending' as const,
      date: new Date().toISOString(),
      invoiceNumber: `PO-INV-${Date.now()}`,
      vatAmount: totalVat,
      deliveryAddress: user.company.address,
      paymentTerms: 'Net 30 days',
      createdBy: user.id
    };

    addOrder(newOrder);

    // Add notification for distributor
    addNotification({
      type: 'order_placed',
      title: 'New Purchase Order Received',
      message: `${user.company.name} has placed a purchase order #${newOrder.orderNumber}`,
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'medium',
      wholesaler: user.company.name,
      orderNumber: newOrder.orderNumber
    });

    toast.success('Purchase order created successfully!');
    setShowOrderModal(false);
    setSelectedProducts([]);
    setShowDistributorModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Partnership Details</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Partners</p>
              <p className="text-2xl font-bold text-gray-900">{distributorsWithProducts.length}</p>
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
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {distributorsWithProducts.reduce((sum, d) => sum + d.productCount, 0)}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <ShoppingCartIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Distributors Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Partner Distributors</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {distributorsWithProducts.map((distributor) => (
                <tr key={distributor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{distributor.name}</div>
                      <div className="text-sm text-gray-500">{distributor.address}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{distributor.phone}</div>
                    <div className="text-sm text-gray-500">{distributor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {distributor.productCount} products
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {distributor.pan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDistributor(distributor)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {distributorsWithProducts.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No partner distributors</h3>
          <p className="text-gray-500">No distributors with products found.</p>
        </div>
      )}

      {/* Distributor Details Modal */}
      {showDistributorModal && selectedDistributor && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setShowDistributorModal(false)}
        >
          <div className="bg-white rounded-lg max-w-6xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Distributor Details</h2>
              <button
                onClick={() => setShowDistributorModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Distributor Information */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Company Name</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedDistributor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-gray-900">{selectedDistributor.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact</p>
                    <p className="text-gray-900">{selectedDistributor.phone}</p>
                    <p className="text-gray-600">{selectedDistributor.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">PAN Number</p>
                    <p className="text-gray-900">{selectedDistributor.pan}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">VAT Number</p>
                    <p className="text-gray-900">{selectedDistributor.vatNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registration</p>
                    <p className="text-gray-900">{selectedDistributor.registrationNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Available Products ({selectedDistributor.products.length})</h3>
                <button
                  onClick={() => setShowOrderModal(true)}
                  disabled={selectedProducts.length === 0}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Create Order ({selectedProducts.length})</span>
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                selectedDistributor.products.forEach((product: any) => {
                                  if (!selectedProducts.find(p => p.productId === product.id)) {
                                    handleProductSelection(product.id, true, 1);
                                  }
                                });
                              } else {
                                setSelectedProducts([]);
                              }
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedDistributor.products.map((product: any) => {
                        const isSelected = selectedProducts.some(p => p.productId === product.id);
                        const selectedProduct = selectedProducts.find(p => p.productId === product.id);
                        
                        return (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => handleProductSelection(product.id, e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </td>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              NPR {product.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {isSelected && (
                                <input
                                  type="number"
                                  min="1"
                                  max={product.stock}
                                  value={selectedProduct?.quantity || 1}
                                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Order Modal */}
      {showOrderModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setShowOrderModal(false)}
        >
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create Purchase Order</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                <p className="text-gray-700">Distributor: {selectedDistributor?.name}</p>
                <p className="text-gray-700">Products: {selectedProducts.length} items</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Selected Products</h4>
                {selectedProducts.map((sp) => {
                  const product = products.find(p => p.id === sp.productId);
                  return (
                    <div key={sp.productId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{product?.name}</p>
                        <p className="text-sm text-gray-600">NPR {sp.price} × {sp.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        NPR {(sp.price * sp.quantity).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">
                    NPR {selectedProducts.reduce((sum, sp) => sum + (sp.price * sp.quantity), 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateOrder}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnershipDetails;