const Enrollment = require('../models/Enrollment');
const crypto = require('crypto');

// @desc    Get/Generate Certificate
// @route   GET /api/certificates/:enrollmentId
// @access  Private
const getCertificate = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.enrollmentId)
      .populate('user', 'name')
      .populate('course', 'title');

    if (!enrollment || !enrollment.isCompleted) {
      return res.status(400).json({ message: 'Course not completed yet!' });
    }

    // Generate a unique hash for this certificate
    const certHash = crypto.createHash('sha256')
      .update(enrollment._id.toString() + process.env.JWT_SECRET)
      .digest('hex').substring(0, 16).toUpperCase();

    res.status(200).json({
      studentName: enrollment.user.name,
      courseTitle: enrollment.course.title,
      certificateId: certHash,
      dateIssued: enrollment.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getCertificate };