import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

export default function AdminDashboard() {
  const [players, setPlayers] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('totalPoints');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
  
  // Custom in-app confirmation modal state
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [searchQuery, sortBy, sortOrder]);

  async function fetchData() {
    try {
      setLoading(true);
      const [overviewData, playersData] = await Promise.all([
        api.getAdminOverview().catch(err => {
          if (err.message?.includes('Admin authentication') || err.message?.includes('denied')) {
            throw err;
          }
          return null;
        }),
        api.getAdminPlayers(searchQuery, sortBy, sortOrder)
      ]);
      if (overviewData) setOverview(overviewData);
      setPlayers(playersData.players || []);
    } catch (err) {
      if (err.message?.includes('Admin authentication') || err.message?.includes('denied') || err.message?.includes('expired')) {
        localStorage.removeItem('rmcs_admin_token');
        localStorage.removeItem('rmcs_admin_user');
        navigate('/admin/login');
        return;
      }
      setActionMessage({ type: 'error', text: err.message || 'Failed to load admin data' });
    } finally {
      setLoading(false);
    }
  }

  async function handleViewDetails(player) {
    setSelectedPlayer(player);
    setDetailsLoading(true);
    try {
      const data = await api.getAdminPlayer(player._id);
      setPlayerDetails(data);
    } catch (err) {
      setActionMessage({ type: 'error', text: err.message || 'Failed to load player details' });
    } finally {
      setDetailsLoading(false);
    }
  }

  async function executeDelete() {
    if (!playerToDelete) return;
    setIsDeleting(true);
    const target = playerToDelete;
    
    try {
      const res = await api.deletePlayer(target._id);
      
      // Optimistically remove from state immediately
      setPlayers(prev => prev.filter(p => p._id !== target._id));
      setOverview(prev => prev ? { ...prev, totalUsers: Math.max(0, prev.totalUsers - 1) } : prev);
      
      setActionMessage({
        type: 'success',
        text: res.message || `Player "${target.username}" has been permanently deleted.`
      });
      
      if (selectedPlayer?._id === target._id) {
        setSelectedPlayer(null);
        setPlayerDetails(null);
      }
      
      setPlayerToDelete(null);
      fetchData(); // Sync full data in background
    } catch (err) {
      setActionMessage({ type: 'error', text: err.message || 'Failed to delete player.' });
    } finally {
      setIsDeleting(false);
    }
  }

  function handleAdminLogout() {
    localStorage.removeItem('rmcs_admin_token');
    localStorage.removeItem('rmcs_admin_user');
    navigate('/admin/login');
  }

  function formatDate(d) {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className="min-h-screen -m-4 sm:-m-6 p-4 sm:p-8 bg-[#09040e] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,119,6,0.14)_0%,transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(126,34,206,0.12)_0%,transparent_50%)] text-slate-100">
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Top Knight Royal Header */}
        <div className="bg-[#130b21]/95 backdrop-blur-xl border-2 border-amber-500/30 p-6 rounded-3xl shadow-[0_16px_45px_rgba(0,0,0,0.7)] relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-amber-400 to-purple-600" />
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-amber-400 to-yellow-200 p-[2px] shadow-gold-glow">
                <div className="w-full h-full bg-[#0d071a] rounded-[14px] flex items-center justify-center text-2xl shadow-inner">
                  🛡️
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-cinzel font-black tracking-wide text-white flex items-center gap-2">
                  Imperial <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">Command Center</span>
                  <span className="text-[10px] bg-purple-950/90 text-purple-200 border border-purple-500/50 px-2.5 py-0.5 rounded-full font-cinzel font-bold shadow-sm">
                    🔒 Sealed Authority
                  </span>
                </h1>
                <p className="text-amber-200/60 text-xs mt-0.5 font-medium">
                  High castle intelligence, real-time presence indicators, and kingdom citizen records.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#201138] hover:bg-[#2d184e] border border-amber-500/40 rounded-xl text-xs font-cinzel font-bold text-amber-200 transition shadow-sm"
            >
              <span>🔄</span> Refresh Archives
            </button>
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-2 px-3.5 py-2 bg-red-950/80 hover:bg-red-900 border border-red-500/50 rounded-xl text-xs font-cinzel font-bold text-red-200 transition shadow-sm"
            >
              <span>🔒</span> Close Portal
            </button>
          </div>
        </div>

        {/* Notifications Banner */}
        {actionMessage.text && (
          <div
            className={`p-4 rounded-2xl text-sm flex items-center justify-between shadow-md border-2 ${
              actionMessage.type === 'error'
                ? 'bg-red-950/90 border-red-500/80 text-red-200'
                : 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200'
            }`}
          >
            <span className="flex items-center gap-2 font-semibold">
              {actionMessage.type === 'error' ? '❌' : '✅'} {actionMessage.text}
            </span>
            <button
              onClick={() => setActionMessage({ type: '', text: '' })}
              className="text-xs opacity-70 hover:opacity-100 font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* Overview Statistics Cards */}
        {overview && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#130b21]/90 backdrop-blur-xl border-2 border-amber-500/25 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between text-amber-300 text-xs font-cinzel font-black uppercase tracking-wider">
                <span>Registered Nobles</span>
                <span className="text-xl">👥</span>
              </div>
              <div className="text-3xl font-cinzel font-black text-white mt-2">{overview.totalUsers ?? 0}</div>
              <div className="text-xs text-amber-200/50 mt-1 font-medium">Active kingdom citizen records</div>
            </div>

            <div className="bg-[#130b21]/90 backdrop-blur-xl border-2 border-amber-500/25 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between text-amber-300 text-xs font-cinzel font-black uppercase tracking-wider">
                <span>Imperial Treasury</span>
                <span className="text-xl">👑</span>
              </div>
              <div className="text-3xl font-cinzel font-black text-amber-400 mt-2">
                {(overview.totalPoints ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-amber-200/50 mt-1 font-medium">Total royal points distributed</div>
            </div>

            <div className="bg-[#130b21]/90 backdrop-blur-xl border-2 border-amber-500/25 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between text-purple-300 text-xs font-cinzel font-black uppercase tracking-wider">
                <span>Darbar Matches</span>
                <span className="text-xl">🎮</span>
              </div>
              <div className="text-3xl font-cinzel font-black text-purple-300 mt-2">
                {(overview.totalGames ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-amber-200/50 mt-1 font-medium">Completed grand matches</div>
            </div>

            <div className="bg-[#130b21]/90 backdrop-blur-xl border-2 border-amber-500/25 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between text-sky-300 text-xs font-cinzel font-black uppercase tracking-wider">
                <span>Chits Dealt</span>
                <span className="text-xl">🃏</span>
              </div>
              <div className="text-3xl font-cinzel font-black text-sky-300 mt-2">
                {(overview.totalRounds ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-amber-200/50 mt-1 font-medium">Total chit rounds played</div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-[#130b21]/90 backdrop-blur-xl border-2 border-amber-500/25 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search noble by moniker or ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0514] border-2 border-amber-500/30 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-amber-400 text-white placeholder-slate-500 font-medium shadow-inner transition"
            />
            <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-amber-300 hover:text-white font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs text-amber-300 font-cinzel font-black whitespace-nowrap">Sort By:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-[#0a0514] border-2 border-amber-500/30 rounded-xl px-3 py-2 text-sm text-amber-200 font-semibold focus:outline-none focus:border-amber-400"
            >
              <option value="totalPoints">Total Points</option>
              <option value="gamesWon">Victories Won</option>
              <option value="gamesPlayed">Matches Played</option>
              <option value="totalRoundsPlayed">Rounds Endured</option>
              <option value="createdAt">Coronation Date</option>
              <option value="lastActive">Last Presence</option>
            </select>

            <button
              onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
              className="p-2 bg-[#201138] hover:bg-[#2d184e] border border-amber-500/40 rounded-xl text-sm font-cinzel font-bold text-amber-200 transition"
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? '🔼 Asc' : '🔽 Desc'}
            </button>
          </div>
        </div>

        {/* Players Management Table */}
        <div className="bg-[#130b21]/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {loading ? (
            <div className="py-16">
              <LoadingSpinner label="Consulting kingdom scrolls..." />
            </div>
          ) : players.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <div className="text-4xl">🕵️‍♂️</div>
              <p className="text-base font-cinzel font-bold text-amber-200">No nobles found</p>
              <p className="text-xs text-slate-400">
                {searchQuery ? `No citizens match "${searchQuery}"` : 'No registered citizens in the kingdom archives yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-200">
                <thead className="bg-[#0c0618] text-xs uppercase text-amber-300 border-b-2 border-amber-500/30 font-cinzel font-black tracking-wider">
                  <tr>
                    <th className="py-4 px-4 text-center w-12">#</th>
                    <th className="py-4 px-4">Noble & ID</th>
                    <th className="py-4 px-4 text-center">Live Status</th>
                    <th className="py-4 px-4 text-right">Points</th>
                    <th className="py-4 px-4 text-center">Matches (W/L)</th>
                    <th className="py-4 px-4 text-center">Win Rate</th>
                    <th className="py-4 px-4">Role Distribution</th>
                    <th className="py-4 px-4 text-center">Guessing</th>
                    <th className="py-4 px-4">Last Presence</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a1745]/60">
                  {players.map((p, index) => {
                    const stats = p.stats || {};
                    const isOnline = p.onlineStatus?.isOnline;

                    return (
                      <tr
                        key={p._id}
                        className="hover:bg-purple-950/40 transition duration-150 group"
                      >
                        {/* Rank */}
                        <td className="py-4 px-4 text-center font-cinzel font-bold text-amber-200/70">
                          {index === 0 ? (
                            <span className="text-amber-400 text-base">🥇</span>
                          ) : index === 1 ? (
                            <span className="text-slate-300 text-base">🥈</span>
                          ) : index === 2 ? (
                            <span className="text-amber-600 text-base">🥉</span>
                          ) : (
                            `#${index + 1}`
                          )}
                        </td>

                        {/* Player Info */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-300 p-[1.5px] shadow-sm">
                                <div className="w-full h-full bg-[#0d071a] rounded-xl flex items-center justify-center font-bold text-amber-300 text-xs">
                                  {p.username.slice(0, 2).toUpperCase()}
                                </div>
                              </div>
                              <span
                                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#130b21] ${
                                  isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                                }`}
                              />
                            </div>
                            <div>
                              <div className="font-bold text-white group-hover:text-amber-300 transition">
                                {p.username}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                ID: {p._id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Live Online Status */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          {isOnline ? (
                            p.onlineStatus.roomCode ? (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-xs font-bold inline-flex items-center justify-center gap-1.5 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                In Court ({p.onlineStatus.roomCode})
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-xs font-bold inline-flex items-center justify-center gap-1.5 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                Online (Lobby)
                              </span>
                            )
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-700 text-xs font-semibold">
                              Offline
                            </span>
                          )}
                        </td>

                        {/* Points */}
                        <td className="py-4 px-4 text-right font-cinzel font-black text-amber-400 text-base">
                          {(p.totalPoints || 0).toLocaleString()}
                        </td>

                        {/* Games (W/L) */}
                        <td className="py-4 px-4 text-center">
                          <span className="font-bold text-emerald-400">{p.gamesWon || 0}W</span>
                          <span className="text-slate-500 mx-1">/</span>
                          <span className="text-rose-400 font-semibold">{(p.gamesPlayed || 0) - (p.gamesWon || 0)}L</span>
                          <div className="text-[11px] text-slate-400">{p.gamesPlayed || 0} total</div>
                        </td>

                        {/* Win Rate */}
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex flex-col items-center">
                            <span className="font-black text-xs text-slate-200 mb-1">{p.winRate || 0}%</span>
                            <div className="w-16 h-1.5 bg-[#24133d] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                                style={{ width: `${Math.min(100, p.winRate || 0)}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Role Breakdown Badges */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 text-[11px] border border-amber-500/40 font-bold" title="Times Raja">
                              👑 {stats.rajaCount || 0}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 text-[11px] border border-purple-500/40 font-bold" title="Times Mantri">
                              🧠 {stats.mantriCount || 0}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-sky-950/80 text-sky-300 text-[11px] border border-sky-500/40 font-bold" title="Times Sipahi">
                              🛡️ {stats.sipahiCount || 0}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-rose-950/80 text-rose-300 text-[11px] border border-rose-500/40 font-bold" title="Times Chor">
                              🕵️ {stats.chorCount || 0}
                            </span>
                          </div>
                        </td>

                        {/* Guess Accuracy */}
                        <td className="py-4 px-4 text-center">
                          <div className="text-xs font-bold">
                            <span className="text-emerald-400">{stats.correctGuesses || 0}✓</span>
                            <span className="text-slate-500 mx-1">·</span>
                            <span className="text-rose-400">{stats.wrongGuesses || 0}✗</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">{p.guessAccuracy || 0}% acc</div>
                        </td>

                        {/* Last Active */}
                        <td className="py-4 px-4 text-xs text-amber-200/70 whitespace-nowrap font-medium">
                          {formatDate(p.lastActive || p.updatedAt)}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewDetails(p)}
                              className="px-2.5 py-1.5 bg-[#201138] hover:bg-[#2e194f] border border-amber-500/40 rounded-lg text-xs font-cinzel font-bold text-amber-200 transition shadow-sm"
                            >
                              Inspect
                            </button>
                            <button
                              onClick={() => setPlayerToDelete(p)}
                              className="px-2.5 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/60 rounded-lg text-xs font-bold text-red-200 transition flex items-center gap-1 shadow-sm"
                              title="Permanently Delete User"
                            >
                              <span>🗑️</span> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* In-App Delete Confirmation Modal */}
        {playerToDelete && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#130b21] border-2 border-red-500/70 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-[fadeIn_0.15s_ease-out] text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-950/90 border-2 border-red-500/60 flex items-center justify-center text-2xl shadow-inner">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-lg font-cinzel font-black text-red-400">Permanently Expel Citizen?</h3>
                  <p className="text-xs text-red-200/80 font-medium">This castle decree cannot be revoked.</p>
                </div>
              </div>

              <div className="bg-[#0a0514] border-2 border-red-500/30 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-300 font-bold">Noble Title:</span>
                  <span className="font-black text-white text-sm">{playerToDelete.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300 font-bold">Scroll ID:</span>
                  <span className="font-mono text-slate-400">{playerToDelete._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300 font-bold">Score & Matches:</span>
                  <span className="text-amber-400 font-black">
                    {(playerToDelete.totalPoints || 0).toLocaleString()} pts ({playerToDelete.gamesPlayed || 0} matches)
                  </span>
                </div>
              </div>

              <p className="text-xs text-red-200 bg-red-950/80 border border-red-500/40 p-3 rounded-xl leading-relaxed font-medium">
                Expulsion will erase their citizen record from MongoDB, purge all match scores, and terminate any active court connections.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setPlayerToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 py-3 bg-[#201138] hover:bg-[#2d184e] border border-amber-500/40 rounded-xl text-xs font-cinzel font-bold text-amber-200 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-cinzel font-black text-white shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Expelling...
                    </>
                  ) : (
                    'Expel Citizen 🗑️'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Player Deep Dive Inspection Modal */}
        {selectedPlayer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#130b21] border-2 border-amber-500/40 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-[fadeIn_0.2s_ease-out] text-white">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#130b21]/98 backdrop-blur border-b-2 border-amber-500/30 p-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 p-[1.5px] shadow">
                    <div className="w-full h-full bg-[#0d071a] rounded-2xl flex items-center justify-center font-bold text-amber-300 text-base shadow-inner">
                      {selectedPlayer.username.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-cinzel font-black text-white">{selectedPlayer.username}</h3>
                      {selectedPlayer.onlineStatus?.isOnline ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-black">
                          🟢 Online
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-700 text-[10px] font-bold">
                          Offline
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono">User ID: {selectedPlayer._id}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedPlayer(null);
                    setPlayerDetails(null);
                  }}
                  className="w-8 h-8 rounded-full bg-[#201138] hover:bg-[#2d184e] border border-amber-500/40 flex items-center justify-center text-amber-200 font-bold transition"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {detailsLoading ? (
                  <div className="py-12">
                    <LoadingSpinner label="Consulting records..." />
                  </div>
                ) : (
                  <>
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="bg-[#0a0514] rounded-2xl p-3.5 border-2 border-amber-500/30 shadow-sm">
                        <div className="text-amber-300 text-xs font-cinzel font-bold">Total Score</div>
                        <div className="text-2xl font-cinzel font-black text-amber-400 mt-1">
                          {(selectedPlayer.totalPoints || 0).toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-[#0a0514] rounded-2xl p-3.5 border-2 border-emerald-500/30 shadow-sm">
                        <div className="text-emerald-300 text-xs font-cinzel font-bold">Victories Won</div>
                        <div className="text-2xl font-cinzel font-black text-emerald-400 mt-1">
                          {selectedPlayer.gamesWon || 0}
                        </div>
                      </div>
                      <div className="bg-[#0a0514] rounded-2xl p-3.5 border-2 border-purple-500/30 shadow-sm">
                        <div className="text-purple-300 text-xs font-cinzel font-bold">Win Rate</div>
                        <div className="text-2xl font-cinzel font-black text-purple-300 mt-1">
                          {selectedPlayer.winRate || 0}%
                        </div>
                      </div>
                      <div className="bg-[#0a0514] rounded-2xl p-3.5 border-2 border-sky-500/30 shadow-sm">
                        <div className="text-sky-300 text-xs font-cinzel font-bold">Rounds Played</div>
                        <div className="text-2xl font-cinzel font-black text-sky-400 mt-1">
                          {selectedPlayer.totalRoundsPlayed || 0}
                        </div>
                      </div>
                    </div>

                    {/* Role Breakdown */}
                    <div>
                      <h4 className="text-xs uppercase font-cinzel font-black text-amber-300 tracking-wider mb-3">
                        Role Occurrences & Lineage
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-amber-950/80 border-2 border-amber-500/40 rounded-2xl p-3 text-center shadow-sm">
                          <div className="text-amber-300 text-xs font-bold">👑 Raja</div>
                          <div className="text-xl font-black text-white mt-1">
                            {selectedPlayer.stats?.rajaCount || 0} times
                          </div>
                        </div>
                        <div className="bg-purple-950/80 border-2 border-purple-500/40 rounded-2xl p-3 text-center shadow-sm">
                          <div className="text-purple-300 text-xs font-bold">🧠 Mantri</div>
                          <div className="text-xl font-black text-white mt-1">
                            {selectedPlayer.stats?.mantriCount || 0} times
                          </div>
                        </div>
                        <div className="bg-sky-950/80 border-2 border-sky-500/40 rounded-2xl p-3 text-center shadow-sm">
                          <div className="text-sky-300 text-xs font-bold">🛡️ Sipahi</div>
                          <div className="text-xl font-black text-white mt-1">
                            {selectedPlayer.stats?.sipahiCount || 0} times
                          </div>
                        </div>
                        <div className="bg-rose-950/80 border-2 border-rose-500/40 rounded-2xl p-3 text-center shadow-sm">
                          <div className="text-rose-300 text-xs font-bold">🕵️ Chor</div>
                          <div className="text-xl font-black text-white mt-1">
                            {selectedPlayer.stats?.chorCount || 0} times
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Guessing Intel */}
                    <div className="bg-[#0a0514] border-2 border-amber-500/30 rounded-2xl p-4 space-y-2 shadow-inner">
                      <h4 className="text-xs uppercase font-cinzel font-black text-amber-300 tracking-wider">
                        Mantri Deduction Accuracy
                      </h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300 font-medium">Correct Guesses:</span>
                        <span className="font-black text-emerald-400">
                          {selectedPlayer.stats?.correctGuesses || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300 font-medium">Failed Guesses (Chor gained points):</span>
                        <span className="font-black text-rose-400">
                          {selectedPlayer.stats?.wrongGuesses || 0}
                        </span>
                      </div>
                    </div>

                    {/* Recent Game Rooms */}
                    {playerDetails?.recentRooms && playerDetails.recentRooms.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase font-cinzel font-black text-amber-300 tracking-wider mb-3">
                          Recent Castle Chambers Attended ({playerDetails.recentRooms.length})
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {playerDetails.recentRooms.map(r => (
                            <div
                              key={r._id}
                              className="flex items-center justify-between bg-[#0a0514] border-2 border-amber-500/25 rounded-xl px-3.5 py-2.5 text-xs shadow-sm"
                            >
                              <span className="font-cinzel text-amber-400 font-black">Room #{r.roomCode}</span>
                              <span className="text-slate-300 font-medium">
                                {r.currentRound}/{r.totalRounds} rounds · Status: {r.status}
                              </span>
                              <span className="text-slate-400">{formatDate(r.createdAt)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Danger Zone: Delete Player */}
                    <div className="border-t-2 border-amber-500/30 pt-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-cinzel font-black text-red-400">Danger Zone</div>
                        <div className="text-[11px] text-slate-400">
                          Permanently purge this citizen profile and match records.
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setPlayerToDelete(selectedPlayer);
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-cinzel font-black shadow-md transition"
                      >
                        Expel Citizen Profile 🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
