const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Get logged in user profile & their enrolled courses
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    // Find all courses this user is enrolled in
    const enrollments = await Enrollment.find({ user: req.user._id }).populate('course', 'title thumbnailUrl');

    if (user) {
      res.json({
        user,
        enrollments
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Enroll in a course
// @route   POST /api/users/enroll/:courseId
// @access  Private
const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // 1. Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // 2. Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ user: req.user._id, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // 3. Create Enrollment
    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
      progress: 0,
      isCompleted: false
    });

    // 4. Gamification: Award 10 points for starting a new course!
    const user = await User.findById(req.user._id);
    user.points += 10;
    await user.save();

    res.status(201).json({
      message: 'Successfully enrolled in course! You earned 10 points.',
      enrollment,
      newTotalPoints: user.points
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getUserProfile, enrollInCourse };