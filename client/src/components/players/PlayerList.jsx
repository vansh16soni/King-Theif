import React from 'react';
import PlayerCard from './PlayerCard';

export default function PlayerList({ players = [], hostId }) {
  const playerList = players || [];
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-1 text-xs font-cinzel font-black text-[#78350f] uppercase tracking-wider">
        <span>🏰 Castle Assembly</span>
        <span>{playerList.length} / 4 Nobles</span>
      </div>
      {playerList.map(p => (
        <PlayerCard key={p.userId || p.username} player={p} isHost={String(p.userId) === String(hostId)} />
      ))}
      {playerList.length < 4 && (
        <div className="p-3.5 bg-[#fbf5e6] border-2 border-[#e2d5bd] rounded-2xl text-xs text-[#78350f] text-center font-bold">
          🏰 {4 - playerList.length} empty noble seat(s) will be automatically filled with AI Courtiers upon starting.
        </div>
      )}
    </div>
  );
}
