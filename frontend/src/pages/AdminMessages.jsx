import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import { IoMdRefresh } from 'react-icons/io';
import toast from 'react-hot-toast';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE}/api/messages`, { withCredentials: true });
      setMessages(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch messages');
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${BASE}/api/messages/${id}`, { withCredentials: true });
      setMessages(messages.filter((msg) => msg._id !== id));
      toast.success('Message deleted successfully');
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  useEffect(() => {
    fetchMessages();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4 md:mb-0">User Messages</h2>
          <button
            onClick={fetchMessages}
            className="p-2 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
            title="Refresh messages"
          >
            <IoMdRefresh className="text-purple-600" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}

        {messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center border border-purple-100">
            <p className="text-gray-600">No messages yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-white rounded-lg shadow-md border border-purple-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-5">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <FiUser className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{msg.name}</h3>
                      <p className="text-sm text-purple-600">{msg.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {msg.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FiPhone className="mr-2 text-purple-500" />
                        <span>{msg.phone}</span>
                      </div>
                    )}

                    <div className="flex items-start text-sm text-gray-600">
                      <FiMessageSquare className="flex-shrink-0 mr-2 mt-0.5 text-purple-500" />
                      <p className="line-clamp-3">{msg.message}</p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-purple-50 border-t border-purple-100 flex justify-end">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="text-red-600 hover:text-red-800 flex items-center transition-colors"
                  >
                    <FiTrash2 className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMessages;