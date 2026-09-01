const { Server } = require('socket.io');
const socketAuth = require('./middleware/auth');
const { registerRoomHandlers } = require('./handlers/roomHandlers');
const { registerGameHandlers } = require('./handlers/gameHandlers');
const { registerChatHandlers } = require('./handlers/chatHandlers');

const connectedUsers = new Map(); // userId -> { username, socketId, roomCode }
let globalIo = null;

function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || '*', credentials: true }
  });
  globalIo = io;

  io.use(socketAuth);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.username} (${socket.id})`);
    connectedUsers.set(String(socket.userId), {
      username: socket.username,
      socketId: socket.id,
      roomCode: socket.data?.roomCode || null
    });

    registerRoomHandlers(io, socket);
    registerGameHandlers(io, socket);
    registerChatHandlers(io, socket);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.username} (${socket.id})`);
      connectedUsers.delete(String(socket.userId));
    });
  });

  return io;
}

function getActiveUserStatus(userId) {
  const user = connectedUsers.get(String(userId));
  if (!user) return { isOnline: false, roomCode: null, status: 'offline' };
  return {
    isOnline: true,
    roomCode: user.roomCode || null,
    status: user.roomCode ? `in-game (${user.roomCode})` : 'online'
  };
}

function disconnectUser(userId) {
  const user = connectedUsers.get(String(userId));
  if (user && globalIo) {
    const socket = globalIo.sockets.sockets.get(user.socketId);
    if (socket) {
      socket.disconnect(true);
    }
    connectedUsers.delete(String(userId));
  }
}

module.exports = { initSocket, getActiveUserStatus, disconnectUser };
