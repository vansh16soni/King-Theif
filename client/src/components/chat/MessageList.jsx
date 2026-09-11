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
        <div className="h-full flex items-center justify-center text-[#8c6d53] italic text-xs">
          The castle court is quiet...
        </div>
      ) : (
        list.map((m, i) => (
          <div key={i} className="px-2.5 py-1.5 rounded-xl bg-[#fffdf8] border border-[#dccab0] text-xs leading-snug shadow-sm">
            {m.kind === 'emote' ? (
              <span className="text-[#92400e] italic">
                <span className="font-bold text-[#2c1a0e]">{m.sender}</span>
                {m.isPrivate ? ' (discreet gesture)' : ' reacted'}:{' '}
                <span className="font-bold text-[#b45309]">
                  {EMOTES.find(e => e.type === m.emoteType)?.label || m.emoteType}
                </span>
              </span>
            ) : (
              <div>
                <span className={`font-cinzel font-black ${m.isBot ? 'text-purple-800' : 'text-amber-900'}`}>
                  {m.sender}{m.isBot ? ' 🤖' : ''}:
                </span>{' '}
                <span className="text-[#3a2211] font-medium">{m.message}</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
