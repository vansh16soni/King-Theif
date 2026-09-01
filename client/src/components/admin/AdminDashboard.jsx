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
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Royal Header */}
      <div className="royal-glass p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 p-[1.5px] shadow-gold-glow">
              <div className="w-full h-full bg-[#180f2c] rounded-2xl flex items-center justify-center text-2xl">
                🛡️
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-cinzel font-black tracking-wide text-white flex items-center gap-2">
                Imperial <span className="gold-gradient-text">Command Center</span>
                <span className="text-[10px] bg-purple-950/80 text-purple-300 border border-purple-500/50 px-2.5 py-0.5 rounded-full font-cinzel font-bold">
                  🔒 Sealed Authority
                </span>
              </h1>
              <p className="text-amber-200/60 text-xs mt-0.5 font-medium">
                High court intelligence, real-time presence indicators, and kingdom citizen records.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-amber-500/30 rounded-xl text-xs font-cinzel font-bold text-amber-200 transition"
          >
            <span>🔄</span> Refresh Archives
          </button>
          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-2 px-3.5 py-2 bg-red-950/60 hover:bg-red-800 border border-red-700/60 rounded-xl text-xs font-cinzel font-bold text-red-200 transition"
          >
            <span>🔒</span> Close Portal
          </button>
        </div>
      </div>

      {/* Notifications Banner */}
      {actionMessage.text && (
        <div
          className={`p-4 rounded-2xl text-sm flex items-center justify-between shadow-lg ${
            actionMessage.type === 'error'
              ? 'bg-red-950/60 border border-red-500/50 text-red-200'
              : 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-200'
          }`}
        >
          <span className="flex items-center gap-2">
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
          <div className="royal-glass rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-amber-300 text-xs font-cinzel font-bold uppercase tracking-wider">
              <span>Registered Nobles</span>
              <span className="text-xl">👥</span>
            </div>
            <div className="text-3xl font-cinzel font-black text-white mt-2">{overview.totalUsers ?? 0}</div>
            <div className="text-xs text-amber-200/50 mt-1">Active kingdom citizen records</div>
          </div>

          <div className="royal-glass rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-amber-300 text-xs font-cinzel font-bold uppercase tracking-wider">
              <span>Imperial Treasury</span>
              <span className="text-xl">👑</span>
            </div>
            <div className="text-3xl font-cinzel font-black text-raja mt-2">
              {(overview.totalPoints ?? 0).toLocaleString()}
            </div>
            <div className="text-xs text-amber-200/50 mt-1">Total royal points distributed</div>
          </div>

          <div className="royal-glass rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-purple-300 text-xs font-cinzel font-bold uppercase tracking-wider">
              <span>Darbar Matches</span>
              <span className="text-xl">🎮</span>
            </div>
            <div className="text-3xl font-cinzel font-black text-purple-300 mt-2">
              {(overview.totalGames ?? 0).toLocaleString()}
            </div>
            <div className="text-xs text-purple-200/50 mt-1">Completed grand matches</div>
          </div>

          <div className="royal-glass rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-sky-300 text-xs font-cinzel font-bold uppercase tracking-wider">
              <span>Chits Dealt</span>
              <span className="text-xl">🃏</span>
            </div>
            <div className="text-3xl font-cinzel font-black text-sky-300 mt-2">
              {(overview.totalRounds ?? 0).toLocaleString()}
            </div>
            <div className="text-xs text-sky-200/50 mt-1">Total chit rounds played</div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="royal-glass p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search noble by moniker or ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0e081c] border border-amber-500/30 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-amber-400 text-white placeholder-slate-500 shadow-inner transition"
          />
          <span className="absolute left-3.5 top-3 text-amber-400/60 text-sm">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-amber-300 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs text-amber-300 font-cinzel font-bold whitespace-nowrap">Sort By:</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#0e081c] border border-amber-500/30 rounded-xl px-3 py-2 text-sm text-amber-200 focus:outline-none focus:border-amber-400"
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
            className="p-2 bg-[#0e081c] border border-amber-500/30 rounded-xl hover:bg-slate-800 transition text-sm text-amber-200 font-cinzel"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'asc' ? '🔼 Asc' : '🔽 Desc'}
          </button>
        </div>
      </div>

      {/* Players Management Table */}
      <div className="royal-glass rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner label="Consulting kingdom scrolls..." />
          </div>
        ) : players.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <div className="text-4xl">🕵️‍♂️</div>
            <p className="text-base font-cinzel font-bold text-white">No nobles found</p>
            <p className="text-xs text-amber-200/50">
              {searchQuery ? `No citizens match "${searchQuery}"` : 'No registered citizens in the kingdom archives yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-200">
              <thead className="bg-[#0e071c]/90 text-xs uppercase text-amber-300/80 border-b border-amber-500/20 font-cinzel font-black tracking-wider">
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
              <tbody className="divide-y divide-amber-500/10">
                {players.map((p, index) => {
                  const stats = p.stats || {};
                  const isOnline = p.onlineStatus?.isOnline;

                  return (
                    <tr
                      key={p._id}
                      className="hover:bg-amber-500/5 transition duration-150 group"
                    >
                      {/* Rank */}
                      <td className="py-4 px-4 text-center font-cinzel font-bold text-slate-400">
                        {index === 0 ? (
                          <span className="text-raja text-base">🥇</span>
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
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-300 p-[1px] shadow-sm">
                              <div className="w-full h-full bg-[#180f2d] rounded-xl flex items-center justify-center font-bold text-amber-200 text-xs">
                                {p.username.slice(0, 2).toUpperCase()}
                              </div>
                            </div>
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0e071c] ${
                                isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                              }`}
                            />
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-amber-300 transition">
                              {p.username}
                            </div>
                            <div className="text-[10px] text-amber-200/50 font-mono">
                              ID: {p._id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Live Online Status */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        {isOnline ? (
                          p.onlineStatus.roomCode ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold inline-flex items-center justify-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                              In Court ({p.onlineStatus.roomCode})
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold inline-flex items-center justify-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              Online (Lobby)
                            </span>
                          )
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs">
                            Offline
                          </span>
                        )}
                      </td>

                      {/* Points */}
                      <td className="py-4 px-4 text-right font-cinzel font-black text-raja text-base">
                        {(p.totalPoints || 0).toLocaleString()}
                      </td>

                      {/* Games (W/L) */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold text-emerald-400">{p.gamesWon || 0}W</span>
                        <span className="text-slate-600 mx-1">/</span>
                        <span className="text-slate-400">{(p.gamesPlayed || 0) - (p.gamesWon || 0)}L</span>
                        <div className="text-[11px] text-slate-500">{p.gamesPlayed || 0} total</div>
                      </td>

                      {/* Win Rate */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-bold text-xs text-white mb-1">{p.winRate || 0}%</span>
                          <div className="w-16 h-1.5 bg-[#0e071c] rounded-full overflow-hidden">
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
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] border border-amber-500/30 font-medium" title="Times Raja">
                            👑 {stats.rajaCount || 0}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/30 font-medium" title="Times Mantri">
                            🧠 {stats.mantriCount || 0}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[11px] border border-sky-500/30 font-medium" title="Times Sipahi">
                            🛡️ {stats.sipahiCount || 0}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 text-[11px] border border-red-500/30 font-medium" title="Times Chor">
                            🕵️ {stats.chorCount || 0}
                          </span>
                        </div>
                      </td>

                      {/* Guess Accuracy */}
                      <td className="py-4 px-4 text-center">
                        <div className="text-xs font-semibold">
                          <span className="text-emerald-400">{stats.correctGuesses || 0}✓</span>
                          <span className="text-slate-500 mx-1">·</span>
                          <span className="text-red-400">{stats.wrongGuesses || 0}✗</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{p.guessAccuracy || 0}% acc</div>
                      </td>

                      {/* Last Active */}
                      <td className="py-4 px-4 text-xs text-amber-200/60 whitespace-nowrap">
                        {formatDate(p.lastActive || p.updatedAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(p)}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-amber-500/30 rounded-lg text-xs font-cinzel font-bold text-amber-200 transition shadow"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => setPlayerToDelete(p)}
                            className="px-2.5 py-1.5 bg-red-950/70 hover:bg-red-800 border border-red-700/60 rounded-lg text-xs font-semibold text-red-300 hover:text-white transition flex items-center gap-1"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="royal-glass border-2 border-red-500/60 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-[fadeIn_0.15s_ease-out]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-500/60 flex items-center justify-center text-2xl">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-cinzel font-bold text-white">Permanently Expel Citizen?</h3>
                <p className="text-xs text-red-300/80">This imperial decree cannot be revoked.</p>
              </div>
            </div>

            <div className="bg-[#0e081c] border border-slate-700/60 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-amber-300/70">Noble Title:</span>
                <span className="font-bold text-white text-sm">{playerToDelete.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300/70">Scroll ID:</span>
                <span className="font-mono text-slate-300">{playerToDelete._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300/70">Score & Matches:</span>
                <span className="text-raja font-semibold">
                  {(playerToDelete.totalPoints || 0).toLocaleString()} pts ({playerToDelete.gamesPlayed || 0} matches)
                </span>
              </div>
            </div>

            <p className="text-xs text-red-300 bg-red-950/40 border border-red-900/50 p-3 rounded-xl leading-relaxed">
              Expulsion will erase their citizen record from MongoDB, purge all match scores, and terminate any active court connections.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setPlayerToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-cinzel font-bold text-slate-200 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 rounded-xl text-xs font-cinzel font-black text-white shadow-lg shadow-red-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="royal-glass rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#160e2a]/95 backdrop-blur border-b border-amber-500/20 p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 p-[1px] shadow">
                  <div className="w-full h-full bg-[#1b1030] rounded-2xl flex items-center justify-center font-bold text-amber-200 text-base">
                    {selectedPlayer.username.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-cinzel font-bold text-white">{selectedPlayer.username}</h3>
                    {selectedPlayer.onlineStatus?.isOnline ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        🟢 Online
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                        Offline
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-200/60 font-mono">User ID: {selectedPlayer._id}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedPlayer(null);
                  setPlayerDetails(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold transition"
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
                    <div className="bg-[#0e081c] rounded-2xl p-3.5 border border-amber-500/30">
                      <div className="text-amber-300/70 text-xs font-cinzel">Total Score</div>
                      <div className="text-2xl font-cinzel font-black text-raja mt-1">
                        {(selectedPlayer.totalPoints || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-[#0e081c] rounded-2xl p-3.5 border border-emerald-500/30">
                      <div className="text-emerald-300/70 text-xs font-cinzel">Victories Won</div>
                      <div className="text-2xl font-cinzel font-black text-emerald-400 mt-1">
                        {selectedPlayer.gamesWon || 0}
                      </div>
                    </div>
                    <div className="bg-[#0e081c] rounded-2xl p-3.5 border border-purple-500/30">
                      <div className="text-purple-300/70 text-xs font-cinzel">Win Rate</div>
                      <div className="text-2xl font-cinzel font-black text-purple-300 mt-1">
                        {selectedPlayer.winRate || 0}%
                      </div>
                    </div>
                    <div className="bg-[#0e081c] rounded-2xl p-3.5 border border-sky-500/30">
                      <div className="text-sky-300/70 text-xs font-cinzel">Rounds Played</div>
                      <div className="text-2xl font-cinzel font-black text-sky-300 mt-1">
                        {selectedPlayer.totalRoundsPlayed || 0}
                      </div>
                    </div>
                  </div>

                  {/* Role Breakdown */}
                  <div>
                    <h4 className="text-xs uppercase font-cinzel font-bold text-amber-300 tracking-wider mb-3">
                      Role Occurrences & Lineage
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-3 text-center">
                        <div className="text-amber-400 text-xs font-semibold">👑 Raja</div>
                        <div className="text-xl font-bold text-white mt-1">
                          {selectedPlayer.stats?.rajaCount || 0} times
                        </div>
                      </div>
                      <div className="bg-purple-950/30 border border-purple-500/40 rounded-2xl p-3 text-center">
                        <div className="text-purple-400 text-xs font-semibold">🧠 Mantri</div>
                        <div className="text-xl font-bold text-white mt-1">
                          {selectedPlayer.stats?.mantriCount || 0} times
                        </div>
                      </div>
                      <div className="bg-sky-950/30 border border-sky-500/40 rounded-2xl p-3 text-center">
                        <div className="text-sky-400 text-xs font-semibold">🛡️ Sipahi</div>
                        <div className="text-xl font-bold text-white mt-1">
                          {selectedPlayer.stats?.sipahiCount || 0} times
                        </div>
                      </div>
                      <div className="bg-red-950/30 border border-red-500/40 rounded-2xl p-3 text-center">
                        <div className="text-red-400 text-xs font-semibold">🕵️ Chor</div>
                        <div className="text-xl font-bold text-white mt-1">
                          {selectedPlayer.stats?.chorCount || 0} times
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guessing Intel */}
                  <div className="bg-[#0e081c] border border-amber-500/20 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs uppercase font-cinzel font-bold text-amber-300 tracking-wider">
                      Mantri Deduction Accuracy
                    </h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Correct Guesses:</span>
                      <span className="font-bold text-emerald-400">
                        {selectedPlayer.stats?.correctGuesses || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Failed Guesses (Chor gained points):</span>
                      <span className="font-bold text-red-400">
                        {selectedPlayer.stats?.wrongGuesses || 0}
                      </span>
                    </div>
                  </div>

                  {/* Recent Game Rooms */}
                  {playerDetails?.recentRooms && playerDetails.recentRooms.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase font-cinzel font-bold text-amber-300 tracking-wider mb-3">
                        Recent Court Rooms Attended ({playerDetails.recentRooms.length})
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {playerDetails.recentRooms.map(r => (
                          <div
                            key={r._id}
                            className="flex items-center justify-between bg-[#0e081c] border border-amber-500/20 rounded-xl px-3 py-2 text-xs"
                          >
                            <span className="font-cinzel text-raja font-bold">Room #{r.roomCode}</span>
                            <span className="text-slate-400">
                              {r.currentRound}/{r.totalRounds} rounds · Status: {r.status}
                            </span>
                            <span className="text-slate-500">{formatDate(r.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Danger Zone: Delete Player */}
                  <div className="border-t border-amber-500/20 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-cinzel font-bold text-red-400">Danger Zone</div>
                      <div className="text-[11px] text-amber-200/50">
                        Permanently purge this citizen profile and match records.
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setPlayerToDelete(selectedPlayer);
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-cinzel font-bold shadow-lg transition"
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
  );
}
