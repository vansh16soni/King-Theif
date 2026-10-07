import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { CrownIcon, LockIcon, AlertIcon } from '../common/Icons';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  usePageMeta({
    title: 'Login',
    description: 'Log into your Raja Mantri Chor Sipahi account to join multiplayer rooms, track scores, and play with friends.',
    path: '/login'
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await api.login(username, password);
      login(token, user);
      navigate('/lobby');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4 py-8">
      <div className="w-full max-w-md royal-glass p-8 rounded-2xl shadow-2xl relative overflow-hidden border border-white/15">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-inner">
            <CrownIcon className="w-7 h-7 text-amber-400" />
          </div>
          <h1 className="text-2xl font-black gold-gradient-text tracking-wide uppercase mt-2">
            Login
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            Sign in to access your game rooms and leaderboard scores
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-950/80 border border-red-500/60 rounded-xl text-red-200 text-xs text-center font-bold flex items-center justify-center gap-2">
            <AlertIcon className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-username" className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <input
              id="login-username"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/15 focus:outline-none focus:border-amber-400 text-white placeholder-slate-500 text-sm shadow-inner font-medium transition focus-visible:ring-2 focus-visible:ring-amber-500"
              placeholder="Your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              id="login-password"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/15 focus:outline-none focus:border-amber-400 text-white placeholder-slate-500 text-sm shadow-inner font-medium transition focus-visible:ring-2 focus-visible:ring-amber-500"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 royal-btn-gold rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider mt-2 transition disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 shadow-lg"
          >
            <LockIcon className="w-4 h-4 text-slate-950" />
            <span>{loading ? 'Logging in...' : 'Login'}</span>
          </button>

          <p className="text-xs text-center text-slate-400 pt-2 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-400 font-bold underline hover:text-amber-300">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
