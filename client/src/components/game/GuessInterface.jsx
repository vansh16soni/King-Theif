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
    <div className="royal-glass p-6 sm:p-7 rounded-3xl border-2 border-purple-400/80 shadow-mantri-glow space-y-4 relative overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-amber-500" />
      
      {/* 15-Second Animated Decree Timer Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-cinzel font-bold">
          <span className="text-purple-900 flex items-center gap-1.5 font-black">
            <span>⏱️</span> Royal Sandglass Timer
          </span>
          <span
            className={`font-black text-sm px-3 py-0.5 rounded-full border transition ${
              isUrgent
                ? 'text-red-900 bg-red-100 border-red-400 animate-bounce'
                : 'text-amber-950 bg-amber-100 border-amber-400'
            }`}
          >
            {timeLeft}s Remaining
          </span>
        </div>
        <div className="w-full h-3 bg-[#ebdcc2] rounded-full overflow-hidden p-[1.5px] border border-purple-300">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isUrgent
                ? 'bg-gradient-to-r from-red-600 to-amber-500 animate-pulse'
                : 'bg-gradient-to-r from-purple-700 via-fuchsia-500 to-amber-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="text-center space-y-1 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs font-cinzel font-black uppercase tracking-widest shadow-sm">
          🧠 Mantri's Castle Proclamation
        </div>
        <h3 className="text-xl font-cinzel font-black text-[#2c1a0e]">
          Which noble stands as the loyal <span className="text-sky-700">Sipahi</span>?
        </h3>
        <p className="text-xs text-[#6b513c] font-medium">
          Identify the realm guardian; the other courtier shall be convicted as the <span className="text-rose-700 font-bold">Chor</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {[a, b].map(p => (
          <button
            key={p.playerId}
            onClick={() => submit(p.playerId)}
            disabled={timeLeft <= 0}
            className="group p-5 rounded-2xl bg-gradient-to-b from-[#fffdf8] to-[#f5ebd7] border-2 border-purple-300/80 hover:border-amber-500 hover:shadow-lg transition duration-200 flex flex-col items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 group-hover:bg-amber-100 border-2 border-purple-300 group-hover:border-amber-400 flex items-center justify-center text-3xl transition shadow-inner">
              🛡️
            </div>
            <span className="font-cinzel font-black text-lg text-[#2c1a0e] group-hover:text-[#92400e] transition">
              {p.username}
            </span>
            <span className="text-xs px-3.5 py-1 rounded-full bg-sky-100 text-sky-900 font-bold border border-sky-400/60 shadow-sm">
              Declare Sipahi 🛡️
            </span>
          </button>
        ))}
      </div>

      {timeLeft <= 0 && (
        <div className="text-center text-xs text-red-900 font-bold bg-red-100 p-3 rounded-xl border border-red-300 animate-pulse">
          ⌛ The sandglass has emptied! Chor escapes over the fortress wall...
        </div>
      )}
    </div>
  );
}
