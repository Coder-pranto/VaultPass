require('dotenv').config({ quiet: true });
require('colors');

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const colors = require('colors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://vaultpass.onrender.com'
        : 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

// routes
app.use('/api/auth', authRoutes);


// PRODUCTION SETUP
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});


// global error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    status,
    message,
  });
});

// start server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.rainbow.bgWhite.bold);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
})();
