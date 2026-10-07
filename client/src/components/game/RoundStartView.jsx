import React, { useState, useEffect } from 'react';
import { CrownIcon, ScaleIcon, ShieldIcon, KeyIcon, ClockIcon, SparklesIcon } from '../common/Icons';
import { useTheme } from '../../contexts/ThemeContext';

const ROLE_PREVIEWS = {
  raja: { name: 'RAJA', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/40', icon: CrownIcon, points: '1,000 pts' },
  mantri: { name: 'MANTRI', color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/40', icon: ScaleIcon, points: '500 pts' },
  sipahi: { name: 'SIPAHI', color: 'text-sky-400', bg: 'bg-sky-500/20 border-sky-500/40', icon: ShieldIcon, points: '300 pts' },
  chor: { name: 'CHOR', color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-500/40', icon: KeyIcon, points: '0 / 500 pts' }
};

export default function RoundStartView({ roundNumber, totalRounds, yourRole, durationSeconds = 3.5 }) {
  const { isDark } = useTheme();
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const roleInfo = yourRole ? ROLE_PREVIEWS[yourRole] : null;
  const RoleIcon = roleInfo ? roleInfo.icon : CrownIcon;

  useEffect(() => {
    setTimeLeft(durationSeconds);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const rem = Math.max(0, durationSeconds - elapsed);
      setTimeLeft(rem);
      if (rem <= 0) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [roundNumber, durationSeconds]);

  const progressPercent = Math.min(100, Math.max(0, (timeLeft / durationSeconds) * 100));

  return (
    <div className="royal-glass p-6 sm:p-7 rounded-2xl border-2 border-amber-500/60 shadow-2xl relative overflow-hidden text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 animate-pulse" />

      {/* Round Badge */}
      <div className="flex items-center justify-center gap-2">
        <span className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-md flex items-center gap-1.5 animate-bounce">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>ROUND {roundNumber} (R{roundNumber}) STARTED</span>
          <SparklesIcon className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Main Announcement */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black gold-gradient-text uppercase tracking-wide">
          Round {roundNumber} &bull; R{roundNumber} is Now Active!
        </h2>
        <p className={`text-xs sm:text-sm font-semibold max-w-lg mx-auto leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          Fresh royal chits dealt face-down to all players &bull; Court is in session.
        </p>
      </div>

      {/* Your Dealt Role Card Snippet */}
      {roleInfo && (
        <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-inner ${roleInfo.bg}`}>
          <div className="p-1.5 rounded-xl bg-slate-950/70 border border-white/10">
            <RoleIcon className={`w-5 h-5 ${roleInfo.color}`} />
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block text-slate-300">
              Your Secret Chit
            </span>
            <span className={`text-sm font-black tracking-wide ${roleInfo.color}`}>
              {roleInfo.name} <span className="text-xs opacity-90 font-bold">({roleInfo.points})</span>
            </span>
          </div>
        </div>
      )}

      {/* Pause Countdown & Progress Bar */}
      <div className="max-w-md mx-auto space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-bold px-1">
          <span className="text-amber-500 flex items-center gap-1.5 font-bold">
            <ClockIcon className="w-3.5 h-3.5" />
            <span>Summoning Minister...</span>
          </span>
          <span className="font-mono text-amber-500 font-black text-sm">
            {Math.ceil(timeLeft)}s pause
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden bg-slate-900/80 border border-white/10 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full transition-all duration-100 ease-linear shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
