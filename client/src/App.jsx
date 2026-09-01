import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import LoadingSpinner from './components/common/LoadingSpinner';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import RoomList from './components/lobby/RoomList';
import GameRoom from './components/game/GameRoom';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';

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
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="p-4 sm:p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lobby" element={<PrivateRoute><RoomList /></PrivateRoute>} />
          <Route path="/room/:roomCode" element={<PrivateRoute><GameRoom /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          
          <Route path="/" element={<Navigate to="/lobby" replace />} />
        </Routes>
      </main>
    </div>
  );
}
