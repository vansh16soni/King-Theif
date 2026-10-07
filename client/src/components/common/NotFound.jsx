import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import Breadcrumbs from './Breadcrumbs';
import { HomeIcon, ShieldIcon, TrophyIcon, UserIcon } from './Icons';

export default function NotFound() {
  const navigate = useNavigate();

  usePageMeta({
    title: '404 Page Not Found',
    description: 'The requested game room or page could not be found on Raja Mantri Chor Sipahi.',
    path: '/404'
  });

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Breadcrumbs items={[{ label: '404 Page Not Found' }]} />

      <main className="royal-glass p-8 sm:p-12 rounded-2xl text-center space-y-6 shadow-2xl border border-white/15">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
          <HomeIcon className="w-8 h-8 text-amber-400" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-4xl font-black gold-gradient-text uppercase">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            The page or game room you requested does not exist, has expired, or has moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/lobby')}
            className="w-full sm:w-auto royal-btn-gold px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <HomeIcon className="w-4 h-4 text-slate-950" />
            Return to Game Lobby
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto castle-btn-stone px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider"
          >
            Go Back
          </button>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6">
          <p className="text-xs text-slate-400 font-semibold mb-3">
            Quick Navigation Links:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-amber-400">
            <Link to="/lobby" className="hover:underline flex items-center gap-1">
              <TrophyIcon className="w-3.5 h-3.5" /> Game Lobby
            </Link>
            <Link to="/profile" className="hover:underline flex items-center gap-1">
              <UserIcon className="w-3.5 h-3.5" /> Player Profile
            </Link>
            <Link to="/privacy" className="hover:underline flex items-center gap-1">
              <ShieldIcon className="w-3.5 h-3.5" /> Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
