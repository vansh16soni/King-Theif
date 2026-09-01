/**
 * In-memory game state store, keyed by roomCode.
 * Kept in memory for speed; each completed round is persisted to MongoDB
 * (see handlers/gameHandlers.js -> Room.gameHistory).
 *
 * Shape per room:
 * {
 *   roomCode,
 *   players: [{ userId, username, isBot, personality, socketId, isReady }],
 *   hostId,
 *   status: 'waiting' | 'playing' | 'completed',
 *   totalRounds,
 *   currentRound,
 *   scores: { [playerKey]: number },
 *   currentChits: null | dealRoles() result,
 *   chatLog: [ 'username: message', ... ]  (recent, trimmed)
 * }
 */
const rooms = new Map();

function getRoom(roomCode) {
  return rooms.get(roomCode);
}

function setRoom(roomCode, data) {
  rooms.set(roomCode, data);
  return data;
}

function deleteRoom(roomCode) {
  rooms.delete(roomCode);
}

function pushChat(roomCode, line) {
  const room = rooms.get(roomCode);
  if (!room) return;
  room.chatLog.push(line);
  if (room.chatLog.length > 30) room.chatLog.shift(); // keep it small for OpenAI context
}

module.exports = { rooms, getRoom, setRoom, deleteRoom, pushChat };
