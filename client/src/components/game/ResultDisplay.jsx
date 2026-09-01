import React, { useState, useEffect } from 'react';

const ROLE_INFO = {
  raja: { label: 'Raja 👑', color: 'border-amber-500/40 bg-amber-950/30 text-amber-300' },
  mantri: { label: 'Mantri 🧠', color: 'border-purple-500/40 bg-purple-950/30 text-purple-300' },
  sipahi: { label: 'Sipahi 🛡️', color: 'border-sky-500/40 bg-sky-950/30 text-sky-300' },
  chor: { label: 'Chor 🕵️', color: 'border-red-500/40 bg-red-950/30 text-red-300' }
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
    <div className="royal-glass p-6 rounded-3xl border border-amber-500/40 space-y-4 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
      <div className="text-center space-y-1">
        <span className="text-xs font-cinzel font-black text-amber-400 uppercase tracking-widest">
          👑 Royal Treasury Award
        </span>
        <h3 className="text-lg font-cinzel font-black text-white">
          {isTimeout ? '⌛ Time Expired — Chor Escaped!' : 'Round Resolution & Points Awarded'}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map(role => {
          const info = ROLE_INFO[role];
          const player = roundData[role];
          return (
            <div
              key={role}
              className={`flex items-center justify-between p-3.5 rounded-2xl border ${info.color} shadow-md`}
            >
              <div>
                <span className="font-cinzel font-bold text-xs uppercase tracking-wider block">{info.label}</span>
                <span className="font-bold text-white text-sm">{player?.username}</span>
              </div>
              <span className="font-cinzel font-black text-lg text-raja bg-black/40 px-3 py-1 rounded-xl border border-amber-500/30">
                +{player?.points} pts
              </span>
            </div>
          );
        })}
      </div>

      {/* Next Round Countdown Progress */}
      <div className="pt-2 border-t border-amber-500/20 text-center space-y-1.5">
        <div className="text-xs font-cinzel font-bold text-amber-300 flex items-center justify-center gap-1.5">
          <span>⏳</span> Next Court Round commencing in <span className="text-white font-black text-sm">{countdown}s</span>...
        </div>
        <div className="w-full h-1.5 bg-[#0e071c] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(0, (countdown / nextRoundIn) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
