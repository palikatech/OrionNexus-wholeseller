import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PlusIcon, MagnifyingGlassIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const WholesalerProducts: React.FC = () => {
  const { products } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  ).filter(product => !filterCategory || product.category === filterCategory);

  const categories = [...new Set(products.map(p => p.category))];

  const handleBarcodeSearch = (barcode: string) => {
    const product = products.find(p => p.barcode === barcode);
    if (product) {
      setSearchTerm(barcode);
      toast.success(`Found product: ${product.name}`);
    } else {
      toast.error('Product not found');
    }
    setShowBarcodeScanner(false);
  };

  // Mock barcode scanner simulation
  const simulateBarcodeScanner = () => {
    const mockBarcodes = products.map(p => p.barcode);
    const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
    setScanResult(randomBarcode);
    setTimeout(() => {
      handleBarcodeSearch(randomBarcode);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search products, SKU, or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowBarcodeScanner(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <QrCodeIcon className="h-5 w-5" />
            <span>Scan Barcode</span>
          </button>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-green-600">NPR {product.price}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  product.stock <= product.minStock 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <p>SKU: {product.sku}</p>
                <p>Barcode: {product.barcode}</p>
                <p>Category: {product.category}</p>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  Add to Cart
                </button>
                <button className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                  Quick Sale
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Barcode Scanner Modal */}
      {showBarcodeScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Barcode Scanner</h2>
            <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
              <QrCodeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Position the barcode within the frame</p>
              {scanResult && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-800 font-mono text-sm">Scanned: {scanResult}</p>
                </div>
              )}
              <button
                onClick={simulateBarcodeScanner}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Simulate Scan
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowBarcodeScanner(false);
                  setScanResult('');
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (scanResult) {
                    handleBarcodeSearch(scanResult);
                  }
                }}
                disabled={!scanResult}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M7 5V4a1 1 0 011-1h4a1 1 0 011 1v1" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or add new products to your inventory.</p>
        </div>
      )}
    </div>
  );
};

export default WholesalerProducts;