import React, { useState, useEffect } from 'react';
import { ClockIcon, ScaleIcon, ShieldIcon, AlertIcon } from '../common/Icons';

export default function GuessInterface({ availablePlayers, onGuess, deadline, timeLimit = 25 }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (!deadline) {
      setTimeLeft(timeLimit);
      return;
    }

    function update() {
      const remainingMs = deadline - Date.now();
      const sec = Math.max(0, Math.ceil(remainingMs / 1000));
      setTimeLeft(sec);
    }

    update();
    const interval = setInterval(update, 250);
    return () => clearInterval(interval);
  }, [deadline, timeLimit]);

  if (!availablePlayers || availablePlayers.length !== 2) return null;
  const [a, b] = availablePlayers;

  function submit(chosenSipahiId) {
    if (timeLeft <= 0) return;
    const chorId = chosenSipahiId === a.playerId ? b.playerId : a.playerId;
    onGuess(chosenSipahiId, chorId);
  }

  const progressPercent = Math.min(100, Math.max(0, (timeLeft / timeLimit) * 100));
  const isUrgent = timeLeft <= 5;

  return (
    <div className="royal-glass p-6 sm:p-7 rounded-2xl border border-amber-500/50 space-y-4 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
      
      {/* Timer Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-amber-400 flex items-center gap-1.5 font-bold">
            <ClockIcon className="w-4 h-4 text-amber-400" />
            <span>Guess Countdown</span>
          </span>
          <span
            className={`font-black text-sm px-3 py-0.5 rounded-lg border transition ${
              isUrgent
                ? 'text-red-300 bg-red-950/80 border-red-500/60'
                : 'text-amber-300 bg-amber-950/60 border-amber-500/40'
            }`}
          >
            {timeLeft}s Remaining
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 rounded-lg overflow-hidden border border-white/10">
          <div
            className={`h-full rounded-lg transition-all duration-300 ${
              isUrgent
                ? 'bg-gradient-to-r from-red-600 to-amber-500'
                : 'bg-gradient-to-r from-amber-500 to-yellow-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="text-center space-y-1 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-sm">
          <ScaleIcon className="w-3.5 h-3.5 text-purple-400" />
          <span>Mantri's Turn</span>
        </div>
        <h3 className="text-xl font-black text-white">
          Which player is the <span className="text-sky-400">Sipahi</span>?
        </h3>
        <p className="text-xs text-slate-300 font-medium">
          Select the player you believe is the Sipahi. The remaining player will be identified as the <span className="text-rose-400 font-bold">Chor</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {[a, b].map(p => (
          <button
            key={p.playerId}
            onClick={() => submit(p.playerId)}
            disabled={timeLeft <= 0}
            className="group p-5 rounded-2xl bg-slate-900/80 border border-white/15 hover:border-amber-400 hover:shadow-lg transition duration-200 flex flex-col items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 group-hover:bg-sky-500/30 border border-sky-500/40 flex items-center justify-center text-sky-400 transition shadow-inner">
              <ShieldIcon className="w-6 h-6 text-sky-400" />
            </div>
            <span className="font-black text-lg text-white group-hover:text-amber-300 transition">
              {p.username}
            </span>
            <span className="text-xs px-3 py-1 rounded-lg bg-sky-950/80 text-sky-300 font-bold border border-sky-500/40 shadow-sm flex items-center gap-1">
              <ShieldIcon className="w-3.5 h-3.5" />
              Select as Sipahi
            </span>
          </button>
        ))}
      </div>

      {timeLeft <= 0 && (
        <div className="text-center text-xs text-red-200 font-bold bg-red-950/80 p-3 rounded-xl border border-red-500/60 flex items-center justify-center gap-2">
          <AlertIcon className="w-4 h-4 text-red-400" />
          <span>Time expired: Mantri failed to guess before the countdown ended.</span>
        </div>
      )}
    </div>
  );
}
