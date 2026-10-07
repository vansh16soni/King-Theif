import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Breadcrumbs from '../common/Breadcrumbs';
import { ScaleIcon, ScrollIcon, CheckIcon, AlertIcon } from '../common/Icons';

export default function TermsOfService() {
  usePageMeta({
    title: 'Terms and Conditions',
    description: 'Terms and Conditions of Service for Raja Mantri Chor Sipahi online multiplayer platform.',
    path: '/terms'
  });

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <Breadcrumbs items={[{ label: 'Legal' }, { label: 'Terms and Conditions' }]} />

      <article className="royal-glass p-6 sm:p-10 rounded-2xl space-y-8 shadow-castle-card border border-[#dccab0]">
        <header className="border-b border-[#e5d5be] pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
              <ScaleIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-cinzel font-black gold-gradient-text uppercase">
                Terms and Conditions
              </h1>
              <p className="text-xs text-[#7c5a3e] font-medium">
                Last Updated: October 6, 2026 | Governing Law: Republic of India
              </p>
            </div>
          </div>
        </header>

        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28] flex items-center gap-2">
            <ScrollIcon className="w-5 h-5 text-amber-700" />
            1. Acceptance of Terms
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            By registering, accessing, or playing on <strong>Raja Mantri Chor Sipahi</strong> (accessible at rajamantri.in), 
            you enter into a legally binding agreement with <strong>Raja Mantri Games LLP</strong>. If you do not agree to 
            these Terms, please discontinue use of the service immediately.
          </p>
        </section>

        {/* Section 2: Non-Monetary Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28] flex items-center gap-2">
            <AlertIcon className="w-5 h-5 text-amber-700" />
            2. Pure Recreational Social Deduction (No Real-Money Gaming)
          </h2>
          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-xs leading-relaxed text-[#5c3e28] space-y-2">
            <p className="font-bold text-[#78350f]">Important Statutory Disclaimer:</p>
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
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            3. Account Registration and Security
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            You agree to select a username that does not infringe on registered trademarks, impersonate other individuals, 
            or contain offensive slurs. You are solely responsible for maintaining the confidentiality of your passkey. 
            Notify us immediately at legal@rajamantri.in if you suspect unauthorized access to your account.
          </p>
        </section>

        {/* Section 4: Acceptable Conduct & Fair Play */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            4. Fair Play and Chat Code of Conduct
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            While bluffing and strategic deception are inherent mechanics of the game's social deduction roles, 
            players must adhere to the following rules:
          </p>
          <ul className="space-y-1.5 text-sm text-[#3b2516]">
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>No hate speech, harassment, stalking, or abusive conduct in room chat.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>No unauthorized automation, bot exploitation, packet injection, or denial of service attacks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>We reserve the right to suspend or terminate accounts that breach these standards without prior notice.</span>
            </li>
          </ul>
        </section>

        {/* Section 5: Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            5. Intellectual Property Rights
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            All original source code, graphic UI assets, logos, design systems, and audio tone generators are the proprietary 
            intellectual property of Raja Mantri Games LLP or used under permissive open licenses. You may not copy, reverse-engineer, 
            or republish these assets without prior written consent.
          </p>
        </section>

        {/* Section 6: Governing Law */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            6. Governing Law and Dispute Resolution
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            These Terms are governed by and construed under the laws of the Republic of India. Any legal dispute, 
            arbitration, or claim arising out of or related to these Terms shall be subject to the exclusive jurisdiction 
            of the competent courts situated in Bengaluru, Karnataka, India.
          </p>
        </section>
      </article>
    </div>
  );
}
