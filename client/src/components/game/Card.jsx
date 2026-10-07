import React from 'react';
import { CrownIcon, ScaleIcon, ShieldIcon, KeyIcon } from '../common/Icons';

const ROLE_STYLES = {
  raja: {
    bg: 'from-amber-950/90 via-amber-900/80 to-amber-950/90',
    border: 'border-amber-400',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]',
    titleColor: 'text-amber-300',
    iconColor: 'text-amber-400',
    icon: CrownIcon,
    title: 'RAJA',
    points: '1,000 Pts',
    ribbonBg: 'bg-amber-500 text-slate-950'
  },
  mantri: {
    bg: 'from-purple-950/90 via-purple-900/80 to-purple-950/90',
    border: 'border-purple-400',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.35)]',
    titleColor: 'text-purple-300',
    iconColor: 'text-purple-400',
    icon: ScaleIcon,
    title: 'MANTRI',
    points: '500 Pts',
    ribbonBg: 'bg-purple-500 text-slate-950'
  },
  sipahi: {
    bg: 'from-sky-950/90 via-sky-900/80 to-sky-950/90',
    border: 'border-sky-400',
    glow: 'shadow-[0_0_20px_rgba(56,189,248,0.35)]',
    titleColor: 'text-sky-300',
    iconColor: 'text-sky-400',
    icon: ShieldIcon,
    title: 'SIPAHI',
    points: '300 Pts',
    ribbonBg: 'bg-sky-500 text-slate-950'
  },
  chor: {
    bg: 'from-rose-950/90 via-rose-900/80 to-rose-950/90',
    border: 'border-rose-400',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)]',
    titleColor: 'text-rose-300',
    iconColor: 'text-rose-400',
    icon: KeyIcon,
    title: 'CHOR',
    points: '0 / 500 Pts',
    ribbonBg: 'bg-rose-500 text-slate-950'
  }
};

export default function Card({ role, revealed, size = 'md' }) {
  const sizeClasses = size === 'lg' ? 'w-36 h-52' : 'w-28 sm:w-32 h-40 sm:h-44';
  const style = ROLE_STYLES[role] || ROLE_STYLES.raja;
  const RoleIcon = style.icon;

  return (
    <div className={`card-flip ${revealed ? 'flipped' : ''} ${sizeClasses} cursor-pointer group`}>
      <div className="card-flip-inner relative w-full h-full">
        {/* Card Back: Sleek Modern Card Back */}
        <div className="card-face absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-2 border-amber-500/50 shadow-2xl flex flex-col items-center justify-center p-3 text-center overflow-hidden">
          <div className="absolute inset-1.5 rounded-xl border border-white/10 pointer-events-none" />
          
          {/* Glowing Emblem */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-[1.5px] mb-2 shadow-lg shadow-amber-500/20 transform group-hover:scale-110 transition duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400 shadow-inner">
              <CrownIcon className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          
          <span className="text-[11px] tracking-wider text-amber-300 font-extrabold uppercase mt-1">
            Secret Card
          </span>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            Hidden Role
          </span>
        </div>

        {/* Card Face: Revealed Role */}
        <div className={`card-face card-back absolute inset-0 rounded-2xl bg-gradient-to-b ${style.bg} border-2 ${style.border} ${style.glow} shadow-2xl flex flex-col items-center justify-between p-3 text-center overflow-hidden`}>
          <div className="absolute inset-1 rounded-xl border border-white/10 pointer-events-none" />
          
          <div className={`text-[9px] font-black tracking-widest uppercase ${style.titleColor}`}>
            Assigned Role
          </div>
          
          <div className="my-auto flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10 mb-1 shadow-inner">
              <RoleIcon className={`w-8 h-8 ${style.iconColor}`} />
            </div>
            <span className={`font-black text-sm tracking-wider mt-1 ${style.titleColor}`}>
              {style.title}
            </span>
          </div>

          <div className={`text-[10px] font-black px-2.5 py-0.5 rounded-md ${style.ribbonBg} shadow-md uppercase tracking-wider`}>
            {style.points}
          </div>
        </div>
      </div>
    </div>
  );
}
