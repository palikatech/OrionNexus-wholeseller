import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PlusIcon, QrCodeIcon, ShoppingCartIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const SalesPage: React.FC = () => {
  const { products } = useData();
  const [cart, setCart] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    
    if (!customerName.trim()) {
      toast.error('Please enter customer name');
      return;
    }

    // Mock checkout process
    toast.success('Sale completed successfully!');
    setCart([]);
    setCustomerName('');
    setShowCart(false);
  };

  const handleQuickSale = (product: any) => {
    setCart([{ ...product, quantity: 1 }]);
    setShowCart(true);
  };

  const simulateBarcodeScanner = () => {
    const mockBarcodes = products.map(p => p.barcode);
    const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
    setSearchTerm(randomBarcode);
    toast.success('Barcode scanned successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCart(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Cart ({cartQuantity})</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <PrinterIcon className="h-5 w-5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products, SKU, or scan barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          <button
            onClick={simulateBarcodeScanner}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <QrCodeIcon className="h-6 w-6" />
            <span>Scan Barcode</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
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
              <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-green-600">NPR {product.price}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  product.stock <= product.minStock 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {product.stock} left
                </span>
              </div>
              <div className="space-y-1 text-xs text-gray-600 mb-3">
                <p>SKU: {product.sku}</p>
                <p>Barcode: {product.barcode}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleQuickSale(product)}
                  className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                >
                  Quick Sale
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50">
          <div className="flex-1" onClick={() => setShowCart(false)}></div>
          <div className="bg-white w-96 h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Customer Info */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-500">NPR {item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {cart.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCartIcon className="h-12 w-12 mx-auto mb-4" />
                  <p>Your cart is empty</p>
                </div>
              )}

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="cash">Cash</option>
                  <option value="khalti">Khalti</option>
                  <option value="esewa">eSewa</option>
                  <option value="card">Card</option>
                </select>
              </div>

              {/* Total */}
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">NPR {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">VAT (13%):</span>
                  <span className="font-medium">NPR {Math.round(cartTotal * 0.13).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold text-green-600">
                      NPR {Math.round(cartTotal * 1.13).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;