const User = require('../models/User');

// @desc    Get top 10 leaderboard
// @route   GET /api/leaderboard
// @access  Private
const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({})
      .sort({ points: -1, streak: -1 }) // Sort by points then streak
      .limit(10)
      .select('name points streak');
      
    res.status(200).json(topUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getLeaderboard };