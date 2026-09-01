import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-[#120a22]/90 backdrop-blur-md border-b border-amber-500/25 shadow-xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Royal Crest */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#170e2b] rounded-xl flex items-center justify-center text-xl">
              👑
            </div>
          </div>
          <div>
            <div className="font-cinzel font-black tracking-wider text-base sm:text-lg gold-gradient-text uppercase">
              Raja Mantri Chor Sipahi
            </div>
            <div className="text-[10px] text-amber-300/60 font-cinzel tracking-widest uppercase -mt-0.5">
              The Grand Royal Court
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate('/lobby')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold transition flex items-center gap-1.5 ${
                isActive('/lobby')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-slate-800/60'
              }`}
            >
              <span>🏛️</span> Lobby
            </button>

            <button
              onClick={() => navigate('/profile')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold transition flex items-center gap-1.5 ${
                isActive('/profile')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-slate-800/60'
              }`}
            >
              <span>📜</span> Decree
            </button>

            <button
              onClick={() => navigate('/admin')}
              className="px-3 py-1.5 rounded-xl text-xs sm:text-sm bg-gradient-to-r from-purple-900/80 to-mantri text-purple-200 hover:text-white border border-purple-500/40 font-cinzel font-bold shadow-md shadow-purple-900/30 transition flex items-center gap-1.5"
            >
              <span>⚡</span> Admin
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs border-l border-amber-500/20 pl-3">
              <span className="font-semibold text-white">{user.username}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold">
                👑 {(user.totalPoints ?? 0).toLocaleString()} pts
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-2.5 py-1.5 text-xs bg-slate-800/80 hover:bg-red-950/60 border border-slate-700 hover:border-red-500/40 rounded-xl text-slate-300 hover:text-red-200 transition font-medium"
              title="Leave Court"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold text-amber-300 hover:bg-amber-500/10 transition"
            >
              Enter Court
            </button>
            <button
              onClick={() => navigate('/register')}
              className="royal-btn-gold px-4 py-1.5 rounded-xl text-xs sm:text-sm font-cinzel font-black uppercase tracking-wider"
            >
              Join Kingdom
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
