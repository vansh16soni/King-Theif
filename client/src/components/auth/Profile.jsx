import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  const stats = user.stats || {};
  const winRate = user.gamesPlayed > 0
    ? Math.round((user.gamesWon / user.gamesPlayed) * 100)
    : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Royal Profile Header Banner */}
      <div className="royal-glass p-6 sm:p-8 rounded-3xl relative overflow-hidden text-center shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1.5px] mx-auto shadow-xl shadow-amber-500/20 mb-3">
          <div className="w-full h-full bg-[#180f2d] rounded-2xl flex items-center justify-center text-4xl">
            👑
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-cinzel font-black gold-gradient-text tracking-wide uppercase">
          {user.username}
        </h1>
        <p className="text-xs font-cinzel tracking-widest text-amber-300/70 uppercase mt-0.5">
          Royal Decree of Honor & Achievements
        </p>

        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="px-4 py-2 bg-amber-950/40 border border-amber-500/40 rounded-xl">
            <span className="text-xs text-amber-300 font-cinzel">Total Royal Score</span>
            <div className="text-2xl font-black text-raja">{(user.totalPoints ?? 0).toLocaleString()}</div>
          </div>
          <div className="px-4 py-2 bg-purple-950/40 border border-purple-500/40 rounded-xl">
            <span className="text-xs text-purple-300 font-cinzel">Victory Rate</span>
            <div className="text-2xl font-black text-purple-300">{winRate}%</div>
          </div>
        </div>
      </div>

      {/* Role Heritage Cards */}
      <div className="royal-glass p-6 rounded-3xl space-y-4">
        <h3 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
          <span>🛡️</span> Role Lineage & Occurrences
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon="👑" title="Times Raja" value={stats.rajaCount} color="border-amber-500/40 bg-amber-950/20 text-amber-300" />
          <StatCard icon="🧠" title="Times Mantri" value={stats.mantriCount} color="border-purple-500/40 bg-purple-950/20 text-purple-300" />
          <StatCard icon="🛡️" title="Times Sipahi" value={stats.sipahiCount} color="border-sky-500/40 bg-sky-950/20 text-sky-300" />
          <StatCard icon="🕵️" title="Times Chor" value={stats.chorCount} color="border-red-500/40 bg-red-950/20 text-red-300" />
        </div>
      </div>

      {/* Battle Metrics Grid */}
      <div className="royal-glass p-6 rounded-3xl space-y-4">
        <h3 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
          <span>⚔️</span> Battlefield Records
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard icon="🎮" title="Matches Hosted" value={user.gamesPlayed} color="border-slate-700 bg-[#0e081c] text-white" />
          <StatCard icon="🏆" title="Victories Claimed" value={user.gamesWon} color="border-emerald-500/40 bg-emerald-950/20 text-emerald-300" />
          <StatCard icon="🃏" title="Rounds Endured" value={user.totalRoundsPlayed} color="border-slate-700 bg-[#0e081c] text-white" />
          <StatCard icon="🎯" title="Correct Deductions" value={stats.correctGuesses} color="border-emerald-500/40 bg-emerald-950/20 text-emerald-300" />
          <StatCard icon="❌" title="Failed Deductions" value={stats.wrongGuesses} color="border-red-500/40 bg-red-950/20 text-red-300" />
          <StatCard icon="⏳" title="Honor Status" value="Active Noble" color="border-amber-500/40 bg-amber-950/20 text-amber-300" isText />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color, isText }) {
  return (
    <div className={`p-3.5 rounded-2xl border ${color} flex flex-col justify-between shadow-md`}>
      <div className="flex items-center justify-between text-xs opacity-80 font-medium">
        <span>{title}</span>
        <span>{icon}</span>
      </div>
      <div className="text-xl sm:text-2xl font-black mt-2">
        {isText ? value : (value ?? 0).toLocaleString()}
      </div>
    </div>
  );
}
