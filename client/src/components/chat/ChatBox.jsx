import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import EmoteSelector from './EmoteSelector';

export default function ChatBox({ messages, onSend, onEmote }) {
  return (
    <div className="royal-glass rounded-2xl p-3 sm:p-3.5 flex flex-col h-60 max-h-60 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-1.5 border-b border-amber-500/20 pb-1.5 shrink-0">
        <h3 className="font-cinzel font-black text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
          <span>📜</span> Palace Whispers
        </h3>
        <span className="text-[10px] text-amber-300/60 font-cinzel">Chat</span>
      </div>
      <MessageList messages={messages} />
      <EmoteSelector onEmote={onEmote} />
      <MessageInput onSend={onSend} />
    </div>
  );
}
