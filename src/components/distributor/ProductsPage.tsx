import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { Product } from '../../types';

const ProductsPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: '',
    brand: '',
    stock: '',
    minStock: '',
    description: '',
    image: '',
    hsCode: '',
    vatRate: '',
    manufacturerName: '',
    manufacturerAddress: '',
    importerName: '',
    importerPAN: '',
    batchNumber: '',
    manufacturingDate: '',
    expiryDate: '',
    unitOfMeasure: '',
    netWeight: '',
    grossWeight: ''
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        stock: parseInt(formData.stock),
        minStock: parseInt(formData.minStock),
        vatRate: parseFloat(formData.vatRate),
        netWeight: formData.netWeight ? parseFloat(formData.netWeight) : undefined,
        grossWeight: formData.grossWeight ? parseFloat(formData.grossWeight) : undefined,
        image: formData.image || 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        price: 0 // Price removed for distributor
      };

      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
        toast.success('Product updated successfully!');
      } else {
        addProduct(productData);
        toast.success('Product added successfully!');
      }

      setShowAddModal(false);
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', sku: '', barcode: '', category: '', brand: '', stock: '', minStock: '', 
      description: '', image: '', hsCode: '', vatRate: '', manufacturerName: '', 
      manufacturerAddress: '', importerName: '', importerPAN: '', batchNumber: '', 
      manufacturingDate: '', expiryDate: '', unitOfMeasure: '', netWeight: '', grossWeight: ''
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      category: product.category,
      brand: product.brand,
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      description: product.description,
      image: product.image,
      hsCode: product.hsCode,
      vatRate: product.vatRate.toString(),
      manufacturerName: product.manufacturerName,
      manufacturerAddress: product.manufacturerAddress,
      importerName: product.importerName || '',
      importerPAN: product.importerPAN || '',
      batchNumber: product.batchNumber || '',
      manufacturingDate: product.manufacturingDate || '',
      expiryDate: product.expiryDate || '',
      unitOfMeasure: product.unitOfMeasure,
      netWeight: product.netWeight?.toString() || '',
      grossWeight: product.grossWeight?.toString() || ''
    });
    setShowAddModal(true);
  };

  const handleView = (product: Product) => {
    setViewingProduct(product);
    setShowViewModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted successfully!');
    }
  };

  const categories = ['Food & Beverages', 'Personal Care', 'Groceries', 'Snacks', 'Electronics', 'Others'];
  const unitOfMeasures = ['pieces', 'kg', 'liters', 'bottles', 'packets', 'boxes', 'meters'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HS Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.hsCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.vatRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock <= product.minStock 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock <= product.minStock ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleView(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-4 w-4 inline mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <PencilIcon className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4 inline mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode *</label>
                  <input
                    type="text"
                    required
                    value={formData.barcode}
                    onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HS Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.hsCode}
                    onChange={(e) => setFormData({...formData, hsCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 1902.30.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">VAT Rate (%) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.vatRate}
                    onChange={(e) => setFormData({...formData, vatRate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measure *</label>
                  <select
                    required
                    value={formData.unitOfMeasure}
                    onChange={(e) => setFormData({...formData, unitOfMeasure: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Unit</option>
                    {unitOfMeasures.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.minStock}
                    onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Net Weight (grams)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.netWeight}
                    onChange={(e) => setFormData({...formData, netWeight: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gross Weight (grams)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.grossWeight}
                    onChange={(e) => setFormData({...formData, grossWeight: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.manufacturerName}
                    onChange={(e) => setFormData({...formData, manufacturerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.manufacturerAddress}
                    onChange={(e) => setFormData({...formData, manufacturerAddress: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Importer Name</label>
                  <input
                    type="text"
                    value={formData.importerName}
                    onChange={(e) => setFormData({...formData, importerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Importer PAN</label>
                  <input
                    type="text"
                    value={formData.importerPAN}
                    onChange={(e) => setFormData({...formData, importerPAN: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Date</label>
                  <input
                    type="date"
                    value={formData.manufacturingDate}
                    onChange={(e) => setFormData({...formData, manufacturingDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewModal && viewingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Product Catalog</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <img
                  src={viewingProduct.image}
                  alt={viewingProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{viewingProduct.name}</h3>
                  <p className="text-lg text-gray-600">{viewingProduct.brand}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">SKU</p>
                    <p className="text-gray-900">{viewingProduct.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Barcode</p>
                    <p className="text-gray-900">{viewingProduct.barcode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="text-gray-900">{viewingProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">HS Code</p>
                    <p className="text-gray-900">{viewingProduct.hsCode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">VAT Rate</p>
                    <p className="text-gray-900">{viewingProduct.vatRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Unit</p>
                    <p className="text-gray-900">{viewingProduct.unitOfMeasure}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Stock</p>
                    <p className="text-gray-900">{viewingProduct.stock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Min Stock</p>
                    <p className="text-gray-900">{viewingProduct.minStock}</p>
                  </div>
                </div>

                {viewingProduct.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-gray-900">{viewingProduct.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Manufacturer Details</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-gray-900">{viewingProduct.manufacturerName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-gray-900">{viewingProduct.manufacturerAddress}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Product Details</h4>
                <div className="space-y-2">
                  {viewingProduct.batchNumber && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Batch Number</p>
                      <p className="text-gray-900">{viewingProduct.batchNumber}</p>
                    </div>
                  )}
                  {viewingProduct.manufacturingDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Manufacturing Date</p>
                      <p className="text-gray-900">{new Date(viewingProduct.manufacturingDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {viewingProduct.expiryDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                      <p className="text-gray-900">{new Date(viewingProduct.expiryDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {viewingProduct.netWeight && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Net Weight</p>
                      <p className="text-gray-900">{viewingProduct.netWeight}g</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;