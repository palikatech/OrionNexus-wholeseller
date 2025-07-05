import React, { useState } from 'react';
import { CheckCircleIcon, ClockIcon, XCircleIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const WholesalerPayments: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMethod, setFilterMethod] = useState('');

  // Mock payment data for wholesaler
  const payments = [
    {
      id: '1',
      invoiceNumber: 'INV-2025-024',
      customer: 'Retail Customer',
      amount: 875.75,
      method: 'khalti',
      status: 'completed',
      date: '2025-01-15T10:30:00Z',
      transactionId: 'KHL-WS-123456',
      description: 'Payment for retail sale'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-023',
      customer: 'Grocery Store',
      amount: 1356,
      method: 'bank_transfer',
      status: 'pending',
      date: '2025-01-15T09:15:00Z',
      transactionId: 'BT-WS-789012',
      description: 'Bulk order payment'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-022',
      customer: 'Mini Mart',
      amount: 847.5,
      method: 'cash',
      status: 'completed',
      date: '2025-01-14T16:45:00Z',
      transactionId: 'CSH-WS-345678',
      description: 'Cash payment received'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2025-021',
      customer: 'Local Shop',
      amount: 1084.8,
      method: 'esewa',
      status: 'failed',
      date: '2025-01-14T14:20:00Z',
      transactionId: 'ESW-WS-901234',
      description: 'Payment failed - insufficient balance'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2025-020',
      customer: 'Corner Store',
      amount: 650,
      method: 'khalti',
      status: 'completed',
      date: '2025-01-13T11:30:00Z',
      transactionId: 'KHL-WS-567890',
      description: 'Regular customer payment'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = !filterStatus || payment.status === filterStatus;
    const matchesMethod = !filterMethod || payment.method === filterMethod;
    return matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'khalti':
        return <CreditCardIcon className="h-5 w-5 text-purple-600" />;
      case 'esewa':
        return <CreditCardIcon className="h-5 w-5 text-green-600" />;
      case 'bank_transfer':
        return <BanknotesIcon className="h-5 w-5 text-blue-600" />;
      case 'cash':
        return <BanknotesIcon className="h-5 w-5 text-gray-600" />;
      default:
        return <CreditCardIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case 'khalti':
        return 'Khalti';
      case 'esewa':
        return 'eSewa';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'cash':
        return 'Cash';
      default:
        return method;
    }
  };

  // Calculate stats
  const totalPayments = payments.length;
  const completedPayments = payments.filter(p => p.status === 'completed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;
  const totalReceived = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Payment Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Record Payment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{totalPayments}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <CreditCardIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedPayments}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Received</p>
              <p className="text-2xl font-bold text-gray-900">NPR {totalReceived.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <BanknotesIcon className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-orange-600">NPR {pendingAmount.toLocaleString()}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <ClockIcon className="h-6 w-6 text-orange-600" />
            </div>
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
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Methods</option>
            <option value="khalti">Khalti</option>
            <option value="esewa">eSewa</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
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

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">{payment.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">NPR {payment.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(payment.method)}
                      <span className="text-sm text-gray-900">{getMethodName(payment.method)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{payment.transactionId}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['khalti', 'esewa', 'bank_transfer', 'cash'].map((method) => {
          const methodPayments = payments.filter(p => p.method === method && p.status === 'completed');
          const methodTotal = methodPayments.reduce((sum, p) => sum + p.amount, 0);
          const methodCount = methodPayments.length;

          return (
            <div key={method} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getMethodIcon(method)}
                  <h3 className="text-lg font-semibold text-gray-900">{getMethodName(method)}</h3>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Transactions:</span>
                  <span className="text-sm font-medium text-gray-900">{methodCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <span className="text-sm font-bold text-green-600">NPR {methodTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WholesalerPayments;