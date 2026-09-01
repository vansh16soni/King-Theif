const { ROLES } = require('../utils/constants');
const { calculatePoints } = require('./scoringService');

/**
 * Randomly shuffles the 4 roles and assigns one to each player.
 * players: array of { userId|null, username, isBot, socketId }
 * Returns { raja, mantri, sipahi, chor } each = { playerId, username, socketId, isBot }
 */
function dealRoles(players) {
  if (players.length !== 4) throw new Error('Exactly 4 players required to deal roles');
  const shuffledRoles = [...ROLES].sort(() => Math.random() - 0.5);
  const assignment = {};
  players.forEach((player, idx) => {
    const role = shuffledRoles[idx];
    assignment[role] = {
      playerId: player.userId || player.socketId || player.username,
      username: player.username,
      socketId: player.socketId,
      isBot: player.isBot
    };
  });
  return assignment;
}

/**
 * Evaluate Mantri's guess against actual roles.
 * chits: result from dealRoles()
 * guess: { sipahiPlayerId, chorPlayerId, isTimeout }
 */
function evaluateGuess(chits, guess) {
  const isCorrect = !guess.isTimeout &&
    String(chits.sipahi.playerId) === String(guess.sipahiPlayerId) &&
    String(chits.chor.playerId) === String(guess.chorPlayerId);

  const points = calculatePoints(isCorrect);

  return {
    isCorrect,
    points,
    isTimeout: !!guess.isTimeout,
    result: {
      raja: { ...chits.raja, points: points.raja },
      mantri: { ...chits.mantri, points: points.mantri },
      sipahi: { ...chits.sipahi, points: points.sipahi },
      chor: { ...chits.chor, points: points.chor }
    }
  };
}

module.exports = { dealRoles, evaluateGuess };
