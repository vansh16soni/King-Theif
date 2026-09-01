import React from 'react';

export default function Scoreboard({ players, scores }) {
  const sorted = [...players].sort((a, b) => {
    const keyA = a.userId || a.socketId || a.username;
    const keyB = b.userId || b.socketId || b.username;
    return (scores[keyB] || 0) - (scores[keyA] || 0);
  });

  return (
    <div className="royal-glass rounded-3xl p-5 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 border-b border-amber-500/20 pb-2.5">
        <h3 className="font-cinzel font-black text-amber-300 text-sm tracking-wider uppercase flex items-center gap-1.5">
          <span>🏆</span> Imperial Leaderboard
        </h3>
        <span className="text-[10px] text-amber-300/60 font-cinzel uppercase font-bold">Total Score</span>
      </div>

      <ul className="space-y-2">
        {sorted.map((p, idx) => {
          const key = p.userId || p.socketId || p.username;
          return (
            <li
              key={key}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                idx === 0
                  ? 'bg-amber-950/30 border-amber-500/40 shadow-sm'
                  : 'bg-[#0f091e] border-slate-700/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 text-center font-cinzel font-black text-xs">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                </span>
                <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                  {p.username}
                  {p.isBot && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-purple-900/60 text-purple-300 border border-purple-500/30 font-medium">
                      🤖 Bot
                    </span>
                  )}
                </span>
              </div>
              <span className="font-cinzel font-black text-sm text-raja">
                {(scores[key] || 0).toLocaleString()} pts
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
