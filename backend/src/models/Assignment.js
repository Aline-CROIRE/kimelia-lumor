const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  lesson: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lesson', 
    required: true 
  },
  prompt: { 
    type: String, 
    required: true // e.g., "Explain how a REST API works in your own words."
  },
  passingScore: { 
    type: Number, 
    default: 70 
  }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);