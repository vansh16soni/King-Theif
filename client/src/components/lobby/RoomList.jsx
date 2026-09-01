import React from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

export default function RoomList() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-4 pb-12">
      {/* Royal Banner Intro */}
      <div className="text-center space-y-2 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-bold tracking-widest uppercase">
          👑 Four Nobles &bull; One Crown
        </div>
        <h1 className="text-3xl sm:text-4xl font-cinzel font-black gold-gradient-text tracking-wide uppercase">
          The Grand Imperial Court
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/70 max-w-lg mx-auto font-medium">
          Raja rules the throne, Mantri unmasks deception, Sipahi guards the realm, and Chor strikes from shadows.
        </p>
      </div>

      {/* Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CreateRoom />
        <JoinRoom />
      </div>

      {/* Royal Role Rules Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        <RoleCard role="Raja 👑" points="1,000 Pts" desc="The King of kings" color="border-amber-500/40 bg-amber-950/20 text-amber-300" />
        <RoleCard role="Mantri 🧠" points="500 Pts" desc="The Royal Strategist" color="border-purple-500/40 bg-purple-950/20 text-purple-300" />
        <RoleCard role="Sipahi 🛡️" points="300 Pts" desc="The Realm Protector" color="border-sky-500/40 bg-sky-950/20 text-sky-300" />
        <RoleCard role="Chor 🕵️" points="0 / 500 Pts" desc="The Shadow Thief" color="border-red-500/40 bg-red-950/20 text-red-300" />
      </div>
    </div>
  );
}

function RoleCard({ role, points, desc, color }) {
  return (
    <div className={`p-4 rounded-2xl border ${color} text-center space-y-1 shadow-lg`}>
      <div className="font-cinzel font-black text-sm">{role}</div>
      <div className="text-lg font-black">{points}</div>
      <div className="text-[11px] opacity-75 font-medium">{desc}</div>
    </div>
  );
}
