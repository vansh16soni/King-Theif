import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  }

  return (
    <form onSubmit={submit} className="flex gap-1.5 mt-1.5 shrink-0">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Whisper to court..."
        maxLength={300}
        className="flex-1 px-2.5 py-1.5 rounded-xl bg-[#0e081c] border border-amber-500/30 text-white placeholder-slate-500 text-xs shadow-inner focus:outline-none focus:border-amber-400 transition"
      />
      <button className="px-3 py-1.5 royal-btn-gold rounded-xl text-xs font-cinzel font-black uppercase tracking-wider shrink-0">
        Send
      </button>
    </form>
  );
}
