const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shoppingList');

// GET all shopping lists
router.get('/', shopController.getAllShoppingLists);

//GET a specific shopping list by ID
router.get('/:id', shopController.getShoppingListById);

// POST request to create a new shop list
router.post('/', shopController.createShoppingList);

// Export the router object to be used by other modules
module.exports = router;