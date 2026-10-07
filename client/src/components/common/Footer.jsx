import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { ShieldIcon, ScaleIcon, LockIcon, CrownIcon, BookOpenIcon } from './Icons';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`mt-auto border-t backdrop-blur-xl relative z-10 transition-colors duration-200 ${
      isDark ? 'border-white/10 bg-[#0b0f19]/80 text-slate-300' : 'border-slate-200 bg-white/85 text-slate-600 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-xs">
          {/* Column 1: Brand & Purpose */}
          <div className="space-y-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <CrownIcon className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-extrabold text-sm gold-gradient-text tracking-wider uppercase">
                Raja Mantri Chor Sipahi
              </span>
            </div>
            <p className={isDark ? 'text-slate-400 leading-relaxed' : 'text-slate-600 leading-relaxed'}>
              Multiplayer digital recreation of India's classical 4-chit social deduction and strategy parlor game.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-amber-500">
              Quick Navigation
            </h3>
            <ul className={`space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>
                <Link to="/lobby" className="hover:text-amber-500 transition">
                  Game Lobby
                </Link>
              </li>
              <li>
                <Link to="/guide" className="hover:text-amber-500 transition flex items-center gap-1">
                  <BookOpenIcon className="w-3.5 h-3.5 text-amber-500" />
                  How to Play Guide
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-amber-500 transition">
                  Player Profile & Stats
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & DPDP Act */}
          <div className="space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-amber-400">
              Compliance & Legal
            </h3>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <Link to="/privacy" className="hover:text-amber-300 transition flex items-center gap-1">
                  <ShieldIcon className="w-3.5 h-3.5 text-amber-400" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-300 transition flex items-center gap-1">
                  <ScaleIcon className="w-3.5 h-3.5 text-amber-400" /> Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-amber-300 transition flex items-center gap-1">
                  <LockIcon className="w-3.5 h-3.5 text-amber-400" /> Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Business Details */}
          <div className="space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-amber-400">
              Support & Contact
            </h3>
            <p className="text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Game:</strong> Raja Mantri Chor Sipahi<br />
              <strong className="text-slate-200">Mode:</strong> Multiplayer Real-Time & AI<br />
              <strong className="text-slate-200">Support:</strong> support@rajamantri.in<br />
              <strong className="text-slate-200">Feedback:</strong> contact@rajamantri.in
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            © 2026 Raja Mantri Chor Sipahi. All rights reserved.
          </p>
          <p className="text-center sm:text-right font-medium">
            Non-monetary recreational social deduction game • Free to play
          </p>
        </div>
      </div>
    </footer>
  );
}
