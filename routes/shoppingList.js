const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shoppingList');

// GET all shopping lists
router.get('/', shopController.getAllShoppingLists);

// GET a specific shopping list by ID
router.get('/:id', shopController.getShoppingListById);

// POST request to create a new shopping list
router.post('/', shopController.createShoppingList);

// Delete a shopping list by ID
router.delete('/:id', shopController.deleteShoppingList);

// Update a shopping list by ID
router.put('/:id', shopController.putShoppingList);

module.exports = router;
