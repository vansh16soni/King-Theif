import React from 'react';
import PlayerCard from './PlayerCard';
import { UserIcon } from '../common/Icons';

export default function PlayerList({ players = [], hostId }) {
  const playerList = players || [];
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <UserIcon className="w-4 h-4 text-amber-400" />
          <span>Players in Room</span>
        </span>
        <span className="flex items-center gap-1 text-slate-300">
          <span>{playerList.length} / 4 Players</span>
        </span>
      </div>
      {playerList.map(p => (
        <PlayerCard key={p.userId || p.username} player={p} isHost={String(p.userId) === String(hostId)} />
      ))}
      {playerList.length < 4 && (
        <div className="p-3.5 bg-slate-900/70 border border-white/10 rounded-xl text-xs text-amber-300 text-center font-medium">
          {4 - playerList.length} empty slot(s) will be automatically filled with AI Bots when starting the game.
        </div>
      )}
    </div>
  );
}
