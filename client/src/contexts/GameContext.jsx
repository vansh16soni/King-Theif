import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useSocket } from './SocketContext';

const GameContext = createContext(null);

const initialState = {
  roomCode: null,
  players: [],
  hostId: null,
  status: 'waiting', // waiting | playing | completed
  totalRounds: 10,
  roundNumber: 0,
  yourRole: null,
  rajaPlayer: null,
  mantriUsername: null,
  availablePlayers: [],
  isMantriTurn: false,
  guessDeadline: null,
  guessTimeLimit: 15,
  lastResult: null,
  isTimeout: false,
  nextRoundIn: null,
  scores: {},
  winner: null,
  chatMessages: [],
  botThinking: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'ROOM_JOINED':
      return { ...state, roomCode: action.roomCode, players: action.players, hostId: action.hostId ? String(action.hostId) : state.hostId };
    case 'ROOM_UPDATE':
      return { ...state, players: action.room.players, status: action.room.status, hostId: action.room.hostId ? String(action.room.hostId) : state.hostId };
    case 'GAME_STARTED':
      return { ...state, status: 'playing', players: action.players, totalRounds: action.totalRounds, winner: null };
    case 'ROUND_START':
      return {
        ...state,
        roundNumber: action.roundNumber,
        totalRounds: action.totalRounds || state.totalRounds,
        yourRole: action.yourRole,
        lastResult: null,
        isMantriTurn: false,
        isTimeout: false,
        guessDeadline: null,
        nextRoundIn: null
      };
    case 'RAJA_REVEALED':
      return { ...state, rajaPlayer: action.rajaPlayer };
    case 'MANTRI_TURN':
      return {
        ...state,
        mantriUsername: action.mantriUsername,
        availablePlayers: action.availablePlayers,
        isMantriTurn: state.yourRole === 'mantri',
        guessDeadline: action.deadline || Date.now() + 15000,
        guessTimeLimit: action.timeLimit || 15
      };
    case 'BOT_THINKING':
      return { ...state, botThinking: action.botName };
    case 'GUESS_RESULT':
      return { ...state, botThinking: null, guessDeadline: null };
    case 'GUESS_TIMEOUT':
      return { ...state, isTimeout: true, guessDeadline: null };
    case 'ROUND_END':
      return {
        ...state,
        lastResult: action.roundData,
        scores: action.scores,
        isTimeout: !!action.isTimeout,
        nextRoundIn: action.nextRoundInSec || 5,
        isMantriTurn: false,
        guessDeadline: null
      };
    case 'GAME_END':
      return { ...state, status: 'completed', winner: action.winner, scores: action.finalScores, guessDeadline: null };
    case 'CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, { ...action, kind: 'message' }].slice(-100) };
    case 'CHAT_EMOTE':
      return { ...state, chatMessages: [...state.chatMessages, { ...action, kind: 'emote' }].slice(-100) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const socket = useSocket();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!socket) return;

    const listeners = {
      'room:joined': (d) => dispatch({ type: 'ROOM_JOINED', ...d }),
      'room:update': (d) => dispatch({ type: 'ROOM_UPDATE', ...d }),
      'game:started': (d) => dispatch({ type: 'GAME_STARTED', ...d }),
      'game:round_start': (d) => dispatch({ type: 'ROUND_START', ...d }),
      'game:raja_revealed': (d) => dispatch({ type: 'RAJA_REVEALED', ...d }),
      'game:mantri_turn': (d) => dispatch({ type: 'MANTRI_TURN', ...d }),
      'bot:thinking': (d) => dispatch({ type: 'BOT_THINKING', ...d }),
      'game:guess_result': (d) => dispatch({ type: 'GUESS_RESULT', ...d }),
      'game:guess_timeout': (d) => dispatch({ type: 'GUESS_TIMEOUT', ...d }),
      'game:round_end': (d) => dispatch({ type: 'ROUND_END', ...d }),
      'game:game_end': (d) => dispatch({ type: 'GAME_END', ...d }),
      'chat:message': (d) => dispatch({ type: 'CHAT_MESSAGE', ...d }),
      'chat:emote': (d) => dispatch({ type: 'CHAT_EMOTE', ...d })
    };

    Object.entries(listeners).forEach(([event, handler]) => socket.on(event, handler));
    return () => Object.entries(listeners).forEach(([event, handler]) => socket.off(event, handler));
  }, [socket]);

  function joinRoomChannel(roomCode) {
    socket?.emit('room:join', { roomCode });
  }
  function startGame(roomCode) {
    socket?.emit('room:start', { roomCode });
  }
  function submitGuess(roomCode, sipahiId, chorId) {
    socket?.emit('game:guess', { roomCode, sipahiId, chorId });
  }
  function sendChat(roomCode, message) {
    socket?.emit('chat:send', { roomCode, message });
  }
  function sendEmote(roomCode, emoteType) {
    socket?.emit('chat:emote', { roomCode, emoteType });
  }
  function reset() {
    dispatch({ type: 'RESET' });
  }

  return (
    <GameContext.Provider value={{ state, joinRoomChannel, startGame, submitGuess, sendChat, sendEmote, reset }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
