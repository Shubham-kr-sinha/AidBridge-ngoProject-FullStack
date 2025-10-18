// Load environment variables from the .env file
require('dotenv').config();

const mysql = require('mysql2');
const fs = require('fs');

module.exports = {
  // Configuration for your local development machine
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  // Configuration for your deployed application on Vercel
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // This is CRITICAL for connecting to TiDB Cloud or any secure cloud database
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true
        ca: fs.readFileSync(process.env.CA)
      }
    }
  }
};
