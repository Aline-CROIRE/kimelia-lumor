const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Will be hashed later
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  points: { type: Number, default: 0 }, // For gamification
  preferredLanguage: { type: String, enum: ['en', 'fr', 'rw'], default: 'en' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);