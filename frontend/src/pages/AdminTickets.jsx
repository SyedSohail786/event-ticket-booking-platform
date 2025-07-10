import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${BASE}/api/tickets`, { withCredentials: true });
      setTickets(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to load tickets');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE}/api/tickets/${id}`, { withCredentials: true });
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete ticket');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `${BASE}/api/tickets/${id}`,
        { status },
        { withCredentials: true }
      );
      fetchTickets();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Manage Tickets</h2>

      {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-purple-100 text-gray-800">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Event</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Booking Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b">
                <td className="p-3">{ticket.userId?.email}</td>
                <td className="p-3">{ticket.eventId?.title}</td>
                <td className="p-3">{ticket.quantity}</td>
                <td className="p-3">{new Date(ticket.bookingDate).toLocaleDateString()}</td>
                <td className="p-3">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTickets;
