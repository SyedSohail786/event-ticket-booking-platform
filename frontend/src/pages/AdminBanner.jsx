import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminBanner() {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [banner, setBanner] = useState(null);
  const [banners, setBanners] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${BASE}/api/banners`);
      setBanners(res.data);
    } catch (err) {
      console.error('Error fetching banners:', err.message);
    }
  };

  useEffect(() => {
    fetchBanners();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!eventName || !location || (!banner && !editingId)) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('location', location);
    if (banner) formData.append('bannerImage', banner);

    try {
      if (editingId) {
        await axios.patch(`${BASE}/api/banners/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
        setSuccess('Banner updated successfully');
      } else {
        await axios.post(`${BASE}/api/banners`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
        setSuccess('Banner added successfully');
      }

      setEventName('');
      setLocation('');
      setBanner(null);
      setEditingId(null);
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.msg || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    try {
      await axios.delete(`${BASE}/api/banners/${id}`, { withCredentials: true });
      setSuccess('Banner deleted successfully');
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.msg || 'Delete failed');
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setEventName(banner.eventName);
    setLocation(banner.location);
    setBanner(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
          <h2 className="text-xl font-bold text-white">
            {editingId ? 'Edit Banner' : 'Create New Banner'}
          </h2>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md transition-opacity duration-300">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md transition-opacity duration-300">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBanner(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
              />
              {editingId && (
                <p className="mt-1 text-xs text-gray-500">Leave blank to keep current image</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              >
                {editingId ? 'Update Banner' : 'Upload Banner'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Existing Banners Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900">
          <h3 className="text-xl font-semibold text-white">Existing Banners</h3>
        </div>

        <div className="p-4 md:p-6">
          {banners.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No banners available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${BASE}/uploads/${b.bannerImage.replace(/\\/g, '/')}`}
                      alt={b.eventName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-800">{b.eventName}</h4>
                    <p className="text-sm text-gray-600 mb-3">{b.location}</p>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(b)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminBanner;