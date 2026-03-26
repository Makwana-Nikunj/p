import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { FiLogOut, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { Package, Check, X, Eye } from 'lucide-react';
import apiClient from '../lib/apiClient';
import { useToast } from '../Components/Toast/ToastContainer';
import AtmosphericBlooms from '../Components/AtmosphericBlooms';

const AdminDashboard = () => {
    const { userData, isAdmin } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/products/all-products');
            const data = response.data?.data || response.data || [];
            const productsArray = Array.isArray(data) ? data : [];
            setAllProducts(productsArray);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            showToast('Failed to load products', 'error');
            setAllProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const handleLogout = async () => {
        dispatch(logout());
        navigate('/');
    };

    const handleApprove = async (productId) => {
        try {
            await apiClient.patch(`/products/${productId}/approve`);
            showToast('Product approved successfully', 'success');
            fetchAllProducts();
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to approve product', 'error');
        }
    };

    const handleReject = async (productId) => {
        try {
            await apiClient.patch(`/products/${productId}/reject`);
            showToast('Product rejected', 'success');
            fetchAllProducts();
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to reject product', 'error');
        }
    };

    // Compute filtered products based on current filter
    const filteredProducts = allProducts.filter(p => {
        if (filter === 'all') return true;
        return p.status === filter;
    });

    // Calculate stats from all products
    const pendingProductsCount = allProducts.filter(p => p.status === 'pending').length;
    const approvedProductsCount = allProducts.filter(p => p.status === 'approved').length;
    const rejectedProductsCount = allProducts.filter(p => p.status === 'rejected').length;

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Stat cards data
    const stats = [
        { label: 'Total listings', value: allProducts.length, delta: '+12%', up: true },
        { label: 'Active users', value: 156, delta: '+8%', up: true },
        { label: 'Pending approval', value: pendingProductsCount, delta: '-5%', up: false, flagged: true },
        { label: 'Completed trades', value: 89, delta: '+23%', up: true },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col relative py-10">
            <AtmosphericBlooms intensity="subtle" />

            {/* Header */}
            <header className="glass border-b border-subtle sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="font-section-headline gradient-text">Admin Dashboard</h1>
                        <p className="text-gray-400 mt-1">Welcome back, {userData?.name}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 glass px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-white border border-subtle"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 section-spacing">

                {/* Stat Cards - 4 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="glass rounded-xl p-6 border border-subtle"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">{stat.label}</span>
                                <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-400' : stat.flagged ? 'text-red-400' : 'text-gray-400'}`}>
                                    {stat.up ? <FiTrendingUp size={14} /> : stat.flagged ? null : <FiTrendingDown size={14} />}
                                    {stat.delta}
                                </span>
                            </div>
                            <div className="text-3xl font-bold gradient-text">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter Buttons with Counts */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                            filter === 'all'
                                ? 'btn-gradient-primary text-white shadow-lg'
                                : 'glass hover:bg-white/10 border border-subtle text-gray-300'
                        }`}
                    >
                        All <span className="ml-1 text-xs opacity-70">({allProducts.length})</span>
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                            filter === 'pending'
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                                : 'glass hover:bg-white/10 border border-subtle text-gray-300'
                        }`}
                    >
                        Pending <span className="ml-1 text-xs opacity-70">({pendingProductsCount})</span>
                    </button>
                    <button
                        onClick={() => setFilter('approved')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                            filter === 'approved'
                                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg'
                                : 'glass hover:bg-white/10 border border-subtle text-gray-300'
                        }`}
                    >
                        Approved <span className="ml-1 text-xs opacity-70">({approvedProductsCount})</span>
                    </button>
                    <button
                        onClick={() => setFilter('rejected')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                            filter === 'rejected'
                                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                                : 'glass hover:bg-white/10 border border-subtle text-gray-300'
                        }`}
                    >
                        Rejected <span className="ml-1 text-xs opacity-70">({rejectedProductsCount})</span>
                    </button>
                </div>

                {/* Product Approval Table */}
                {loading ? (
                    <div className="glass rounded-xl p-8 border border-subtle">
                        <div className="animate-pulse space-y-4">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 h-12 glass rounded-lg"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 glass rounded w-1/4"></div>
                                        <div className="h-3 glass rounded w-1/6"></div>
                                    </div>
                                    <div className="h-6 glass rounded w-20"></div>
                                    <div className="h-6 glass rounded-full w-16"></div>
                                    <div className="h-8 glass rounded w-24"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="glass rounded-xl overflow-hidden border border-subtle">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#0C0C0C] border-b border-subtle">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-white">Product</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-white">Price</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-white">Seller</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-white">Status</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-white">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-subtle">
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-indigo-500/10 transition-colors duration-200">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-lg glass flex items-center justify-center overflow-hidden">
                                                            {product.image_url ? (
                                                                <img
                                                                    src={product.image_url}
                                                                    alt={product.title}
                                                                    className="w-full h-full object-cover"
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                <Package className="w-6 h-6 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-white text-sm line-clamp-1">
                                                                {product.title}
                                                            </p>
                                                            <p className="text-xs text-gray-400 capitalize">
                                                                {product.category}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-white">
                                                        ₹{parseFloat(product.price).toLocaleString('en-IN')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs font-bold text-white">
                                                            {getInitials(product.sellerName)}
                                                        </div>
                                                        <span className="text-sm text-gray-300">
                                                            {product.sellerName || 'Unknown'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        product.status === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                                        product.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                                        product.status === 'rejected' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                                        'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                                                    }`}>
                                                        {product.status || 'pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {product.status === 'pending' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(product.id)}
                                                                    className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-lg text-xs font-medium transition shadow-lg"
                                                                >
                                                                    <Check size={14} /> Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(product.id)}
                                                                    className="flex items-center gap-1 px-3 py-1.5 btn-gradient-destructive text-white rounded-lg text-xs font-medium transition shadow-lg"
                                                                >
                                                                    <X size={14} /> Reject
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button className="flex items-center gap-1 px-3 py-1.5 glass hover:bg-white/10 border border-subtle text-gray-300 rounded-lg text-xs font-medium transition">
                                                                <Eye size={14} /> View
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                                No products found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
