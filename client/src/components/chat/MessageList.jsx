import React, { useEffect, useRef } from 'react';
import { EMOTES } from '../../utils/constants';

export default function MessageList({ messages = [] }) {
  const containerRef = useRef(null);
  const list = messages || [];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [list]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs min-h-0"
    >
      {list.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-400 italic text-xs">
          Chat is quiet...
        </div>
      ) : (
        list.map((m, i) => (
          <div key={i} className="px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-white/10 text-xs leading-snug shadow-sm">
            {m.kind === 'emote' ? (
              <span className="text-amber-300 italic">
                <span className="font-bold text-white">{m.sender}</span>
                {m.isPrivate ? ' (private hint)' : ' reacted'}:{' '}
                <span className="font-bold text-amber-400">
                  {EMOTES.find(e => e.type === m.emoteType)?.label || m.emoteType}
                </span>
              </span>
            ) : (
              <div>
                <span className={`font-bold ${m.isBot ? 'text-amber-400' : 'text-amber-300'}`}>
                  {m.sender}{m.isBot ? ' (AI)' : ''}:
                </span>{' '}
                <span className="text-slate-200 font-medium">{m.message}</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
