import React, { useState } from 'react';
import { BellIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  // Mock notification data
  const notifications = [
    {
      id: '1',
      type: 'low_stock',
      title: 'Low Stock Alert',
      message: 'Wai Wai Noodles - Chicken stock is running low at Valley Wholesale Mart (15 units remaining)',
      timestamp: '2025-01-15T10:30:00Z',
      read: false,
      priority: 'high',
      wholesaler: 'Valley Wholesale Mart',
      product: 'Wai Wai Noodles - Chicken'
    },
    {
      id: '2',
      type: 'order_placed',
      title: 'New Order Received',
      message: 'Mountain Trading Co. has placed a new order #ORD-2025-003 worth NPR 8,500',
      timestamp: '2025-01-15T09:15:00Z',
      read: false,
      priority: 'medium',
      wholesaler: 'Mountain Trading Co.',
      orderNumber: 'ORD-2025-003'
    },
    {
      id: '3',
      type: 'payment_received',
      title: 'Payment Received',
      message: 'Payment of NPR 4,250 received from Valley Wholesale Mart via Khalti',
      timestamp: '2025-01-15T08:45:00Z',
      read: true,
      priority: 'low',
      wholesaler: 'Valley Wholesale Mart',
      amount: 4250
    },
    {
      id: '4',
      type: 'low_stock',
      title: 'Critical Stock Alert',
      message: 'Coca Cola - 250ml is critically low at Sunrise Wholesale (3 units remaining)',
      timestamp: '2025-01-14T16:20:00Z',
      read: false,
      priority: 'high',
      wholesaler: 'Sunrise Wholesale',
      product: 'Coca Cola - 250ml'
    },
    {
      id: '5',
      type: 'order_shipped',
      title: 'Order Shipped',
      message: 'Order #ORD-2025-001 has been shipped to Mountain Trading Co.',
      timestamp: '2025-01-14T14:30:00Z',
      read: true,
      priority: 'low',
      wholesaler: 'Mountain Trading Co.',
      orderNumber: 'ORD-2025-001'
    },
    {
      id: '6',
      type: 'system',
      title: 'System Update',
      message: 'OrionNexus system will undergo maintenance on January 20, 2025 from 2:00 AM to 4:00 AM',
      timestamp: '2025-01-14T12:00:00Z',
      read: true,
      priority: 'medium'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    return notification.type === filter;
  });

  const getNotificationIcon = (type: string, priority: string) => {
    switch (type) {
      case 'low_stock':
        return <ExclamationTriangleIcon className={`h-5 w-5 ${priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />;
      case 'order_placed':
        return <BellIcon className="h-5 w-5 text-blue-600" />;
      case 'payment_received':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'order_shipped':
        return <InformationCircleIcon className="h-5 w-5 text-purple-600" />;
      case 'system':
        return <InformationCircleIcon className="h-5 w-5 text-gray-600" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    // In a real app, this would update the notification status
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Marking all notifications as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">You have {unreadCount} unread notifications</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mark All as Read
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Settings
          </button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
            <BellIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <BellIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {notifications.filter(n => n.priority === 'high').length}
              </p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-yellow-600">
                {notifications.filter(n => n.type === 'low_stock').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Notifications' },
            { key: 'unread', label: 'Unread' },
            { key: 'high', label: 'High Priority' },
            { key: 'low_stock', label: 'Low Stock' },
            { key: 'order_placed', label: 'Orders' },
            { key: 'payment_received', label: 'Payments' },
            { key: 'system', label: 'System' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm border-l-4 ${getPriorityColor(notification.priority)} transition-all duration-200 hover:shadow-md`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type, notification.priority)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-lg font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className={`mt-1 text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>{new Date(notification.timestamp).toLocaleString()}</span>
                      {notification.wholesaler && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {notification.wholesaler}
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded ${
                        notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                        notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {notification.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500">You're all caught up! No notifications to display.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;