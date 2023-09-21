const express = require('express');
const helmet = require('helmet'); // for setting security-related HTTP headers
const morgan = require('morgan'); // for logging HTTP requests
const cors = require('cors'); // for handling CORS
const rateLimit = require('express-rate-limit'); // for basic rate limiting
const db = require('./models'); // Importing the Sequelize models

require('dotenv').config();

console.log(process.env.PORT); // Outputs: 3000 (from the .env file)

// Create an instance of an Express app
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Use helmet to set various security headers
app.use(helmet());

// Use morgan for logging
app.use(morgan('combined'));

// Enable CORS with default settings
app.use(cors());

// Apply rate limiting to all routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Sample route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our Express application!' });
});

// Centralized error handling
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Sync the database models and then start the server
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
