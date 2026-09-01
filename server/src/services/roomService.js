const Room = require('../models/Room');
const { generateRoomCode } = require('../utils/roomCodeGenerator');
const { BOT_NAMES, BOT_PERSONALITIES } = require('../utils/constants');

async function createRoom(hostId, hostUsername, totalRounds = 10) {
  const roomCode = await generateRoomCode();
  const room = await Room.create({
    roomCode,
    hostId,
    totalRounds,
    players: [{ userId: hostId, username: hostUsername, isBot: false, isReady: true }]
  });
  return room;
}

async function joinRoom(roomCode, userId, username) {
  const room = await Room.findOne({ roomCode });
  if (!room) throw Object.assign(new Error('Room not found'), { status: 404 });
  if (room.status !== 'waiting') throw Object.assign(new Error('Game already started'), { status: 400 });
  if (room.players.length >= room.maxPlayers) throw Object.assign(new Error('Room full'), { status: 400 });
  if (!room.players.some(p => String(p.userId) === String(userId))) {
    room.players.push({ userId, username, isBot: false, isReady: true });
  }
  room.lastActivity = new Date();
  await room.save();
  return room;
}

function fillWithBots(room) {
  const max = room.maxPlayers || 4;
  const shuffled = [...BOT_NAMES].sort(() => Math.random() - 0.5);
  let i = 0;
  while (room.players.length < max) {
    const name = shuffled[i % shuffled.length] + '_' + Math.floor(Math.random() * 100);
    const personality = BOT_PERSONALITIES[Math.floor(Math.random() * BOT_PERSONALITIES.length)];
    room.players.push({
      userId: null,
      username: name,
      isBot: true,
      isReady: true,
      personality
    });
    i++;
  }
  return room;
}

async function touchRoom(roomCode) {
  await Room.updateOne({ roomCode }, { lastActivity: new Date() });
}

module.exports = { createRoom, joinRoom, fillWithBots, touchRoom };
