import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useTheme } from '../../contexts/ThemeContext';
import Breadcrumbs from '../common/Breadcrumbs';
import {
  CrownIcon,
  ScaleIcon,
  ShieldIcon,
  KeyIcon,
  ClockIcon,
  TrophyIcon,
  CheckIcon,
  AlertIcon,
  BookOpenIcon,
  SparklesIcon
} from '../common/Icons';

export default function GameGuide() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  usePageMeta({
    title: 'How to Play | Official Game Guide & Rules',
    description: 'Complete guide to playing Raja Mantri Chor Sipahi online. Learn the 4 roles, 25-second deduction phase, point system, bluffing strategies, and rules.',
    path: '/guide'
  });

  const roles = [
    {
      id: 'raja',
      name: 'Raja',
      title: 'The Sovereign King',
      points: '1,000 Points',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      borderColor: 'border-amber-500/40',
      panelBg: isDark ? 'bg-amber-950/30' : 'bg-amber-50/80',
      icon: <CrownIcon className="w-7 h-7 text-amber-400" />,
      tagline: 'Guaranteed points, royal immunity, and the sovereign seat.',
      summary: 'The Raja is the monarch of the kingdom. At the start of the round, the Raja is automatically revealed to all players. The Raja is completely exempt from accusations and always receives 1,000 points.',
      objective: 'Watch the courtroom drama unfold as your Minister investigates the suspects.',
      keyPoints: [
        'Guaranteed 1,000 points every round you hold this card',
        'Identity is revealed publicly immediately after cards are dealt',
        'Cannot be guessed or accused by anyone'
      ],
      proTip: 'As Raja, enjoy your guaranteed 1,000 points and observe player behaviors to deduce who is playing skillfully for future rounds!'
    },
    {
      id: 'mantri',
      name: 'Mantri',
      title: 'The Royal Minister (Detective)',
      points: '500 Points (At Stake)',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      borderColor: 'border-purple-500/40',
      panelBg: isDark ? 'bg-purple-950/30' : 'bg-purple-50/80',
      icon: <ScaleIcon className="w-7 h-7 text-purple-400" />,
      tagline: 'The sharp investigator with 25 seconds on the clock to catch the thief.',
      summary: 'The Mantri is summoned by the King to identify who among the remaining two players is the loyal Sipahi and who is the lurking Chor. The Mantri has exactly 25 seconds to deduce and submit their choice.',
      objective: 'Correctly identify the Sipahi between the two candidate players to keep your 500 points.',
      keyPoints: [
        'Has a 25-second countdown timer in the game room',
        'Must choose which of the two unknown players is the Sipahi',
        'Correct Guess: Mantri secures 500 points; Chor gets 0 points',
        'Wrong Guess or Timeout (25s): Mantri loses all round points (0 pts), and the Chor steals the 500 points!'
      ],
      proTip: 'Watch reaction speeds and subtle bluffing in multiplayer or bot behavior. You have 25 seconds—use your time wisely!'
    },
    {
      id: 'sipahi',
      name: 'Sipahi',
      title: 'The Loyal Soldier (Royal Guard)',
      points: '300 Points',
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
      borderColor: 'border-sky-500/40',
      panelBg: isDark ? 'bg-sky-950/30' : 'bg-sky-50/80',
      icon: <ShieldIcon className="w-7 h-7 text-sky-400" />,
      tagline: 'Guaranteed 300 points as long as duty is served.',
      summary: 'The Sipahi is the honorable protector of the realm. The Sipahi receives 300 points in every round regardless of the Mantri’s deduction outcome.',
      objective: 'Project calm authority so the Mantri recognizes you as the real Sipahi and not the scheming Chor.',
      keyPoints: [
        'Receives 300 points every round',
        'Remains hidden alongside the Chor during the deduction phase',
        'Points are safe regardless of whether the Mantri succeeds or fails'
      ],
      proTip: 'If playing with live friends, maintain composed confidence. The Chor is trying to mimic you, so stand firm!'
    },
    {
      id: 'chor',
      name: 'Chor',
      title: 'The Cunning Thief (Master Bluffer)',
      points: '0 or 500 Points',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
      borderColor: 'border-rose-500/40',
      panelBg: isDark ? 'bg-rose-950/30' : 'bg-rose-50/80',
      icon: <KeyIcon className="w-7 h-7 text-rose-400" />,
      tagline: 'Starts with zero, but can steal 500 points if you outsmart the Minister.',
      summary: 'The Chor is the infiltrator in disguise. If the Mantri fails to identify the Sipahi or runs out of the 25-second time limit, the Chor successfully escapes and steals the Mantri’s 500 points!',
      objective: 'Bluff and confuse the Mantri so they pick you as the Sipahi or run out of time.',
      keyPoints: [
        'Starts with 0 points by default',
        'If Mantri guesses WRONG: Chor is awarded +500 points!',
        'If 25-second timer EXPIRES: Chor is awarded +500 points (Time-out escape)!',
        'If Mantri guesses CORRECTLY: Chor receives 0 points'
      ],
      proTip: 'Act natural! The more comfortable you appear, the more the Mantri doubts their instincts. Every second ticking down favors you!'
    }
  ];

  const roundPhases = [
    {
      number: '1',
      title: 'Dealing the Secret Chits',
      desc: 'At the start of each round, four digital role chits (Raja, Mantri, Chor, Sipahi) are randomly dealt face-down to the four players. Each player privately views their own role.',
      icon: <SparklesIcon className="w-5 h-5 text-amber-400" />
    },
    {
      number: '2',
      title: 'The King is Revealed',
      desc: 'The Raja card flips face-up for all players to see. The King claims their throne and proclaims: "Mera Mantri Kaun?" (Who is my Minister?).',
      icon: <CrownIcon className="w-5 h-5 text-amber-400" />
    },
    {
      number: '3',
      title: 'The 25-Second Deduction Phase',
      desc: 'The Mantri takes center stage! A live 25-second countdown timer starts. The Mantri must decide which of the other two hidden players is the genuine Sipahi.',
      icon: <ClockIcon className="w-5 h-5 text-amber-400" />
    },
    {
      number: '4',
      title: 'The Grand Reveal & Scoring',
      desc: 'All cards are revealed to the courtroom! If the Mantri chose the true Sipahi, the Mantri keeps 500 points. If incorrect or timed out, the Chor takes the 500 points.',
      icon: <ScaleIcon className="w-5 h-5 text-purple-400" />
    },
    {
      number: '5',
      title: 'Live Leaderboard & Next Round',
      desc: 'Points are added to the cumulative match leaderboard. Matches run for 10 to 15 rounds. The player with the highest overall score at the end is crowned Champion!',
      icon: <TrophyIcon className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-2 pb-16 px-2 sm:px-4">
      <Breadcrumbs items={[{ label: 'Game Guide & Rules' }]} />

      {/* Hero Header */}
      <div className="text-center space-y-3 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-wider uppercase shadow-sm">
          <BookOpenIcon className="w-4 h-4 text-amber-400" />
          <span>Complete How-To-Play Guide & Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black gold-gradient-text tracking-wide uppercase">
          Raja Mantri Chor Sipahi
        </h1>
        <p className={`text-xs sm:text-sm max-w-2xl mx-auto font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          The classical 4-chit Indian parlor game of royalty, mystery, deduction, and bluffing.
          Master the roles, navigate the 25-second guess countdown, and climb the leaderboard!
        </p>

        {/* Quick CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/lobby')}
            className="royal-btn-gold px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition"
          >
            <TrophyIcon className="w-4 h-4 text-slate-950" />
            <span>Play in Lobby</span>
          </button>
          <a
            href="#scoring-matrix"
            className="castle-btn-stone px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition hover:scale-105"
          >
            <ScaleIcon className="w-4 h-4 text-amber-400" />
            <span>Scoring Matrix</span>
          </a>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
          <h2 className="text-lg font-black uppercase gold-gradient-text flex items-center gap-2">
            <CrownIcon className="w-5 h-5 text-amber-400" />
            <span>The Four Legendary Roles</span>
          </h2>
          <div className="flex gap-1">
            {['all', 'raja', 'mantri', 'sipahi', 'chor'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition ${
                  activeTab === tab
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-black hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles
            .filter(r => activeTab === 'all' || activeTab === r.id)
            .map(role => (
              <div
                key={role.id}
                className={`royal-glass p-6 sm:p-7 rounded-2xl border ${role.borderColor} space-y-4 shadow-xl relative overflow-hidden transition hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center shadow-inner">
                      {role.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-amber-400 tracking-wide uppercase">
                          {role.name}
                        </h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border ${role.badgeColor}`}>
                          {role.points}
                        </span>
                      </div>
                      <p className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {role.title}
                      </p>
                    </div>
                  </div>
                </div>

                <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {role.summary}
                </p>

                {/* Key Rules list */}
                <div className={`p-3.5 rounded-xl border border-white/10 text-xs space-y-2 ${role.panelBg}`}>
                  <div className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <CheckIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Role Rules & Mechanics</span>
                  </div>
                  <ul className="space-y-1 text-[11px]">
                    {role.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strategy tip */}
                <div className="text-[11px] p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                  <SparklesIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className={isDark ? 'text-amber-200' : 'text-amber-900'}>
                    <strong>Pro Tip:</strong> {role.proTip}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Step-by-Step Round Flow */}
      <div className="royal-glass p-6 sm:p-8 rounded-2xl border border-white/15 space-y-6 shadow-2xl">
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
            Game Loop
          </span>
          <h2 className="text-2xl font-black gold-gradient-text uppercase">
            How a Round is Played
          </h2>
          <p className={`text-xs max-w-lg mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Every round follows an authentic, fast-paced sequence of five stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          {roundPhases.map(phase => (
            <div
              key={phase.number}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col justify-between space-y-3 relative shadow-inner"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black text-xs flex items-center justify-center">
                    {phase.number}
                  </span>
                  {phase.icon}
                </div>
                <h4 className="font-bold text-xs uppercase text-amber-400 mb-1">
                  {phase.title}
                </h4>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {phase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 25-Second Deduction Spotlight */}
      <div className="royal-glass p-6 sm:p-8 rounded-2xl border border-amber-500/50 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
              <ClockIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Guessing Timer</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              25 Seconds to Choose: Mantri's Deduction Window
            </h3>
            <p className={`text-xs max-w-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              The game features an intensive <strong>25-second countdown</strong> when the Mantri is choosing between the two suspect players.
              The Mantri must click on the candidate they believe is the genuine <strong>Sipahi</strong>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 text-center shrink-0 shadow-inner">
            <span className="text-3xl font-black text-amber-400">25s</span>
            <span className="block text-[10px] font-bold text-amber-300 uppercase tracking-wider mt-0.5">Time Limit</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckIcon className="w-4 h-4 text-emerald-400" />
              <span>Scenario A: Correct Deduction</span>
            </div>
            <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
              The Mantri selects the real Sipahi within 25 seconds.
              <strong> Mantri gets +500 pts</strong>, Sipahi gets +300 pts, Raja gets +1,000 pts.
              The Chor gets <strong>0 pts</strong>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1.5">
            <div className="font-bold text-rose-400 flex items-center gap-1.5">
              <AlertIcon className="w-4 h-4 text-rose-400" />
              <span>Scenario B: Wrong Guess or 25s Timeout</span>
            </div>
            <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
              The Mantri accidentally picks the Chor, OR the 25-second timer runs out.
              The Chor escapes! <strong>Chor steals +500 pts</strong>, Mantri gets <strong>0 pts</strong>, Sipahi gets +300 pts, Raja gets +1,000 pts.
            </p>
          </div>
        </div>
      </div>

      {/* Scoring Matrix Table */}
      <div id="scoring-matrix" className="royal-glass p-6 sm:p-8 rounded-2xl border border-white/15 space-y-4 shadow-2xl">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Point System
          </span>
          <h3 className="text-2xl font-black gold-gradient-text uppercase">
            Official Scoring Matrix
          </h3>
          <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            How points are awarded at the end of each round based on the deduction outcome.
          </p>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-amber-400 uppercase font-black tracking-wider text-[11px]">
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Base Points</th>
                <th className="py-3 px-4 text-emerald-400">If Mantri is Correct</th>
                <th className="py-3 px-4 text-rose-400">If Mantri is Wrong / Timed Out</th>
                <th className="py-3 px-4">Immunity / Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-medium">
              <tr className="hover:bg-amber-500/5 transition">
                <td className="py-3 px-4 font-bold text-amber-400 flex items-center gap-2">
                  <CrownIcon className="w-4 h-4 text-amber-400" /> Raja (King)
                </td>
                <td className="py-3 px-4 font-black">1,000 pts</td>
                <td className="py-3 px-4 font-bold text-emerald-400">+1,000 pts</td>
                <td className="py-3 px-4 font-bold text-emerald-400">+1,000 pts</td>
                <td className="py-3 px-4 text-amber-300 font-semibold">100% Safe (Guaranteed)</td>
              </tr>
              <tr className="hover:bg-purple-500/5 transition">
                <td className="py-3 px-4 font-bold text-purple-400 flex items-center gap-2">
                  <ScaleIcon className="w-4 h-4 text-purple-400" /> Mantri (Minister)
                </td>
                <td className="py-3 px-4 font-black">500 pts</td>
                <td className="py-3 px-4 font-bold text-emerald-400">+500 pts</td>
                <td className="py-3 px-4 font-bold text-rose-400">0 pts (Lost to Chor)</td>
                <td className="py-3 px-4 text-rose-300 font-semibold">High Stakes (25s Guess)</td>
              </tr>
              <tr className="hover:bg-sky-500/5 transition">
                <td className="py-3 px-4 font-bold text-sky-400 flex items-center gap-2">
                  <ShieldIcon className="w-4 h-4 text-sky-400" /> Sipahi (Soldier)
                </td>
                <td className="py-3 px-4 font-black">300 pts</td>
                <td className="py-3 px-4 font-bold text-emerald-400">+300 pts</td>
                <td className="py-3 px-4 font-bold text-emerald-400">+300 pts</td>
                <td className="py-3 px-4 text-sky-300 font-semibold">Stable (Always Protected)</td>
              </tr>
              <tr className="hover:bg-rose-500/5 transition">
                <td className="py-3 px-4 font-bold text-rose-400 flex items-center gap-2">
                  <KeyIcon className="w-4 h-4 text-rose-400" /> Chor (Thief)
                </td>
                <td className="py-3 px-4 font-black">0 / 500 pts</td>
                <td className="py-3 px-4 font-bold text-slate-400">0 pts</td>
                <td className="py-3 px-4 font-bold text-rose-400">+500 pts (Steals Mantri's Points!)</td>
                <td className="py-3 px-4 text-amber-400 font-semibold">Bluffer's Jackpot</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategy & Psychological Bluffing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="royal-glass p-6 rounded-2xl border border-white/15 space-y-3 shadow-xl">
          <h3 className="text-base font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-amber-400" />
            <span>Mastering the Mind Games</span>
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Raja Mantri Chor Sipahi is fundamentally an exercise in psychological bluffing and probability:
          </p>
          <ul className="space-y-2 text-xs">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-black">•</span>
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>Body Language & Timing:</strong> Does a player hesitate or try too hard to look innocent? A genuine Sipahi usually remains relaxed, whereas a nervous Chor may overcompensate.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-black">•</span>
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>Bot Personalities:</strong> When playing with AI bots, notice that each bot has distinct tendencies—some boast with bravado while others stay enigmatic!
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-black">•</span>
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>Long-Term Consistency:</strong> Over 10-15 rounds, consistent Sipahi points and timely Chor escapes build an insurmountable lead.
              </span>
            </li>
          </ul>
        </div>

        <div className="royal-glass p-6 rounded-2xl border border-white/15 space-y-3 shadow-xl">
          <h3 className="text-base font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <TrophyIcon className="w-4 h-4 text-amber-400" />
            <span>Room & Match Guidelines</span>
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-black">1.</span>
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>4-Digit Room Codes:</strong> Every room host gets a unique 4-digit code. Share this code with friends so they can join instantly from any device.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-black">2.</span>
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>Smart AI Auto-Fill:</strong> Don't have four friends online? Start the game with 1, 2, or 3 players—the system automatically recruits intelligent AI bots to fill the empty seats!
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-black">3.</span>
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>Configurable Match Length:</strong> Room hosts can configure match lengths from 10 to 15 rounds for casual quick play or epic championship showdowns.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Ready to Play CTA Banner */}
      <div className="royal-glass p-8 rounded-2xl border border-amber-500/50 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-inner">
          <CrownIcon className="w-8 h-8 text-amber-400" />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-black gold-gradient-text uppercase">
            Ready to Claim the Crown?
          </h3>
          <p className={`text-xs max-w-md mx-auto font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Create a match room, invite your friends or challenge strategic AI bots, and test your deduction skills now!
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/lobby')}
            className="royal-btn-gold px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition"
          >
            <TrophyIcon className="w-4 h-4 text-slate-950" />
            <span>Enter Game Lobby</span>
          </button>
        </div>
      </div>
    </div>
  );
}
