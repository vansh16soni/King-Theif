import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { usePageMeta } from '../../hooks/usePageMeta';
import LoadingSpinner from '../common/LoadingSpinner';
import { ShieldIcon, CrownIcon, ScaleIcon, KeyIcon, AlertIcon, CheckIcon, SearchIcon, ClockIcon, TrophyIcon, LockIcon } from '../common/Icons';

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

  usePageMeta({
    title: 'Admin Dashboard',
    description: 'Administrative management console for Raja Mantri Chor Sipahi players and records.',
    path: '/admin'
  });

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
      fetchData();
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
    <div className="min-h-screen -m-4 sm:-m-6 p-4 sm:p-8 bg-[#110b07] text-slate-100">
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Top Header */}
        <div className="bg-[#1a120c]/95 backdrop-blur-xl border-2 border-amber-500/30 p-6 rounded-2xl shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-950 border-2 border-amber-400/80 p-[2px] flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-wide text-white flex items-center gap-2">
                  Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">Dashboard</span>
                  <span className="text-[10px] bg-amber-950 text-amber-200 border border-amber-500/50 px-2.5 py-0.5 rounded-md font-bold shadow-sm">
                    Authorized
                  </span>
                </h1>
                <p className="text-slate-400 text-xs mt-0.5 font-medium">
                  Verified player accounts, real-time presence indicators, and user management.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl text-xs font-bold text-slate-200 transition shadow-sm focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>Refresh Records</span>
            </button>
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-2 px-3.5 py-2 bg-red-950/80 hover:bg-red-900 border border-red-500/50 rounded-xl text-xs font-bold text-red-200 transition shadow-sm focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <LockIcon className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Notifications Banner */}
        {actionMessage.text && (
          <div
            className={`p-4 rounded-xl text-sm flex items-center justify-between shadow-md border ${
              actionMessage.type === 'error'
                ? 'bg-red-950/90 border-red-500/80 text-red-200'
                : 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200'
            }`}
          >
            <span className="flex items-center gap-2 font-semibold">
              {actionMessage.type === 'error' ? <AlertIcon className="w-4 h-4 text-red-400" /> : <CheckIcon className="w-4 h-4 text-emerald-400" />}
              <span>{actionMessage.text}</span>
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
            <div className="bg-[#1a120c]/90 backdrop-blur-xl border border-amber-500/25 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-amber-300 text-xs font-cinzel font-black uppercase tracking-wider">
                <span>Registered Players</span>
                <CrownIcon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-cinzel font-black text-white mt-2">{overview.totalUsers ?? 0}</div>
              <div className="text-xs text-amber-200/50 mt-1 font-medium">Registered account records</div>
            </div>

            <div className="bg-[#1a120c]/90 backdrop-blur-xl border border-amber-500/25 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-amber-300 text-xs font-cinzel font-black uppercase tracking-wider">
                <span>Total Accumulated Score</span>
                <TrophyIcon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-cinzel font-black text-amber-400 mt-2">
                {(overview.totalPoints ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-amber-200/50 mt-1 font-medium">Points earned across all rounds</div>
            </div>

            <div className="bg-[#1a120c]/90 backdrop-blur-xl border border-amber-500/25 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-amber-300 text-xs font-cinzel font-black uppercase tracking-wider">
                <span>Matches Hosted</span>
                <ClockIcon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-cinzel font-black text-amber-300 mt-2">
                {(overview.totalGames ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-amber-200/50 mt-1 font-medium">Total match sessions</div>
            </div>

            <div className="bg-[#1a120c]/90 backdrop-blur-xl border border-amber-500/25 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-amber-300 text-xs font-cinzel font-black uppercase tracking-wider">
                <span>Rounds Completed</span>
                <ScaleIcon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-cinzel font-black text-amber-200 mt-2">
                {(overview.totalRounds ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-amber-200/50 mt-1 font-medium">Total individual rounds</div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-[#1a120c]/90 backdrop-blur-xl border border-amber-500/25 p-4 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by username or ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f0a07] border border-amber-500/30 rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-amber-400 text-white placeholder-amber-800 font-medium shadow-inner transition focus-visible:ring-2 focus-visible:ring-amber-500"
            />
            <span className="absolute left-3.5 top-3 text-amber-400">
              <SearchIcon className="w-4 h-4" />
            </span>
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
            <label className="text-xs text-amber-300 font-cinzel font-bold whitespace-nowrap">Sort By:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-[#0f0a07] border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-amber-200 font-semibold focus:outline-none focus:border-amber-400"
            >
              <option value="totalPoints">Total Points</option>
              <option value="gamesWon">Matches Won</option>
              <option value="gamesPlayed">Matches Played</option>
              <option value="totalRoundsPlayed">Rounds Completed</option>
              <option value="createdAt">Registration Date</option>
              <option value="lastActive">Last Active</option>
            </select>

            <button
              onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
              className="p-2 bg-[#251910] hover:bg-[#332216] border border-amber-500/40 rounded-lg text-sm font-cinzel font-bold text-amber-200 transition"
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>

        {/* Players Management Table */}
        <div className="bg-[#1a120c]/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-16">
              <LoadingSpinner label="Fetching registered records..." />
            </div>
          ) : players.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <p className="text-base font-cinzel font-bold text-amber-200">No players found</p>
              <p className="text-xs text-slate-400">
                {searchQuery ? `No players match "${searchQuery}"` : 'No registered players in the database yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-200">
                <thead className="bg-[#0f0a07] text-xs uppercase text-amber-300 border-b border-amber-500/30 font-cinzel font-black tracking-wider">
                  <tr>
                    <th className="py-4 px-4 text-center w-12">#</th>
                    <th className="py-4 px-4">Player & ID</th>
                    <th className="py-4 px-4 text-center">Live Status</th>
                    <th className="py-4 px-4 text-right">Points</th>
                    <th className="py-4 px-4 text-center">Matches (W/L)</th>
                    <th className="py-4 px-4 text-center">Win Rate</th>
                    <th className="py-4 px-4">Role Distribution</th>
                    <th className="py-4 px-4 text-center">Guessing</th>
                    <th className="py-4 px-4">Last Active</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-950/40">
                  {players.map((p, index) => {
                    const stats = p.stats || {};
                    const isOnline = p.onlineStatus?.isOnline;

                    return (
                      <tr
                        key={p._id}
                        className="hover:bg-amber-950/20 transition duration-150 group"
                      >
                        <td className="py-4 px-4 text-center font-cinzel font-bold text-amber-200/70">
                          #{index + 1}
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-900 border border-amber-400/80 flex items-center justify-center font-bold text-amber-200 text-xs">
                              {p.username.slice(0, 2).toUpperCase()}
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

                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          {isOnline ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-xs font-bold inline-flex items-center gap-1.5 shadow-sm">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              Online
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-stone-400 border border-stone-700 text-xs font-semibold">
                              Offline
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right font-cinzel font-black text-amber-400 text-base">
                          {(p.totalPoints || 0).toLocaleString()}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <span className="font-bold text-emerald-400">{p.gamesWon || 0}W</span>
                          <span className="text-slate-500 mx-1">/</span>
                          <span className="text-rose-400 font-semibold">{(p.gamesPlayed || 0) - (p.gamesWon || 0)}L</span>
                          <div className="text-[11px] text-slate-400">{p.gamesPlayed || 0} total</div>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <span className="font-bold text-xs text-slate-200">{p.winRate || 0}%</span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-bold">
                            <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600/40">
                              R: {stats.rajaCount || 0}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-stone-900 text-amber-200 border border-stone-600/40">
                              M: {stats.mantriCount || 0}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-600/40">
                              S: {stats.sipahiCount || 0}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-600/40">
                              C: {stats.chorCount || 0}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <div className="text-xs font-bold">
                            <span className="text-emerald-400">{stats.correctGuesses || 0}✓</span>
                            <span className="text-slate-500 mx-1">·</span>
                            <span className="text-rose-400">{stats.wrongGuesses || 0}✗</span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-xs text-amber-200/70 whitespace-nowrap font-medium">
                          {formatDate(p.lastActive || p.updatedAt)}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewDetails(p)}
                              className="px-2.5 py-1.5 bg-[#251910] hover:bg-[#332216] border border-amber-500/40 rounded-lg text-xs font-cinzel font-bold text-amber-200 transition shadow-sm"
                            >
                              Inspect
                            </button>
                            <button
                              onClick={() => setPlayerToDelete(p)}
                              className="px-2.5 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/60 rounded-lg text-xs font-bold text-red-200 transition"
                              title="Delete Account"
                            >
                              Delete
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

        {/* Delete Confirmation Modal */}
        {playerToDelete && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#1a120c] border border-red-500/70 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-950/90 border border-red-500/60 flex items-center justify-center text-red-400">
                  <AlertIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-cinzel font-black text-red-400">Delete Player Account?</h3>
                  <p className="text-xs text-red-200/80 font-medium">This action cannot be undone.</p>
                </div>
              </div>

              <div className="bg-[#0f0a07] border border-red-500/30 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-300 font-bold">Username:</span>
                  <span className="font-bold text-white text-sm">{playerToDelete.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300 font-bold">Database ID:</span>
                  <span className="font-mono text-slate-400">{playerToDelete._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300 font-bold">Total Score:</span>
                  <span className="text-amber-400 font-bold">
                    {(playerToDelete.totalPoints || 0).toLocaleString()} pts
                  </span>
                </div>
              </div>

              <p className="text-xs text-red-200 bg-red-950/80 border border-red-500/40 p-3 rounded-lg leading-relaxed font-medium">
                This will permanently delete the player's account from the database and remove all accumulated records.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setPlayerToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 py-3 bg-[#251910] hover:bg-[#332216] border border-amber-500/40 rounded-lg text-xs font-cinzel font-bold text-amber-200 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 bg-red-700 hover:bg-red-800 rounded-lg text-xs font-cinzel font-black text-white shadow-md transition disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Player Inspection Modal */}
        {selectedPlayer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#1a120c] border border-amber-500/40 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-white">
              <div className="sticky top-0 bg-[#1a120c] border-b border-amber-500/30 p-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-900 border border-amber-400 flex items-center justify-center font-bold text-amber-200 text-sm">
                    {selectedPlayer.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-cinzel font-black text-white">{selectedPlayer.username}</h3>
                    <p className="text-xs text-slate-400 font-mono">User ID: {selectedPlayer._id}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedPlayer(null);
                    setPlayerDetails(null);
                  }}
                  className="w-8 h-8 rounded-lg bg-[#251910] hover:bg-[#332216] border border-amber-500/40 flex items-center justify-center text-amber-200 font-bold transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {detailsLoading ? (
                  <div className="py-12">
                    <LoadingSpinner label="Fetching record details..." />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="bg-[#0f0a07] rounded-xl p-3.5 border border-amber-500/30">
                        <div className="text-amber-300 text-xs font-cinzel font-bold">Total Score</div>
                        <div className="text-2xl font-cinzel font-black text-amber-400 mt-1">
                          {(selectedPlayer.totalPoints || 0).toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-[#0f0a07] rounded-xl p-3.5 border border-emerald-500/30">
                        <div className="text-emerald-300 text-xs font-cinzel font-bold">Matches Won</div>
                        <div className="text-2xl font-cinzel font-black text-emerald-400 mt-1">
                          {selectedPlayer.gamesWon || 0}
                        </div>
                      </div>
                      <div className="bg-[#0f0a07] rounded-xl p-3.5 border border-amber-500/30">
                        <div className="text-amber-300 text-xs font-cinzel font-bold">Win Rate</div>
                        <div className="text-2xl font-cinzel font-black text-amber-300 mt-1">
                          {selectedPlayer.winRate || 0}%
                        </div>
                      </div>
                      <div className="bg-[#0f0a07] rounded-xl p-3.5 border border-stone-500/30">
                        <div className="text-stone-300 text-xs font-cinzel font-bold">Rounds Played</div>
                        <div className="text-2xl font-cinzel font-black text-stone-200 mt-1">
                          {selectedPlayer.totalRoundsPlayed || 0}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-cinzel font-bold text-amber-300 tracking-wider mb-3">
                        Role Distribution
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-amber-950/80 border border-amber-500/40 rounded-xl p-3 text-center">
                          <div className="text-amber-300 text-xs font-bold">Raja</div>
                          <div className="text-xl font-black text-white mt-1">
                            {selectedPlayer.stats?.rajaCount || 0} rounds
                          </div>
                        </div>
                        <div className="bg-[#1e150f] border border-amber-700/40 rounded-xl p-3 text-center">
                          <div className="text-amber-200 text-xs font-bold">Mantri</div>
                          <div className="text-xl font-black text-white mt-1">
                            {selectedPlayer.stats?.mantriCount || 0} rounds
                          </div>
                        </div>
                        <div className="bg-stone-900 border border-stone-700 rounded-xl p-3 text-center">
                          <div className="text-stone-300 text-xs font-bold">Sipahi</div>
                          <div className="text-xl font-black text-white mt-1">
                            {selectedPlayer.stats?.sipahiCount || 0} rounds
                          </div>
                        </div>
                        <div className="bg-rose-950/80 border border-rose-500/40 rounded-xl p-3 text-center">
                          <div className="text-rose-300 text-xs font-bold">Chor</div>
                          <div className="text-xl font-black text-white mt-1">
                            {selectedPlayer.stats?.chorCount || 0} rounds
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-amber-500/30 pt-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-cinzel font-bold text-red-400">Danger Zone</div>
                        <div className="text-[11px] text-slate-400">
                          Permanently delete this account and records.
                        </div>
                      </div>
                      <button
                        onClick={() => setPlayerToDelete(selectedPlayer)}
                        className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-cinzel font-black transition"
                      >
                        Delete Player Account
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
