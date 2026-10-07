import React, { createContext, useContext, useEffect, useReducer, useRef, useCallback } from 'react';
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
  botThinking: null,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'ROOM_INITIAL_DATA':
      return {
        ...state,
        roomCode: action.room.roomCode,
        players: action.room.players || state.players,
        hostId: action.room.hostId ? String(action.room.hostId) : state.hostId,
        status: action.room.status || state.status,
        totalRounds: action.room.totalRounds || state.totalRounds,
        error: null
      };
    case 'ROOM_JOINED':
      return {
        ...state,
        roomCode: action.roomCode,
        players: action.players || state.players,
        hostId: action.hostId ? String(action.hostId) : state.hostId,
        status: action.status || state.status,
        error: null
      };
    case 'ROOM_UPDATE':
      return {
        ...state,
        roomCode: action.room?.roomCode || state.roomCode,
        players: action.room?.players || state.players,
        status: action.room?.status || state.status,
        hostId: action.room?.hostId ? String(action.room?.hostId) : state.hostId,
        error: null
      };
    case 'PLAYER_JOINED': {
      if (!action.player) return state;
      const exists = state.players.some(p => String(p.userId) === String(action.player.userId));
      if (exists) {
        return {
          ...state,
          players: state.players.map(p => String(p.userId) === String(action.player.userId) ? { ...p, ...action.player } : p)
        };
      }
      return {
        ...state,
        players: [...state.players, action.player]
      };
    }
    case 'PLAYER_LEFT': {
      return {
        ...state,
        players: state.players.filter(p => String(p.userId) !== String(action.userId))
      };
    }
    case 'GAME_STARTED':
      return { ...state, status: 'playing', players: action.players, totalRounds: action.totalRounds, winner: null, error: null };
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
        nextRoundIn: null,
        error: null
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
    case 'GAME_ERROR':
      return { ...state, error: action.message || 'An error occurred in the game room' };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const socket = useSocket();
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentRoomRef = useRef(null);

  const emitRoomJoin = useCallback((code) => {
    if (!socket || !code) return;
    const cleanCode = String(code).trim();
    currentRoomRef.current = cleanCode;
    socket.emit('room:join', { roomCode: cleanCode });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      if (currentRoomRef.current) {
        socket.emit('room:join', { roomCode: currentRoomRef.current });
      }
    };

    const listeners = {
      'connect': onConnect,
      'error': (d) => dispatch({ type: 'GAME_ERROR', ...d }),
      'room:joined': (d) => dispatch({ type: 'ROOM_JOINED', ...d }),
      'room:update': (d) => dispatch({ type: 'ROOM_UPDATE', ...d }),
      'room:player_joined': (d) => dispatch({ type: 'PLAYER_JOINED', ...d }),
      'room:player_left': (d) => dispatch({ type: 'PLAYER_LEFT', ...d }),
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

    // If socket is already connected when this effect runs, re-join active room
    if (socket.connected && currentRoomRef.current) {
      socket.emit('room:join', { roomCode: currentRoomRef.current });
    }

    Object.entries(listeners).forEach(([event, handler]) => socket.on(event, handler));
    return () => {
      Object.entries(listeners).forEach(([event, handler]) => socket.off(event, handler));
    };
  }, [socket]);

  function joinRoomChannel(roomCode) {
    if (!roomCode) return;
    const cleanCode = String(roomCode).trim();
    currentRoomRef.current = cleanCode;
    emitRoomJoin(cleanCode);
  }

  function setInitialRoom(room) {
    if (!room) return;
    currentRoomRef.current = String(room.roomCode).trim();
    dispatch({ type: 'ROOM_INITIAL_DATA', room });
  }

  function startGame(roomCode) {
    socket?.emit('room:start', { roomCode: String(roomCode).trim() });
  }
  function submitGuess(roomCode, sipahiId, chorId) {
    socket?.emit('game:guess', { roomCode: String(roomCode).trim(), sipahiId, chorId });
  }
  function sendChat(roomCode, message) {
    socket?.emit('chat:send', { roomCode: String(roomCode).trim(), message });
  }
  function sendEmote(roomCode, emoteType) {
    socket?.emit('chat:emote', { roomCode: String(roomCode).trim(), emoteType });
  }
  function reset() {
    currentRoomRef.current = null;
    dispatch({ type: 'RESET' });
  }

  return (
    <GameContext.Provider value={{ state, joinRoomChannel, setInitialRoom, startGame, submitGuess, sendChat, sendEmote, reset }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
