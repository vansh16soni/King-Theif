import React, { useState, useEffect } from 'react';

const ROLE_INFO = {
  raja: { label: 'Raja 👑', color: 'border-amber-400 bg-amber-50 text-amber-950', badgeColor: 'bg-amber-100 text-amber-900' },
  mantri: { label: 'Mantri 🧠', color: 'border-purple-400 bg-purple-50 text-purple-950', badgeColor: 'bg-purple-100 text-purple-900' },
  sipahi: { label: 'Sipahi 🛡️', color: 'border-sky-400 bg-sky-50 text-sky-950', badgeColor: 'bg-sky-100 text-sky-900' },
  chor: { label: 'Chor 🕵️', color: 'border-rose-400 bg-rose-50 text-rose-950', badgeColor: 'bg-rose-100 text-rose-900' }
};

export default function ResultDisplay({ roundData, isTimeout, nextRoundIn = 5 }) {
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

  return (
    <div className="royal-glass p-6 rounded-3xl border-2 border-amber-400/70 space-y-4 shadow-castle-card animate-[fadeIn_0.3s_ease-out]">
      <div className="text-center space-y-1">
        <span className="text-xs font-cinzel font-black text-[#92400e] uppercase tracking-widest">
          🏰 Castle Treasury Award
        </span>
        <h3 className="text-lg font-cinzel font-black text-[#2c1a0e]">
          {isTimeout ? '⌛ Time Expired — Chor Escaped Over Castle Walls!' : 'Round Resolution & Points Awarded'}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map(role => {
          const info = ROLE_INFO[role];
          const player = roundData[role];
          return (
            <div
              key={role}
              className={`flex items-center justify-between p-3.5 rounded-2xl border-2 ${info.color} shadow-sm`}
            >
              <div>
                <span className="font-cinzel font-black text-xs uppercase tracking-wider block">{info.label}</span>
                <span className="font-bold text-[#2c1a0e] text-sm">{player?.username}</span>
              </div>
              <span className="font-cinzel font-black text-base text-amber-900 bg-white/90 px-3 py-1 rounded-xl border border-amber-300 shadow-inner">
                +{player?.points} pts
              </span>
            </div>
          );
        })}
      </div>

      {/* Next Round Countdown Progress */}
      <div className="pt-2 border-t border-[#d8c5a2] text-center space-y-1.5">
        <div className="text-xs font-cinzel font-bold text-[#78350f] flex items-center justify-center gap-1.5">
          <span>⏳</span> Next Castle Round commencing in <span className="text-amber-950 font-black text-sm">{countdown}s</span>...
        </div>
        <div className="w-full h-2 bg-[#ebdcc2] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(0, (countdown / nextRoundIn) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
