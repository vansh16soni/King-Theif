import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import EmoteSelector from './EmoteSelector';

export default function ChatBox({ messages, onSend, onEmote }) {
  return (
    <div className="royal-glass rounded-2xl p-3.5 sm:p-4 flex flex-col h-64 max-h-64 shadow-2xl relative overflow-hidden border border-white/15">
      <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-1.5 shrink-0">
        <h3 className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>💬</span>
          <span>Room Chat</span>
        </h3>
        <span className="text-[10px] text-slate-400 font-bold">Live</span>
      </div>
      <MessageList messages={messages} />
      <EmoteSelector onEmote={onEmote} />
      <MessageInput onSend={onSend} />
    </div>
  );
}
