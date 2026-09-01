const router = require('express').Router();
const requireAuth = require('../middleware/auth');
const { create, join, getRoom, closeRoom, setRounds } = require('../controllers/roomController');

router.post('/create', requireAuth, create);
router.post('/join', requireAuth, join);
router.get('/:code', requireAuth, getRoom);
router.delete('/:code', requireAuth, closeRoom);
router.put('/:code/rounds', requireAuth, setRounds);
// NOTE: /:code/start is intentionally handled via Socket.io (room:start event)
// so all players receive the game:started broadcast in real time.

module.exports = router;
