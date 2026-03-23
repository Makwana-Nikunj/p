import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { FiLogOut, FiBox, FiUsers, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { Package, Check, X, Eye } from 'lucide-react';
import productService from '../services/productService';

const AdminDashboard = () => {
    const { userData, isAdmin } = useSelector(state => state.auth);
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const handleLogout = async () => {
        dispatch(logout());
        navigate('/');
    };

    // Filter products by status
    const pendingProducts = products.filter(p => p.status === 'pending');
    const approvedProducts = products.filter(p => p.status === 'approved');
    const rejectedProducts = products.filter(p => p.status === 'rejected');

    const filteredProducts = products.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'pending') return p.status === 'pending';
        if (filter === 'approved') return p.status === 'approved';
        if (filter === 'rejected') return p.status === 'rejected';
        return true;
    });

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleApprove = async (productId) => {
        try {
            await productService.updateProductStatus(productId, 'approved');
            window.location.reload();
        } catch (error) {
            console.error('Failed to approve product:', error);
        }
    };

    const handleReject = async (productId) => {
        try {
            await productService.updateProductStatus(productId, 'rejected');
            window.location.reload();
        } catch (error) {
            console.error('Failed to reject product:', error);
        }
    };

    // Stat cards data
    const stats = [
        { label: 'Total listings', value: products.length, delta: '+12%', up: true },
        { label: 'Active users', value: 156, delta: '+8%', up: true },
        { label: 'Pending approval', value: pendingProducts.length, delta: '-5%', up: false, flagged: true },
        { label: 'Completed trades', value: 89, delta: '+23%', up: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <header className="bg-[#0c0c0c]">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                        <p className="text-gray-400 mt-1">Welcome back, {userData?.name}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 border border-gray-600 text-white hover:bg-gray-900 px-4 py-2 rounded-lg transition"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Stat Cards - 4 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                                <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-500' : stat.flagged ? 'text-red-500' : 'text-gray-500'}`}>
                                    {stat.up ? <FiTrendingUp size={14} /> : stat.flagged ? null : <FiTrendingDown size={14} />}
                                    {stat.delta}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter Buttons with Counts */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filter === 'all'
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        All <span className="ml-1 text-xs opacity-70">({products.length})</span>
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filter === 'pending'
                                ? 'bg-amber-500 text-white'
                                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        Pending <span className="ml-1 text-xs opacity-70">({pendingProducts.length})</span>
                    </button>
                    <button
                        onClick={() => setFilter('approved')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filter === 'approved'
                                ? 'bg-green-500 text-white'
                                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        Approved <span className="ml-1 text-xs opacity-70">({approvedProducts.length})</span>
                    </button>
                    <button
                        onClick={() => setFilter('rejected')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filter === 'rejected'
                                ? 'bg-red-500 text-white'
                                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        Rejected <span className="ml-1 text-xs opacity-70">({rejectedProducts.length})</span>
                    </button>
                </div>

                {/* Product Approval Table */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Seller</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product.$id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                                                        {product.imageId ? (
                                                            <img
                                                                src={productService.getFileView(product.imageId)}
                                                                alt={product.title}
                                                                className="w-full h-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <Package className="w-6 h-6 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                                                            {product.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-500 capitalize">
                                                            {product.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    ₹{parseFloat(product.price).toLocaleString('en-IN')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                        {getInitials(product.sellerName)}
                                                    </div>
                                                    <span className="text-sm text-gray-700 dark:text-gray-400">
                                                        {product.sellerName || 'Unknown'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    product.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                                                    product.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                                                    product.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                                                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                                }`}>
                                                    {product.status || 'pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {product.status === 'pending' ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleApprove(product.$id)}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition"
                                                            >
                                                                <Check size={14} /> Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(product.$id)}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition"
                                                            >
                                                                <X size={14} /> Reject
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-400 rounded-lg text-xs font-medium transition">
                                                            <Eye size={14} /> View
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-500">
                                            No products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;