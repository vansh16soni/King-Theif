const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  roomCode: String,
  senderId: mongoose.Schema.Types.Mixed,
  senderUsername: String,
  isBot: { type: Boolean, default: false },
  message: String,
  isEmote: { type: Boolean, default: false },
  emoteType: String, // trust | suspicious | nervous | confident | liar
  isPrivateHint: { type: Boolean, default: false },
  targetId: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
