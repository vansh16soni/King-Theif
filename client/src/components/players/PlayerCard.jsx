import React from 'react';
import BotBadge from './BotBadge';

export default function PlayerCard({ player, isHost }) {
  return (
    <div className="flex items-center justify-between bg-[#fffdfa] rounded-2xl px-4 py-3 border-2 border-[#dccab0] shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-[1.5px] shadow-sm">
          <div className="w-full h-full bg-[#fef9ee] rounded-full flex items-center justify-center text-xs font-black text-[#78350f]">
            {(player?.username || '??').slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-sm text-[#2c1a0e]">{player?.username || 'Noble'}</span>
          {player?.isBot && <BotBadge />}
          {isHost && (
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-400 font-cinzel font-black shadow-sm">
              👑 Castle Host
            </span>
          )}
        </div>
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full font-bold shadow-sm ${
          player.isReady
            ? 'bg-emerald-100 text-emerald-900 border border-emerald-400'
            : 'bg-[#ede1cc] text-[#6b513c] border border-[#cbba98]'
        }`}
      >
        {player.isReady ? '⚔️ Ready' : '⏳ Waiting'}
      </span>
    </div>
  );
}
