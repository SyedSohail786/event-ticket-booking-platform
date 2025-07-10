import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
     const { role, logout } = useAuth();

     return (
          <nav className="bg-white shadow-md sticky top-0 z-50">
               <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="text-xl font-bold text-purple-600">
                         {role === 'admin' ? '2dHand Admin' : '2dHand'}
                    </div>

                    <div className="flex space-x-6 items-center">
                         {
                              role != 'admin' && (
                                   <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>

                              )
                         }

                         {role === 'user' && (
                              <>
                                   <Link to="/my-tickets" className="text-gray-700 hover:text-purple-600 font-medium">My Tickets</Link>
                                   <Link to="/profile" className="text-gray-700 hover:text-purple-600 font-medium">Profile</Link>
                                   <button onClick={logout} className="text-red-500 font-medium">Logout</button>
                              </>
                         )}

                         {role === 'admin' && (
                              <>
                                   <Link to="/admin/dashboard" className="text-gray-700 hover:text-purple-600 font-medium">Dashboard</Link>
                                   <Link to="/admin/users" className="text-gray-700 hover:text-purple-600 font-medium">Users</Link>
                                   <Link to="/admin/tickets" className="text-gray-700 hover:text-purple-600 font-medium">Tickets</Link>
                                   <Link to="/admin/messages" className="text-gray-700 hover:text-purple-600 font-medium">Messages</Link>
                                   <Link to="/admin/events" className="text-gray-700 hover:text-purple-600 font-medium">Events</Link>
                                   <Link to="/admin/banners" className="text-gray-700 hover:text-purple-600 font-medium">Banners</Link>
                                   <button onClick={logout} className="text-red-500 font-medium">Logout</button>
                              </>
                         )}

                         {!role && (
                              <>
                                   <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium">User Login</Link>
                                   <Link to="/admin/login" className="text-gray-700 hover:text-purple-600 font-medium">Admin Login</Link>
                              </>
                         )}
                    </div>
               </div>
          </nav>
     );
}
