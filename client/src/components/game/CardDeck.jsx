import React from 'react';
import Card from './Card';

export default function CardDeck({ yourRole, roundActive }) {
  return (
    <div className="royal-glass p-6 sm:p-8 rounded-3xl relative overflow-hidden text-center shadow-castle-card">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-cinzel font-black text-[#78350f] uppercase tracking-widest flex items-center gap-1.5">
          <span>🏰</span> The Four Sacred Castle Chits
        </span>
        <span className="text-xs text-[#8c6d53] font-bold">
          {yourRole ? `Your Chit: ${yourRole.toUpperCase()}` : 'Chits Dealt Face-Down'}
        </span>
      </div>

      {/* 4 Chits on Castle Table */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 py-4 bg-[#fbf5e6]/60 rounded-2xl border border-amber-300/40 p-4 shadow-inner">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="transform transition hover:scale-105">
            <Card role={yourRole} revealed={roundActive && i === 0 && !!yourRole} />
            <div className="text-[11px] font-cinzel text-[#854d0e] mt-2 font-black uppercase tracking-wider">
              {i === 0 ? '👑 Your Chit' : `Chit #${i + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
