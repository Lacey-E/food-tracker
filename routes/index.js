const express = require('express');
const router = express.Router();

// Include the 'users' router for handling user-related routes
router.use('/users', require('./users'));

// Include the 'inventory' router for handling inventory-related routes
router.use('/inventory', require('./inventory'));

// Include the 'recipes' router for handling recipe-related routes
router.use('/recipes', require('./recipes'));

router.use('/list', require('./shoppingList'));

module.exports = router;
