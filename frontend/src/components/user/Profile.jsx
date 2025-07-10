import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FiCamera, FiMail, FiUser, FiCalendar } from 'react-icons/fi';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPic, setNewPic] = useState(null);
  const [previewPic, setPreviewPic] = useState('');
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE}/api/users/profile`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!newPic) return;
    
    const objectUrl = URL.createObjectURL(newPic);
    setPreviewPic(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [newPic]);

  const handlePicChange = async (e) => {
    e.preventDefault();
    if (!newPic) {
      toast.error('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', newPic);

    try {
      setLoading(true);
      const res = await axios.put(`${BASE}/api/users/profile-pic`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUser((prev) => ({ ...prev, profilePic: res.data.profilePic }));
      setNewPic(null);
      setPreviewPic('');
      toast.success('Profile picture updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to update profile picture');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
          <div className="relative inline-block">
            <div className="relative group">
              <img
                src={previewPic || `${BASE}/${user?.profilePic}` || 'https://t4.ftcdn.net/jpg/06/22/22/17/360_F_622221708_Gg16ZdaNSixeaIORq9MuuT4w9VWTkYw4.jpg'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
              />
              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer group-hover:bg-purple-100 transition-colors">
                <FiCamera className="text-purple-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPic(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">{user?.name || 'User'}</h1>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FiMail className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FiUser className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{user?.username || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FiCalendar className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active since</p>
                <p className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Update Button */}
          {newPic && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4"
            >
              <button
                onClick={handlePicChange}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Profile Picture'
                )}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;