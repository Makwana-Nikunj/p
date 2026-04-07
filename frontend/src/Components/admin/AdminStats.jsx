import React, { useState, useEffect } from 'react';
import { FiBox, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import { StatCardSkeleton } from '../SkeletonLoader';
import apiClient from '../../lib/apiClient';

const AdminStats = () => {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [all, pending, approved, rejected] = await Promise.all([
                apiClient.get('/products/all-products').catch(() => ({ data: { data: [] } })),
                apiClient.get('/products/pending').catch(() => ({ data: { data: [] } })),
                apiClient.get('/products/approved').catch(() => ({ data: { data: [] } })),
                apiClient.get('/products/rejected').catch(() => ({ data: { data: [] } })),
            ]);

            const allData = all.data?.data || all.data || [];
            const pendingData = pending.data?.data || pending.data || [];
            const approvedData = approved.data?.data || approved.data || [];
            const rejectedData = rejected.data?.data || rejected.data || [];

            setStats({
                total: allData.length,
                pending: pendingData.length,
                approved: approvedData.length,
                rejected: rejectedData.length
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm">{title}</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</p>
                </div>
                <Icon className={`text-3xl ${color.replace('border-', 'text-')}`} />
            </div>
        </div>
    );

    if (loading) {
        return <div className="grid grid-cols-1 md:grid-cols-4 gap-6">{Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
                icon={FiBox}
                title="Total Products"
                value={stats.total}
                color="border-blue-500"
            />
            <StatCard
                icon={FiClock}
                title="Pending Approval"
                value={stats.pending}
                color="border-yellow-500"
            />
            <StatCard
                icon={FiCheckCircle}
                title="Approved"
                value={stats.approved}
                color="border-green-500"
            />
            <StatCard
                icon={FiXCircle}
                title="Rejected"
                value={stats.rejected}
                color="border-red-500"
            />
        </div>
    );
};

export default AdminStats;
