import React from 'react';

export default function Scoreboard({ players = [], scores = {} }) {
  const sorted = [...(players || [])].sort((a, b) => {
    const keyA = a?.userId || a?.socketId || a?.username;
    const keyB = b?.userId || b?.socketId || b?.username;
    return ((scores && scores[keyB]) || 0) - ((scores && scores[keyA]) || 0);
  });

  return (
    <div className="royal-glass rounded-3xl p-5 shadow-castle-card relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 border-b-2 border-[#d8c5a2] pb-2.5">
        <h3 className="font-cinzel font-black text-[#78350f] text-sm tracking-wider uppercase flex items-center gap-1.5">
          <span>🏆</span> Castle Leaderboard
        </h3>
        <span className="text-[10px] text-[#8c6d53] font-cinzel uppercase font-black">Score</span>
      </div>

      <ul className="space-y-2">
        {sorted.map((p, idx) => {
          const key = p.userId || p.socketId || p.username;
          return (
            <li
              key={key}
              className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition ${
                idx === 0
                  ? 'bg-amber-100/90 border-amber-400 shadow-sm'
                  : 'bg-[#fffdf8] border-[#e2d5bd]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 text-center font-cinzel font-black text-sm">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#2c1a0e] flex items-center gap-1">
                  {p.username}
                  {p.isBot && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-900 border border-purple-300 font-bold">
                      🤖 Bot
                    </span>
                  )}
                </span>
              </div>
              <span className="font-cinzel font-black text-sm text-amber-900">
                {(scores[key] || 0).toLocaleString()} pts
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
