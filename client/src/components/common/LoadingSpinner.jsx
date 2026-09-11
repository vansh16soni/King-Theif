import React from 'react';

export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="w-10 h-10 border-4 border-[#ebdcc2] border-t-amber-600 rounded-full animate-spin shadow-sm" />
      <span className="text-[#78350f] font-cinzel font-bold text-sm tracking-wide">{label}</span>
    </div>
  );
}
