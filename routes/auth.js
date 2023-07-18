const express = require('express');
const router = express.Router();
const passport = require('passport');

// Authenticate with your desired strategy
router.get('/', passport.authenticate('oauth2'));

// Authentication callback URL
router.get(
  '/callback',
  passport.authenticate('oauth2', {
    session: false,
    successRedirect: '/api-docs', // Redirect to the protected route upon successful authentication
    failureRedirect: '/auth', // Redirect to the login page upon authentication failure
  })
);

module.exports = router;
