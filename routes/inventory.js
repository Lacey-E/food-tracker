const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

// GET all inventories
router.get('/', inventoryController.getAllInventoryItems);

//GET a specific inventory by ID
router.get('/:id', inventoryController.getInventoryItemById);

// POST request to create a new inventory
router.post('/', inventoryController.createInventoryItem);

//Delete inventory by ID
router.delete('/:id', inventoryController.deleteInventoryItem);

// Update an inventory item by ID
router.put('/:id', inventoryController.updateInventoryItem);



module.exports = router;