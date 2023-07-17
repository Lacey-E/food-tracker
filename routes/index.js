const express = require('express');
const router = express.Router();

// Include the 'swagger' router for handling swagger-related routes
router.use('/api-docs', require('./swagger'));

// Include the 'users' router for handling user-related routes
router.use('/users', require('./users'));

// Include the 'inventory' router for handling inventory-related routes
router.use('/inventory', require('./inventory'));

// Include the 'recipes' router for handling recipe-related routes
router.use('/recipes', require('./recipes'));

// Include the 'shoppingList' router for handling shopping list-related routes
router.use('/shoppingList', require('./shoppingList'));

// Include the 'dataGenerator' router for handling data generator-related routes
router.use('/dataGenerator', require('./dataGenerator'));

// Include the 'oauth' router for handling login and callback routes
router.use('/auth', require('./auth'));



module.exports = router;
