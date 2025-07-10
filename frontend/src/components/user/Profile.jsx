import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newPic, setNewPic] = useState(null);
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE}/api/users/profile`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePicChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPic) {
      setError('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', newPic);

    try {
      const res = await axios.put(`${BASE}/api/users/profile-pic`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUser((prev) => ({ ...prev, profilePic: res.data.profilePic }));
      setSuccess('Profile picture updated successfully');
    } catch (err) {
      setError(err.response?.data?.msg || 'Update failed');
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-purple-600 text-center">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={`${BASE}/${user?.profilePic}` || 'https://t4.ftcdn.net/jpg/06/22/22/17/360_F_622221708_Gg16ZdaNSixeaIORq9MuuT4w9VWTkYw4.jpg'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
        <p className="text-lg text-gray-800 font-semibold">Email: {user?.email}</p>
        <p className="text-gray-600">Name: {user?.name || 'N/A'}</p>
        <p className="text-gray-600">Member Since: {new Date(user?.createdAt).toDateString()}</p>
      </div>

      <form onSubmit={handlePicChange} className="mt-6 flex flex-col items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewPic(e.target.files[0])}
          className="text-sm"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Change Profile Picture
        </button>
        {success && <p className="text-green-600 text-sm">{success}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default Profile;
