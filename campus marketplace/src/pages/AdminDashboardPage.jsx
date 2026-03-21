import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { FiLogOut, FiBox, FiUsers, FiBarChart2 } from 'react-icons/fi';
import AdminProducts from '../Components/admin/AdminProducts';
import AdminStats from '../Components/admin/AdminStats';

const AdminDashboard = () => {
    const { userData, isAdmin } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');

    useEffect(() => {
        // Redirect if not admin
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const handleLogout = async () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 shadow dark:border-b dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome, {userData?.name}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex gap-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'stats'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                                }`}
                        >
                            <FiBarChart2 className="inline mr-2" />
                            Statistics
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'products'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                                }`}
                        >
                            <FiBox className="inline mr-2" />
                            Product Approval
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'users'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                                }`}
                        >
                            <FiUsers className="inline mr-2" />
                            Users (Coming Soon)
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {activeTab === 'stats' && <AdminStats />}
                {activeTab === 'products' && <AdminProducts />}
                {activeTab === 'users' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">User management coming soon...</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
