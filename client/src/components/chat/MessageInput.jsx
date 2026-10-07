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
    <form onSubmit={submit} className="flex gap-2 mt-2 shrink-0">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message or bluff..."
        maxLength={300}
        className="flex-1 px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs shadow-inner focus:outline-none focus:border-amber-400 font-medium transition"
      />
      <button className="px-3.5 py-2 royal-btn-gold rounded-xl text-xs font-black uppercase tracking-wider shrink-0 shadow-md">
        Send
      </button>
    </form>
  );
}
