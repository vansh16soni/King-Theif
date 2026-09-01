const router = require('express').Router();
const requireAdmin = require('../middleware/adminAuth');
const {
  adminLogin,
  getPlayers,
  getPlayerById,
  getOverviewStats,
  deletePlayer
} = require('../controllers/adminController');

// Public admin login endpoint
router.post('/login', adminLogin);

// Protected admin endpoints
router.get('/overview', requireAdmin, getOverviewStats);
router.get('/players', requireAdmin, getPlayers);
router.get('/players/:id', requireAdmin, getPlayerById);
router.delete('/players/:id', requireAdmin, deletePlayer);

module.exports = router;
