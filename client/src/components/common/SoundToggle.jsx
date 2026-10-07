import React, { useState } from 'react';

export default function SoundToggle({ onChange }) {
  const [enabled, setEnabled] = useState(true);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    onChange?.(next);
  }

  return (
    <button
      onClick={toggle}
      className="px-2.5 py-1 text-xs castle-btn-stone rounded-xl shadow-sm flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500"
      title="Toggle sound effects"
      aria-label={enabled ? 'Mute sound effects' : 'Unmute sound effects'}
    >
      <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {enabled ? (
          <>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </>
        ) : (
          <line x1="23" y1="9" x2="17" y2="15" />
        )}
      </svg>
      <span className="font-bold text-slate-200">{enabled ? 'Sound On' : 'Muted'}</span>
    </button>
  );
}
