import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CookieConsent from './components/common/CookieConsent';
import LoadingSpinner from './components/common/LoadingSpinner';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import RoomList from './components/lobby/RoomList';
import GameRoom from './components/game/GameRoom';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import CookiePolicy from './components/legal/CookiePolicy';
import NotFound from './components/common/NotFound';
import ThreeBackground from './components/common/ThreeBackground';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner label="Checking session..." />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const adminToken = localStorage.getItem('rmcs_admin_token');
  if (!adminToken) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen text-slate-100 flex flex-col relative selection:bg-amber-400 selection:text-black">
      <ThreeBackground />
      <Navbar />
      <main className="flex-1 p-4 sm:p-6 flex flex-col relative z-10">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lobby" element={<PrivateRoute><RoomList /></PrivateRoute>} />
          <Route path="/room/:roomCode" element={<PrivateRoute><GameRoom /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          {/* Public Legal & Compliance Routes */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/lobby" replace />} />
          
          {/* Custom 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
