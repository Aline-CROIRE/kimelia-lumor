const express = require('express');
const { createQuiz, getQuiz, submitQuiz, getQuizHint } = require('../controllers/quizController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Interactive quizzes and AI hints
 */

/**
 * @swagger
 * /api/lessons/{lessonId}/quiz:
 *   get:
 *     summary: Get a secure quiz (without correct answers) for a lesson
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *   post:
 *     summary: Create or update a quiz for a lesson (Admin only)
 *     tags: [Quizzes]
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
 *               passingScore:
 *                 type: number
 *                 default: 80
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correctAnswer:
 *                       type: string
 *                     explanation:
 *                       type: string
 */
router.route('/lessons/:lessonId/quiz')
  .get(protect, getQuiz)
  .post(protect, admin, createQuiz);

/**
 * @swagger
 * /api/quizzes/{quizId}/submit:
 *   post:
 *     summary: Submit a quiz and get score/points
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
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
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     selectedOption:
 *                       type: string
 */
router.route('/quizzes/:quizId/submit').post(protect, submitQuiz);

/**
 * @swagger
 * /api/quizzes/hint:
 *   post:
 *     summary: Ask AI for a hint on a quiz question
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               language:
 *                 type: string
 */
router.route('/quizzes/hint').post(protect, getQuizHint);

module.exports = router;