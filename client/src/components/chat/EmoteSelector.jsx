import React from 'react';
import { EMOTES } from '../../utils/constants';

export default function EmoteSelector({ onEmote }) {
  return (
    <div className="flex flex-wrap gap-1.5 pt-2 border-t-2 border-[#d8c5a2] shrink-0">
      {EMOTES.map(e => (
        <button
          key={e.type}
          onClick={() => onEmote(e.type)}
          className="px-2 py-0.5 text-xs bg-[#fef9ee] hover:bg-amber-100 border border-amber-400/60 hover:border-amber-500 text-amber-950 rounded-lg transition font-bold shadow-sm"
        >
          {e.label}
        </button>
      ))}
    </div>
  );
}
