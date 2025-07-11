import React, { useState } from 'react';
import { usePOSSync } from '../../hooks/usePOSSync';
import { 
  CloudArrowUpIcon, 
  CloudArrowDownIcon, 
  SignalIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const POSIntegration: React.FC = () => {
  const {
    isSyncing,
    lastSyncTime,
    connectionStatus,
    testConnection,
    syncProductsToPOS,
    syncSalesFromPOS,
  } = usePOSSync();

  const [showSettings, setShowSettings] = useState(false);

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'disconnected':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      case 'checking':
        return <ClockIcon className="h-5 w-5 text-yellow-600 animate-spin" />;
      default:
        return <SignalIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-red-100 text-red-800';
      case 'checking':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <SignalIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">POS System Integration</h3>
            <p className="text-sm text-gray-600">Sync products and sales with external POS</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {connectionStatus === 'connected' ? 'Connected' : 
             connectionStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
          </span>
        </div>
      </div>

      {/* Sync Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={syncProductsToPOS}
          disabled={isSyncing || connectionStatus !== 'connected'}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CloudArrowUpIcon className="h-5 w-5" />
          <span>{isSyncing ? 'Syncing...' : 'Sync Products to POS'}</span>
        </button>

        <button
          onClick={syncSalesFromPOS}
          disabled={isSyncing || connectionStatus !== 'connected'}
          className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CloudArrowDownIcon className="h-5 w-5" />
          <span>{isSyncing ? 'Syncing...' : 'Sync Sales from POS'}</span>
        </button>
      </div>

      {/* Last Sync Info */}
      {lastSyncTime && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Last sync: {new Date(lastSyncTime).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Connection Test */}
      <div className="flex items-center justify-between pt-4 border-t">
        <span className="text-sm text-gray-600">Test POS connection</span>
        <button
          onClick={testConnection}
          disabled={connectionStatus === 'checking'}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Test Connection
        </button>
      </div>

      {/* Integration Instructions */}
      {connectionStatus === 'disconnected' && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">POS Integration Setup</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>1. Configure POS API URL in environment variables</p>
            <p>2. Set up API key for authentication</p>
            <p>3. Ensure POS system supports webhook notifications</p>
            <p>4. Test connection before syncing data</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSIntegration;