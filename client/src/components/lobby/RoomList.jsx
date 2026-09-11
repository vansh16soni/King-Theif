import React from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

export default function RoomList() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-4 pb-12">
      {/* Royal Castle Banner Intro */}
      <div className="text-center space-y-2 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fef3c7] border border-amber-400/80 text-[#92400e] text-xs font-cinzel font-black tracking-widest uppercase shadow-sm">
          🏰 Four Nobles &bull; One Castle Throne
        </div>
        <h1 className="text-3xl sm:text-4xl font-cinzel font-black gold-gradient-text tracking-wide uppercase">
          The Grand Imperial Castle
        </h1>
        <p className="text-xs sm:text-sm text-[#6b513c] max-w-lg mx-auto font-medium">
          Raja presides from the high seat, Mantri unmasks deception with strategic wit, Sipahi guards the keep, and Chor sneaks into the fortress treasury.
        </p>
      </div>

      {/* Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CreateRoom />
        <JoinRoom />
      </div>

      {/* Royal Role Rules Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        <RoleCard role="Raja 👑" points="1,000 Pts" desc="The Castle Monarch" color="border-amber-400/80 bg-[#fef9ee] text-[#92400e]" badgeBg="bg-amber-100 text-amber-900" />
        <RoleCard role="Mantri 🧠" points="500 Pts" desc="The Royal Strategist" color="border-purple-300 bg-[#faf5ff] text-purple-900" badgeBg="bg-purple-100 text-purple-900" />
        <RoleCard role="Sipahi 🛡️" points="300 Pts" desc="The Realm Protector" color="border-sky-300 bg-[#f0f9ff] text-sky-900" badgeBg="bg-sky-100 text-sky-900" />
        <RoleCard role="Chor 🕵️" points="0 / 500 Pts" desc="The Shadow Infiltrator" color="border-rose-300 bg-[#fff1f2] text-rose-900" badgeBg="bg-rose-100 text-rose-900" />
      </div>
    </div>
  );
}

function RoleCard({ role, points, desc, color, badgeBg }) {
  return (
    <div className={`p-4 rounded-2xl border-2 ${color} text-center space-y-1.5 shadow-md shadow-[#4a3018]/5 transition hover:scale-[1.02]`}>
      <div className="font-cinzel font-black text-sm tracking-wide">{role}</div>
      <div className="text-xl font-black">{points}</div>
      <div className="text-[11px] opacity-80 font-semibold">{desc}</div>
    </div>
  );
}
