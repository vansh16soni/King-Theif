import React from 'react';
import { EMOTES } from '../../utils/constants';

export default function EmoteSelector({ onEmote }) {
  return (
    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10 shrink-0">
      {EMOTES.map(e => (
        <button
          key={e.type}
          onClick={() => onEmote(e.type)}
          className="px-2.5 py-1 text-xs bg-slate-900/80 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/60 text-slate-200 hover:text-amber-300 rounded-lg transition font-bold shadow-sm"
        >
          {e.label}
        </button>
      ))}
    </div>
  );
}
