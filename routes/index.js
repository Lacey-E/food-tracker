const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));

// Include the 'inventory' router for handling inventory-related routes
router.use('/inventory', require('./inventory'));

// Include the 'recipes' router for handling recipe-related routes
router.use('/recipes', require('./recipes'));

router.use('/shoppingList', require('./shoppingList'));

router.use('/dataGenerator', require('./dataGenerator'))

// Include the 'swagger' router for handling the swagger documentation
router.use('/', require('./swagger'))

module.exports = router;
