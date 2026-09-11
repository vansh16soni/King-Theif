import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GameOver({ winner, finalScores = {}, players = [], onPlayAgain }) {
  const navigate = useNavigate();
  const sorted = [...(players || [])].sort((a, b) => {
    const keyA = a?.userId || a?.socketId || a?.username;
    const keyB = b?.userId || b?.socketId || b?.username;
    return ((finalScores && finalScores[keyB]) || 0) - ((finalScores && finalScores[keyA]) || 0);
  });

  return (
    <div className="max-w-lg mx-auto royal-glass rounded-3xl border-2 border-amber-400/80 p-8 text-center space-y-6 shadow-castle-card relative overflow-hidden animate-[fadeIn_0.4s_ease-out]">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200" />
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Royal Crown Insignia */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[2px] mx-auto shadow-gold-glow">
        <div className="w-full h-full bg-[#fef9ee] rounded-[22px] flex items-center justify-center text-4xl shadow-inner">
          👑
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-cinzel font-black tracking-widest text-[#92400e] uppercase">
          Imperial Coronation Ceremony
        </span>
        <h2 className="text-3xl font-cinzel font-black gold-gradient-text uppercase">
          Match Concluded!
        </h2>
        <p className="text-sm text-[#5c3e28] font-bold pt-1">
          Crowned Monarch of the Castle Realm:{' '}
          <span className="font-cinzel font-black text-amber-900 text-lg underline decoration-amber-500">
            {winner}
          </span>
        </p>
      </div>

      {/* Final Noble Rankings */}
      <div className="space-y-2 text-left">
        <div className="text-[10px] font-cinzel font-black text-[#854d0e] uppercase tracking-widest px-1">
          Final Court Standings
        </div>
        <ul className="space-y-2">
          {sorted.map((p, idx) => {
            const key = p.userId || p.socketId || p.username;
            return (
              <li
                key={key}
                className={`flex items-center justify-between p-3 rounded-2xl border-2 transition ${
                  idx === 0
                    ? 'bg-amber-100/90 border-amber-400 shadow-sm'
                    : 'bg-[#fffdf8] border-[#e2d5bd]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-cinzel font-black text-base">
                    {idx === 0 ? '🥇 👑' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </span>
                  <span className="font-bold text-[#2c1a0e] text-sm">
                    {p.username} {p.isBot && <span className="text-xs text-purple-700">🤖</span>}
                  </span>
                </div>
                <span className="font-cinzel font-black text-base text-amber-900">
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
          className="flex-1 py-3.5 castle-btn-stone rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition"
        >
          Return to Lobby 🏛️
        </button>
        {onPlayAgain && (
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3.5 royal-btn-gold rounded-xl font-cinzel font-black text-xs uppercase tracking-wider shadow-gold-glow transition"
          >
            New Battle ⚔️
          </button>
        )}
      </div>
    </div>
  );
}
