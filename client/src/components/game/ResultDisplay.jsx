import React, { useState, useEffect } from 'react';
import { CrownIcon, ScaleIcon, ShieldIcon, KeyIcon, ClockIcon, CheckIcon, CrossIcon } from '../common/Icons';

const ROLE_INFO = {
  raja: {
    label: 'Raja',
    color: 'border-amber-500/40 bg-amber-950/40 text-amber-300',
    icon: CrownIcon
  },
  mantri: {
    label: 'Mantri',
    color: 'border-purple-500/40 bg-purple-950/40 text-purple-300',
    icon: ScaleIcon
  },
  sipahi: {
    label: 'Sipahi',
    color: 'border-sky-500/40 bg-sky-950/40 text-sky-300',
    icon: ShieldIcon
  },
  chor: {
    label: 'Chor',
    color: 'border-rose-500/40 bg-rose-950/40 text-rose-300',
    icon: KeyIcon
  }
};

export default function ResultDisplay({
  roundData,
  isTimeout,
  isCorrect,
  mantriUsername,
  chorUsername,
  nextRoundNumber,
  nextRoundIn = 5
}) {
  const [countdown, setCountdown] = useState(nextRoundIn);

  useEffect(() => {
    setCountdown(nextRoundIn);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(0, nextRoundIn - elapsed);
      setCountdown(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, [roundData, nextRoundIn]);

  if (!roundData) return null;
  const roles = ['raja', 'mantri', 'sipahi', 'chor'];

  // Fallback detection if isCorrect is null: Mantri gets 500 when correct, 0 when wrong
  const mantriWon = isCorrect !== null && isCorrect !== undefined
    ? !!isCorrect
    : (roundData.mantri?.points > 0);

  return (
    <div className="royal-glass p-6 rounded-2xl border border-amber-500/40 space-y-4 shadow-2xl animate-in fade-in duration-300">
      {/* Mantri Guess Verdict Header */}
      <div className="text-center space-y-2">
        {isTimeout ? (
          <div className="p-3 rounded-xl border border-amber-500/50 bg-amber-950/40 text-amber-300 flex items-center justify-center gap-2 shadow-inner">
            <ClockIcon className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-left sm:text-center">
              <span className="font-black text-sm uppercase tracking-wide block">
                Time Expired! Mantri Failed to Guess
              </span>
              <span className="text-xs text-amber-200/90 font-semibold block">
                Chor {chorUsername ? `(${chorUsername})` : ''} escaped with the loot &bull; +500 pts to Chor
              </span>
            </div>
          </div>
        ) : mantriWon ? (
          <div className="p-3 rounded-xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 flex items-center justify-center gap-2 shadow-inner">
            <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 stroke-[3]" />
            <div className="text-left sm:text-center">
              <span className="font-black text-sm uppercase tracking-wide block">
                🎯 Mantri Guessed RIGHT! The Chor Was Caught!
              </span>
              <span className="text-xs text-emerald-200/90 font-semibold block">
                Mantri {mantriUsername ? `(${mantriUsername})` : ''} identified Chor {chorUsername ? `(${chorUsername})` : ''} &bull; +500 pts to Mantri
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl border border-rose-500/50 bg-rose-950/40 text-rose-300 flex items-center justify-center gap-2 shadow-inner">
            <CrossIcon className="w-5 h-5 text-rose-400 shrink-0 stroke-[3]" />
            <div className="text-left sm:text-center">
              <span className="font-black text-sm uppercase tracking-wide block">
                ❌ Mantri Guessed WRONG! The Chor Escapes!
              </span>
              <span className="text-xs text-rose-200/90 font-semibold block">
                Chor {chorUsername ? `(${chorUsername})` : ''} fooled the minister and took the booty &bull; +500 pts to Chor
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Round Points Breakdown
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map(role => {
          const info = ROLE_INFO[role];
          const player = roundData[role];
          const IconComp = info.icon;

          return (
            <div
              key={role}
              className={`flex items-center justify-between p-3.5 rounded-xl border ${info.color} shadow-sm backdrop-blur-md`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10">
                  <IconComp className="w-4 h-4 text-current" />
                </div>
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider block opacity-90">
                    {info.label}
                  </span>
                  <span className="font-bold text-white text-sm">{player?.username}</span>
                </div>
              </div>
              <span className="font-black text-base text-amber-300 bg-slate-900/90 px-3 py-1 rounded-lg border border-amber-500/40 shadow-inner">
                +{player?.points} pts
              </span>
            </div>
          );
        })}
      </div>

      {/* Next Round Countdown */}
      <div className="pt-2 border-t border-white/10 text-center space-y-1.5">
        <div className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5">
          <ClockIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Next round {nextRoundNumber ? `(R${nextRoundNumber})` : ''} starts in <span className="text-white font-black text-sm">{countdown}s</span>...</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-lg overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-lg"
            style={{ width: `${Math.max(0, (countdown / nextRoundIn) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
