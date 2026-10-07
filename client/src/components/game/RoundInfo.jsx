import React, { useState, useEffect } from 'react';
import { CrownIcon, ClockIcon, ScaleIcon, SparklesIcon } from '../common/Icons';

export default function RoundInfo({
  roundNumber,
  totalRounds,
  rajaPlayer,
  mantriUsername,
  botThinking,
  guessDeadline,
  timeLimit = 25,
  isRoundActive
}) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!guessDeadline || !isRoundActive) {
      setTimeLeft(null);
      return;
    }

    function update() {
      const remainingMs = guessDeadline - Date.now();
      const sec = Math.max(0, Math.ceil(remainingMs / 1000));
      setTimeLeft(sec);
    }

    update();
    const interval = setInterval(update, 250);
    return () => clearInterval(interval);
  }, [guessDeadline, isRoundActive]);

  return (
    <div className="royal-glass p-5 rounded-2xl text-center space-y-3 relative overflow-hidden shadow-2xl border border-white/15">
      <div className="flex items-center justify-between px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider shadow-sm">
          <CrownIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Round {roundNumber || 1} (R{roundNumber || 1}) of {totalRounds || 10}</span>
        </div>

        {timeLeft !== null && timeLeft > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
            <ClockIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Guess Timer: <span className={timeLeft <= 5 ? 'text-red-400 font-black' : 'text-amber-300 font-bold'}>{timeLeft}s</span></span>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        {rajaPlayer ? (
          <div className="text-xl sm:text-2xl font-black gold-gradient-text tracking-wide uppercase">
            Player <span className="underline decoration-amber-400">{rajaPlayer.username}</span> is the Raja
          </div>
        ) : (
          <div className="text-lg font-bold text-amber-400 animate-pulse">
            Dealing Chits &bull; Round {roundNumber || 1} (R{roundNumber || 1}) Commencing...
          </div>
        )}

        {mantriUsername && (
          <p className="text-sm text-slate-200 font-bold flex items-center justify-center gap-1.5">
            <ScaleIcon className="w-4 h-4 text-purple-400" />
            <span>Mantri <span className="underline decoration-purple-400 text-purple-300">{mantriUsername}</span> is guessing who is the Chor...</span>
          </p>
        )}

        {botThinking && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-amber-300 animate-pulse font-bold shadow-sm">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>{botThinking} is analyzing clues...</span>
          </div>
        )}
      </div>
    </div>
  );
}
