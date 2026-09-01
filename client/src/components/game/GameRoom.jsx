import React, { useEffect } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (roomCode) joinRoomChannel(roomCode);
  }, [roomCode]);

  const currentUserId = user?.id || user?._id;
  const isHost = state.hostId && currentUserId && String(state.hostId) === String(currentUserId);

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
      {/* Royal Room Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-bold tracking-widest uppercase">
          🏛️ Grand Chamber Key
        </div>
        <div className="text-4xl sm:text-5xl font-cinzel font-black tracking-widest gold-gradient-text">
          {roomCode}
        </div>
      </div>

      {/* Waiting Lobby State */}
      {state.status === 'waiting' && (
        <div className="max-w-md mx-auto royal-glass p-7 rounded-3xl space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          
          <PlayerList players={state.players} hostId={state.hostId} />
          
          {isHost ? (
            <button
              onClick={() => startGame(roomCode)}
              className="w-full py-4 royal-btn-gold rounded-xl font-cinzel font-black text-sm uppercase tracking-wider transition shadow-gold-glow flex items-center justify-center gap-2"
            >
              <span>⚔️</span> Begin Royal Match {state.players.length < 4 && `(Fills ${4 - state.players.length} AI Courtiers)`}
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-[#0f091e] border border-amber-500/20 text-center text-xs text-amber-200/60 font-medium animate-pulse">
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
