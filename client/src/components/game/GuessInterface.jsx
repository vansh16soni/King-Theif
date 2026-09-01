import React, { useState, useEffect } from 'react';

export default function GuessInterface({ availablePlayers, onGuess, deadline, timeLimit = 15 }) {
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
    <div className="royal-glass p-6 sm:p-7 rounded-3xl border-2 border-purple-500/50 shadow-mantri-glow space-y-4 relative overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-purple-600" />
      
      {/* 15-Second Animated Decree Timer Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-cinzel font-bold">
          <span className="text-purple-300 flex items-center gap-1.5">
            <span>⏱️</span> Royal Decree Timer
          </span>
          <span
            className={`font-black text-sm px-2.5 py-0.5 rounded-full border transition ${
              isUrgent
                ? 'text-red-400 bg-red-950/80 border-red-500/60 animate-bounce'
                : 'text-amber-300 bg-amber-950/60 border-amber-500/40'
            }`}
          >
            {timeLeft}s Remaining
          </span>
        </div>
        <div className="w-full h-2.5 bg-[#0e071c] rounded-full overflow-hidden p-[1px] border border-purple-500/30">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isUrgent
                ? 'bg-gradient-to-r from-red-600 to-amber-500 animate-pulse'
                : 'bg-gradient-to-r from-purple-600 via-fuchsia-400 to-amber-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="text-center space-y-1 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-cinzel font-black uppercase tracking-widest">
          🧠 Mantri's Imperial Decree
        </div>
        <h3 className="text-xl font-cinzel font-black text-white">
          Who stands as the loyal <span className="text-sky-300">Sipahi</span>?
        </h3>
        <p className="text-xs text-purple-200/70">
          Declare the guardian; the other courtier shall be convicted as the <span className="text-rose-400 font-bold">Chor</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {[a, b].map(p => (
          <button
            key={p.playerId}
            onClick={() => submit(p.playerId)}
            disabled={timeLeft <= 0}
            className="group p-4 rounded-2xl bg-gradient-to-b from-[#1c1236] to-[#120a24] border-2 border-purple-500/40 hover:border-amber-400 hover:shadow-gold-glow transition duration-200 flex flex-col items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-900/60 group-hover:bg-amber-500/20 border border-purple-500/40 group-hover:border-amber-400/60 flex items-center justify-center text-2xl transition">
              🛡️
            </div>
            <span className="font-cinzel font-black text-base text-white group-hover:text-amber-300 transition">
              {p.username}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-950/80 text-sky-300 font-bold border border-sky-500/30">
              Declare Sipahi 🛡️
            </span>
          </button>
        ))}
      </div>

      {timeLeft <= 0 && (
        <div className="text-center text-xs text-red-300 font-bold bg-red-950/60 p-2.5 rounded-xl border border-red-500/40 animate-pulse">
          ⌛ Time has expired! Chor escapes into the night...
        </div>
      )}
    </div>
  );
}
