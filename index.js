const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const {verifyuser}=require('./utils/middelware');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Middleware
app.use(
  cors({
    origin: ['https://freshly-eight.vercel.app','http://localhost:5173'],
    credentials: true, // Allow cookies
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// Routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

// Database Connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
