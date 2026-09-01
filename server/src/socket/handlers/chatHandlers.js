const ChatMessage = require('../../models/ChatMessage');
const Room = require('../../models/Room');
const { getRoom, pushChat } = require('../gameState');
const { EMOTES } = require('../../utils/constants');

function registerChatHandlers(io, socket) {
  socket.on('chat:send', async ({ roomCode, message }) => {
    if (!message || !message.trim()) return;
    const trimmed = message.trim().slice(0, 300);

    pushChat(roomCode, `${socket.username}: ${trimmed}`);
    io.to(roomCode).emit('chat:message', { sender: socket.username, message: trimmed, isBot: false });

    try {
      const room = await Room.findOne({ roomCode });
      await ChatMessage.create({
        roomId: room?._id, roomCode,
        senderId: socket.userId, senderUsername: socket.username,
        isBot: false, message: trimmed
      });
    } catch (err) {
      console.error('Failed to save chat message:', err.message);
    }
  });

  socket.on('chat:emote', async ({ roomCode, emoteType }) => {
    if (!EMOTES.includes(emoteType)) return;
    io.to(roomCode).emit('chat:emote', { sender: socket.username, emoteType });
    try {
      const room = await Room.findOne({ roomCode });
      await ChatMessage.create({
        roomId: room?._id, roomCode,
        senderId: socket.userId, senderUsername: socket.username,
        isBot: false, isEmote: true, emoteType
      });
    } catch (err) {
      console.error('Failed to save emote:', err.message);
    }
  });

  // Optional rule variant: Sipahi may send ONE private emoji hint to Mantri pre-guess.
  socket.on('chat:private_hint', async ({ roomCode, targetId, emoteType }) => {
    const memRoom = getRoom(roomCode);
    if (!memRoom || !memRoom.currentChits) return;
    if (memRoom.currentChits.sipahi.socketId !== socket.id) {
      return socket.emit('error', { message: 'Only the Sipahi may send a private hint' });
    }
    const mantriSocketId = memRoom.currentChits.mantri.socketId;
    if (mantriSocketId) {
      io.to(mantriSocketId).emit('chat:emote', { sender: 'Anonymous Hint', emoteType, isPrivate: true });
    }
    try {
      const room = await Room.findOne({ roomCode });
      await ChatMessage.create({
        roomId: room?._id, roomCode,
        senderId: socket.userId, senderUsername: socket.username,
        isBot: false, isEmote: true, emoteType, isPrivateHint: true, targetId
      });
    } catch (err) {
      console.error('Failed to save private hint:', err.message);
    }
  });
}

module.exports = { registerChatHandlers };
