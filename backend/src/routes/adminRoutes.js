const express = require('express');
const { getDashboardStats } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin dashboard and platform analytics
 */

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get platform statistics (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.route('/stats').get(protect, admin, getDashboardStats);

module.exports = router;