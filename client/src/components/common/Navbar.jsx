import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-[#fffdf8]/95 backdrop-blur-md border-b-2 border-[#dccab0] shadow-md shadow-[#4a3018]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Royal Crest */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1.5px] shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#fffbf0] rounded-[10px] flex items-center justify-center text-xl shadow-inner">
              🏰
            </div>
          </div>
          <div>
            <div className="font-cinzel font-black tracking-wider text-base sm:text-lg gold-gradient-text uppercase">
              Raja Mantri Chor Sipahi
            </div>
            <div className="text-[10px] text-[#854d0e] font-cinzel font-bold tracking-widest uppercase -mt-0.5">
              The Grand Royal Castle
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
                  ? 'bg-amber-100 text-amber-900 border border-amber-400/60 shadow-sm'
                  : 'text-[#5c3e28] hover:text-[#b45309] hover:bg-[#ede1cc]/60'
              }`}
            >
              <span>🏛️</span> Lobby
            </button>

            <button
              onClick={() => navigate('/profile')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold transition flex items-center gap-1.5 ${
                isActive('/profile')
                  ? 'bg-amber-100 text-amber-900 border border-amber-400/60 shadow-sm'
                  : 'text-[#5c3e28] hover:text-[#b45309] hover:bg-[#ede1cc]/60'
              }`}
            >
              <span>📜</span> Decree
            </button>

            <button
              onClick={() => navigate('/admin')}
              className="px-3 py-1.5 rounded-xl text-xs sm:text-sm bg-gradient-to-r from-purple-100 to-purple-200 text-purple-900 hover:text-purple-950 border border-purple-300 font-cinzel font-bold shadow-sm transition flex items-center gap-1.5"
            >
              <span>⚡</span> Scribe Portal
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs border-l border-[#dccab0] pl-3">
              <span className="font-bold text-[#3a2211]">{user.username}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-400/60 font-black shadow-inner">
                👑 {(user.totalPoints ?? 0).toLocaleString()} pts
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-2.5 py-1.5 text-xs castle-btn-stone hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-xl transition font-semibold"
              title="Leave Castle"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold text-[#854d0e] hover:bg-amber-100/60 transition"
            >
              Enter Gates
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
