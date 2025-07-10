import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BASE}/api/dashboard/stats`, {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchStats();
  }, []);

  const chartData = stats
    ? [
        { name: 'Users', value: stats.users },
        { name: 'Tickets', value: stats.tickets },
        { name: 'Events', value: stats.events },
        { name: 'Messages', value: stats.messages },
      ]
    : [];

  return (
    <div className="p-4 max-w-7xl mx-auto" style={{ height: 'calc(100vh - 50px)' }}>
      {/* Dashboard Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-600 text-sm">Platform overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard 
          title="Users" 
          count={stats?.users} 
          color="bg-blue-500" 
        />
        <DashboardCard 
          title="Tickets" 
          count={stats?.tickets} 
          color="bg-green-500" 
        />
        <DashboardCard 
          title="Events" 
          count={stats?.events} 
          color="bg-purple-500" 
        />
        <DashboardCard 
          title="Messages" 
          count={stats?.messages} 
          color="bg-red-500" 
        />
      </div>

      {/* Bar Chart Section - Adjusted to fit remaining space */}
      <div className="bg-white rounded-lg shadow p-4" style={{ height: 'calc(100% - 180px)' }}>
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                allowDecimals={false} 
                tick={{ fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.25rem',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#7c3aed" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, count, color }) {
  return (
    <div className={`${color} rounded-lg p-4 text-white shadow-md transition-transform hover:scale-105`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">{count ?? '-'}</p>
    </div>
  );
}

export default AdminDashboard;