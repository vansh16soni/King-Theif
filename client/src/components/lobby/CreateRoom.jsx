import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { useGame } from '../../contexts/GameContext';
import { CrownIcon, AlertIcon } from '../common/Icons';

export default function CreateRoom() {
  const [totalRounds, setTotalRounds] = useState(10);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setInitialRoom, joinRoomChannel } = useGame();
  const navigate = useNavigate();

  async function handleCreate() {
    setError('');
    setLoading(true);
    try {
      const { room } = await api.createRoom(totalRounds);
      if (room) {
        setInitialRoom(room);
        joinRoomChannel(room.roomCode);
        navigate(`/room/${room.roomCode}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="royal-glass p-7 rounded-2xl space-y-5 shadow-2xl relative overflow-hidden border border-white/15">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
          <CrownIcon className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h2 className="text-lg font-black text-amber-300 tracking-wide uppercase">
            Create Room
          </h2>
          <p className="text-xs text-slate-300 font-medium">Host a private multiplayer game room</p>
        </div>
      </div>

      {error && (
        <div className="text-red-200 text-xs bg-red-950/80 p-3 rounded-xl border border-red-500/60 font-medium flex items-center gap-2">
          <AlertIcon className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
        Total Rounds (10 to 15)
        <div className="mt-2.5 flex items-center gap-3">
          <input
            type="range"
            min={10}
            max={15}
            value={totalRounds}
            onChange={e => setTotalRounds(Number(e.target.value))}
            className="flex-1 accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg focus-visible:ring-2 focus-visible:ring-amber-500"
          />
          <span className="w-12 text-center font-black text-amber-400 text-lg bg-slate-900/90 border border-amber-500/40 py-1 rounded-xl shadow-inner">
            {totalRounds}
          </span>
        </div>
      </label>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full py-3.5 royal-btn-gold rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 shadow-lg"
      >
        <CrownIcon className="w-4 h-4 text-slate-950" />
        <span>{loading ? 'Creating Room...' : 'Create Room'}</span>
      </button>
    </div>
  );
}
