const Room = require('../../models/Room');
const { getRoom, setRoom, pushChat } = require('../gameState');
const { fillWithBots } = require('../../services/roomService');

function registerRoomHandlers(io, socket) {
  // Client joins a room's socket.io channel + syncs in-memory state
  socket.on('room:join', async ({ roomCode }) => {
    try {
      if (!roomCode) return socket.emit('error', { message: 'Castle room code is required' });

      const dbRoom = await Room.findOne({ roomCode });
      if (!dbRoom) return socket.emit('error', { message: `Castle Chamber #${roomCode} not found` });

      socket.join(roomCode);
      socket.data.roomCode = roomCode;

      let memRoom = getRoom(roomCode);
      if (!memRoom) {
        memRoom = setRoom(roomCode, {
          roomCode,
          hostId: String(dbRoom.hostId),
          players: dbRoom.players.map(p => ({
            userId: p.userId ? String(p.userId) : null,
            username: p.username,
            isBot: p.isBot,
            personality: p.personality || null,
            socketId: null,
            isReady: p.isReady
          })),
          status: dbRoom.status,
          maxPlayers: dbRoom.maxPlayers || 4,
          totalRounds: dbRoom.totalRounds,
          currentRound: dbRoom.currentRound,
          scores: {},
          currentChits: null,
          chatLog: []
        });
      }

      // Check if this player is already in the room
      let player = memRoom.players.find(p => String(p.userId) === String(socket.userId));
      if (player) {
        player.socketId = socket.id;
        player.username = socket.username;
      } else {
        // Player is newly joining this room
        if (memRoom.status !== 'waiting') {
          return socket.emit('error', { message: 'This castle match has already commenced' });
        }
        if (memRoom.players.length >= (memRoom.maxPlayers || 4)) {
          return socket.emit('error', { message: 'Castle chamber is already full (max 4 nobles)' });
        }

        player = {
          userId: String(socket.userId),
          username: socket.username,
          isBot: false,
          personality: null,
          socketId: socket.id,
          isReady: true
        };
        memRoom.players.push(player);

        // Also persist in MongoDB if not present
        if (!dbRoom.players.some(p => String(p.userId) === String(socket.userId))) {
          dbRoom.players.push({
            userId: socket.userId,
            username: socket.username,
            isBot: false,
            isReady: true
          });
          dbRoom.lastActivity = new Date();
          await dbRoom.save();
        }
      }

      const playerKey = socket.userId || socket.id;
      if (memRoom.scores[playerKey] === undefined) {
        memRoom.scores[playerKey] = 0;
      }

      io.to(roomCode).emit('room:player_joined', { player });
      io.to(roomCode).emit('room:update', { room: memRoom });
      socket.emit('room:joined', { roomCode, players: memRoom.players, hostId: String(memRoom.hostId) });
    } catch (err) {
      console.error('Socket room:join error:', err);
      socket.emit('error', { message: err.message || 'Failed to join castle chamber' });
    }
  });

  socket.on('room:leave', ({ roomCode }) => {
    socket.leave(roomCode);
    const memRoom = getRoom(roomCode);
    if (memRoom) {
      io.to(roomCode).emit('room:player_left', { userId: socket.userId });
    }
  });

  // Host starts the game -> fill empty slots with bots, deal roles for round 1
  socket.on('room:start', async ({ roomCode }) => {
    try {
      const memRoom = getRoom(roomCode);
      if (!memRoom) return socket.emit('error', { message: 'Room not found in memory' });
      if (String(memRoom.hostId) !== String(socket.userId)) {
        return socket.emit('error', { message: 'Only the host can start the game' });
      }

      if (memRoom.players.length < 4) {
        fillWithBots(memRoom); // mutates memRoom.players in place (roomService works on .players array)
      }

      memRoom.players.forEach(p => {
        const k = p.userId || p.socketId || p.username;
        if (memRoom.scores[k] === undefined) memRoom.scores[k] = 0;
      });

      memRoom.status = 'playing';
      memRoom.currentRound = 0;
      await Room.updateOne({ roomCode }, {
        status: 'playing',
        players: memRoom.players.map(p => ({
          userId: p.userId, username: p.username, isBot: p.isBot,
          isReady: true, personality: p.personality
        })),
        lastActivity: new Date()
      });

      io.to(roomCode).emit('game:started', { players: memRoom.players, totalRounds: memRoom.totalRounds });

      // Kick off round 1 (gameHandlers owns round flow to avoid circular deps at top-level require)
      require('./gameHandlers').startRound(io, roomCode);
    } catch (err) {
      socket.emit('error', { message: err.message });
    }
  });

  socket.on('disconnect', () => {
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;
    const memRoom = getRoom(roomCode);
    if (!memRoom) return;
    const player = memRoom.players.find(p => p.socketId === socket.id);
    if (player) player.socketId = null; // keep player for 30s reconnect window; not auto-removed
    io.to(roomCode).emit('room:player_left', { userId: socket.userId });
  });
}

module.exports = { registerRoomHandlers };
