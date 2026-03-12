require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Allows Flutter app to communicate with API
app.use(helmet()); // Secures HTTP headers
app.use(morgan('dev')); // Logs requests to the console

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Kimelia Lumora API is running flawlessly! 🚀' 
  });
});

// Routes
app.use('/api/auth', authRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});