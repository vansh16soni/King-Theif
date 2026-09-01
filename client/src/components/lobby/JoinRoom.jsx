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
    <form onSubmit={handleJoin} className="royal-glass p-7 rounded-3xl space-y-5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500/10 via-sky-400 to-sky-500/10" />

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-2xl shadow-inner">
          🛡️
        </div>
        <div>
          <h2 className="text-lg font-cinzel font-black text-sky-300 tracking-wide uppercase">
            Join Royal Chamber
          </h2>
          <p className="text-xs text-sky-200/60 font-medium">Enter with a 4-digit court key</p>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs bg-red-950/60 p-2.5 rounded-xl border border-red-500/40">{error}</p>}

      <div>
        <label className="block text-xs font-cinzel font-bold text-sky-200 uppercase tracking-wider mb-2">
          4-Digit Palace Code
        </label>
        <input
          value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="••••"
          maxLength={4}
          className="w-full px-4 py-3 rounded-xl bg-[#0e081c] border border-sky-500/30 text-sky-300 font-cinzel font-black tracking-widest text-center text-3xl shadow-inner focus:outline-none focus:border-sky-400 placeholder-slate-700 transition"
        />
      </div>

      <button
        disabled={loading || code.length !== 4}
        className="w-full py-3.5 bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-xl font-cinzel font-black text-sm uppercase tracking-wider shadow-lg shadow-sky-600/30 transition disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {loading ? 'Entering Chamber...' : 'Enter Royal Realm 🚪'}
      </button>
    </form>
  );
}
