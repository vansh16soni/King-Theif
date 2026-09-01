import React from 'react';

export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="w-10 h-10 border-4 border-slate-600 border-t-raja rounded-full animate-spin" />
      <span className="text-slate-400 text-sm">{label}</span>
    </div>
  );
}
