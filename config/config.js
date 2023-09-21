// config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    // ... other options
  },
  // You can also add configurations for test and production environments
  test: {
    // ... test database configurations
  },
  production: {
    // ... production database configurations
  },
};
