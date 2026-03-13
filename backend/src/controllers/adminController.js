const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const AILog = require('../models/AILog');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // We run these queries simultaneously to make the API lightning fast!
    const [totalUsers, totalCourses, totalEnrollments, totalAIQueries] = await Promise.all([
      User.countDocuments({ role: 'user' }), // Only count normal users
      Course.countDocuments(),
      Enrollment.countDocuments(),
      AILog.countDocuments()
    ]);

    // Optional: Get top 5 courses by enrollment
    const topCourses = await Enrollment.aggregate([
      { $group: { _id: '$course', students: { $sum: 1 } } },
      { $sort: { students: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      metrics: {
        totalUsers,
        totalCourses,
        totalEnrollments,
        totalAIQueries
      },
      topCourses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getDashboardStats };