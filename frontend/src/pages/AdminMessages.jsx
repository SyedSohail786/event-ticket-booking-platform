import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE}/api/messages`, { withCredentials: true });
      setMessages(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch messages');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${BASE}/api/messages/${id}`, { withCredentials: true });
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">User Messages</h2>

      {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}

      {messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="border-t">
                  <td className="p-3">{msg.name}</td>
                  <td className="p-3">{msg.email}</td>
                  <td className="p-3">{msg.phone}</td>
                  <td className="p-3">{msg.message}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
