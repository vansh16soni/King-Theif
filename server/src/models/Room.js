const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  isBot: { type: Boolean, default: false },
  isReady: { type: Boolean, default: false },
  personality: { type: String, default: null }, // bot personality, null for humans
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const ChitAssignmentSchema = new mongoose.Schema({
  playerId: mongoose.Schema.Types.Mixed, // ObjectId or bot socketId string
  username: String
}, { _id: false });

const RoundSchema = new mongoose.Schema({
  roundNumber: Number,
  chits: {
    raja: ChitAssignmentSchema,
    mantri: ChitAssignmentSchema,
    sipahi: ChitAssignmentSchema,
    chor: ChitAssignmentSchema
  },
  mantriGuess: {
    sipahiPlayerId: mongoose.Schema.Types.Mixed,
    chorPlayerId: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean
  },
  pointsAwarded: {
    raja: Number,
    mantri: Number,
    sipahi: Number,
    chor: Number
  },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const RoomSchema = new mongoose.Schema({
  roomCode: { type: String, unique: true, required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  players: [PlayerSchema],
  status: { type: String, enum: ['waiting', 'playing', 'completed'], default: 'waiting' },
  maxPlayers: { type: Number, default: 4 },
  totalRounds: { type: Number, default: 10 },
  currentRound: { type: Number, default: 0 },
  isPrivate: { type: Boolean, default: true },
  lastActivity: { type: Date, default: Date.now },
  gameHistory: [RoundSchema]
}, { timestamps: true });

RoomSchema.index({ lastActivity: 1 }, { expireAfterSeconds: 3600 }); // 60 min TTL

module.exports = mongoose.model('Room', RoomSchema);
