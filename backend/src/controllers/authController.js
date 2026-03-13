const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Register new user
const registerUser = async (req, res) => {
  const { name, email, password, preferredLanguage } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password, preferredLanguage });
  if (user) {
    res.status(201).json({
      _id: user._id, name: user.name, email: user.email, 
      token: generateToken(user._id), points: user.points
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Login user + Streak Logic
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Streak Logic
    const now = new Date();
    const lastLogin = new Date(user.lastLoginDate);
    const diffDays = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      user.streak += 1;
    } else if (diffDays > 1) {
      user.streak = 1;
    }
    user.lastLoginDate = now;
    await user.save();

    res.json({
      _id: user._id, name: user.name, email: user.email,
      token: generateToken(user._id), points: user.points, streak: user.streak
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Update User Profile (Name/Language)
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.preferredLanguage = req.body.preferredLanguage || user.preferredLanguage;
    if (req.body.password) user.password = req.body.password;
    
    const updatedUser = await user.save();
    res.json({ _id: updatedUser._id, name: updatedUser.name, lang: updatedUser.preferredLanguage });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile };