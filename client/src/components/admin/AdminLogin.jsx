import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export default function AdminLogin({ onAdminLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setError(err.message || 'Invalid royal admin credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[82vh] px-4 py-8">
      <div className="w-full max-w-md royal-glass p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-amber-400 to-purple-600" />

        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-700 via-amber-500 to-yellow-200 p-[1.5px] rounded-2xl mx-auto shadow-gold-glow">
            <div className="w-full h-full bg-[#180f2d] rounded-2xl flex items-center justify-center text-3xl">
              🛡️
            </div>
          </div>
          <h1 className="text-2xl font-cinzel font-black gold-gradient-text tracking-wide uppercase">
            Imperial Scribe Portal
          </h1>
          <p className="text-xs text-amber-200/60 font-medium">
            Authorized Crown Administrators & Court Scribes Only
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-500/60 rounded-xl text-red-200 text-xs text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-1.5">
              Admin Moniker
            </label>
            <input
              type="text"
              placeholder="e.g. admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0e081c] border border-amber-500/30 focus:outline-none focus:border-amber-400 text-sm text-white placeholder-slate-500 shadow-inner transition"
            />
          </div>

          <div>
            <label className="block text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-1.5">
              Imperial Secret Key
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0e081c] border border-amber-500/30 focus:outline-none focus:border-amber-400 text-sm text-white placeholder-slate-500 shadow-inner transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 royal-btn-gold rounded-xl font-cinzel font-black text-sm uppercase tracking-wider shadow-gold-glow transition duration-150 disabled:opacity-50"
          >
            {loading ? 'Validating Imperial Seal...' : 'Access Kingdom Archives ⚡'}
          </button>
        </form>

        <div className="bg-[#0e081c] border border-amber-500/20 rounded-xl p-3 text-center text-xs text-amber-200/70">
          Court ID: <span className="font-mono text-raja font-bold">admin</span> &bull; Cipher: <span className="font-mono text-raja font-bold">admin123</span>
        </div>
      </div>
    </div>
  );
}
