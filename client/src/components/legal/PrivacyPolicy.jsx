import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Breadcrumbs from '../common/Breadcrumbs';
import { ShieldIcon, LockIcon, CheckIcon, ScrollIcon } from '../common/Icons';

export default function PrivacyPolicy() {
  usePageMeta({
    title: 'Privacy Policy',
    description: 'Privacy Policy for Raja Mantri Chor Sipahi in full compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act, India).',
    path: '/privacy'
  });

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <Breadcrumbs items={[{ label: 'Legal' }, { label: 'Privacy Policy' }]} />

      <article className="royal-glass p-6 sm:p-10 rounded-2xl space-y-8 shadow-castle-card border border-[#dccab0]">
        <header className="border-b border-[#e5d5be] pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-cinzel font-black gold-gradient-text uppercase">
                Privacy Policy
              </h1>
              <p className="text-xs text-[#7c5a3e] font-medium">
                Effective Date: October 6, 2026 | Compliant with India's Digital Personal Data Protection Act, 2023
              </p>
            </div>
          </div>
        </header>

        {/* Section 1: Data Fiduciary */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28] flex items-center gap-2">
            <ScrollIcon className="w-5 h-5 text-amber-700" />
            1. Data Fiduciary Details
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            This online gaming service is operated by <strong>Raja Mantri Games LLP</strong> ("we", "us", or "our"), 
            having its registered operations in Bengaluru, Karnataka, India. We act as the <strong>Data Fiduciary</strong> 
            under the provisions of the Digital Personal Data Protection Act, 2023 (DPDP Act).
          </p>
          <div className="p-4 rounded-xl bg-[#faf4e6] border border-[#dccab0] text-xs space-y-1 text-[#4a3018]">
            <p><strong>Entity Name:</strong> Raja Mantri Games LLP</p>
            <p><strong>Jurisdiction:</strong> Bengaluru, Karnataka, Republic of India</p>
            <p><strong>Contact Email:</strong> legal@rajamantri.in</p>
            <p><strong>Grievance Redressal Officer:</strong> grievance@rajamantri.in</p>
          </div>
        </section>

        {/* Section 2: Data Minimization */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28] flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-amber-700" />
            2. Strict Data Minimization: What We Collect
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            In strict adherence to the data minimization principle under the DPDP Act, we only collect information 
            strictly necessary to conduct multiplayer game sessions:
          </p>
          <ul className="space-y-2 text-sm text-[#3b2516]">
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Account Identification:</strong> Chosen username and a salted, cryptographically hashed passkey (via bcrypt). We never store plaintext passwords.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Session & Gameplay Statistics:</strong> Transient room codes, game rounds won, role counts (Raja, Mantri, Sipahi, Chor), and accumulated score tallies.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>What We Never Collect:</strong> No real names required, no phone numbers, no Aadhaar or government IDs, no geolocation tracking, and no biometric data.</span>
            </li>
          </ul>
        </section>

        {/* Section 3: Grounds for Processing */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            3. Grounds for Processing
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            We process personal data solely on legitimate grounds recognized under Section 4 and Section 6 of the DPDP Act:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-[#3b2516]">
            <li><strong>Affirmative Consent:</strong> Given by you when registering an account and accepting this policy.</li>
            <li><strong>Contractual Performance:</strong> Necessary to maintain your game session, calculate leaderboard scores, and coordinate live WebSockets rooms.</li>
          </ul>
        </section>

        {/* Section 4: Rights of Data Principals */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            4. Your Rights Under the DPDP Act, 2023
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            As a Data Principal in India, you enjoy comprehensive statutory rights:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-[#faf4e6] border border-[#dccab0]">
              <strong className="text-[#78350f] block mb-1">Right to Access (Section 11)</strong>
              You may request a summary of your personal data and gaming records processed by us.
            </div>
            <div className="p-3.5 rounded-lg bg-[#faf4e6] border border-[#dccab0]">
              <strong className="text-[#78350f] block mb-1">Right to Correction & Erasure (Section 12)</strong>
              You can request correction of inaccurate data or complete erasure of your account and game history.
            </div>
            <div className="p-3.5 rounded-lg bg-[#faf4e6] border border-[#dccab0]">
              <strong className="text-[#78350f] block mb-1">Right of Grievance Redressal (Section 13)</strong>
              You may submit grievances directly to our Grievance Officer, with response guaranteed within 30 days.
            </div>
            <div className="p-3.5 rounded-lg bg-[#faf4e6] border border-[#dccab0]">
              <strong className="text-[#78350f] block mb-1">Right to Nominate (Section 14)</strong>
              You have the right to nominate an individual to exercise your rights in the event of death or incapacity.
            </div>
          </div>
        </section>

        {/* Section 5: Third-Party Sharing & Trackers */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            5. Third-Party Sharing & No Ad Trackers
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            We do <strong>not</strong> sell, rent, trade, or monetize your personal data. We do not embed third-party advertising tracking pixels 
            (such as Meta Pixel or Google Ads telemetry). Artificial Intelligence bot inferences are processed transiently with strict enterprise zero-data-retention APIs.
          </p>
        </section>

        {/* Section 6: Data Retention & Grievance */}
        <section className="space-y-3">
          <h2 className="text-lg font-cinzel font-black text-[#5c3e28]">
            6. Data Retention & Grievance Officer Contact
          </h2>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            Game room session records are purged automatically after 60 minutes of inactivity via automated database TTL indexes. 
            User accounts are retained until you request account deletion.
          </p>
          <p className="text-sm leading-relaxed text-[#3b2516]">
            To exercise any of your rights or raise concerns regarding data privacy, reach out to our designated officer:
          </p>
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-[#5c3e28]">
            <p><strong>Grievance Officer:</strong> Vansh Soni</p>
            <p><strong>Email:</strong> grievance@rajamantri.in</p>
            <p><strong>Mailing Address:</strong> Raja Mantri Games LLP, Outer Ring Road, Bellandur, Bengaluru 560103, Karnataka, India</p>
          </div>
        </section>
      </article>
    </div>
  );
}
