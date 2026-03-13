const express = require('express');
const { createAssignment, submitAndGradeAssignment } = require('../controllers/assignmentController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: AI-Graded Open-Ended Assignments
 */

/**
 * @swagger
 * /api/lessons/{lessonId}/assignment:
 *   post:
 *     summary: Create an assignment for a lesson (Admin only)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
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
 *               prompt:
 *                 type: string
 *               passingScore:
 *                 type: number
 */
router.route('/lessons/:lessonId/assignment').post(protect, admin, createAssignment);

/**
 * @swagger
 * /api/assignments/{assignmentId}/submit:
 *   post:
 *     summary: Submit an assignment and have AI grade it instantly
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
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
 *               content:
 *                 type: string
 *               language:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI grade and feedback
 */
router.route('/assignments/:assignmentId/submit').post(protect, submitAndGradeAssignment);

module.exports = router;