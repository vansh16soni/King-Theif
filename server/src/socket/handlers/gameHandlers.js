const Room = require('../../models/Room');
const User = require('../../models/User');
const { getRoom, pushChat } = require('../gameState');
const { dealRoles, evaluateGuess } = require('../../services/gameService');
const { generateBotGuess, generateBotChatMessage } = require('../../services/botService');

const BOT_THINK_DELAY_MS = () => 1200 + Math.random() * 2000; // 1.2-3.2s
const GUESS_TIME_LIMIT_SEC = 15;
const NEXT_ROUND_DELAY_MS = 5000; // 5 seconds review before next round begins

function playerKey(p) {
  return p.userId || p.socketId || p.username;
}

/**
 * Begin a new round: increment counter, deal roles, notify each player of
 * their own role privately, then reveal Raja and hand control to Mantri with 15s timer.
 */
async function startRound(io, roomCode) {
  const memRoom = getRoom(roomCode);
  if (!memRoom) return;

  // Clear any existing timers
  if (memRoom.guessTimer) {
    clearTimeout(memRoom.guessTimer);
    memRoom.guessTimer = null;
  }
  if (memRoom.nextRoundTimer) {
    clearTimeout(memRoom.nextRoundTimer);
    memRoom.nextRoundTimer = null;
  }

  memRoom.currentRound += 1;

  if (memRoom.currentRound > memRoom.totalRounds) {
    return endGame(io, roomCode);
  }

  const chits = dealRoles(memRoom.players);
  memRoom.currentChits = chits;

  // Privately tell each player their role + chit
  Object.entries(chits).forEach(([role, info]) => {
    if (info.socketId) {
      io.to(info.socketId).emit('game:round_start', {
        roundNumber: memRoom.currentRound,
        totalRounds: memRoom.totalRounds,
        yourRole: role,
        yourChit: role
      });
    }
  });

  io.to(roomCode).emit('game:raja_revealed', { rajaPlayer: { username: chits.raja.username } });

  const candidates = memRoom.players
    .filter(p => playerKey(p) !== chits.raja.playerId && playerKey(p) !== chits.mantri.playerId)
    .map(p => ({ playerId: playerKey(p), username: p.username }));

  const deadline = Date.now() + (GUESS_TIME_LIMIT_SEC * 1000);

  io.to(roomCode).emit('game:mantri_turn', {
    mantriUsername: chits.mantri.username,
    availablePlayers: candidates,
    timeLimit: GUESS_TIME_LIMIT_SEC,
    deadline
  });

  // Start 15-second guess timer for Mantri
  memRoom.guessTimer = setTimeout(() => {
    handleGuessTimeout(io, roomCode, candidates);
  }, GUESS_TIME_LIMIT_SEC * 1000);

  // If Mantri is a bot, auto-generate a guess after a "thinking" delay
  if (chits.mantri.isBot) {
    const mantriPlayer = memRoom.players.find(p => playerKey(p) === chits.mantri.playerId);
    io.to(roomCode).emit('bot:thinking', { botName: chits.mantri.username });
    setTimeout(async () => {
      // Ensure the room is still in active guess phase
      if (!memRoom.currentChits || !memRoom.guessTimer) return;
      const guess = await generateBotGuess({
        username: mantriPlayer.username,
        personality: mantriPlayer.personality,
        candidates,
        chatLog: memRoom.chatLog
      });
      clearTimeout(memRoom.guessTimer);
      memRoom.guessTimer = null;
      resolveGuess(io, roomCode, guess);
    }, BOT_THINK_DELAY_MS());
  }

  // Trigger a bit of ambient bot chat this round (non-blocking)
  triggerBotChatter(io, roomCode, chits);
}

/**
 * Triggered when 15 seconds run out without a Mantri guess.
 */
function handleGuessTimeout(io, roomCode, candidates) {
  const memRoom = getRoom(roomCode);
  if (!memRoom || !memRoom.currentChits) return;

  memRoom.guessTimer = null;

  io.to(roomCode).emit('game:guess_timeout', {
    message: 'Time expired! Mantri failed to guess within 15 seconds.'
  });

  // Automatic timeout resolution: Mantri fails to identify Chor
  const candidateSipahi = candidates[0]?.playerId;
  const candidateChor = candidates[1]?.playerId;

  resolveGuess(io, roomCode, {
    sipahiPlayerId: candidateSipahi,
    chorPlayerId: candidateChor,
    isTimeout: true
  });
}

/**
 * Fire off a few bot chat lines for the round (Chor bluffs, Sipahi hints subtly, etc.)
 */
function triggerBotChatter(io, roomCode, chits) {
  const memRoom = getRoom(roomCode);
  if (!memRoom) return;
  Object.entries(chits).forEach(([role, info]) => {
    if (!info.isBot) return;
    const botPlayer = memRoom.players.find(p => playerKey(p) === info.playerId);
    if (!botPlayer) return;
    setTimeout(async () => {
      const otherPlayers = memRoom.players.filter(p => p !== botPlayer).map(p => p.username);
      const context = role === 'chor'
        ? 'You are the Chor. Bluff subtly, do not admit it.'
        : role === 'sipahi'
        ? 'You are the Sipahi. Hint at your innocence without revealing your role.'
        : role === 'raja'
        ? 'You are the Raja and just got revealed. React with excitement.'
        : 'You are about to guess. Comment on the vibe in the room.';
      const message = await generateBotChatMessage({
        role, username: botPlayer.username, otherPlayers,
        personality: botPlayer.personality, context
      });
      pushChat(roomCode, `${botPlayer.username}: ${message}`);
      io.to(roomCode).emit('chat:message', { sender: botPlayer.username, message, isBot: true });
    }, BOT_THINK_DELAY_MS());
  });
}

