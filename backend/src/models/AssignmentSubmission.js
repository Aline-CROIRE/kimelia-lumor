const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }, // The user's typed answer
  score: { type: Number },
  aiFeedback: { type: String },
  isPassed: { type: Boolean }
}, { timestamps: true });

module.exports = mongoose.model('AssignmentSubmission', submissionSchema);