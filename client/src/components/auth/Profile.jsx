import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import Breadcrumbs from '../common/Breadcrumbs';
import { CrownIcon, ScaleIcon, ShieldIcon, KeyIcon, TrophyIcon, CheckIcon, AlertIcon, ClockIcon } from '../common/Icons';

export default function Profile() {
  const { user } = useAuth();

  usePageMeta({
    title: user ? `${user.username}'s Profile` : 'Player Profile',
    description: 'View your Raja Mantri Chor Sipahi game statistics, role distributions, deduction accuracy, and lifetime points.',
    path: '/profile'
  });

  if (!user) return null;

  const stats = user.stats || {};
  const winRate = user.gamesPlayed > 0
    ? Math.round((user.gamesWon / user.gamesPlayed) * 100)
    : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <Breadcrumbs items={[{ label: 'Profile' }]} />

      {/* Profile Header Banner */}
      <div className="royal-glass p-6 sm:p-8 rounded-2xl relative overflow-hidden text-center shadow-2xl border border-white/15">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-inner mb-3">
          <CrownIcon className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black gold-gradient-text tracking-wide uppercase">
          {user.username}
        </h1>
        <p className="text-xs tracking-wider text-amber-400/80 font-bold uppercase mt-0.5">
          Player Statistics & Match History
        </p>

        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="px-5 py-2.5 bg-slate-900/80 border border-amber-500/40 rounded-xl shadow-sm">
            <span className="text-xs text-amber-300 font-bold">Total Points</span>
            <div className="text-2xl font-black text-amber-400">{(user.totalPoints ?? 0).toLocaleString()}</div>
          </div>
          <div className="px-5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl shadow-sm">
            <span className="text-xs text-slate-300 font-bold">Win Rate</span>
            <div className="text-2xl font-black text-white">{winRate}%</div>
          </div>
        </div>
      </div>

      {/* Role Stats */}
      <div className="royal-glass p-6 rounded-2xl space-y-4 shadow-2xl border border-white/15">
        <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <ShieldIcon className="w-4 h-4 text-amber-400" />
          <span>Role Statistics</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={<CrownIcon className="w-4 h-4 text-amber-400" />} title="Raja Rounds" value={stats.rajaCount} color="border-amber-500/30 bg-amber-950/40 text-amber-300" />
          <StatCard icon={<ScaleIcon className="w-4 h-4 text-purple-400" />} title="Mantri Rounds" value={stats.mantriCount} color="border-purple-500/30 bg-purple-950/40 text-purple-300" />
          <StatCard icon={<ShieldIcon className="w-4 h-4 text-sky-400" />} title="Sipahi Rounds" value={stats.sipahiCount} color="border-sky-500/30 bg-sky-950/40 text-sky-300" />
          <StatCard icon={<KeyIcon className="w-4 h-4 text-rose-400" />} title="Chor Rounds" value={stats.chorCount} color="border-rose-500/30 bg-rose-950/40 text-rose-300" />
        </div>
      </div>

      {/* Match Records */}
      <div className="royal-glass p-6 rounded-2xl space-y-4 shadow-2xl border border-white/15">
        <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <TrophyIcon className="w-4 h-4 text-amber-400" />
          <span>Match Performance & Guesses</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard icon={<ClockIcon className="w-4 h-4 text-slate-300" />} title="Games Played" value={user.gamesPlayed} color="border-white/10 bg-slate-900/60 text-white" />
          <StatCard icon={<TrophyIcon className="w-4 h-4 text-emerald-400" />} title="Games Won" value={user.gamesWon} color="border-emerald-500/30 bg-emerald-950/40 text-emerald-300" />
          <StatCard icon={<ShieldIcon className="w-4 h-4 text-slate-300" />} title="Rounds Completed" value={user.totalRoundsPlayed} color="border-white/10 bg-slate-900/60 text-white" />
          <StatCard icon={<CheckIcon className="w-4 h-4 text-emerald-400" />} title="Correct Guesses" value={stats.correctGuesses} color="border-emerald-500/30 bg-emerald-950/40 text-emerald-300" />
          <StatCard icon={<AlertIcon className="w-4 h-4 text-rose-400" />} title="Wrong Guesses" value={stats.wrongGuesses} color="border-rose-500/30 bg-rose-950/40 text-rose-300" />
          <StatCard icon={<CrownIcon className="w-4 h-4 text-amber-400" />} title="Player Rank" value="Veteran" color="border-amber-500/30 bg-amber-950/40 text-amber-300" isText />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color, isText }) {
  return (
    <div className={`p-4 rounded-xl border ${color} flex flex-col justify-between shadow-sm`}>
      <div className="flex items-center justify-between text-xs opacity-90 font-bold">
        <span>{title}</span>
        <span>{icon}</span>
      </div>
      <div className="text-xl sm:text-2xl font-black mt-2 text-white">
        {isText ? value : (value ?? 0).toLocaleString()}
      </div>
    </div>
  );
}