/**
 * Shared resolution path for both human and bot Mantri guesses & timeouts.
 */
async function resolveGuess(io, roomCode, guess) {
  const memRoom = getRoom(roomCode);
  if (!memRoom || !memRoom.currentChits) return;

  // Clear timer if active
  if (memRoom.guessTimer) {
    clearTimeout(memRoom.guessTimer);
    memRoom.guessTimer = null;
  }

  const { isCorrect, points, result, isTimeout } = evaluateGuess(memRoom.currentChits, guess);

  // Update in-memory scores
  Object.values(result).forEach(r => {
    const key = r.playerId;
    memRoom.scores[key] = (memRoom.scores[key] || 0) + r.points;
  });

  io.to(roomCode).emit('game:guess_result', { isCorrect, points, isTimeout });
  io.to(roomCode).emit('game:round_end', {
    roundData: result,
    scores: memRoom.scores,
    isTimeout,
    nextRoundInSec: NEXT_ROUND_DELAY_MS / 1000
  });

  // Persist round to MongoDB
  try {
    await Room.updateOne({ roomCode }, {
      $push: {
        gameHistory: {
          roundNumber: memRoom.currentRound,
          chits: {
            raja: { playerId: result.raja.playerId, username: result.raja.username },
            mantri: { playerId: result.mantri.playerId, username: result.mantri.username },
            sipahi: { playerId: result.sipahi.playerId, username: result.sipahi.username },
            chor: { playerId: result.chor.playerId, username: result.chor.username }
          },
          mantriGuess: { sipahiPlayerId: guess.sipahiPlayerId, chorPlayerId: guess.chorPlayerId, isCorrect, isTimeout },
          pointsAwarded: { raja: points.raja, mantri: points.mantri, sipahi: points.sipahi, chor: points.chor }
        }
      },
      currentRound: memRoom.currentRound,
      lastActivity: new Date()
    });

    // Update per-user stats for non-bot players
    await Promise.all(Object.entries(result).map(async ([role, r]) => {
      if (!r.playerId || String(r.playerId).length !== 24) return;
      const inc = { totalPoints: r.points, totalRoundsPlayed: 1, [`stats.${role}Count`]: 1 };
      if (role === 'mantri') inc[isCorrect ? 'stats.correctGuesses' : 'stats.wrongGuesses'] = 1;
      await User.updateOne({ _id: r.playerId }, { $inc: inc });
    }));
  } catch (err) {
    console.error('Failed to persist round:', err.message);
  }

  memRoom.currentChits = null;

  // After the 5-second results review timer, start the next round
  memRoom.nextRoundTimer = setTimeout(() => {
    startRound(io, roomCode);
  }, NEXT_ROUND_DELAY_MS);
}

async function endGame(io, roomCode) {
  const memRoom = getRoom(roomCode);
  if (!memRoom) return;

  if (memRoom.guessTimer) clearTimeout(memRoom.guessTimer);
  if (memRoom.nextRoundTimer) clearTimeout(memRoom.nextRoundTimer);

  const finalScores = memRoom.scores;
  const winnerKey = Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0]?.[0];
  const winner = memRoom.players.find(p => playerKey(p) === winnerKey);

  memRoom.status = 'completed';
  io.to(roomCode).emit('game:game_end', { winner: winner?.username, finalScores });

  try {
    await Room.updateOne({ roomCode }, { status: 'completed', lastActivity: new Date() });
    await Promise.all(memRoom.players.map(async (p) => {
      if (!p.userId) return;
      const won = playerKey(p) === winnerKey;
      await User.updateOne({ _id: p.userId }, { $inc: { gamesPlayed: 1, gamesWon: won ? 1 : 0 } });
    }));
  } catch (err) {
    console.error('Failed to finalize game:', err.message);
  }
}

function registerGameHandlers(io, socket) {
  socket.on('game:guess', ({ roomCode, sipahiId, chorId }) => {
    const memRoom = getRoom(roomCode);
    if (!memRoom || !memRoom.currentChits) return socket.emit('error', { message: 'No active guess to submit' });
    if (memRoom.currentChits.mantri.socketId !== socket.id) {
      return socket.emit('error', { message: 'Only the current Mantri can guess' });
    }
    
    // Clear timer immediately on valid guess
    if (memRoom.guessTimer) {
      clearTimeout(memRoom.guessTimer);
      memRoom.guessTimer = null;
    }

    resolveGuess(io, roomCode, { sipahiPlayerId: sipahiId, chorPlayerId: chorId });
  });

  socket.on('game:next_round', ({ roomCode }) => {
    const memRoom = getRoom(roomCode);
    if (!memRoom || String(memRoom.hostId) !== String(socket.userId)) return;
    if (memRoom.currentChits) return; // Disallow skipping active guess phase
    startRound(io, roomCode);
  });
}

module.exports = { registerGameHandlers, startRound };
