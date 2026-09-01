import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GameOver({ winner, finalScores, players, onPlayAgain }) {
  const navigate = useNavigate();
  const sorted = [...players].sort((a, b) => {
    const keyA = a.userId || a.socketId || a.username;
    const keyB = b.userId || b.socketId || b.username;
    return (finalScores[keyB] || 0) - (finalScores[keyA] || 0);
  });

  return (
    <div className="max-w-lg mx-auto royal-glass rounded-3xl border-2 border-amber-500/50 p-8 text-center space-y-6 shadow-2xl relative overflow-hidden animate-[fadeIn_0.4s_ease-out]">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200" />
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl" />

      {/* Royal Crown Insignia */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1.5px] mx-auto shadow-gold-glow">
        <div className="w-full h-full bg-[#180f2c] rounded-3xl flex items-center justify-center text-4xl">
          👑
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-cinzel font-black tracking-widest text-amber-300 uppercase">
          Imperial Coronation Ceremony
        </span>
        <h2 className="text-3xl font-cinzel font-black gold-gradient-text uppercase">
          Match Concluded!
        </h2>
        <p className="text-sm text-slate-300 font-medium pt-1">
          Crowned Monarch of the Realm:{' '}
          <span className="font-cinzel font-black text-amber-300 text-lg underline decoration-amber-400">
            {winner}
          </span>
        </p>
      </div>

      {/* Final Noble Rankings */}
      <div className="space-y-2 text-left">
        <div className="text-[10px] font-cinzel font-bold text-amber-300/70 uppercase tracking-widest px-1">
          Final Court Standings
        </div>
        <ul className="space-y-2">
          {sorted.map((p, idx) => {
            const key = p.userId || p.socketId || p.username;
            return (
              <li
                key={key}
                className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                  idx === 0
                    ? 'bg-amber-950/40 border-amber-500/50 shadow-md'
                    : 'bg-[#0f091e] border-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-cinzel font-bold text-sm">
                    {idx === 0 ? '🥇 👑' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </span>
                  <span className="font-bold text-white text-sm">
                    {p.username} {p.isBot && <span className="text-xs text-purple-300">🤖</span>}
                  </span>
                </div>
                <span className="font-cinzel font-black text-base text-raja">
                  {(finalScores[key] || 0).toLocaleString()} pts
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => navigate('/lobby')}
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider text-slate-200 transition"
        >
          Return to Lobby 🏛️
        </button>
        {onPlayAgain && (
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 royal-btn-gold rounded-xl font-cinzel font-black text-xs uppercase tracking-wider shadow-gold-glow transition"
          >
            New Battle ⚔️
          </button>
        )}
      </div>
    </div>
  );
}
