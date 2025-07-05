import React, { useState } from 'react';
import { DocumentTextIcon, EyeIcon, PrinterIcon, PlusIcon } from '@heroicons/react/24/outline';

const InvoicesPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Mock invoice data
  const invoices = [
    {
      id: 'INV-2025-024',
      invoiceNumber: 'INV-2025-024',
      customer: 'Retail Customer',
      customerPAN: '123456789',
      date: '2025-01-15',
      dueDate: '2025-01-30',
      items: [
        { product: 'Wai Wai Noodles - Chicken', quantity: 10, price: 25, total: 250 },
        { product: 'Coca Cola - 250ml', quantity: 15, price: 35, total: 525 }
      ],
      subtotal: 775,
      vat: 100.75,
      total: 875.75,
      status: 'paid',
      paymentMethod: 'khalti',
      notes: 'Regular customer order'
    },
    {
      id: 'INV-2025-023',
      invoiceNumber: 'INV-2025-023',
      customer: 'Grocery Store',
      customerPAN: '987654321',
      date: '2025-01-15',
      dueDate: '2025-01-30',
      items: [
        { product: 'Sunsilk Shampoo - 200ml', quantity: 5, price: 180, total: 900 },
        { product: 'Tiger Biscuits', quantity: 20, price: 15, total: 300 }
      ],
      subtotal: 1200,
      vat: 156,
      total: 1356,
      status: 'pending',
      paymentMethod: 'bank_transfer',
      notes: 'Bulk order discount applied'
    },
    {
      id: 'INV-2025-022',
      invoiceNumber: 'INV-2025-022',
      customer: 'Mini Mart',
      customerPAN: '456789123',
      date: '2025-01-14',
      dueDate: '2025-01-29',
      items: [
        { product: 'Cooking Oil - Fortune', quantity: 3, price: 250, total: 750 }
      ],
      subtotal: 750,
      vat: 97.5,
      total: 847.5,
      status: 'paid',
      paymentMethod: 'cash',
      notes: ''
    },
    {
      id: 'INV-2025-021',
      invoiceNumber: 'INV-2025-021',
      customer: 'Local Shop',
      customerPAN: '789123456',
      date: '2025-01-14',
      dueDate: '2025-01-29',
      items: [
        { product: 'Moong Daal', quantity: 8, price: 120, total: 960 }
      ],
      subtotal: 960,
      vat: 124.8,
      total: 1084.8,
      status: 'overdue',
      paymentMethod: 'pending',
      notes: 'Payment reminder sent'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => 
    !filterStatus || invoice.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const pendingInvoices = invoices.filter(i => i.status === 'pending').length;
  const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.total, 0);
  const paidAmount = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const pendingAmount = invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <PlusIcon className="h-5 w-5" />
            <span>Create Invoice</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-green-600">{paidInvoices}</p>
              <p className="text-sm text-gray-500">NPR {paidAmount.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingInvoices}</p>
              <p className="text-sm text-gray-500">NPR {pendingAmount.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{overdueInvoices}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
            <option value="">All Invoices</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="draft">Draft</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Search customer..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.customer}</div>
                    <div className="text-sm text-gray-500">PAN: {invoice.customerPAN}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">NPR {invoice.total.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">VAT: NPR {invoice.vat.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedInvoice(invoice)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-4 w-4 inline mr-1" />
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <PrinterIcon className="h-4 w-4 inline mr-1" />
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Invoice Details</h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Invoice Header */}
            <div className="border-b pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">INVOICE</h3>
                  <p className="text-lg font-semibold text-blue-600">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Date: {new Date(selectedInvoice.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Due: {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Bill To:</h4>
                <p className="text-gray-900">{selectedInvoice.customer}</p>
                <p className="text-sm text-gray-600">PAN: {selectedInvoice.customerPAN}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">From:</h4>
                <p className="text-gray-900">Valley Wholesale Mart</p>
                <p className="text-sm text-gray-600">PAN: 401234567</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Item</th>
                    <th className="text-right py-2 text-sm font-medium text-gray-600">Qty</th>
                    <th className="text-right py-2 text-sm font-medium text-gray-600">Price</th>
                    <th className="text-right py-2 text-sm font-medium text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 text-sm text-gray-900">{item.product}</td>
                      <td className="py-2 text-sm text-gray-900 text-right">{item.quantity}</td>
                      <td className="py-2 text-sm text-gray-900 text-right">NPR {item.price.toLocaleString()}</td>
                      <td className="py-2 text-sm text-gray-900 text-right">NPR {item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="border-t pt-4">
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">NPR {selectedInvoice.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">VAT (13%):</span>
                    <span className="font-medium">NPR {selectedInvoice.vat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">NPR {selectedInvoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedInvoice.notes && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
                <p className="text-gray-700">{selectedInvoice.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-4 mt-6 pt-4 border-t">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Print Invoice
              </button>
              <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;