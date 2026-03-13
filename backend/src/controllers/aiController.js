const { GoogleGenerativeAI } = require('@google/generative-ai');
const AILog = require('../models/AILog');

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Ask the AI Study Assistant a question
// @route   POST /api/ai/ask
// @access  Private
const askAIAssistant = async (req, res) => {
  try {
    const { question, language } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const preferredLang = language || req.user?.preferredLanguage || 'en';

    // 1. Choose the Gemini Model (Flash is the fastest and best for free tier)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. Build the Premium Prompt
    const prompt = `
      You are the Kimelia Lumora AI Study Assistant. 
      You are a highly intelligent, encouraging, and premium educational mentor. 
      Answer the user's question clearly, concisely, and accurately. 
      You MUST respond in this language code: ${preferredLang} (en=English, fr=French, rw=Kinyarwanda).
      
      User's Question: "${question}"
    `;

    // 3. Call Google Gemini
    const result = await model.generateContent(prompt);
    const aiAnswer = result.response.text();

    // 4. Log the interaction in MongoDB for Analytics
    const aiLog = await AILog.create({
      userId: req.user._id,
      query: question,
      response: aiAnswer,
      language: preferredLang,
    });

    // 5. Send response to the user
    res.status(200).json({
      answer: aiAnswer,
      logId: aiLog._id,
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      message: 'Failed to generate AI response', 
      error: error.message 
    });
  }
};

module.exports = { askAIAssistant };