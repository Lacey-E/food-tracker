const express = require('express');
const router = express.Router();

// Include the 'users' router for handling user-related routes
router.use('/users', require('./users'));

// Include the 'inventory' router for handling inventory-related routes
router.use('/inventory', require('./inventory'));

// Include the 'recipes' router for handling recipe-related routes
router.use('/recipes', require('./recipes'));

// Include the 'shoppingList' router for handling shopping list-related routes
router.use('/shoppingList', require('./shoppingList'));

// Include the 'dataGenerator' router for handling data generation routes
router.use('/dataGenerator', require('./dataGenerator'));

module.exports = router;
