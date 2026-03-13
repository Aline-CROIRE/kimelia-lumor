const express = require('express');
const { askAIAssistant } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');
const rateLimit = require('express-rate-limit'); // NOW THIS WILL WORK

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 50, 
  message: { message: 'AI limit reached. Please try again in an hour.' },
});

router.route('/ask').post(protect, aiLimiter, askAIAssistant);

module.exports = router;