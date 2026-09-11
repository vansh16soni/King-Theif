import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export default function CreateRoom() {
  const [totalRounds, setTotalRounds] = useState(10);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCreate() {
    setError('');
    setLoading(true);
    try {
      const { room } = await api.createRoom(totalRounds);
      navigate(`/room/${room.roomCode}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="royal-glass p-7 rounded-3xl space-y-5 shadow-castle-card relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-400/80 flex items-center justify-center text-2xl shadow-inner">
          🏰
        </div>
        <div>
          <h2 className="text-lg font-cinzel font-black text-[#78350f] tracking-wide uppercase">
            Host Castle Darbar
          </h2>
          <p className="text-xs text-[#8c6d53] font-medium">Create a new private court chamber</p>
        </div>
      </div>

      {error && (
        <p className="text-red-800 text-xs bg-red-50 p-3 rounded-xl border border-red-300 font-medium">
          ⚠️ {error}
        </p>
      )}

      <label className="block text-xs font-cinzel font-bold text-[#5c3e28] uppercase tracking-wider">
        Court Rounds (10 - 15)
        <div className="mt-2.5 flex items-center gap-3">
          <input
            type="range"
            min={10}
            max={15}
            value={totalRounds}
            onChange={e => setTotalRounds(Number(e.target.value))}
            className="flex-1 accent-amber-600 cursor-pointer h-2.5 bg-[#ebdcc2] rounded-lg"
          />
          <span className="w-12 text-center font-black text-amber-900 text-lg bg-[#fef9ee] border-2 border-amber-400/70 py-1 rounded-xl shadow-inner">
            {totalRounds}
          </span>
        </div>
      </label>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full py-4 royal-btn-gold rounded-xl font-cinzel font-black text-sm uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? 'Convening Castle Council...' : 'Summon Castle Court 🏛️'}
      </button>
    </div>
  );
}
