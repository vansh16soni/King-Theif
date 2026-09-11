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
      className="px-2.5 py-1 text-sm castle-btn-stone rounded-xl shadow-sm"
      title="Toggle castle sound effects"
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
