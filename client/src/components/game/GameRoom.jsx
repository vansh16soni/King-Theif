import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import { useSocket } from '../../contexts/SocketContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { api } from '../../utils/api';
import Breadcrumbs from '../common/Breadcrumbs';
import PlayerList from '../players/PlayerList';
import RoundInfo from './RoundInfo';
import CardDeck from './CardDeck';
import GuessInterface from './GuessInterface';
import ResultDisplay from './ResultDisplay';
import Scoreboard from './Scoreboard';
import GameOver from './GameOver';
import { KeyIcon, AlertIcon, CheckIcon, ClockIcon, TrophyIcon } from '../common/Icons';

export default function GameRoom() {
  const { roomCode } = useParams();
  const cleanRoomCode = String(roomCode || '').trim();
  const { user } = useAuth();
  const socket = useSocket();
  const { state, joinRoomChannel, setInitialRoom, startGame, submitGuess, reset } = useGame();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  usePageMeta({
    title: cleanRoomCode ? `Room #${cleanRoomCode}` : 'Game Room',
    description: `Active multiplayer match room #${cleanRoomCode} for Raja Mantri Chor Sipahi.`,
    path: `/room/${cleanRoomCode || ''}`
  });

  useEffect(() => {
    if (!cleanRoomCode) return;
    joinRoomChannel(cleanRoomCode);

    // Initial load from HTTP API to avoid blank lobby while socket connects
    api.getRoom(cleanRoomCode)
      .then(data => {
        if (data?.room) {
          setInitialRoom(data.room);
        }
      })
      .catch(err => {
        console.warn('Room fetch:', err.message);
      });
  }, [cleanRoomCode, socket]);

  const currentUserId = user?.id || user?._id;
  const isHost = state.hostId && currentUserId && String(state.hostId) === String(currentUserId);

  function copyCode() {
    if (!cleanRoomCode) return;
    navigator.clipboard.writeText(cleanRoomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (state.error) {
    return (
      <div className="max-w-md mx-auto my-12 royal-glass p-8 rounded-2xl border-2 border-red-500/60 text-center space-y-5 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-500/60 mx-auto flex items-center justify-center text-red-400 shadow-inner">
          <AlertIcon className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-red-300">Room Error</h2>
          <p className="text-xs text-red-200/90 font-medium">{state.error}</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              reset();
              navigate('/lobby');
            }}
            className="flex-1 py-3.5 castle-btn-stone rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>Back to Lobby</span>
          </button>
          <button
            onClick={() => {
              if (cleanRoomCode) {
                joinRoomChannel(cleanRoomCode);
                api.getRoom(cleanRoomCode).then(d => d?.room && setInitialRoom(d.room)).catch(() => {});
              }
            }}
            className="flex-1 py-3.5 royal-btn-gold rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  if (state.status === 'completed' && state.winner) {
    return (
      <div className="py-6">
        <Breadcrumbs items={[{ label: `Room #${roomCode}` }]} />
        <GameOver
          winner={state.winner}
          finalScores={state.scores}
          players={state.players}
          onPlayAgain={() => {
            reset();
            navigate('/lobby');
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <Breadcrumbs items={[{ label: `Room #${roomCode}` }]} />

      {/* Room Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-wider uppercase shadow-sm">
          <KeyIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Room Code</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl sm:text-5xl font-black tracking-widest gold-gradient-text">
            {roomCode}
          </div>
          <button
            onClick={copyCode}
            className="px-3 py-1.5 castle-btn-stone rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition focus-visible:ring-2 focus-visible:ring-amber-500"
            title="Copy Room Code"
          >
            {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> : <KeyIcon className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Waiting Lobby State */}
      {state.status === 'waiting' && (
        <div className="max-w-md mx-auto royal-glass p-7 rounded-2xl space-y-5 shadow-2xl relative overflow-hidden border border-white/15">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
          
          <PlayerList players={state.players} hostId={state.hostId} />
          
          {isHost ? (
            <button
              onClick={() => startGame(roomCode)}
              className="w-full py-3.5 royal-btn-gold rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 shadow-lg"
            >
              <TrophyIcon className="w-4 h-4 text-slate-950" />
              <span>Start Game {state.players.length < 4 && `(Fills ${4 - state.players.length} AI Bots)`}</span>
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-center text-xs text-amber-300 font-bold flex items-center justify-center gap-2">
              <ClockIcon className="w-4 h-4 text-amber-400" />
              <span>Waiting for room host to start the game...</span>
            </div>
          )}
        </div>
      )}

      {/* Playing Game Area - Chat removed, clean spacious match layout */}
      {state.status === 'playing' && (
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-5">
            <RoundInfo
              roundNumber={state.roundNumber}
              totalRounds={state.totalRounds}
              rajaPlayer={state.rajaPlayer}
              mantriUsername={state.mantriUsername}
              botThinking={state.botThinking}
              guessDeadline={state.guessDeadline}
              timeLimit={state.guessTimeLimit}
              isRoundActive={!state.lastResult}
            />

            <CardDeck yourRole={state.yourRole} roundActive={!!state.roundNumber} />

            {state.isMantriTurn && (
              <GuessInterface
                availablePlayers={state.availablePlayers}
                deadline={state.guessDeadline}
                timeLimit={state.guessTimeLimit}
                onGuess={(sipahiId, chorId) => submitGuess(roomCode, sipahiId, chorId)}
              />
            )}

            {state.lastResult && (
              <ResultDisplay
                roundData={state.lastResult}
                isTimeout={state.isTimeout}
                nextRoundIn={state.nextRoundIn || 5}
              />
            )}
          </div>

          <div className="space-y-5">
            <Scoreboard players={state.players} scores={state.scores} />
          </div>
        </div>
      )}
    </div>
  );
}
