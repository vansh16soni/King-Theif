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
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-md bg-[#130b21]/95 backdrop-blur-xl border-2 border-amber-500/40 p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(217,119,6,0.2)] space-y-6 relative overflow-hidden">
        {/* Luminous Top Knight Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-amber-400 to-purple-600" />
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 via-amber-400 to-yellow-200 p-[2px] rounded-2xl mx-auto shadow-gold-glow">
            <div className="w-full h-full bg-[#0d071a] rounded-[14px] flex items-center justify-center text-3xl shadow-inner">
              🛡️
            </div>
          </div>
          <h1 className="text-2xl font-cinzel font-black tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
            Imperial Scribe Portal
          </h1>
          <p className="text-xs text-amber-200/70 font-medium">
            Authorized Crown Administrators & Court Scribes Only
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border-2 border-red-500/60 rounded-xl text-red-200 text-xs text-center font-bold shadow-inner">
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
              className="w-full px-4 py-3.5 rounded-xl bg-[#0a0514] border-2 border-amber-500/30 focus:outline-none focus:border-amber-400 text-sm text-white placeholder-slate-500 font-medium shadow-inner transition"
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
              className="w-full px-4 py-3.5 rounded-xl bg-[#0a0514] border-2 border-amber-500/30 focus:outline-none focus:border-amber-400 text-sm text-white placeholder-slate-500 font-medium shadow-inner transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 royal-btn-gold rounded-xl font-cinzel font-black text-sm uppercase tracking-wider shadow-gold-glow transition duration-150 disabled:opacity-50"
          >
            {loading ? 'Validating Imperial Seal...' : 'Access Kingdom Archives ⚡'}
          </button>
        </form>

        <div className="bg-[#0b0617] border-2 border-amber-500/25 rounded-xl p-3 text-center text-xs text-amber-200/80 font-medium shadow-inner">
          Court ID: <span className="font-mono text-amber-400 font-black">admin</span> &bull; Cipher: <span className="font-mono text-amber-400 font-black">admin123</span>
        </div>
      </div>
    </div>
  );
}
