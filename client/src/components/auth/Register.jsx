import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
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
      const { token, user } = await api.register(username, password);
      login(token, user);
      navigate('/lobby');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-md royal-glass p-8 rounded-3xl shadow-castle-card relative overflow-hidden">
        {/* Ornate Gold Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-700 via-amber-400 to-yellow-200 p-[2px] mx-auto shadow-md">
            <div className="w-full h-full bg-[#fef9ee] rounded-[14px] flex items-center justify-center text-3xl shadow-inner">
              ⚔️
            </div>
          </div>
          <h1 className="text-2xl font-cinzel font-black gold-gradient-text tracking-wide uppercase mt-2">
            Claim Your Castle Crown
          </h1>
          <p className="text-xs text-[#6b513c] font-medium">
            Register your name upon the Grand Castle Scroll
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-900 text-xs text-center font-bold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-cinzel font-bold text-[#78350f] uppercase tracking-wider mb-1.5">
              Chosen Title / Username
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[#fefaf2] border-2 border-[#dccab0] focus:outline-none focus:border-amber-500 text-[#2c1a0e] placeholder-[#a68c74] text-sm shadow-inner font-medium transition"
              placeholder="e.g. MaharajaVansh (min 3 chars)"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-cinzel font-bold text-[#78350f] uppercase tracking-wider mb-1.5">
              Royal Passkey
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[#fefaf2] border-2 border-[#dccab0] focus:outline-none focus:border-amber-500 text-[#2c1a0e] placeholder-[#a68c74] text-sm shadow-inner font-medium transition"
              type="password"
              placeholder="Secret Passkey (min 6 chars)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 royal-btn-gold rounded-xl font-cinzel font-black text-sm uppercase tracking-wider mt-2 transition disabled:opacity-50 shadow-gold-glow"
          >
            {loading ? 'Inscribing Castle Scroll...' : 'Swear Allegiance 👑'}
          </button>

          <p className="text-xs text-center text-[#6b513c] pt-2 font-medium">
            Already ordained noble?{' '}
            <Link to="/login" className="text-[#92400e] font-black underline hover:text-[#78350f]">
              Enter Castle Gates
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
