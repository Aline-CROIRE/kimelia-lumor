const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // e.g., ["A", "B", "C", "D"]
  correctAnswer: { type: String, required: true }, // Must match one of the options perfectly
  explanation: { type: String } // Shown after they answer
});

const quizSchema = new mongoose.Schema({
  lesson: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lesson', 
    required: true,
    unique: true // One quiz per lesson
  },
  questions: [questionSchema],
  passingScore: { type: Number, default: 80 } // Percentage needed to pass
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);