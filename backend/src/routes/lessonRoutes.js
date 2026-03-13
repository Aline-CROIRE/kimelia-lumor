const express = require('express');
const { getLessonsByCourse, createLesson, markLessonComplete } = require('../controllers/lessonController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson management and progress tracking
 */

/**
 * @swagger
 * /api/courses/{courseId}/lessons:
 *   get:
 *     summary: Get all lessons for a specific course
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *   post:
 *     summary: Create a new lesson (Admin only)
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               order:
 *                 type: number
 */
router.route('/courses/:courseId/lessons')
  .get(protect, getLessonsByCourse)
  .post(protect, admin, createLesson);

/**
 * @swagger
 * /api/lessons/{lessonId}/complete:
 *   post:
 *     summary: Mark a lesson as complete and update course progress
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson marked as complete, points awarded
 */
router.route('/lessons/:lessonId/complete')
  .post(protect, markLessonComplete);

module.exports = router;