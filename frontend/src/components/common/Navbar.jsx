import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
            <Link 
              to={role === 'admin' ? '/admin/dashboard' : '/'} 
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              onClick={closeMobileMenu}
            >
              {role === 'admin' ? '2dHand Admin' : '2dHand'}
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
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
                  <Link to="/contact" className="text-gray-700 font-medium">Contact</Link>
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
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-purple-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-2">
                {role !== 'admin' && (
                  <motion.div
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-2 rounded-md"
                  >
                    <Link 
                      to="/" 
                      className="text-gray-700 font-medium block w-full"
                      onClick={closeMobileMenu}
                    >
                      Home
                    </Link>
                  </motion.div>
                )}

                {role === 'user' && (
                  <>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/my-tickets" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        My Tickets
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/profile" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/contact" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Contact
                      </Link>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <button 
                        onClick={() => {
                          closeMobileMenu();
                          logout();
                        }} 
                        className="text-red-500 font-medium block w-full text-left"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}

                {role === 'admin' && (
                  <>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/admin/dashboard" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/admin/users" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Users
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/admin/tickets" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Tickets
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/admin/messages" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Messages
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/admin/events" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Events
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/admin/banners" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Banners
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <button 
                        onClick={() => {
                          closeMobileMenu();
                          logout();
                        }} 
                        className="text-red-500 font-medium block w-full text-left"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}

                {!role && (
                  <>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/login" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        User Login
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-md"
                    >
                      <Link 
                        to="/admin/login" 
                        className="text-gray-700 font-medium block w-full"
                        onClick={closeMobileMenu}
                      >
                        Admin Login
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}