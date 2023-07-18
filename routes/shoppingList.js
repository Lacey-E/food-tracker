const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shoppingList');
const {ensureAuth, ensureGuest} = require('../middlewares/oauth')

// GET all shopping lists
router.get('/', shopController.getAllShoppingLists);

//GET a specific shopping list by ID
router.get('/:id', shopController.getOneShoppingList);

// POST request to create a new shop list
router.post('/', shopController.createShoppingList);

//Delete Shopping List by ID
router.delete('/:id', shopController.deleteShoppingList);

// Update a shopping list by ID
router.put('/:id', shopController.updateShoppingList);


module.exports = router;