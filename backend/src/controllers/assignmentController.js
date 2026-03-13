const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Create an assignment for a lesson (Admin)
// @route   POST /api/lessons/:lessonId/assignment
// @access  Private/Admin
const createAssignment = async (req, res) => {
  try {
    const { prompt, passingScore } = req.body;
    const assignment = await Assignment.create({
      lesson: req.params.lessonId,
      prompt,
      passingScore
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Submit an assignment & Get AI Grade
// @route   POST /api/assignments/:assignmentId/submit
// @access  Private
const submitAndGradeAssignment = async (req, res) => {
  try {
    const { content, language } = req.body;
    const assignmentId = req.params.assignmentId;
    const preferredLang = language || req.user?.preferredLanguage || 'en';

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    // 1. Initialize AI Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. Build the AI Prompt requesting strict JSON output
    const promptText = `
      You are the Kimelia Lumora AI Professor. 
      Task: Grade the student's submission based on the assignment prompt.
      
      Assignment Prompt: "${assignment.prompt}"
      Student Submission: "${content}"
      
      Instructions:
      1. Evaluate the submission for accuracy, depth, and clarity.
      2. Provide a score from 0 to 100.
      3. Provide constructive feedback in this language: ${preferredLang} (en, fr, rw).
      4. MUST RESPOND ONLY IN VALID JSON FORMAT EXACTLY LIKE THIS:
      {
        "score": 85,
        "feedback": "Excellent explanation, but you missed..."
      }
    `;

    // 3. Call AI
    const result = await model.generateContent(promptText);
    const aiResponseText = result.response.text();
    
    // 4. Clean the AI response (Sometimes AI wraps JSON in ```json blocks)
    const cleanedJsonString = aiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const aiEvaluation = JSON.parse(cleanedJsonString);

    const isPassed = aiEvaluation.score >= assignment.passingScore;

    // 5. Save the submission
    const submission = await AssignmentSubmission.create({
      assignment: assignmentId,
      user: req.user._id,
      content,
      score: aiEvaluation.score,
      aiFeedback: aiEvaluation.feedback,
      isPassed
    });

    // 6. Gamification Points
    if (isPassed) {
      const user = await User.findById(req.user._id);
      user.points += 30; // 30 points for passing an open-ended assignment
      await user.save();
    }

    res.status(200).json(submission);

  } catch (error) {
    console.error('AI Grading Error:', error);
    res.status(500).json({ message: 'Failed to grade assignment', error: error.message });
  }
};

module.exports = { createAssignment, submitAndGradeAssignment };