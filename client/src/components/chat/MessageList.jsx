import React, { useEffect, useRef } from 'react';
import { EMOTES } from '../../utils/constants';

export default function MessageList({ messages }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs min-h-0"
    >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-500 italic text-[11px]">
          The royal court is silent...
        </div>
      ) : (
        messages.map((m, i) => (
          <div key={i} className="px-2 py-1.5 rounded-lg bg-[#0e081c]/80 border border-slate-700/40 text-[11px] leading-snug">
            {m.kind === 'emote' ? (
              <span className="text-amber-300 italic">
                <span className="font-bold text-white">{m.sender}</span>
                {m.isPrivate ? ' (discrete hint)' : ' reacted'}:{' '}
                <span className="font-semibold text-amber-200">
                  {EMOTES.find(e => e.type === m.emoteType)?.label || m.emoteType}
                </span>
              </span>
            ) : (
              <div>
                <span className={`font-cinzel font-bold ${m.isBot ? 'text-purple-300' : 'text-amber-300'}`}>
                  {m.sender}{m.isBot ? ' 🤖' : ''}:
                </span>{' '}
                <span className="text-slate-200">{m.message}</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
