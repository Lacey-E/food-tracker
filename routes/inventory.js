const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

// GET all inventories
router.get('/', inventoryController.getAllInventoryItems);

//GET a specific inventory by ID
router.get('/:id', inventoryController.getInventoryItemById);

// POST request to create a new inventory
router.post('/', inventoryController.createInventoryItem);

// Export the router object to be used by other modules
module.exports = router;