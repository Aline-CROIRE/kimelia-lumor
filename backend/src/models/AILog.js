const mongoose = require('mongoose');

const aiLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  query: { type: String, required: true },
  response: { type: String, required: true },
  language: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AILog', aiLogSchema);