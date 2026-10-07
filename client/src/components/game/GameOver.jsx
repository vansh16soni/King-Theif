import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CrownIcon, TrophyIcon } from '../common/Icons';

export default function GameOver({ winner, finalScores = {}, players = [], onPlayAgain }) {
  const navigate = useNavigate();
  const sorted = [...(players || [])].sort((a, b) => {
    const keyA = a?.userId || a?.socketId || a?.username;
    const keyB = b?.userId || b?.socketId || b?.username;
    return ((finalScores && finalScores[keyB]) || 0) - ((finalScores && finalScores[keyA]) || 0);
  });

  return (
    <div className="max-w-lg mx-auto royal-glass rounded-2xl border border-amber-500/50 p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

      {/* Trophy */}
      <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-inner">
        <TrophyIcon className="w-8 h-8 text-amber-400" />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-black tracking-wider text-amber-400 uppercase">
          Match Concluded
        </span>
        <h2 className="text-3xl font-black gold-gradient-text uppercase">
          Game Over
        </h2>
        <p className="text-sm text-slate-300 font-bold pt-1">
          Winner of the Game:{' '}
          <span className="font-black text-amber-300 text-lg underline decoration-amber-400">
            {winner}
          </span>
        </p>
      </div>

      {/* Final Rankings */}
      <div className="space-y-2 text-left">
        <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-1">
          Final Standings
        </div>
        <ul className="space-y-2">
          {sorted.map((p, idx) => {
            const key = p.userId || p.socketId || p.username;
            return (
              <li
                key={key}
                className={`flex items-center justify-between p-3 rounded-xl border transition ${
                  idx === 0
                    ? 'bg-amber-950/60 border-amber-400/80 shadow-md'
                    : 'bg-slate-900/60 border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-black text-xs text-amber-400 w-6 text-center">
                    #{idx + 1}
                  </span>
                  <span className="font-bold text-white text-sm flex items-center gap-1.5">
                    {idx === 0 && <CrownIcon className="w-4 h-4 text-amber-400" />}
                    <span>{p.username}</span>
                    {p.isBot && <span className="text-[10px] text-slate-400 font-normal border border-slate-700 px-1 rounded">AI</span>}
                  </span>
                </div>
                <span className="font-black text-base text-amber-300">
                  {(finalScores[key] || 0).toLocaleString()} pts
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => navigate('/lobby')}
          className="flex-1 py-3.5 castle-btn-stone rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <span>Return to Lobby</span>
        </button>
        {onPlayAgain && (
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3.5 royal-btn-gold rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500 shadow-lg"
          >
            <TrophyIcon className="w-4 h-4 text-slate-950" />
            <span>Play Again</span>
          </button>
        )}
      </div>
    </div>
  );
}
