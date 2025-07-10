import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './components/admin/AdminLogin'
import Navbar from './components/common/Navbar'
import UserLogin from './components/user/UserLogin'
import UserRegister from './components/user/UserRegister'
import Profile from './components/user/Profile'
import Home from './pages/Home'
import AdminUsers from './pages/AdminUsers'
import AdminBanner from './pages/AdminBanner'
import AdminTickets from './pages/AdminTickets'
import AdminMessages from './pages/AdminMessages'
import AdminEvents from './pages/AdminEvents'
import AdminDashboard from './pages/AdminDashboard'
import EventsGrid from './pages/EventsGrid'
import EventDetail from './pages/EventDetail'
import MyTickets from './pages/MyTickets'
import Footer from './components/common/Footer'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/banners" element={<AdminBanner />} />
        <Route path="/admin/tickets" element={<AdminTickets />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />





        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsGrid />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/my-tickets" element={<MyTickets />} />



      </Routes>
      <Footer/>
    </div>
  )
}
