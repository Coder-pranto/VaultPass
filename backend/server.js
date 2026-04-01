const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 5000;

dotenv.config({ debug: true });

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// routes
app.use('/api/auth', authRoutes);

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
