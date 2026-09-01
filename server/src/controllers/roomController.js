const Room = require('../models/Room');
const { createRoom, joinRoom } = require('../services/roomService');

async function create(req, res, next) {
  try {
    const { totalRounds } = req.body;
    const room = await createRoom(req.userId, req.username, totalRounds);
    res.status(201).json({ room });
  } catch (err) { next(err); }
}

async function join(req, res, next) {
  try {
    const { roomCode } = req.body;
    const room = await joinRoom(roomCode, req.userId, req.username);
    res.json({ room });
  } catch (err) { next(err); }
}

async function getRoom(req, res, next) {
  try {
    const room = await Room.findOne({ roomCode: req.params.code });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ room });
  } catch (err) { next(err); }
}

async function closeRoom(req, res, next) {
  try {
    const room = await Room.findOne({ roomCode: req.params.code });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (String(room.hostId) !== String(req.userId)) return res.status(403).json({ error: 'Only host can close room' });
    await Room.deleteOne({ roomCode: req.params.code });
    res.json({ success: true });
  } catch (err) { next(err); }
}

async function setRounds(req, res, next) {
  try {
    const { totalRounds } = req.body;
    const room = await Room.findOne({ roomCode: req.params.code });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (String(room.hostId) !== String(req.userId)) return res.status(403).json({ error: 'Only host can set rounds' });
    if (totalRounds < 10 || totalRounds > 15) return res.status(400).json({ error: 'Rounds must be between 10 and 15' });
    room.totalRounds = totalRounds;
    await room.save();
    res.json({ room });
  } catch (err) { next(err); }
}

module.exports = { create, join, getRoom, closeRoom, setRounds };
