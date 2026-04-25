require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'MERN Item Manager API is running',
    endpoints: {
      items: '/api/items'
    }
  });
});

// API routes
app.use('/api/items', itemRoutes);

// MongoDB connection + server start
if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_atlas_connection_string') {
  console.error('ERROR: Please set a valid MONGODB_URI inside backend/.env');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
