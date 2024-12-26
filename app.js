const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/db');
const indexRouter = require('./routes/index.routes')
// Configure environment variables
dotenv.config();

// Connect to database
connectToDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// User routes
app.use('/user', userRouter);
app.use('/',indexRouter)

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
