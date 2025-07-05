import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, CheckCircleIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { Order, OrderItem } from '../../types';

const OrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, addOrder, products, companies } = useData();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  // Create Order Form State
  const [createOrderForm, setCreateOrderForm] = useState({
    customerId: '',
    customerName: '',
    deliveryAddress: '',
    paymentTerms: 'Net 30 days',
    products: [] as { productId: string; quantity: number; price: number }[]
  });

  const filteredOrders = orders.filter(order => 
    !filterStatus || order.status === filterStatus
  );

  const wholesalers = companies.filter(c => c.businessType === 'wholesaler');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    toast.success(`Order status updated to ${newStatus}`);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (createOrderForm.products.length === 0) {
      toast.error('Please add at least one product');
      return;
    }

    const orderProducts: OrderItem[] = createOrderForm.products.map(p => {
      const product = products.find(prod => prod.id === p.productId);
      const total = p.quantity * p.price;
      const vatAmount = total * (product?.vatRate || 0) / 100;
      
      return {
        productId: p.productId,
        productName: product?.name || '',
        quantity: p.quantity,
        price: p.price,
        total,
        vatAmount
      };
    });

    const subtotal = orderProducts.reduce((sum, p) => sum + p.total, 0);
    const totalVat = orderProducts.reduce((sum, p) => sum + p.vatAmount, 0);
    const total = subtotal + totalVat;

    const newOrder: Omit<Order, 'id'> = {
      orderNumber: `ORD-${Date.now()}`,
      customerId: createOrderForm.customerId,
      customerName: createOrderForm.customerName,
      products: orderProducts,
      total,
      status: 'pending',
      date: new Date().toISOString(),
      invoiceNumber: `INV-${Date.now()}`,
      vatAmount: totalVat,
      deliveryAddress: createOrderForm.deliveryAddress,
      paymentTerms: createOrderForm.paymentTerms,
      createdBy: user?.id || ''
    };

    addOrder(newOrder);
    toast.success('Order created successfully!');
    setShowCreateModal(false);
    resetCreateForm();
  };

  const resetCreateForm = () => {
    setCreateOrderForm({
      customerId: '',
      customerName: '',
      deliveryAddress: '',
      paymentTerms: 'Net 30 days',
      products: []
    });
  };

  const addProductToOrder = () => {
    setCreateOrderForm(prev => ({
      ...prev,
      products: [...prev.products, { productId: '', quantity: 1, price: 0 }]
    }));
  };

  const updateOrderProduct = (index: number, field: string, value: any) => {
    setCreateOrderForm(prev => ({
      ...prev,
      products: prev.products.map((p, i) => 
        i === index ? { ...p, [field]: value } : p
      )
    }));
  };

  const removeOrderProduct = (index: number) => {
    setCreateOrderForm(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create Order</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Export Orders
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
            <p className="text-sm text-gray-600">Processing</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
            <p className="text-sm text-gray-600">Shipped</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
            <p className="text-sm text-gray-600">Delivered</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Filter
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                    <div className="text-sm text-gray-500">{order.invoiceNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.products.length} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    NPR {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-4 w-4 inline mr-1" />
                      View
                    </button>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'processing')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircleIcon className="h-4 w-4 inline mr-1" />
                        Process
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'shipped')}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Ship
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'delivered')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Deliver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create New Order</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wholesaler *</label>
                  <select
                    required
                    value={createOrderForm.customerId}
                    onChange={(e) => {
                      const selectedWholesaler = wholesalers.find(w => w.id === e.target.value);
                      setCreateOrderForm(prev => ({
                        ...prev,
                        customerId: e.target.value,
                        customerName: selectedWholesaler?.name || ''
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Wholesaler</option>
                    {wholesalers.map(wholesaler => (
                      <option key={wholesaler.id} value={wholesaler.id}>
                        {wholesaler.name} - {wholesaler.pan}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms *</label>
                  <select
                    required
                    value={createOrderForm.paymentTerms}
                    onChange={(e) => setCreateOrderForm(prev => ({ ...prev, paymentTerms: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Net 15 days">Net 15 days</option>
                    <option value="Net 30 days">Net 30 days</option>
                    <option value="Net 45 days">Net 45 days</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                <textarea
                  required
                  value={createOrderForm.deliveryAddress}
                  onChange={(e) => setCreateOrderForm(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Products</h3>
                  <button
                    type="button"
                    onClick={addProductToOrder}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Add Product
                  </button>
                </div>

                <div className="space-y-3">
                  {createOrderForm.products.map((orderProduct, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="md:col-span-2">
                        <select
                          required
                          value={orderProduct.productId}
                          onChange={(e) => {
                            const product = products.find(p => p.id === e.target.value);
                            updateOrderProduct(index, 'productId', e.target.value);
                            updateOrderProduct(index, 'price', product?.price || 0);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Product</option>
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - {product.sku}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="number"
                          required
                          min="1"
                          placeholder="Quantity"
                          value={orderProduct.quantity}
                          onChange={(e) => updateOrderProduct(index, 'quantity', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          placeholder="Price"
                          value={orderProduct.price}
                          onChange={(e) => updateOrderProduct(index, 'price', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          NPR {(orderProduct.quantity * orderProduct.price).toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeOrderProduct(index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetCreateForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Number</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Invoice Number</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedOrder.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Products</h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">NPR {item.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total: NPR {item.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-xl font-bold text-green-600">
                    NPR {selectedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Status Update */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Update Status</h3>
                <div className="flex space-x-2">
                  {['pending', 'processing', 'shipped', 'delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedOrder.status === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;