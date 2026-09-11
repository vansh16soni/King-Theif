import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export default function JoinRoom() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleJoin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { room } = await api.joinRoom(code);
      navigate(`/room/${room.roomCode}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleJoin} className="royal-glass p-7 rounded-3xl space-y-5 shadow-castle-card relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-500" />

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-sky-100 border-2 border-sky-400/80 flex items-center justify-center text-2xl shadow-inner">
          🛡️
        </div>
        <div>
          <h2 className="text-lg font-cinzel font-black text-sky-900 tracking-wide uppercase">
            Join Castle Chamber
          </h2>
          <p className="text-xs text-[#8c6d53] font-medium">Enter with a 4-digit fortress key</p>
        </div>
      </div>

      {error && (
        <p className="text-red-800 text-xs bg-red-50 p-3 rounded-xl border border-red-300 font-medium">
          ⚠️ {error}
        </p>
      )}

      <div>
        <label className="block text-xs font-cinzel font-bold text-sky-900 uppercase tracking-wider mb-2">
          4-Digit Palace Code
        </label>
        <input
          value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="••••"
          maxLength={4}
          className="w-full px-4 py-3.5 rounded-2xl bg-[#fefaf2] border-2 border-sky-300/80 text-sky-950 font-cinzel font-black tracking-widest text-center text-3xl shadow-inner focus:outline-none focus:border-sky-500 placeholder-amber-200/60 transition"
        />
      </div>

      <button
        disabled={loading || code.length !== 4}
        className="w-full py-4 bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-xl font-cinzel font-black text-sm uppercase tracking-wider shadow-md shadow-sky-600/30 transition disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {loading ? 'Entering Chamber...' : 'Enter Castle Realm 🚪'}
      </button>
    </form>
  );
}
