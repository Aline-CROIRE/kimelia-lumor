const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String }, // Can be a YouTube link or AWS S3 URL
  order: { type: Number, required: true } // e.g., Lesson 1, Lesson 2
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);