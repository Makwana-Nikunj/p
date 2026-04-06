import React, { useState, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import apiClient from '../../lib/apiClient';
import { useToast } from '../Toast/ToastContainer';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending'); // pending, approved, rejected, all
    const [approving, setApproving] = useState(null);
    const { showToast } = useToast();

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Backend routes: /api/products/pending, /approved, /rejected, /all-products
            let endpoint = '/products/all-products';
            if (filter === 'pending') endpoint = '/products/pending';
            else if (filter === 'approved') endpoint = '/products/approved';
            else if (filter === 'rejected') endpoint = '/products/rejected';

            const response = await apiClient.get(endpoint);
            const data = response.data?.data || response.data || [];
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            showToast('Failed to load products', 'error');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (productId) => {
        setApproving(productId);
        try {
            await apiClient.patch(`/products/${productId}/approve`);
            showToast('Product approved successfully', 'success');
            // Remove from list
            setProducts(products.filter(p => p.id !== productId));
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to approve product', 'error');
        } finally {
            setApproving(null);
        }
    };

    const handleReject = async (productId) => {
        setApproving(productId);
        try {
            await apiClient.patch(`/products/${productId}/reject`);
            showToast('Product rejected', 'success');
            // Remove from list
            setProducts(products.filter(p => p.id !== productId));
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to reject product', 'error');
        } finally {
            setApproving(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex gap-2">
                {['pending', 'approved', 'rejected', 'all'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg font-medium capitalize transition ${filter === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        {status === 'all' ? 'All Products' : `${status} (${status === 'pending' ? '📋' : '✓'})`}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                      <div className="w-full h-48 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                        <div className="flex items-center justify-between">
                          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            ) : products.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">No products found in this category</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                            {/* Image */}
                            {product.image_url && (
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />
                            )}

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg truncate dark:text-white">{product.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{product.description}</p>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
                                    <span className={`text-xs px-2 py-1 rounded capitalize ${product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            product.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {product.status}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Category: {product.category}</p>

                                {/* Actions - Only show for pending */}
                                {product.status === 'pending' && (
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleApprove(product.id)}
                                            disabled={approving === product.id}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {approving === product.id ? (
                                                <FiLoader className="animate-spin" />
                                            ) : (
                                                <FiCheck />
                                            )}
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(product.id)}
                                            disabled={approving === product.id}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {approving === product.id ? (
                                                <FiLoader className="animate-spin" />
                                            ) : (
                                                <FiX />
                                            )}
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
