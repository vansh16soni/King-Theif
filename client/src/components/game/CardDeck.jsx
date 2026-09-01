import React from 'react';
import Card from './Card';

export default function CardDeck({ yourRole, roundActive }) {
  return (
    <div className="royal-glass p-6 sm:p-8 rounded-3xl relative overflow-hidden text-center shadow-2xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-widest">
          👑 The Four Sacred Chits
        </span>
        <span className="text-xs text-amber-200/60 font-medium">
          {yourRole ? `Your Chit: ${yourRole.toUpperCase()}` : 'Chits Dealt Face-Down'}
        </span>
      </div>

      {/* 4 Chits on Velvet Carpet */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 py-4">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="transform transition hover:scale-105">
            <Card role={yourRole} revealed={roundActive && i === 0 && !!yourRole} />
            <div className="text-[10px] font-cinzel text-amber-300/50 mt-2 font-bold uppercase">
              {i === 0 ? 'Your Chit' : `Chit #${i + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
