import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    setRole(savedRole);
  }, []);

  const login = (newRole) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem('role');
    navigate('/'); // Redirect to home on logout
    toast.success('Logged out successfully');
    document.cookie = 'token=; Max-Age=0';
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
