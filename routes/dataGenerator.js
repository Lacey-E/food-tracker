const express = require('express');
const router = express.Router();
const dataController = require('../controllers/randomiz');

// Route for generating user profiles
router.post('/userProfiles', (req, res) => {
  const { numProfiles } = req.body;
  dataController.generateUserProfiles(numProfiles);
  res.send('User profiles generation started.');
});

// Route for generating inventory items
router.post('/inventoryItems', (req, res) => {
  const { numItems } = req.body;
  dataController.generateInventoryItems(numItems);
  res.send('Inventory items generation started.');
});

// Route for generating recipes
router.post('/recipes', (req, res) => {
  const { numRecipes } = req.body;
  dataController.generateRecipes(numRecipes);
  res.send('Recipes generation started.');
});

// Route for generating shopping lists
router.post('/shoppingLists', (req, res) => {
  const { numLists } = req.body;
  dataController.generateShoppingLists(numLists);
  res.send('Shopping lists generation started.');
});

module.exports = router;

