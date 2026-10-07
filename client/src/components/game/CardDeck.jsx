import React from 'react';
import Card from './Card';

export default function CardDeck({ yourRole, roundActive }) {
  return (
    <div className="royal-glass p-6 sm:p-8 rounded-3xl relative overflow-hidden text-center shadow-2xl border border-white/15">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>🎴</span> Role Cards
        </span>
        <span className="text-xs text-slate-300 font-bold">
          {yourRole ? `Your Card: ${yourRole.toUpperCase()}` : 'Cards Dealt Face-Down'}
        </span>
      </div>

      {/* 4 Cards on Table */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 py-4 bg-slate-900/60 rounded-2xl border border-white/10 p-4 shadow-inner">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="transform transition hover:scale-105">
            <Card role={yourRole} revealed={roundActive && i === 0 && !!yourRole} />
            <div className="text-[11px] text-slate-300 mt-2 font-bold uppercase tracking-wider">
              {i === 0 ? 'Your Card' : `Card #${i + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
