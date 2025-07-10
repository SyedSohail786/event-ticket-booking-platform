import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiDollarSign, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaTicketAlt } from 'react-icons/fa';

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`${BASE}/api/tickets/my`, { withCredentials: true });
        setTickets(res.data);
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Failed to load tickets');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatEventDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">My Tickets</h2>
          <p className="text-gray-600 mt-2">Your upcoming and past event tickets</p>
        </motion.div>

        {tickets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <FaTicketAlt className="text-purple-600 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No tickets yet</h3>
            <p className="text-gray-600 mb-4">You haven't booked any event tickets yet.</p>
            <button
              onClick={() => navigate('/events')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Browse Events
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{ticket.event?.name}</h3>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {ticket.quantity} {ticket.quantity > 1 ? 'Tickets' : 'Ticket'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="mr-2 text-purple-500" />
                      <span>{formatEventDate(ticket.event?.date)}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="mr-2 text-purple-500" />
                      <span>{ticket.event?.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FiDollarSign className="mr-2 text-purple-500" />
                      <span>₹{ticket.totalPrice} total</span>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm">
                      <FiClock className="mr-2 text-purple-500" />
                      <span>Booked on {formatDate(ticket.createdAt)}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/event/${ticket.event?._id}`)}
                      className="w-full text-center text-purple-600 hover:text-purple-800 font-medium py-2 px-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-all"
                    >
                      View Event Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTickets;