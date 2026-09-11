import React from 'react';
import { ROLE_LABELS } from '../../utils/constants';

const ROYAL_ROLE_STYLES = {
  raja: {
    bg: 'from-[#fffbeb] via-[#fef3c7] to-[#fde68a]',
    border: 'border-amber-500',
    titleColor: 'text-[#78350f]',
    icon: '👑',
    title: 'RAJA',
    points: '1,000 Pts',
    ribbonBg: 'bg-amber-600 text-white'
  },
  mantri: {
    bg: 'from-[#faf5ff] via-[#f3e8ff] to-[#e9d5ff]',
    border: 'border-purple-500',
    titleColor: 'text-[#581c87]',
    icon: '🧠',
    title: 'MANTRI',
    points: '500 Pts',
    ribbonBg: 'bg-purple-700 text-white'
  },
  sipahi: {
    bg: 'from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd]',
    border: 'border-sky-500',
    titleColor: 'text-[#075985]',
    icon: '🛡️',
    title: 'SIPAHI',
    points: '300 Pts',
    ribbonBg: 'bg-sky-700 text-white'
  },
  chor: {
    bg: 'from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3]',
    border: 'border-rose-500',
    titleColor: 'text-[#9f1239]',
    icon: '🕵️',
    title: 'CHOR',
    points: '0 / 500 Pts',
    ribbonBg: 'bg-rose-700 text-white'
  }
};

export default function Card({ role, revealed, size = 'md' }) {
  const sizeClasses = size === 'lg' ? 'w-36 h-52' : 'w-28 sm:w-32 h-40 sm:h-44';
  const style = ROYAL_ROLE_STYLES[role] || ROYAL_ROLE_STYLES.raja;

  return (
    <div className={`card-flip ${revealed ? 'flipped' : ''} ${sizeClasses} cursor-pointer group`}>
      <div className="card-flip-inner relative w-full h-full">
        {/* Card Back: Antique Castle Parchment with Royal Wax Seal */}
        <div className="card-face absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fffdfa] via-[#f7ebd2] to-[#ebd5b3] border-2 border-[#c5a059] shadow-md shadow-[#4a3018]/15 flex flex-col items-center justify-center p-3 text-center overflow-hidden">
          <div className="absolute inset-1.5 rounded-xl border border-[#c5a059]/40 border-dashed pointer-events-none" />
          
          {/* Crimson Royal Wax Seal */}
          <div className="w-14 h-14 rounded-full wax-seal flex items-center justify-center mb-1 shadow-lg transform group-hover:scale-110 transition duration-300">
            <div className="w-11 h-11 rounded-full border border-red-300/40 flex items-center justify-center text-xl shadow-inner">
              👑
            </div>
          </div>
          
          <span className="font-cinzel text-[11px] tracking-widest text-[#78350f] font-black uppercase mt-1">
            Castle Chit
          </span>
          <span className="text-[8px] text-[#92400e]/70 font-bold uppercase tracking-wider">
            Sealed Scroll
          </span>
        </div>

        {/* Card Face: Revealed Royal Castle Decree */}
        <div className={`card-face card-back absolute inset-0 rounded-2xl bg-gradient-to-b ${style.bg} border-2 ${style.border} shadow-lg flex flex-col items-center justify-between p-3 text-center overflow-hidden`}>
          <div className="absolute inset-1 rounded-xl border border-black/10 pointer-events-none" />
          
          <div className={`text-[9px] font-cinzel font-black tracking-widest uppercase ${style.titleColor}`}>
            Imperial Decree
          </div>
          
          <div className="my-auto flex flex-col items-center">
            <span className="text-4xl sm:text-5xl filter drop-shadow-md">{style.icon}</span>
            <span className={`font-cinzel font-black text-base tracking-wider mt-1 ${style.titleColor}`}>
              {style.title}
            </span>
          </div>

          <div className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${style.ribbonBg} shadow-sm uppercase tracking-wider`}>
            {style.points}
          </div>
        </div>
      </div>
    </div>
  );
}
