const Room = require('../models/Room');

async function generateRoomCode() {
  let code, exists = true;
  while (exists) {
    code = String(Math.floor(1000 + Math.random() * 9000)); // 1000-9999
    exists = await Room.exists({ roomCode: code, status: { $ne: 'completed' } });
  }
  return code;
}

module.exports = { generateRoomCode };
