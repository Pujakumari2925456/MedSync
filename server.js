const express = require('express');
const colors = require('colors');
const morgan = require('morgan'); // ✅ fixed typo from 'moragan' to 'morgan'
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

// Define port
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${port}`.bgCyan.white // ✅ fixed spelling and used fallback port variable
  );
});
