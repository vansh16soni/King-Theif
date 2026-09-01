const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Room = require('../models/Room');
const ChatMessage = require('../models/ChatMessage');
const { rooms } = require('../socket/gameState');
const { getActiveUserStatus, disconnectUser } = require('../socket');

async function adminLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!username || !password) {
      return res.status(400).json({ error: 'Admin username and password required' });
    }

    if (username !== expectedUsername || password !== expectedPassword) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'rmcs_admin_fallback_secret';
    const token = jwt.sign(
      { isAdmin: true, username: expectedUsername },
      secret,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: { username: expectedUsername, role: 'Super Admin' }
    });
  } catch (err) {
    next(err);
  }
}

async function getPlayers(req, res, next) {
  try {
    const { q, sort = 'totalPoints', order = 'desc' } = req.query;
    const filter = {};
    if (q && q.trim()) {
      filter.username = { $regex: q.trim(), $options: 'i' };
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortField = ['totalPoints', 'gamesPlayed', 'gamesWon', 'totalRoundsPlayed', 'createdAt', 'lastActive'].includes(sort)
      ? sort
      : 'totalPoints';

    const users = await User.find(filter)
      .select('-password')
      .sort({ [sortField]: sortOrder })
      .lean();

    const players = users.map(user => {
      const winRate = user.gamesPlayed > 0
        ? Math.round((user.gamesWon / user.gamesPlayed) * 100)
        : 0;
      const totalGuesses = (user.stats?.correctGuesses || 0) + (user.stats?.wrongGuesses || 0);
      const guessAccuracy = totalGuesses > 0
        ? Math.round(((user.stats?.correctGuesses || 0) / totalGuesses) * 100)
        : 0;

      const userStatus = getActiveUserStatus(user._id);

      return {
        ...user,
        winRate,
        guessAccuracy,
        onlineStatus: userStatus
      };
    });

    res.json({ players, total: players.length });
  } catch (err) {
    next(err);
  }
}

async function getPlayerById(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) return res.status(404).json({ error: 'Player not found' });

    const recentRooms = await Room.find({ 'players.userId': user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const winRate = user.gamesPlayed > 0
      ? Math.round((user.gamesWon / user.gamesPlayed) * 100)
      : 0;

    const userStatus = getActiveUserStatus(user._id);

    res.json({
      player: {
        ...user,
        winRate,
        onlineStatus: userStatus
      },
      recentRooms
    });
  } catch (err) {
    next(err);
  }
}

async function getOverviewStats(req, res, next) {
  try {
    const totalUsers = await User.countDocuments();
    const aggregateResult = await User.aggregate([
      {
        $group: {
          _id: null,
          totalPoints: { $sum: '$totalPoints' },
          totalGames: { $sum: '$gamesPlayed' },
          totalRounds: { $sum: '$totalRoundsPlayed' }
        }
      }
    ]);

    const stats = aggregateResult[0] || { totalPoints: 0, totalGames: 0, totalRounds: 0 };
    const totalRooms = await Room.countDocuments();

    res.json({
      totalUsers,
      totalPoints: stats.totalPoints,
      totalGames: stats.totalGames,
      totalRounds: stats.totalRounds,
      totalRooms
    });
  } catch (err) {
    next(err);
  }
}

async function deletePlayer(req, res, next) {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ error: 'Player ID is required' });

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'Player not found or already deleted' });
    }

    // Disconnect active socket if currently online
    try {
      disconnectUser(userId);
    } catch (e) {
      console.error('Socket disconnect error on user deletion:', e.message);
    }

    // Clean up associated chat messages
    try {
      await ChatMessage.deleteMany({ senderId: userId });
    } catch (e) {
      console.error('Error cleaning up chat messages:', e.message);
    }

    // Remove player from any waiting rooms in MongoDB
    try {
      await Room.updateMany(
        { status: 'waiting', 'players.userId': userId },
        { $pull: { players: { userId } } }
      );
    } catch (e) {
      console.error('Error removing player from waiting rooms:', e.message);
    }

    // Remove player from any active in-memory rooms safely
    try {
      for (const [roomCode, roomData] of rooms.entries()) {
        if (roomData && Array.isArray(roomData.players)) {
          roomData.players = roomData.players.filter(p => String(p.userId) !== String(userId));
        }
      }
    } catch (e) {
      console.error('Error cleaning in-memory room:', e.message);
    }

    res.json({
      success: true,
      message: `Player "${user.username}" was permanently deleted.`
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  adminLogin,
  getPlayers,
  getPlayerById,
  getOverviewStats,
  deletePlayer
};
