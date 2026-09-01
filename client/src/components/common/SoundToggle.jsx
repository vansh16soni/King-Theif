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
      className="px-2 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded-md"
      title="Toggle sound effects"
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
