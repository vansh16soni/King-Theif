import React from 'react';
import BotBadge from './BotBadge';
import { CrownIcon, CheckIcon, ClockIcon } from '../common/Icons';

export default function PlayerCard({ player, isHost }) {
  return (
    <div className="flex items-center justify-between bg-slate-900/80 rounded-xl px-4 py-3 border border-white/10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 p-[1.5px] shadow-sm">
          <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center text-xs font-black text-amber-400">
            {(player?.username || '??').slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-sm text-white">{player?.username || 'Player'}</span>
          {player?.isBot && <BotBadge />}
          {isHost && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-sm flex items-center gap-1">
              <CrownIcon className="w-3 h-3 text-amber-400" />
              <span>Host</span>
            </span>
          )}
        </div>
      </div>

      <span
        className={`text-xs px-2.5 py-1 rounded-lg font-bold shadow-sm flex items-center gap-1 ${
          player.isReady
            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
            : 'bg-slate-800 text-slate-400 border border-white/10'
        }`}
      >
        {player.isReady ? (
          <>
            <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready</span>
          </>
        ) : (
          <>
            <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>Waiting</span>
          </>
        )}
      </span>
    </div>
  );
}
