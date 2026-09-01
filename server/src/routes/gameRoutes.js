const router = require('express').Router();
const requireAuth = require('../middleware/auth');
const { getState, getHistory, submitGuess } = require('../controllers/gameController');

router.get('/:roomCode/state', requireAuth, getState);
router.get('/:roomCode/history', requireAuth, getHistory);
router.post('/:roomCode/guess', requireAuth, submitGuess);

module.exports = router;
