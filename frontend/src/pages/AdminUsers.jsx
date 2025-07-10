import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${BASE}/api/users/${id}`, { withCredentials: true });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading users...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">All Users</h2>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Member Since</th>
              <th className="p-3 text-left">Action</th> {/* New */}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">
                  <img
                    src={u.profilePic || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3">{u.name || 'N/A'}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{formatDate(u.createdAt)}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
