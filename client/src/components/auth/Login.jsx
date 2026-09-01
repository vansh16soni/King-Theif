import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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
    <div className="flex items-center justify-center min-h-[82vh] px-4 py-8">
      <div className="w-full max-w-md royal-glass p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Ornate Gold Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1px] mx-auto shadow-xl shadow-amber-500/20">
            <div className="w-full h-full bg-[#160e29] rounded-2xl flex items-center justify-center text-3xl">
              👑
            </div>
          </div>
          <h1 className="text-2xl font-cinzel font-black gold-gradient-text tracking-wide uppercase mt-2">
            Royal Court Entrance
          </h1>
          <p className="text-xs text-amber-200/60 font-medium">
            Enter your noble credentials to access the Darbar
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-1.5">
              Player Moniker
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[#0e081c] border border-amber-500/30 focus:outline-none focus:border-amber-400 text-white placeholder-slate-500 text-sm shadow-inner transition"
              placeholder="e.g. MaharajaVansh"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-1.5">
              Secret Cipher
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[#0e081c] border border-amber-500/30 focus:outline-none focus:border-amber-400 text-white placeholder-slate-500 text-sm shadow-inner transition"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3.5 royal-btn-gold rounded-xl font-cinzel font-black text-sm uppercase tracking-wider mt-2 transition disabled:opacity-50"
          >
            {loading ? 'Opening Castle Gates...' : 'Enter Kingdom 🏰'}
          </button>

          <p className="text-xs text-center text-slate-400 pt-2">
            No royal title yet?{' '}
            <Link to="/register" className="text-amber-400 font-bold hover:underline">
              Request Court Knighthood
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
