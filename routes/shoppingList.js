const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shoppingList');
const oauthcontroller = require('./oauth')

// GET all shopping lists
router.get('/', shopController.getAllShoppingLists);

//GET a specific shopping list by ID
router.get('/:id', shopController.getShoppingListById);

// POST request to create a new shop list
router.post('/', oauthcontroller.authenticated, shopController.createShoppingList);

//Delete Shopping List by ID
router.delete('/:id', oauthcontroller.authenticated, shopController.deleteShoppingList);

// Update a shopping list by ID
router.put('/:id', oauthcontroller.authenticated, shopController.putShoppingList);


module.exports = router;