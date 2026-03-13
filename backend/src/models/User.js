const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  points: { type: Number, default: 0 },
  preferredLanguage: { type: String, enum: ['en', 'fr', 'rw'], default: 'en' },
  streak: { type: Number, default: 0 },
lastLoginDate: { type: Date, default: Date.now },
}, { timestamps: true });

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function (next) {
  // If the password hasn't been modified, skip hashing
  if (!this.isModified('password')) {
    next();
  }
  // Generate a 'salt' and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);