const Review = require('../models/Review'); // Create a Review Model (course, user, rating, comment)
const Course = require('../models/Course');

const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const review = await Review.create({ 
    course: req.params.courseId, 
    user: req.user._id, 
    rating, 
    comment 
  });
  // Update Course average rating here...
  res.status(201).json(review);
};