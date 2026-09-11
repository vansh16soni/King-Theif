import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import EmoteSelector from './EmoteSelector';

export default function ChatBox({ messages, onSend, onEmote }) {
  return (
    <div className="royal-glass rounded-3xl p-3.5 sm:p-4 flex flex-col h-64 max-h-64 shadow-castle-card relative overflow-hidden">
      <div className="flex items-center justify-between mb-2 border-b-2 border-[#d8c5a2] pb-1.5 shrink-0">
        <h3 className="font-cinzel font-black text-xs text-[#78350f] uppercase tracking-wider flex items-center gap-1.5">
          <span>📜</span> Castle Whispers
        </h3>
        <span className="text-[10px] text-[#8c6d53] font-cinzel font-bold">Town Crier</span>
      </div>
      <MessageList messages={messages} />
      <EmoteSelector onEmote={onEmote} />
      <MessageInput onSend={onSend} />
    </div>
  );
}
