const rateLimit = require('express-rate-limit');

const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each user to 50 AI queries per hour
  message: 'You have reached your AI limit. Please wait an hour.'
});

module.exports = aiLimiter;