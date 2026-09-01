import React from 'react';
import PlayerCard from './PlayerCard';

export default function PlayerList({ players, hostId }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-1 text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider">
        <span>👑 Court Assembly</span>
        <span>{players.length} / 4 Nobles</span>
      </div>
      {players.map(p => (
        <PlayerCard key={p.userId || p.username} player={p} isHost={String(p.userId) === String(hostId)} />
      ))}
      {players.length < 4 && (
        <div className="p-3 bg-[#110920] border border-amber-500/20 rounded-2xl text-[11px] text-amber-200/60 text-center font-medium">
          🏰 {4 - players.length} empty noble seat(s) will be automatically filled with AI Courtiers upon starting.
        </div>
      )}
    </div>
  );
}
