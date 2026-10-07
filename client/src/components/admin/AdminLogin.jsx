import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { usePageMeta } from '../../hooks/usePageMeta';
import { ShieldIcon, AlertIcon, KeyIcon } from '../common/Icons';

export default function AdminLogin({ onAdminLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  usePageMeta({
    title: 'Admin Login',
    description: 'Administrative portal login for Raja Mantri Chor Sipahi game management.',
    path: '/admin/login'
  });

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.adminLogin(username, password);
      localStorage.setItem('rmcs_admin_token', data.token);
      localStorage.setItem('rmcs_admin_user', JSON.stringify(data.admin));
      if (onAdminLogin) onAdminLogin(data.token, data.admin);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4 py-8">
      <div className="w-full max-w-md bg-slate-950/90 backdrop-blur-xl border border-amber-500/40 p-8 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-amber-950/80 border border-amber-400/80 rounded-2xl mx-auto flex items-center justify-center text-amber-300 shadow-inner">
            <ShieldIcon className="w-7 h-7 text-amber-400" />
          </div>
          <h1 className="text-2xl font-black tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            Admin Portal
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Authorized System Administrators
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-red-200 text-xs text-center font-bold flex items-center justify-center gap-2">
            <AlertIcon className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:border-amber-400 text-sm text-white placeholder-slate-600 font-medium transition focus-visible:ring-2 focus-visible:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:border-amber-400 text-sm text-white placeholder-slate-600 font-medium transition focus-visible:ring-2 focus-visible:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 royal-btn-gold rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <KeyIcon className="w-4 h-4 text-slate-950" />
            <span>{loading ? 'Logging in...' : 'Login as Admin'}</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-xs text-amber-400 font-bold underline hover:text-amber-300"
          >
            ← Return to Standard Login
          </button>
        </div>
      </div>
    </div>
  );
}
