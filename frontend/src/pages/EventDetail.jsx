import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { FaTicketAlt } from 'react-icons/fa';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${BASE}/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        toast.error('Failed to load event details');
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    try {
      const role = localStorage.getItem('role');
      if (role !== 'user') {
        toast.error('Please login as user to book tickets');
        return navigate('/login');
      }

      setBooking(true);
      const res = await axios.post(
        `${BASE}/api/tickets/book`,
        { eventId: id, quantity },
        { withCredentials: true }
      );

      toast.success('Ticket booked successfully!');
      setEvent((prev) => ({
        ...prev,
        availableTickets: prev.availableTickets - quantity
      }));
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to book ticket');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-purple-600 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Events
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="relative">
            <img
              src={`${BASE}/${event.image}`}
              alt={event.name}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
              <FiCalendar className="inline mr-2" />
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{event.name}</h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <FiMapPin className="mr-2" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-6">
              <FiDollarSign className="mr-2" />
              <span className="font-bold text-purple-600">₹{event.ticketPrice} per ticket</span>
            </div>

            <div className="prose max-w-none text-gray-700 mb-8">
              <p>{event.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Book Your Tickets</h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Tickets
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-l-lg"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        if (val > event.availableTickets) {
                          toast.error(`Only ${event.availableTickets} tickets available`);
                          return;
                        }
                        setQuantity(Math.max(1, Math.min(val, event.availableTickets)));
                      }}
                      min="1"
                      max={event.availableTickets}
                      className="border-t border-b border-gray-300 px-3 py-1 w-16 text-center"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(event.availableTickets, quantity + 1))}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-r-lg"
                      disabled={quantity >= event.availableTickets}
                    >
                      +
                    </button>
                    <span className="ml-3 text-sm text-gray-600">
                      {event.availableTickets} tickets remaining
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="text-xl font-bold text-purple-600">
                    ₹{(event.ticketPrice * quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={handleBooking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={booking || event.availableTickets <= 0}
                className={`w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all ${(booking || event.availableTickets <= 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {booking ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FaTicketAlt className="mr-2" />
                    {event.availableTickets <= 0 ? 'Sold Out' : 'Book Now'}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EventDetail;