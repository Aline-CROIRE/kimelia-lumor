require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// --- SWAGGER IMPORTS ---
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const authRoutes = require('./routes/authRoutes');

const courseRoutes = require('./routes/courseRoutes');
const aiRoutes = require('./routes/aiRoutes')
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');




const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// --- SWAGGER ROUTE ---
// This creates the /api/docs endpoint where your Swagger UI will live
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api', lessonRoutes);


app.use('/api', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/api/docs`); // <-- Add this log
});