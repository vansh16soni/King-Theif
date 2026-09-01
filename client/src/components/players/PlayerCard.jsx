import React from 'react';
import BotBadge from './BotBadge';

export default function PlayerCard({ player, isHost }) {
  return (
    <div className="flex items-center justify-between bg-[#120822] rounded-2xl px-4 py-3 border border-amber-500/30 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-[1px] shadow">
          <div className="w-full h-full bg-[#180f2d] rounded-full flex items-center justify-center text-xs font-bold text-amber-200">
            {player.username.slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-sm text-white">{player.username}</span>
          {player.isBot && <BotBadge />}
          {isHost && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-cinzel font-bold">
              👑 Host
            </span>
          )}
        </div>
      </div>

      <span
        className={`text-xs px-2.5 py-1 rounded-full font-bold ${
          player.isReady
            ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
            : 'bg-slate-800 text-slate-400 border border-slate-700'
        }`}
      >
        {player.isReady ? '⚔️ Ready' : '⏳ Waiting'}
      </span>
    </div>
  );
}
