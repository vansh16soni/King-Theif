import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import { useAuth } from '../../contexts/AuthContext';
import PlayerList from '../players/PlayerList';
import ChatBox from '../chat/ChatBox';
import RoundInfo from './RoundInfo';
import CardDeck from './CardDeck';
import GuessInterface from './GuessInterface';
import ResultDisplay from './ResultDisplay';
import Scoreboard from './Scoreboard';
import GameOver from './GameOver';

export default function GameRoom() {
  const { roomCode } = useParams();
  const { user } = useAuth();
  const { state, joinRoomChannel, startGame, submitGuess, sendChat, sendEmote, reset } = useGame();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (roomCode) joinRoomChannel(roomCode);
  }, [roomCode]);

  const currentUserId = user?.id || user?._id;
  const isHost = state.hostId && currentUserId && String(state.hostId) === String(currentUserId);

  function copyCode() {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (state.error) {
    return (
      <div className="max-w-md mx-auto my-12 royal-glass p-8 rounded-3xl border-2 border-red-400 text-center space-y-5 shadow-castle-card animate-[fadeIn_0.3s_ease-out]">
        <div className="w-16 h-16 rounded-2xl bg-red-100 border-2 border-red-300 mx-auto flex items-center justify-center text-3xl shadow-inner">
          ⚠️
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-cinzel font-black text-red-950">Chamber Access Error</h2>
          <p className="text-xs text-red-800 font-medium">{state.error}</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              reset();
              navigate('/lobby');
            }}
            className="flex-1 py-3.5 castle-btn-stone rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition"
          >
            Back to Lobby 🏛️
          </button>
          <button
            onClick={() => {
              if (roomCode) joinRoomChannel(roomCode);
            }}
            className="flex-1 py-3.5 royal-btn-gold rounded-xl font-cinzel font-black text-xs uppercase tracking-wider shadow-gold-glow transition"
          >
            Retry Entry 🔄
          </button>
        </div>
      </div>
    );
  }

  if (state.status === 'completed' && state.winner) {
    return (
      <GameOver
        winner={state.winner}
        finalScores={state.scores}
        players={state.players}
        onPlayAgain={() => {
          reset();
          navigate('/lobby');
        }}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Royal Castle Room Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fef3c7] border border-amber-400/80 text-[#92400e] text-xs font-cinzel font-black tracking-widest uppercase shadow-sm">
          🏰 Grand Castle Chamber Key
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl sm:text-5xl font-cinzel font-black tracking-widest gold-gradient-text">
            {roomCode}
          </div>
          <button
            onClick={copyCode}
            className="px-3 py-1.5 castle-btn-stone rounded-xl text-xs font-cinzel font-bold flex items-center gap-1 shadow-sm hover:scale-105 transition"
            title="Copy Room Code to Clipboard"
          >
            <span>{copied ? '✅' : '📋'}</span>
            <span>{copied ? 'Copied!' : 'Copy Key'}</span>
          </button>
        </div>
      </div>

      {/* Waiting Lobby State */}
      {state.status === 'waiting' && (
        <div className="max-w-md mx-auto royal-glass p-7 rounded-3xl space-y-5 shadow-castle-card relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
          
          <PlayerList players={state.players} hostId={state.hostId} />
          
          {isHost ? (
            <button
              onClick={() => startGame(roomCode)}
              className="w-full py-4 royal-btn-gold rounded-xl font-cinzel font-black text-sm uppercase tracking-wider transition shadow-gold-glow flex items-center justify-center gap-2"
            >
              <span>⚔️</span> Begin Castle Match {state.players.length < 4 && `(Fills ${4 - state.players.length} AI Courtiers)`}
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-[#fbf5e6] border-2 border-amber-300 text-center text-xs text-[#78350f] font-bold animate-pulse">
              ⏳ Awaiting the Host to proclaim the start of the match...
            </div>
          )}
        </div>
      )}

      {/* Playing Game Darbar */}
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
            <ChatBox
              messages={state.chatMessages}
              onSend={(msg) => sendChat(roomCode, msg)}
              onEmote={(emote) => sendEmote(roomCode, emote)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
