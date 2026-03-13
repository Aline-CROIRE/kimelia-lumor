const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  progress: { 
    type: Number, 
    default: 0, // 0 to 100 percent
    min: 0,
    max: 100
  },
  isCompleted: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// Ensure a user can only enroll in a specific course once
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);