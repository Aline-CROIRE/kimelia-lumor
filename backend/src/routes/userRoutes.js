const express = require('express');
const { getUserProfile, enrollInCourse } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and course enrollment
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get logged-in user profile and enrollments
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile and enrolled courses
 *       401:
 *         description: Unauthorized
 */
router.route('/profile').get(protect, getUserProfile);

/**
 * @swagger
 * /api/users/enroll/{courseId}:
 *   post:
 *     summary: Enroll the logged-in user into a specific course
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to enroll in
 *     responses:
 *       201:
 *         description: Successfully enrolled and points awarded
 *       400:
 *         description: Already enrolled
 *       404:
 *         description: Course not found
 */
router.route('/enroll/:courseId').post(protect, enrollInCourse);

module.exports = router;