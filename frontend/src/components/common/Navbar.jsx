import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { role, logout } = useAuth();

  // Animation variants
  const linkVariants = {
    hover: {
      scale: 1.05,
      color: '#9333ea', // purple-600
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to={role === 'admin' ? '/admin/dashboard' : '/'} className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {role === 'admin' ? '2dHand Admin' : '2dHand'}
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {role !== 'admin' && (
              <motion.div
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/" className="text-gray-700 font-medium">Home</Link>
              </motion.div>
            )}

            {role === 'user' && (
              <>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/my-tickets" className="text-gray-700 font-medium">My Tickets</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/profile" className="text-gray-700 font-medium">Profile</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <button onClick={logout} className="text-red-500 font-medium">Logout</button>
                </motion.div>
              </>
            )}

            {role === 'admin' && (
              <>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/admin/dashboard" className="text-gray-700 font-medium">Dashboard</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/admin/users" className="text-gray-700 font-medium">Users</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/admin/tickets" className="text-gray-700 font-medium">Tickets</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/admin/messages" className="text-gray-700 font-medium">Messages</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/admin/events" className="text-gray-700 font-medium">Events</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/admin/banners" className="text-gray-700 font-medium">Banners</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <button onClick={logout} className="text-red-500 font-medium">Logout</button>
                </motion.div>
              </>
            )}

            {!role && (
              <>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/login" className="text-gray-700 font-medium">User Login</Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <Link to="/admin/login" className="text-gray-700 font-medium">Admin Login</Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-purple-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Mobile navigation links would go here */}
          {/* You would need to implement the mobile menu functionality */}
        </div>
      </div>
    </nav>
  );
}