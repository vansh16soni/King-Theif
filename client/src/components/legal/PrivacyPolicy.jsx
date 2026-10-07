import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useTheme } from '../../contexts/ThemeContext';
import Breadcrumbs from '../common/Breadcrumbs';
import { ShieldIcon, LockIcon, CheckIcon, ScrollIcon, CrownIcon } from '../common/Icons';

export default function PrivacyPolicy() {
  const { isDark } = useTheme();

  usePageMeta({
    title: 'Privacy Policy',
    description: 'Privacy Policy for Raja Mantri Chor Sipahi in full compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act, India).',
    path: '/privacy'
  });

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-4 space-y-6">
      <Breadcrumbs items={[{ label: 'Legal' }, { label: 'Privacy Policy' }]} />

      <article className="royal-glass p-6 sm:p-10 rounded-2xl space-y-8 shadow-2xl border border-white/15 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        {/* Header */}
        <header className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-inner shrink-0">
              <ShieldIcon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black gold-gradient-text uppercase tracking-wide">
                Privacy Policy
              </h1>
              <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-amber-400/80' : 'text-amber-700'}`}>
                Effective Date: October 6, 2026 &bull; Compliant with India's Digital Personal Data Protection Act, 2023 (DPDP Act)
              </p>
            </div>
          </div>
          <p className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            At <strong>Raja Mantri Chor Sipahi</strong>, we respect your privacy. This policy explains our zero-surveillance, minimal-data architecture designed for pure social deduction entertainment.
          </p>
        </header>

        {/* Section 1: Data Fiduciary */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <ScrollIcon className="w-5 h-5 text-amber-400" />
            <span>1. Data Fiduciary Details</span>
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            This online gaming platform is operated by <strong>Raja Mantri Games LLP</strong> ("we", "us", or "our"), 
            having registered operations in Bengaluru, Karnataka, India. We act as the designated <strong>Data Fiduciary</strong> 
            under the provisions of the Digital Personal Data Protection Act, 2023 (DPDP Act, India).
          </p>
          <div className={`p-4 rounded-xl border text-xs space-y-1.5 font-medium shadow-inner ${
            isDark ? 'bg-slate-900/80 border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <p><strong className="text-amber-500">Entity Name:</strong> Raja Mantri Games LLP</p>
            <p><strong className="text-amber-500">Jurisdiction:</strong> Bengaluru, Karnataka, Republic of India</p>
            <p><strong className="text-amber-500">Legal Contact:</strong> legal@rajamantri.in</p>
            <p><strong className="text-amber-500">Grievance Redressal Officer:</strong> grievance@rajamantri.in</p>
          </div>
        </section>

        {/* Section 2: Data Minimization */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-amber-400" />
            <span>2. Strict Data Minimization: What We Collect</span>
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            In strict adherence to the statutory data minimization principle under Section 6 of the DPDP Act, we collect only the bare minimum information necessary to operate real-time match rooms:
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>Player Account Credentials:</strong>{' '}
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  Your chosen username and a salted, cryptographically hashed passkey (via bcrypt with salt rounds). We never store or have access to plaintext passwords.
                </span>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>Gameplay Performance & Statistics:</strong>{' '}
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  Temporary 4-digit room codes, cumulative match scores, rounds completed, and role distribution tallies (Raja, Mantri, Sipahi, Chor).
                </span>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <CrownIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className={isDark ? 'text-emerald-300' : 'text-emerald-800'}>What We NEVER Collect:</strong>{' '}
                <span className={isDark ? 'text-emerald-200/90' : 'text-emerald-700'}>
                  No real names, no phone numbers, no Aadhaar or government identification, no payment cards, no precise geolocation tracking, and zero biometric data.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Grounds for Processing */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            3. Grounds for Lawful Processing
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            We process personal data solely under legitimate grounds recognized in the DPDP Act, 2023:
          </p>
          <ul className={`space-y-2 text-xs font-medium pl-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Explicit Affirmative Consent (Section 6):</strong> Expressly provided by you upon registering your player account and accepting our terms.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Legitimate Technical Necessity:</strong> Required to maintain synchronized WebSocket socket connections, distribute game chits, and prevent concurrent session conflicts.</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Rights of Data Principals */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            4. Your Rights Under the DPDP Act, 2023
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            As a Data Principal under Indian law, you are endowed with full statutory control over your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className={`p-4 rounded-xl border space-y-1 ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <strong className="text-amber-500 font-bold block">Right to Access (Section 11)</strong>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                Request a complete summary of your registered account information and match history.
              </p>
            </div>
            <div className={`p-4 rounded-xl border space-y-1 ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <strong className="text-amber-500 font-bold block">Right to Correction & Erasure (Section 12)</strong>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                Update your account alias or request complete, permanent erasure of your account and scores.
              </p>
            </div>
            <div className={`p-4 rounded-xl border space-y-1 ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <strong className="text-amber-500 font-bold block">Right of Grievance Redressal (Section 13)</strong>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                File concerns with our designated Grievance Officer, with guaranteed review within 30 days.
              </p>
            </div>
            <div className={`p-4 rounded-xl border space-y-1 ${
              isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <strong className="text-amber-500 font-bold block">Right to Nominate (Section 14)</strong>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                Nominate an authorized individual to exercise your privacy rights in the event of incapacity.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Third-Party Sharing & Trackers */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            5. Zero Commercial Sharing & No Ad Trackers
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            We do <strong>not</strong> sell, rent, monetize, or trade your player data to any third party or marketing broker. 
            We do not embed third-party surveillance trackers (such as advertising pixels or invasive behavioral SDKs). 
            AI bot moves and chatter are computed on privacy-compliant serverless inference pipelines without training retention.
          </p>
        </section>

        {/* Section 6: Data Retention & Grievance Contact */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            6. Data Retention & Grievance Officer
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Completed room records are automatically purged from our databases after 60 minutes of room inactivity via automated TTL indexes. Player profiles remain active until deletion is requested.
          </p>
          <div className={`p-4 rounded-xl border text-xs space-y-1.5 shadow-inner ${
            isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <p><strong>Grievance Officer:</strong> Vansh Soni</p>
            <p><strong>Direct Email:</strong> grievance@rajamantri.in / legal@rajamantri.in</p>
            <p><strong>Corporate Address:</strong> Raja Mantri Games LLP, Bengaluru, Karnataka 560103, India</p>
            <p className="text-[11px] opacity-80 pt-1">
              Response SLA: All grievances submitted under Section 13 of the DPDP Act will be resolved within 30 days of receipt.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
