import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminEvents() {
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    ticketPrice: '',
    availableTickets: '',
    image: null,
    _id: null
  });
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);

  const fetchEvents = async () => {
    const res = await axios.get(`${BASE}/api/events`);
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    try {
      if (editing) {
        await axios.put(`${BASE}/api/events/${form._id}`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage('Event updated successfully');
      } else {
        await axios.post(`${BASE}/api/events`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage('Event created successfully');
      }

      setForm({
        name: '',
        description: '',
        location: '',
        date: '',
        ticketPrice: '',
        availableTickets: '',
        image: null,
        _id: null
      });
      setEditing(false);
      fetchEvents();
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Something went wrong');
    }
  };

  const handleEdit = (event) => {
    setEditing(true);
    setForm({ ...event, image: null });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    await axios.delete(`${BASE}/api/events/${id}`, { withCredentials: true });
    fetchEvents();
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
          <h2 className="text-2xl font-bold text-white">
            {editing ? 'Edit Event' : 'Create New Event'}
          </h2>
        </div>
        
        <div className="p-6">
          {message && (
            <div className={`mb-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} transition-opacity duration-300`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter event name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price (₹)</label>
                <input
                  name="ticketPrice"
                  type="number"
                  value={form.ticketPrice}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Tickets</label>
                <input
                  name="availableTickets"
                  type="number"
                  value={form.availableTickets}
                  onChange={handleChange}
                  placeholder="Enter ticket quantity"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter event description"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              >
                {editing ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
          <h3 className="text-xl font-bold text-white">All Events</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date?.slice(0, 10)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{event.ticketPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.availableTickets}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminEvents;