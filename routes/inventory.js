
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');
 const oauthController = require('../controllers/oauth');
 
 
 // GET all inventories
router.get('/',  inventoryController.getAllInventoryItems);

//GET a specific inventory by ID
router.get('/:id', inventoryController.getInventoryItemById);

// POST request to create a new inventory
router.post('/', oauthController.authenticated, inventoryController.createInventoryItem);

//Delete inventory by ID
router.delete('/:id', oauthController.authenticated, inventoryController.deleteInventoryItem);

// Update an inventory item by ID
router.put('/:id', oauthController.authenticated, inventoryController.updateInventoryItem);



module.exports = router;