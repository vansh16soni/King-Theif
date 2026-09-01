const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true, minlength: 3, maxlength: 20 },
  password: { type: String, required: true }, // bcrypt hashed
  totalPoints: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  totalRoundsPlayed: { type: Number, default: 0 },
  stats: {
    rajaCount: { type: Number, default: 0 },
    mantriCount: { type: Number, default: 0 },
    sipahiCount: { type: Number, default: 0 },
    chorCount: { type: Number, default: 0 },
    correctGuesses: { type: Number, default: 0 },
    wrongGuesses: { type: Number, default: 0 }
  },
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
