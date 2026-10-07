import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { CrownIcon, UserIcon, TrophyIcon, BookOpenIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 shadow-lg ${
      isDark
        ? 'bg-[#0b0f19]/80 border-white/10 shadow-black/40 text-slate-100'
        : 'bg-white/85 border-slate-200/80 shadow-slate-900/5 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1 outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
              isDark ? 'bg-[#0f172a] text-amber-400' : 'bg-white text-amber-600'
            }`}>
              <CrownIcon className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div>
            <div className="font-extrabold tracking-wide text-base sm:text-lg gold-gradient-text uppercase">
              Raja Mantri Chor Sipahi
            </div>
            <div className={`text-[10px] font-semibold tracking-wider uppercase -mt-0.5 ${
              isDark ? 'text-amber-400/80' : 'text-amber-700'
            }`}>
              Online Multiplayer Game
            </div>
          </div>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Guide link accessible to everyone */}
          <button
            onClick={() => navigate('/guide')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500 ${
              isActive('/guide')
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                : isDark ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-black hover:bg-slate-100'
            }`}
          >
            <BookOpenIcon className="w-4 h-4 text-amber-500" />
            <span className="hidden xs:inline">Guide</span>
          </button>

          {user ? (
            <>
              <button
                onClick={() => navigate('/lobby')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive('/lobby')
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                <TrophyIcon className="w-4 h-4 text-amber-500" />
                <span>Lobby</span>
              </button>

              <button
                onClick={() => navigate('/profile')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive('/profile')
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                <UserIcon className="w-4 h-4 text-amber-500" />
                <span>Profile</span>
              </button>

              <div className={`hidden md:flex items-center gap-2 text-xs border-l pl-3 ${
                isDark ? 'border-white/15' : 'border-slate-300'
              }`}>
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {user.username}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black shadow-inner flex items-center gap-1">
                  <CrownIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>{(user.totalPoints ?? 0).toLocaleString()} pts</span>
                </span>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className={`px-3 py-1.5 text-xs rounded-lg transition font-semibold focus-visible:ring-2 focus-visible:ring-red-500 border ${
                  isDark
                    ? 'bg-slate-800/60 hover:bg-red-950/80 hover:text-red-300 hover:border-red-500/50 border-white/10 text-slate-300'
                    : 'bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-300 border-slate-200 text-slate-700'
                }`}
                title="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isDark ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="royal-btn-gold px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-amber-500 shadow-md"
              >
                Sign Up
              </button>
            </>
          )}

          {/* Theme Toggle Button */}
          <div className="ml-1 pl-1 border-l border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
