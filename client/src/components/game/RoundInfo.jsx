import React, { useState, useEffect } from 'react';

export default function RoundInfo({
  roundNumber,
  totalRounds,
  rajaPlayer,
  mantriUsername,
  botThinking,
  guessDeadline,
  timeLimit = 15,
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
    <div className="royal-glass p-5 rounded-3xl text-center space-y-3 relative overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-bold uppercase tracking-widest">
          👑 Court Round {roundNumber || 1} of {totalRounds || 10}
        </div>

        {timeLeft !== null && timeLeft > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs font-cinzel font-bold">
            <span>⏱️</span> Mantri Timer: <span className={timeLeft <= 5 ? 'text-red-400 font-black' : 'text-amber-300 font-bold'}>{timeLeft}s</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        {rajaPlayer ? (
          <div className="text-xl sm:text-2xl font-cinzel font-black gold-gradient-text tracking-wide uppercase">
            His Majesty <span className="underline decoration-amber-400/50">{rajaPlayer.username}</span> is Proclaimed Raja! 👑
          </div>
        ) : (
          <div className="text-lg font-cinzel font-bold text-amber-200">
            Shuffling the Sacred Chits...
          </div>
        )}

        {mantriUsername && (
          <p className="text-sm font-cinzel text-purple-300 font-semibold flex items-center justify-center gap-1.5">
            <span>🧠</span> Prime Minister <span className="text-white font-bold">{mantriUsername}</span> is discerning the Chor...
          </p>
        )}

        {botThinking && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs text-purple-200 animate-pulse font-medium">
            <span>🤖</span> {botThinking} is weighing courtiers' behavior...
          </div>
        )}
      </div>
    </div>
  );
}
