// routes/authRoutes.js

const express = require('express');
const router = express.Router();

const loginController = require('../controllers/register');

// Login route
router.post('/login', loginController.loginUser);

// Logout route
router.post('/logout', loginController.logoutUser);

module.exports = router;
