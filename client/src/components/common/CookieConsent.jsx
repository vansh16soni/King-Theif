import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon, CheckIcon } from './Icons';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('rmcs_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem('rmcs_cookie_consent', 'accepted');
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy and Storage Notice"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl text-slate-200"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0 mt-0.5">
            <ShieldIcon className="w-5 h-5" />
          </div>
          <div className="text-xs leading-relaxed text-slate-300">
            <p className="font-bold text-amber-400 mb-0.5">
              Privacy and Essential Storage Notice
            </p>
            <p>
              We use strictly necessary local storage solely to keep you authenticated during gameplay. 
              We do not use advertising trackers or sell personal data. By continuing to play, you acknowledge our{' '}
              <Link to="/privacy" className="text-amber-400 font-bold underline hover:text-amber-300">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/cookies" className="text-amber-400 font-bold underline hover:text-amber-300">
                Cookie Policy
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <Link
            to="/cookies"
            className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white border border-white/10 rounded-xl transition hover:bg-white/10 text-center flex-1 sm:flex-none"
          >
            Review Policy
          </Link>
          <button
            onClick={handleAccept}
            className="royal-btn-gold px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md text-center flex-1 sm:flex-none"
          >
            <CheckIcon className="w-4 h-4 text-slate-950" />
            Accept & Continue
          </button>
        </div>
      </div>
    </aside>
  );
}
