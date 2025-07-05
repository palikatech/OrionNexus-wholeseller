import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, CheckCircleIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const WholesalerRequests: React.FC = () => {
  const { wholesalerRequests, updateWholesalerRequest, addNotification } = useData();
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<{ productId: string; quantity: number }[]>([]);

  // Filter requests for current wholesaler
  const myRequests = wholesalerRequests.filter(req => req.wholesalerId === user?.id);

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setSelectedProducts([]);
    setShowRequestModal(true);
  };

  const handleProductSelection = (productId: string, selected: boolean, quantity: number = 10) => {
    if (selected) {
      setSelectedProducts(prev => [...prev, { productId, quantity }]);
    } else {
      setSelectedProducts(prev => prev.filter(p => p.productId !== productId));
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev => 
      prev.map(p => p.productId === productId ? { ...p, quantity } : p)
    );
  };

  const handleAcceptRequest = () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product');
      return;
    }

    updateWholesalerRequest(selectedRequest.id, {
      status: 'approved',
      responseDate: new Date().toISOString(),
      selectedProducts
    });

    // Add notification for distributor
    addNotification({
      type: 'wholesaler_request',
      title: 'Partnership Request Approved',
      message: `${user?.company.name} has approved your partnership request`,
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'medium',
      wholesaler: user?.company.name || '',
      requestId: selectedRequest.id
    });

    toast.success('Partnership request approved successfully!');
    setShowRequestModal(false);
    setSelectedRequest(null);
    setSelectedProducts([]);
  };

  const handleRejectRequest = () => {
    updateWholesalerRequest(selectedRequest.id, {
      status: 'rejected',
      responseDate: new Date().toISOString()
    });

    // Add notification for distributor
    addNotification({
      type: 'wholesaler_request',
      title: 'Partnership Request Rejected',
      message: `${user?.company.name} has rejected your partnership request`,
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'medium',
      wholesaler: user?.company.name || '',
      requestId: selectedRequest.id
    });

    toast.success('Partnership request rejected');
    setShowRequestModal(false);
    setSelectedRequest(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XMarkIcon className="h-5 w-5 text-red-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Partnership Requests</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{myRequests.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {myRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {myRequests.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {myRequests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <XMarkIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.distributorName}</div>
                    {request.message && (
                      <div className="text-sm text-gray-500">{request.message}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.products.length} products
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewRequest(request)}
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

      {myRequests.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No partnership requests</h3>
          <p className="text-gray-500">You haven't received any partnership requests yet.</p>
        </div>
      )}

      {/* Request Details Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Partnership Request Details</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Request Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Distributor</p>
                    <p className="text-gray-900">{selectedRequest.distributorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Request Date</p>
                    <p className="text-gray-900">{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                  {selectedRequest.responseDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Response Date</p>
                      <p className="text-gray-900">{new Date(selectedRequest.responseDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                {selectedRequest.message && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500">Message</p>
                    <p className="text-gray-900 bg-white p-3 rounded border">{selectedRequest.message}</p>
                  </div>
                )}
              </div>

              {/* Products Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Products ({selectedRequest.products.length} available)
                </h3>
                
                {selectedRequest.status === 'pending' && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-blue-800 text-sm">
                      Select the products you want to deal with and set initial quantities for your first order.
                    </p>
                  </div>
                )}

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedRequest.products.map((product: any) => {
                    const isSelected = selectedProducts.some(p => p.productId === product.id);
                    const selectedProduct = selectedProducts.find(p => p.productId === product.id);
                    
                    return (
                      <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          {selectedRequest.status === 'pending' && (
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => handleProductSelection(product.id, e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          )}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.brand} - {product.sku}</p>
                            <p className="text-sm text-gray-500">Available: {product.stock} units</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          {selectedRequest.status === 'pending' && isSelected && (
                            <div className="flex items-center space-x-2">
                              <label className="text-sm font-medium text-gray-700">Initial Qty:</label>
                              <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={selectedProduct?.quantity || 10}
                                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          )}
                          
                          {selectedRequest.status === 'approved' && selectedRequest.selectedProducts?.some(sp => sp.productId === product.id) && (
                            <div className="text-right">
                              <p className="text-sm font-medium text-green-600">Selected</p>
                              <p className="text-sm text-gray-600">
                                Qty: {selectedRequest.selectedProducts.find(sp => sp.productId === product.id)?.quantity}
                              </p>
                            </div>
                          )}
                          
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">NPR {product.price}</p>
                            <p className="text-xs text-gray-500">per unit</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedRequest.status === 'pending' && (
                <div className="flex space-x-4 pt-4 border-t">
                  <button
                    onClick={handleRejectRequest}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject Request
                  </button>
                  <button
                    onClick={handleAcceptRequest}
                    disabled={selectedProducts.length === 0}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Accept Request ({selectedProducts.length} products selected)
                  </button>
                </div>
              )}

              {selectedRequest.status === 'approved' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Partnership approved! You selected {selectedRequest.selectedProducts?.length || 0} products.
                  </p>
                </div>
              )}

              {selectedRequest.status === 'rejected' && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 font-medium">
                    Partnership request was rejected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesalerRequests;