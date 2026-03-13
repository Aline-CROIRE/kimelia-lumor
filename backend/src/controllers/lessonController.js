const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

// @desc    Get all lessons for a specific course
// @route   GET /api/courses/:courseId/lessons
// @access  Private (Only enrolled users or admins should see full content, but we'll keep it simple: Private)
const getLessonsByCourse = async (req, res) => {
  try {
    // Find lessons and sort them by their 'order' number
    const lessons = await Lesson.find({ course: req.params.courseId }).sort({ order: 1 });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new lesson (Admin Only)
// @route   POST /api/courses/:courseId/lessons
// @access  Private/Admin
const createLesson = async (req, res) => {
  try {
    const { title, description, videoUrl, order } = req.body;
    const courseId = req.params.courseId;

    const courseExists = await Course.findById(courseId);
    if (!courseExists) return res.status(404).json({ message: 'Course not found' });

    const lesson = await Lesson.create({
      course: courseId,
      title,
      description,
      videoUrl,
      order
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Mark a lesson as completed & Update Progress
// @route   POST /api/lessons/:lessonId/complete
// @access  Private
const markLessonComplete = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    // Find user's enrollment for this course
    const enrollment = await Enrollment.findOne({ user: req.user._id, course: lesson.course });
    if (!enrollment) return res.status(403).json({ message: 'You are not enrolled in this course' });

    // Check if already completed
    if (enrollment.completedLessons.includes(lesson._id)) {
      return res.status(400).json({ message: 'Lesson already marked as complete' });
    }

    // Add lesson to completed array
    enrollment.completedLessons.push(lesson._id);

    // Calculate new progress
    const totalLessons = await Lesson.countDocuments({ course: lesson.course });
    const progressPercentage = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
    
    enrollment.progress = progressPercentage;

    let message = 'Lesson completed successfully! +5 points.';
    let pointsAwarded = 5; // Standard points for a lesson

    // If 100%, mark course as completed and give a massive bonus!
    if (progressPercentage >= 100) {
      enrollment.isCompleted = true;
      message = 'Course Completed! +50 bonus points!';
      pointsAwarded += 50;
    }

    await enrollment.save();

    // Give user their points
    const user = await User.findById(req.user._id);
    user.points += pointsAwarded;
    await user.save();

    res.status(200).json({
      message,
      progress: enrollment.progress,
      isCompleted: enrollment.isCompleted,
      newTotalPoints: user.points
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getLessonsByCourse, createLesson, markLessonComplete };