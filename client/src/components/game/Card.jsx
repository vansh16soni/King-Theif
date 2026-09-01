import React from 'react';
import { ROLE_LABELS } from '../../utils/constants';

const ROYAL_ROLE_STYLES = {
  raja: {
    bg: 'from-amber-600 via-amber-400 to-yellow-200 text-amber-950',
    border: 'border-amber-300',
    icon: '👑',
    title: 'RAJA',
    points: '1,000 Pts'
  },
  mantri: {
    bg: 'from-purple-800 via-purple-600 to-fuchsia-400 text-white',
    border: 'border-purple-300',
    icon: '🧠',
    title: 'MANTRI',
    points: '500 Pts'
  },
  sipahi: {
    bg: 'from-sky-800 via-sky-600 to-cyan-300 text-white',
    border: 'border-sky-300',
    icon: '🛡️',
    title: 'SIPAHI',
    points: '300 Pts'
  },
  chor: {
    bg: 'from-rose-900 via-red-600 to-amber-500 text-white',
    border: 'border-rose-300',
    icon: '🕵️',
    title: 'CHOR',
    points: '0 / 500 Pts'
  }
};

export default function Card({ role, revealed, size = 'md' }) {
  const sizeClasses = size === 'lg' ? 'w-36 h-52' : 'w-28 sm:w-32 h-40 sm:h-44';
  const style = ROYAL_ROLE_STYLES[role] || ROYAL_ROLE_STYLES.raja;

  return (
    <div className={`card-flip ${revealed ? 'flipped' : ''} ${sizeClasses} cursor-pointer group`}>
      <div className="card-flip-inner relative w-full h-full">
        {/* Card Back: Ornate Royal Seal */}
        <div className="card-face absolute inset-0 rounded-2xl bg-gradient-to-br from-[#24173d] via-[#150e26] to-[#0d071a] border-2 border-amber-500/50 shadow-2xl flex flex-col items-center justify-center p-3 text-center overflow-hidden">
          <div className="absolute inset-1 rounded-xl border border-amber-500/20" />
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-[1px] shadow-lg shadow-amber-500/20 flex items-center justify-center mb-1">
            <div className="w-full h-full bg-[#1b1030] rounded-full flex items-center justify-center text-xl">
              👑
            </div>
          </div>
          <span className="font-cinzel text-[10px] tracking-widest text-amber-300/80 font-bold uppercase mt-1">
            Royal Chit
          </span>
        </div>

        {/* Card Face: Revealed Royal Role */}
        <div className={`card-face card-back absolute inset-0 rounded-2xl bg-gradient-to-b ${style.bg} border-2 ${style.border} shadow-gold-glow flex flex-col items-center justify-between p-3.5 text-center overflow-hidden`}>
          <div className="text-[10px] font-cinzel font-black tracking-widest uppercase opacity-80">
            Royal Decree
          </div>
          
          <div className="my-auto flex flex-col items-center">
            <span className="text-4xl sm:text-5xl filter drop-shadow">{style.icon}</span>
            <span className="font-cinzel font-black text-lg tracking-wider mt-1">
              {style.title}
            </span>
          </div>

          <div className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-sm">
            {style.points}
          </div>
        </div>
      </div>
    </div>
  );
}
