// Import required modules and packages
const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');
const axios = require('axios');
const session = require('express-session');

// Set up session middleware for managing user sessions
app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET, // Session secret (should be stored securely in .env file)
  resave: false,
  saveUninitialized: true
}));

// Define the login route for GitHub authentication
const login = async (req, res) => {
  // Redirect the user to the GitHub login page with the client_id and prompt for consent
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`);
};

// Middleware to check if the user is authenticated
const authenticated = (req, res, next) => {
  try {
    // Check if the user has a valid session token
    if (req.session.token) {
      // If authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // If not authenticated, throw an error to indicate that the user needs to log in
      throw new Error("Please Login to Continue........");
    }
  } catch (err) {
    // If an error occurs during the authentication process, send an error response
    res.status(400).json({ message: err.message });
  }
};

// Export the login and authenticated functions to be used in other parts of the application
module.exports = {
  login,
  authenticated
};
