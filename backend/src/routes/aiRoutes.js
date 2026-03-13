const express = require('express');
const { askAIAssistant } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI Assistant
 *   description: AI-powered study help and logging
 */

/**
 * @swagger
 * /api/ai/ask:
 *   post:
 *     summary: Ask a question to the Kimelia Lumora AI Assistant
 *     tags: [AI Assistant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 description: The study question
 *               language:
 *                 type: string
 *                 description: Language code (en, fr, rw)
 *                 default: en
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *       401:
 *         description: Unauthorized (Requires JWT token)
 */
router.route('/ask').post(protect, askAIAssistant);

module.exports = router;