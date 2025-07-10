import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ added
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use global login state
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        `${BASE}/api/auth/admin/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        login('admin'); // ✅ updates navbar immediately
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-600 text-center">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin@123"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
