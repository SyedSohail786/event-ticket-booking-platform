import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`${BASE}/api/tickets/my`, { withCredentials: true });
        setTickets(res.data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err.message);
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
    });
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading your tickets...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">My Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500">You have not booked any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="border p-4 rounded shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  {ticket.event?.name}
                </h3>
                <p className="text-sm text-gray-700">
                  <strong>Location:</strong> {ticket.event?.location}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Quantity:</strong> {ticket.quantity}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Total Price:</strong> ₹{ticket.totalPrice}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Booked On:</strong> {formatDate(ticket.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTickets;
