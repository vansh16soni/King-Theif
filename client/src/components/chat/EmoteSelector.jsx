import React from 'react';
import { EMOTES } from '../../utils/constants';

export default function EmoteSelector({ onEmote }) {
  return (
    <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-700/50 shrink-0">
      {EMOTES.map(e => (
        <button
          key={e.type}
          onClick={() => onEmote(e.type)}
          className="px-1.5 py-0.5 text-[10px] bg-[#120822] hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 text-amber-200 rounded-md transition font-medium"
        >
          {e.label}
        </button>
      ))}
    </div>
  );
}
