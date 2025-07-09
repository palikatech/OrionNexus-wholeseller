import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HomeIcon, 
  CubeIcon, 
  BuildingStorefrontIcon, 
  ClipboardDocumentListIcon, 
  BuildingOfficeIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  BellIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  ReceiptPercentIcon,
  DocumentChartBarIcon,
  EnvelopeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const distributorNavItems = [
    { name: 'Dashboard', href: '/distributor/dashboard', icon: HomeIcon },
    { name: 'Products', href: '/distributor/products', icon: CubeIcon },
    { name: 'Inventory', href: '/distributor/inventory', icon: ArchiveBoxIcon },
    { name: 'Orders', href: '/distributor/orders', icon: ClipboardDocumentListIcon },
    { name: 'Wholesalers', href: '/distributor/wholesalers', icon: BuildingOfficeIcon },
    { name: 'Payments', href: '/distributor/payments', icon: CreditCardIcon },
    { name: 'Reports', href: '/distributor/reports', icon: ChartBarIcon },
    { name: 'Notifications', href: '/distributor/notifications', icon: BellIcon }
  ];

  const wholesalerNavItems = [
    { name: 'Dashboard', href: '/wholesaler/dashboard', icon: HomeIcon },
    { name: 'Products', href: '/wholesaler/products', icon: CubeIcon },
    { name: 'Partnerships', href: '/wholesaler/partnerships', icon: UserGroupIcon },
    { name: 'Sales', href: '/wholesaler/sales', icon: ShoppingCartIcon },
    { name: 'Purchase Orders', href: '/wholesaler/purchase-orders', icon: DocumentTextIcon },
    { name: 'Inventory', href: '/wholesaler/inventory', icon: ArchiveBoxIcon },
    { name: 'Invoices', href: '/wholesaler/invoices', icon: ReceiptPercentIcon },
    { name: 'Payments', href: '/wholesaler/payments', icon: CreditCardIcon },
    { name: 'Reports', href: '/wholesaler/reports', icon: DocumentChartBarIcon },
    { name: 'Requests', href: '/wholesaler/requests', icon: EnvelopeIcon }
  ];

  const navItems = user?.role === 'distributor' ? distributorNavItems : wholesalerNavItems;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-emerald-600">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">OrionNexus</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => clsx(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                alt={user?.name}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.company?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;