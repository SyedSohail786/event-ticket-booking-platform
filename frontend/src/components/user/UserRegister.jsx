import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function UserRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE}/api/auth/register`,
        { name, email, password, confirmPassword: confirm },
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert('Registered successfully. Now login.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-purple-600 text-center">User Register</h2>

        {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-purple-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-purple-400"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="********"
            required
          />
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Register
        </button>

        <p className="mt-4 text-center text-gray-600">
          Have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline font-bold">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default UserRegister;
