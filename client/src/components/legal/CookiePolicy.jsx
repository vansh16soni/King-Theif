import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useTheme } from '../../contexts/ThemeContext';
import Breadcrumbs from '../common/Breadcrumbs';
import { LockIcon, CheckIcon, ShieldIcon } from '../common/Icons';

export default function CookiePolicy() {
  const { isDark } = useTheme();

  usePageMeta({
    title: 'Cookie Policy',
    description: 'Cookie and Local Storage Policy for Raja Mantri Chor Sipahi explaining our strictly necessary storage approach.',
    path: '/cookies'
  });

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-4 space-y-6">
      <Breadcrumbs items={[{ label: 'Legal' }, { label: 'Cookie Policy' }]} />

      <article className="royal-glass p-6 sm:p-10 rounded-2xl space-y-8 shadow-2xl border border-white/15 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        <header className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-inner shrink-0">
              <ShieldIcon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black gold-gradient-text uppercase tracking-wide">
                Cookie & Storage Policy
              </h1>
              <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-amber-400/80' : 'text-amber-700'}`}>
                Last Updated: October 6, 2026 &bull; Privacy First & Strictly Necessary Storage
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            1. Overview
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            This policy outlines how Raja Mantri Chor Sipahi uses web cookies and HTML5 local storage. 
            We practice strict data minimization and <strong>do not employ behavioral tracking or advertising cookies</strong>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-amber-400" />
            <span>2. Storage Elements in Use</span>
          </h2>
          
          <div className="space-y-3">
            <div className={`p-4 rounded-xl border space-y-1 shadow-inner ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className="font-bold text-sm text-amber-400 mb-1">
                Strictly Necessary Authentication Token (Local Storage)
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Key:</strong> <code className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded font-mono">rmcs_token</code><br />
                <strong>Purpose:</strong> Stores your signed cryptographic JSON Web Token (JWT) so you stay authenticated 
                while navigating between the lobby and game chambers.<br />
                <strong>Duration:</strong> Valid for the duration of your login session until logout.
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-1 shadow-inner ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className="font-bold text-sm text-amber-400 mb-1">
                Cookie Consent State (Local Storage)
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Key:</strong> <code className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded font-mono">rmcs_cookie_consent</code><br />
                <strong>Purpose:</strong> Remembers that you acknowledged our essential privacy notice so the banner is not displayed repeatedly.<br />
                <strong>Duration:</strong> Persistent until you clear browser data.
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-1 shadow-inner ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className="font-bold text-sm text-amber-400 mb-1">
                Visual Theme Preference (Local Storage)
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Key:</strong> <code className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded font-mono">rmcs_theme</code><br />
                <strong>Purpose:</strong> Stores your chosen display mode (dark or bright/light theme).<br />
                <strong>Duration:</strong> Persistent across browser restarts.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-emerald-400" />
            <span>3. No Advertising or Third-Party Analytics Trackers</span>
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            We do not use advertising networks, cross-site trackers, or third-party behavioral analytics cookies. 
            Because we use only strictly necessary local storage items, the game functions transparently without profiling you.
          </p>
        </section>
      </article>
    </div>
  );
}
