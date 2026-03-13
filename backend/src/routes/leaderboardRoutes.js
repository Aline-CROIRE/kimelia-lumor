const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get top 10 users
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 */
router.route('/').get(protect, getLeaderboard);

module.exports = router;