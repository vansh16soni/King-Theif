import React from 'react';
import { TrophyIcon, CrownIcon } from '../common/Icons';

export default function Scoreboard({ players = [], scores = {} }) {
  const sorted = [...(players || [])].sort((a, b) => {
    const keyA = a?.userId || a?.socketId || a?.username;
    const keyB = b?.userId || b?.socketId || b?.username;
    return ((scores && scores[keyB]) || 0) - ((scores && scores[keyA]) || 0);
  });

  return (
    <div className="royal-glass rounded-2xl p-5 shadow-2xl relative overflow-hidden border border-white/15">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
        <h3 className="font-black text-amber-400 text-sm tracking-wider uppercase flex items-center gap-1.5">
          <TrophyIcon className="w-4 h-4 text-amber-400" />
          <span>Leaderboard</span>
        </h3>
        <span className="text-[10px] text-slate-400 uppercase font-bold">Points</span>
      </div>

      <ul className="space-y-2">
        {sorted.map((p, idx) => {
          const key = p.userId || p.socketId || p.username;
          return (
            <li
              key={key}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                idx === 0
                  ? 'bg-amber-950/60 border-amber-400/80 shadow-md'
                  : 'bg-slate-900/60 border-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 text-center font-black text-xs text-amber-400">
                  #{idx + 1}
                </span>
                <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  {idx === 0 && <CrownIcon className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{p.username}</span>
                  {p.isBot && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                      AI
                    </span>
                  )}
                </span>
              </div>
              <span className="font-black text-sm text-amber-300">
                {(scores[key] || 0).toLocaleString()} pts
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
