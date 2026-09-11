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
    <div className="royal-glass p-5 rounded-3xl text-center space-y-3 relative overflow-hidden shadow-castle-card">
      <div className="flex items-center justify-between px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef3c7] border border-amber-400/80 text-[#92400e] text-xs font-cinzel font-black uppercase tracking-widest shadow-sm">
          👑 Castle Round {roundNumber || 1} of {totalRounds || 10}
        </div>

        {timeLeft !== null && timeLeft > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs font-cinzel font-black shadow-sm">
            <span>⏱️</span> Sandglass: <span className={timeLeft <= 5 ? 'text-red-700 font-black' : 'text-amber-800 font-bold'}>{timeLeft}s</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        {rajaPlayer ? (
          <div className="text-xl sm:text-2xl font-cinzel font-black gold-gradient-text tracking-wide uppercase">
            His Majesty <span className="underline decoration-amber-500/50">{rajaPlayer.username}</span> is Proclaimed Raja! 👑
          </div>
        ) : (
          <div className="text-lg font-cinzel font-black text-[#78350f]">
            Shuffling the Sacred Castle Chits...
          </div>
        )}

        {mantriUsername && (
          <p className="text-sm font-cinzel text-purple-900 font-bold flex items-center justify-center gap-1.5">
            <span>🧠</span> Prime Minister <span className="text-[#581c87] underline decoration-purple-400">{mantriUsername}</span> is discerning the Chor...
          </p>
        )}

        {botThinking && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-xs text-purple-900 animate-pulse font-bold shadow-sm">
            <span>🤖</span> {botThinking} is analyzing noble movements...
          </div>
        )}
      </div>
    </div>
  );
}
