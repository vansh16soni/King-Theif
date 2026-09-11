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
      {/* Royal Castle Profile Header Banner */}
      <div className="royal-glass p-6 sm:p-8 rounded-3xl relative overflow-hidden text-center shadow-castle-card">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[2px] mx-auto shadow-md mb-3">
          <div className="w-full h-full bg-[#fef9ee] rounded-[14px] flex items-center justify-center text-4xl shadow-inner">
            👑
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-cinzel font-black gold-gradient-text tracking-wide uppercase">
          {user.username}
        </h1>
        <p className="text-xs font-cinzel tracking-widest text-[#854d0e] font-black uppercase mt-0.5">
          Castle Decree of Honor & Achievements
        </p>

        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="px-5 py-2.5 bg-amber-100/80 border-2 border-amber-400/80 rounded-2xl shadow-sm">
            <span className="text-xs text-[#78350f] font-cinzel font-black">Total Castle Score</span>
            <div className="text-2xl font-black text-amber-950">{(user.totalPoints ?? 0).toLocaleString()}</div>
          </div>
          <div className="px-5 py-2.5 bg-purple-100/80 border-2 border-purple-400/80 rounded-2xl shadow-sm">
            <span className="text-xs text-purple-900 font-cinzel font-black">Victory Rate</span>
            <div className="text-2xl font-black text-purple-950">{winRate}%</div>
          </div>
        </div>
      </div>

      {/* Role Heritage Cards */}
      <div className="royal-glass p-6 rounded-3xl space-y-4 shadow-castle-card">
        <h3 className="text-xs font-cinzel font-black text-[#78350f] uppercase tracking-wider flex items-center gap-2">
          <span>🛡️</span> Role Lineage & Occurrences
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon="👑" title="Times Raja" value={stats.rajaCount} color="border-amber-400/80 bg-amber-50 text-amber-950" />
          <StatCard icon="🧠" title="Times Mantri" value={stats.mantriCount} color="border-purple-300 bg-purple-50 text-purple-950" />
          <StatCard icon="🛡️" title="Times Sipahi" value={stats.sipahiCount} color="border-sky-300 bg-sky-50 text-sky-950" />
          <StatCard icon="🕵️" title="Times Chor" value={stats.chorCount} color="border-rose-300 bg-rose-50 text-rose-950" />
        </div>
      </div>

      {/* Battle Metrics Grid */}
      <div className="royal-glass p-6 rounded-3xl space-y-4 shadow-castle-card">
        <h3 className="text-xs font-cinzel font-black text-[#78350f] uppercase tracking-wider flex items-center gap-2">
          <span>⚔️</span> Fortress Tournament Records
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard icon="🎮" title="Matches Hosted" value={user.gamesPlayed} color="border-[#dccab0] bg-[#fffdf8] text-[#2c1a0e]" />
          <StatCard icon="🏆" title="Victories Claimed" value={user.gamesWon} color="border-emerald-300 bg-emerald-50 text-emerald-950" />
          <StatCard icon="🃏" title="Rounds Endured" value={user.totalRoundsPlayed} color="border-[#dccab0] bg-[#fffdf8] text-[#2c1a0e]" />
          <StatCard icon="🎯" title="Correct Deductions" value={stats.correctGuesses} color="border-emerald-300 bg-emerald-50 text-emerald-950" />
          <StatCard icon="❌" title="Failed Deductions" value={stats.wrongGuesses} color="border-rose-300 bg-rose-50 text-rose-950" />
          <StatCard icon="⏳" title="Honor Status" value="Noble Knight" color="border-amber-400 bg-amber-50 text-amber-950" isText />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color, isText }) {
  return (
    <div className={`p-3.5 rounded-2xl border-2 ${color} flex flex-col justify-between shadow-sm`}>
      <div className="flex items-center justify-between text-xs opacity-80 font-bold">
        <span>{title}</span>
        <span>{icon}</span>
      </div>
      <div className="text-xl sm:text-2xl font-black mt-2">
        {isText ? value : (value ?? 0).toLocaleString()}
      </div>
    </div>
  );
}
