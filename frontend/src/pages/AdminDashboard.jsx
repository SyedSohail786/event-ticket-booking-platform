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
  Cell,
} from 'recharts';
import { FiUsers, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { BsThreeDotsVertical, BsArrowUpRight } from 'react-icons/bs';
import { IoRefreshOutline } from 'react-icons/io5';
import { FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('all');
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE}/api/users`, { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE}/api/dashboard/stats`, {
          params: { range: timeRange },
          withCredentials: true,
        });
        setStats(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchUsers();
  }, [timeRange]);

  const chartData = stats
    ? [
        { name: 'Users', value: stats.users, color: '#7c3aed' },
        { name: 'Tickets', value: stats.tickets, color: '#7c3aed' },
        { name: 'Events', value: stats.events, color: '#7c3aed' },
        { name: 'Messages', value: stats.messages, color: '#7c3aed' },
      ]
    : [];

  const handleRefresh = () => {
    setTimeRange('all');
  };

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'day': return 'Last 24 hours';
      case 'week': return 'Last 7 days';
      case 'month': return 'Last 30 days';
      default: return 'All time';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
    </div>
  );

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-600 text-sm">
            {getTimeRangeLabel()} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-700"
          >
            <option value="day">Last 24h</option>
            <option value="week">Last 7d</option>
            <option value="month">Last 30d</option>
            <option value="all">All time</option>
          </select>
          
          <button
            onClick={handleRefresh}
            className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
            title="Refresh data"
          >
            <IoRefreshOutline className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard 
          title="Total Users" 
          count={stats?.users} 
          change={stats?.userChange} 
          icon={<FiUsers className="w-5 h-5 text-violet-600" />}
          loading={loading}
        />
        <DashboardCard 
          title="Total Tickets" 
          count={stats?.tickets} 
          change={stats?.ticketChange} 
          icon={<FaTicketAlt className="w-5 h-5 text-violet-600" />}
          loading={loading}
        />
        <DashboardCard 
          title="Active Events" 
          count={stats?.events} 
          change={stats?.eventChange} 
          icon={<FiCalendar className="w-5 h-5 text-violet-600" />}
          loading={loading}
        />
        <DashboardCard 
          title="Messages" 
          count={stats?.messages} 
          change={stats?.messageChange} 
          icon={<FiMessageSquare className="w-5 h-5 text-violet-600" />}
          loading={loading}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-gray-800">Platform Metrics</h3>
          <button className="text-gray-600 hover:text-gray-800">
            <BsThreeDotsVertical className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-80">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse text-gray-400">Loading chart data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#4b5563' }}
                  axisLine={false}
                />
                <YAxis 
                  allowDecimals={false} 
                  tick={{ fill: '#4b5563' }}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#7c3aed',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '14px',
                    color: 'white'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4 max-h-[180px] overflow-y-auto">
            {users.slice(0, 10).map((item) => (
              <div key={item._id} className="flex items-start pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                <div className="bg-violet-100 p-2 rounded-full mr-3">
                  <FiUsers className="w-4 h-4 text-violet-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    New user: {item.name || item.email.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(item.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  onClick={()=> navigate('/admin/users')}
                >
                  <BsArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-sm text-gray-600 text-center py-4">
                No recent activity
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="p-3 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors flex flex-col items-center"
              onClick={()=> navigate('/admin/users')}
            >
              <FiUsers className="w-6 h-6 text-violet-600 mb-2" />
              <span className="text-sm font-medium text-gray-800">Manage Users</span>
            </button>
            <button 
              className="p-3 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors flex flex-col items-center"
              onClick={()=> navigate('/admin/events')}
            >
              <FiCalendar className="w-6 h-6 text-violet-600 mb-2" />
              <span className="text-sm font-medium text-gray-800">Create Event</span>
            </button>
            <button 
              className="p-3 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors flex flex-col items-center"
              onClick={()=> navigate('/admin/tickets')}
            >
              <FaTicketAlt className="w-6 h-6 text-violet-600 mb-2" />
              <span className="text-sm font-medium text-gray-800">View Tickets</span>
            </button>
            <button 
              className="p-3 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors flex flex-col items-center"
              onClick={()=> navigate('/admin/messages')}
            >
              <FiMessageSquare className="w-6 h-6 text-violet-600 mb-2" />
              <span className="text-sm font-medium text-gray-800">Messages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, count, change, icon, loading }) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow p-5 transition-all hover:shadow-md border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {loading ? (
            <div className="h-8 w-16 bg-gray-100 rounded animate-pulse"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-800">{count?.toLocaleString() ?? '-'}</p>
          )}
        </div>
        <div className="p-2 rounded-lg bg-violet-100 text-violet-600">
          {icon}
        </div>
      </div>
      
      {!loading && change !== undefined && (
        <div className={`mt-3 text-sm flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'} from last period
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;