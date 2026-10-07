import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useTheme } from '../../contexts/ThemeContext';
import Breadcrumbs from '../common/Breadcrumbs';
import { ScaleIcon, ScrollIcon, CheckIcon, AlertIcon } from '../common/Icons';

export default function TermsOfService() {
  const { isDark } = useTheme();

  usePageMeta({
    title: 'Terms and Conditions',
    description: 'Terms and Conditions of Service for Raja Mantri Chor Sipahi online multiplayer platform.',
    path: '/terms'
  });

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-4 space-y-6">
      <Breadcrumbs items={[{ label: 'Legal' }, { label: 'Terms and Conditions' }]} />

      <article className="royal-glass p-6 sm:p-10 rounded-2xl space-y-8 shadow-2xl border border-white/15 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        <header className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-inner shrink-0">
              <ScaleIcon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black gold-gradient-text uppercase tracking-wide">
                Terms and Conditions
              </h1>
              <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-amber-400/80' : 'text-amber-700'}`}>
                Last Updated: October 6, 2026 &bull; Governing Law: Republic of India
              </p>
            </div>
          </div>
        </header>

        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <ScrollIcon className="w-5 h-5 text-amber-400" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            By registering, accessing, or playing on <strong>Raja Mantri Chor Sipahi</strong> (accessible at rajamantri.in), 
            you enter into a legally binding agreement with <strong>Raja Mantri Games LLP</strong>. If you do not agree to 
            these Terms, please discontinue use of the service immediately.
          </p>
        </section>

        {/* Section 2: Non-Monetary Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <AlertIcon className="w-5 h-5 text-amber-400" />
            <span>2. Pure Recreational Social Deduction (No Real-Money Gaming)</span>
          </h2>
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 shadow-inner ${
            isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <p className="font-bold text-amber-400">Important Statutory Disclaimer:</p>
            <p>
              Raja Mantri Chor Sipahi is purely an authentic Indian social deduction and folklore parlor game created 
              for non-monetary recreational entertainment. 
            </p>
            <p>
              Points scored within the game (1000 for Raja, 500 for Mantri, 300 for Sipahi, 500 for Chor) have 
              <strong> zero monetary value</strong>. They cannot be converted into cash, crypto, prizes, or tangible consideration. 
              We do not offer, promote, or permit gambling, betting, or wagering of any nature.
            </p>
          </div>
        </section>

        {/* Section 3: Eligibility & Accounts */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            3. Account Registration and Security
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            You agree to select a username that does not infringe on registered trademarks, impersonate other individuals, 
            or contain offensive slurs. You are solely responsible for maintaining the confidentiality of your passkey. 
            Notify us immediately at legal@rajamantri.in if you suspect unauthorized access to your account.
          </p>
        </section>

        {/* Section 4: Acceptable Conduct & Fair Play */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            4. Fair Play and Code of Conduct
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            While bluffing and strategic deception are inherent mechanics of the game's social deduction roles, 
            players must adhere to the following rules:
          </p>
          <ul className={`space-y-2 text-xs font-medium pl-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No hate speech, harassment, stalking, or abusive conduct in room interactions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No unauthorized automation, bot exploitation, packet injection, or denial of service attacks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>We reserve the right to suspend or terminate accounts that breach these standards without prior notice.</span>
            </li>
          </ul>
        </section>

        {/* Section 5: Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            5. Intellectual Property Rights
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            All original source code, graphic UI assets, logos, design systems, and audio tone generators are the proprietary 
            intellectual property of Raja Mantri Games LLP or used under permissive open licenses. You may not copy, reverse-engineer, 
            or republish these assets without prior written consent.
          </p>
        </section>

        {/* Section 6: Governing Law */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            6. Governing Law and Dispute Resolution
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            These Terms are governed by and construed under the laws of the Republic of India. Any legal dispute, 
            arbitration, or claim arising out of or related to these Terms shall be subject to the exclusive jurisdiction 
            of the competent courts situated in Bengaluru, Karnataka, India.
          </p>
        </section>
      </article>
    </div>
  );
}
