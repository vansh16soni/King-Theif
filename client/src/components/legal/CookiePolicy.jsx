import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Breadcrumbs from '../common/Breadcrumbs';
import { LockIcon, CheckIcon, ShieldIcon } from '../common/Icons';

export default function CookiePolicy() {
  usePageMeta({
    title: 'Cookie Policy',
    description: 'Cookie and Local Storage Policy for Raja Mantri Chor Sipahi explaining our strictly necessary storage approach.',
    path: '/cookies'
  });

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <Breadcrumbs items={[{ label: 'Legal' }, { label: 'Cookie Policy' }]} />

      <article className="royal-glass p-6 sm:p-10 rounded-2xl space-y-8 shadow-castle-card border border-[#dccab0]">
        <header className="border-b border-[#e5d5be] pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-cinzel font-black gold-gradient-text uppercase">
                Cookie & Storage Policy
              </h1>
              <p className="text-xs text-[#7c5a3e] font-medium">
                Last Updated: October 6, 2026 | Privacy First & Strictly Necessary Storage
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            1. Overview
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            This policy outlines how Raja Mantri Chor Sipahi uses web cookies and HTML5 local storage. 
            We practice strict data minimization and <strong>do not employ behavioral tracking or advertising cookies</strong>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28] flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-amber-700" />
            2. Storage Elements in Use
          </h2>
          
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#faf4e6] border border-[#dccab0]">
              <h3 className="font-bold text-sm text-[#78350f] mb-1">
                Strictly Necessary Authentication Token (Local Storage)
              </h3>
              <p className="text-xs text-[#4a3018] leading-relaxed">
                <strong>Key:</strong> <code className="bg-amber-100/60 px-1 py-0.5 rounded">rmcs_token</code><br />
                <strong>Purpose:</strong> Stores your signed cryptographic JSON Web Token (JWT) so you stay authenticated 
                while navigating between the lobby and game chambers.<br />
                <strong>Duration:</strong> Valid for the duration of your login session until logout.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#faf4e6] border border-[#dccab0]">
              <h3 className="font-bold text-sm text-[#78350f] mb-1">
                Cookie Consent Preference (Local Storage)
              </h3>
              <p className="text-xs text-[#4a3018] leading-relaxed">
                <strong>Key:</strong> <code className="bg-amber-100/60 px-1 py-0.5 rounded">rmcs_cookie_consent</code><br />
                <strong>Purpose:</strong> Remembers your acknowledgment of our strictly necessary storage policy so the 
                notice banner is not displayed repeatedly.<br />
                <strong>Duration:</strong> Persistent until browser cache cleared.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#faf4e6] border border-[#dccab0]">
              <h3 className="font-bold text-sm text-[#78350f] mb-1">
                Sound Preference (Local Storage)
              </h3>
              <p className="text-xs text-[#4a3018] leading-relaxed">
                <strong>Key:</strong> <code className="bg-amber-100/60 px-1 py-0.5 rounded">rmcs_sound_muted</code><br />
                <strong>Purpose:</strong> Remembers your preference for game audio effects and card flip synthesizer sounds.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            3. No Third-Party Marketing or Telemetry Cookies
          </h2>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <CheckIcon className="w-4 h-4 text-emerald-700" />
              Zero Third-Party Advertising Trackers
            </div>
            <p>
              We do not use Google Analytics, Meta Pixel, Hotjar, or any cross-site advertising networks. 
              Your activity on our platform remains strictly private.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            4. Managing Your Storage
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            You may clear local storage or cookies at any time through your browser's security and privacy settings. 
            Clearing local storage will log you out of active game sessions.
          </p>
        </section>
      </article>
    </div>
  );
}
