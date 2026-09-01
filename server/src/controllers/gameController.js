const Room = require('../models/Room');

async function getState(req, res, next) {
  try {
    const room = await Room.findOne({ roomCode: req.params.roomCode });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({
      status: room.status,
      currentRound: room.currentRound,
      totalRounds: room.totalRounds,
      players: room.players
    });
  } catch (err) { next(err); }
}

async function getHistory(req, res, next) {
  try {
    const room = await Room.findOne({ roomCode: req.params.roomCode });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ gameHistory: room.gameHistory });
  } catch (err) { next(err); }
}

// Guess submission is primarily handled over Socket.io (see socket/handlers/gameHandlers.js)
// for real-time flow. This REST endpoint is a fallback for non-socket clients.
async function submitGuess(req, res, next) {
  try {
    res.status(501).json({ error: 'Use the game:guess Socket.io event for real-time play.' });
  } catch (err) { next(err); }
}

module.exports = { getState, getHistory, submitGuess };
