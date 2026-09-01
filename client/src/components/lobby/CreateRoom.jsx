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
    <div className="royal-glass p-7 rounded-3xl space-y-5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/10 via-amber-400 to-amber-500/10" />
      
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
          👑
        </div>
        <div>
          <h2 className="text-lg font-cinzel font-black text-amber-300 tracking-wide uppercase">
            Host Royal Darbar
          </h2>
          <p className="text-xs text-amber-200/60 font-medium">Create a new private court chamber</p>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs bg-red-950/60 p-2.5 rounded-xl border border-red-500/40">{error}</p>}

      <label className="block text-xs font-cinzel font-bold text-amber-200 uppercase tracking-wider">
        Court Rounds (10 - 15)
        <div className="mt-2 flex items-center gap-3">
          <input
            type="range"
            min={10}
            max={15}
            value={totalRounds}
            onChange={e => setTotalRounds(Number(e.target.value))}
            className="flex-1 accent-amber-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
          />
          <span className="w-10 text-center font-black text-raja text-base bg-[#0e081c] border border-amber-500/30 py-1 rounded-lg">
            {totalRounds}
          </span>
        </div>
      </label>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full py-3.5 royal-btn-gold rounded-xl font-cinzel font-black text-sm uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? 'Convening Council...' : 'Summon Royal Court 🏛️'}
      </button>
    </div>
  );
}
