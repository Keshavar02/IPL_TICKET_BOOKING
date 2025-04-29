import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import Booking from './pages/Booking';
import TicketConfirmation from './pages/TicketConfirmation';
import Payment from './pages/Payment';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMatches from './pages/admin/AdminMatches';
import AdminStadiums from './pages/admin/AdminStadiums';
import AdminTeams from './pages/admin/AdminTeams';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route path="/booking/:matchId" element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              } />
              
              <Route path="/payment/:ticketId" element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } />
              
              <Route path="/ticket/:ticketId" element={
                <ProtectedRoute>
                  <TicketConfirmation />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              
              <Route path="/admin/matches" element={
                <AdminRoute>
                  <AdminMatches />
                </AdminRoute>
              } />
              
              <Route path="/admin/stadiums" element={
                <AdminRoute>
                  <AdminStadiums />
                </AdminRoute>
              } />
              
              <Route path="/admin/teams" element={
                <AdminRoute>
                  <AdminTeams />
                </AdminRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;