const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
  return jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

async function register(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    if (username.length < 3) return res.status(400).json({ error: 'Username must be at least 3 characters' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: 'Username already taken' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid username or password' });

    user.lastActive = new Date();
    await user.save();

    const token = signToken(user);
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) { next(err); }
}

async function me(req, res, next) {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { ...user.toObject(), id: user._id } });
  } catch (err) { next(err); }
}

async function updateProfile(req, res, next) {
  try {
    const updates = {};
    // Only allow safe fields to be updated directly by the client
    if (req.body.username) updates.username = req.body.username;
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
    res.json({ user });
  } catch (err) { next(err); }
}

module.exports = { register, login, me, updateProfile };
