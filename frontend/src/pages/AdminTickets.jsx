import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiDollarSign, FiTrash2, FiSearch } from 'react-icons/fi';
import { IoMdRefresh } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';

function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE}/api/tickets`, { withCredentials: true });
      setTickets(res.data);
    } catch (err) {
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    try {
      await axios.delete(`${BASE}/api/tickets/${id}`, { withCredentials: true });
      setTickets((prev) => prev.filter((t) => t._id !== id));
      toast.success('Ticket deleted successfully');
    } catch (err) {
      toast.error('Failed to delete ticket');
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.event?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchTickets();
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

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
       

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">All Tickets</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg w-full md:w-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <button
                  onClick={fetchTickets}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Refresh"
                >
                  <IoMdRefresh className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredTickets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets.map((ticket) => (
                  <motion.div
                    key={ticket._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="p-5">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-800 truncate">
                          {ticket.event?.name || 'Untitled Event'}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <FiCalendar className="mr-2" />
                          <span className="text-sm">
                            {ticket.event?.date ? formatDate(ticket.event.date) : 'Date not available'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <FiUser className="mr-2 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            User: {ticket.user?.email || 'Anonymous'}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <FiDollarSign className="mr-2 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {ticket.quantity} ticket{ticket.quantity > 1 ? 's' : ''} • ₹{ticket.totalPrice}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            ticket.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                            {ticket.status}
                          </span>
                        </div>

                        <div className="text-xs text-gray-500 mt-2">
                          Booked on: {formatDate(ticket.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="text-red-600 hover:text-red-800 transition-colors flex items-center"
                      >
                        <FiTrash2 className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  {searchTerm ? 'No matching tickets found' : 'No tickets available'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTickets;