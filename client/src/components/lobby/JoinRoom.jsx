import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { useGame } from '../../contexts/GameContext';
import { KeyIcon, AlertIcon } from '../common/Icons';

export default function JoinRoom() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setInitialRoom, joinRoomChannel } = useGame();
  const navigate = useNavigate();

  async function handleJoin(e) {
    e.preventDefault();
    setError('');
    const cleanCode = code.trim();
    if (cleanCode.length !== 4) return;
    setLoading(true);
    try {
      const { room } = await api.joinRoom(cleanCode);
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
    <form onSubmit={handleJoin} className="royal-glass p-7 rounded-2xl space-y-5 shadow-2xl relative overflow-hidden border border-white/15">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
          <KeyIcon className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h2 className="text-lg font-black text-amber-300 tracking-wide uppercase">
            Join Room
          </h2>
          <p className="text-xs text-slate-300 font-medium">Enter with a 4-digit room code</p>
        </div>
      </div>

      {error && (
        <div className="text-red-200 text-xs bg-red-950/80 p-3 rounded-xl border border-red-500/60 font-medium flex items-center gap-2">
          <AlertIcon className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="room-code-input" className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
          4-Digit Room Code
        </label>
        <input
          id="room-code-input"
          value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="••••"
          maxLength={4}
          aria-label="Four digit room code"
          className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-white/15 text-amber-300 font-black tracking-widest text-center text-3xl shadow-inner focus:outline-none focus:border-amber-400 placeholder-slate-600 transition focus-visible:ring-2 focus-visible:ring-amber-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading || code.length !== 4}
        className="w-full py-3.5 royal-btn-gold rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition disabled:opacity-40 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 shadow-lg"
      >
        <KeyIcon className="w-4 h-4 text-slate-950" />
        <span>{loading ? 'Joining Room...' : 'Join Room'}</span>
      </button>
    </form>
  );
}
