import React from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Breadcrumbs from '../common/Breadcrumbs';
import { usePageMeta } from '../../hooks/usePageMeta';
import { CrownIcon, ScaleIcon, ShieldIcon, KeyIcon, TrophyIcon } from '../common/Icons';

export default function RoomList() {
  usePageMeta({
    title: 'Game Lobby',
    description: 'Host or join a four-player Raja Mantri Chor Sipahi room. Play with friends or intelligent AI bots in real-time.',
    path: '/lobby'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-2 pb-12">
      <Breadcrumbs items={[{ label: 'Game Lobby' }]} />

      {/* Lobby Banner Intro */}
      <div className="text-center space-y-2.5 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-sm">
          <TrophyIcon className="w-4 h-4 text-amber-400" />
          <span>4-Player Social Deduction Game</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black gold-gradient-text tracking-wide uppercase">
          Game Lobby
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
          Create a private match room or join with a 4-digit code. Raja scores guaranteed points, Mantri deduces the Chor, Sipahi stays ready, and the Chor tries to bluff undetected!
        </p>
      </div>

      {/* Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CreateRoom />
        <JoinRoom />
      </div>

      {/* Role Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        <RoleCard
          role="Raja"
          points="1,000 Pts"
          desc="Monarch (Safe)"
          color="border-amber-500/40 bg-amber-950/30 text-amber-300"
          icon={<CrownIcon className="w-5 h-5 text-amber-400" />}
        />
        <RoleCard
          role="Mantri"
          points="500 Pts"
          desc="Detective (Guesser)"
          color="border-purple-500/40 bg-purple-950/30 text-purple-300"
          icon={<ScaleIcon className="w-5 h-5 text-purple-400" />}
        />
        <RoleCard
          role="Sipahi"
          points="300 Pts"
          desc="Soldier (Guard)"
          color="border-sky-500/40 bg-sky-950/30 text-sky-300"
          icon={<ShieldIcon className="w-5 h-5 text-sky-400" />}
        />
        <RoleCard
          role="Chor"
          points="0 / 500 Pts"
          desc="Thief (Bluffer)"
          color="border-rose-500/40 bg-rose-950/30 text-rose-300"
          icon={<KeyIcon className="w-5 h-5 text-rose-400" />}
        />
      </div>
    </div>
  );
}

function RoleCard({ role, points, desc, color, icon }) {
  return (
    <div className={`p-4 rounded-xl border ${color} text-center space-y-2 backdrop-blur-md shadow-lg transition hover:translate-y-[-2px]`}>
      <div className="flex justify-center items-center gap-1.5 font-black text-sm tracking-wide">
        {icon}
        <span>{role}</span>
      </div>
      <div className="text-xl font-black text-white">{points}</div>
      <div className="text-[11px] opacity-80 font-semibold">{desc}</div>
    </div>
  );
}
