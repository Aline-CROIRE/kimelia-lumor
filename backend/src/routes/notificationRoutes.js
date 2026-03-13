const express = require('express');
const { getUserNotifications, markNotificationRead } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: In-app user notifications
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get logged-in user's notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.route('/').get(protect, getUserNotifications);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.route('/:id/read').put(protect, markNotificationRead);

module.exports = router;