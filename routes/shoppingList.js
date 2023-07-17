const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shoppingList');
const oauthController = require('../controllers/oauth');

// GET all shopping lists
router.get('/', shopController.getAllShoppingLists);

// GET a specific shopping list by ID
router.get('/:id', shopController.getShoppingListById);

// POST request to create a new shopping list
router.post('/', shopController.createShoppingList);

// Delete a shopping list by ID
router.delete('/:id', shopController.deleteShoppingList);
// POST request to create a new shop list
router.post('/', oauthController.authenticated, shopController.createShoppingList);

//Delete Shopping List by ID
router.delete('/:id', oauthController.authenticated, shopController.deleteShoppingList);

// Update a shopping list by ID
router.put('/:id', oauthController.authenticated, shopController.putShoppingList);

module.exports = router;
