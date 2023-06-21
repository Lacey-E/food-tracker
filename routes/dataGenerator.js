// const express = require('express');
// const router = express.Router();
// const dataController = require('../controllers/randomiz');

// // Generate user profiles
// router.post('/user-profiles', dataController.generateUserProfiles);

// // Generate shopping lists
// router.post('/shopping-lists', dataController.generateShoppingLists);

// // Generate inventory items
// router.post('/inventory-items', dataController.generateInventoryItems);

// // Generate recipes
// router.post('/recipes', dataController.generateRecipes);

// module.exports = router;

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

