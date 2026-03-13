const Quiz = require('../models/Quiz');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Create or update a quiz for a lesson (Admin)
// @route   POST /api/lessons/:lessonId/quiz
// @access  Private/Admin
const createQuiz = async (req, res) => {
  try {
    const { questions, passingScore } = req.body;
    const lessonId = req.params.lessonId;

    let quiz = await Quiz.findOne({ lesson: lessonId });

    if (quiz) {
      // Update existing
      quiz.questions = questions;
      quiz.passingScore = passingScore || quiz.passingScore;
      await quiz.save();
    } else {
      // Create new
      quiz = await Quiz.create({
        lesson: lessonId,
        questions,
        passingScore
      });
    }

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get quiz for a lesson
// @route   GET /api/lessons/:lessonId/quiz
// @access  Private
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ lesson: req.params.lessonId });
    if (!quiz) return res.status(404).json({ message: 'No quiz found for this lesson' });
    
    // We send the quiz WITHOUT the correct answers so users can't cheat!
    const secureQuiz = {
      _id: quiz._id,
      lesson: quiz.lesson,
      passingScore: quiz.passingScore,
      questions: quiz.questions.map(q => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options
      }))
    };

    res.status(200).json(secureQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Submit Quiz & Calculate Score
// @route   POST /api/quizzes/:quizId/submit
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // e.g., [{ questionId: "...", selectedOption: "..." }]
    const quiz = await Quiz.findById(req.params.quizId);
    
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let correctCount = 0;
    const results = [];

    quiz.questions.forEach(q => {
      // Find user's answer for this question
      const userAnswer = answers.find(a => a.questionId === q._id.toString());
      const isCorrect = userAnswer && userAnswer.selectedOption === q.correctAnswer;
      
      if (isCorrect) correctCount++;

      results.push({
        questionId: q._id,
        questionText: q.questionText,
        isCorrect,
        correctAnswer: q.correctAnswer, // Reveal answer now
        explanation: q.explanation
      });
    });

    const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePercentage >= quiz.passingScore;

    // Gamification: Give points if passed!
    let pointsAwarded = 0;
    if (passed) {
      pointsAwarded = 20; // 20 points for passing a quiz
      const user = await User.findById(req.user._id);
      user.points += pointsAwarded;
      await user.save();
    }

    res.status(200).json({
      score: scorePercentage,
      passed,
      pointsAwarded,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get AI Hint for a specific question
// @route   POST /api/quizzes/hint
// @access  Private
const getQuizHint = async (req, res) => {
  try {
    const { questionText, options, language } = req.body;
    const preferredLang = language || req.user?.preferredLanguage || 'en';

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are the Kimelia Lumora AI Study Assistant. A student is taking a quiz and needs a hint.
      Question: "${questionText}"
      Options: ${options.join(', ')}
      
      INSTRUCTIONS:
      1. Provide a helpful educational hint to guide them.
      2. DO NOT tell them the exact correct answer. 
      3. Respond strictly in this language code: ${preferredLang} (en, fr, rw).
    `;

    const result = await model.generateContent(prompt);
    
    res.status(200).json({ hint: result.response.text() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate AI hint', error: error.message });
  }
};

module.exports = { createQuiz, getQuiz, submitQuiz, getQuizHint };