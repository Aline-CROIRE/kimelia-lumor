require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// --- SWAGGER IMPORTS ---
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();

// Connect to Database
connectDB();

// --- SECURITY MIDDLEWARE ---
app.use(helmet()); 
app.use(express.json({ limit: '10kb' })); 
app.use(cors());
app.use(morgan('dev'));

// --- SWAGGER ROUTE ---
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api', lessonRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', quizRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Kimelia Lumora API is operational!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/api/docs`);
});