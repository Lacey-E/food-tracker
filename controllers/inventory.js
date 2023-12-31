// Import the InventoryItem model and database initialization
const InventoryItem = require('../models/inventoryModel');
const initDb = require('../config/db');

// Import the ObjectId from mongoose.Types for validating IDs
const { ObjectId } = require('mongoose').Types;

// Define the MongoDB collection name and database name
const collection = 'inventory_items';
const database = 'food-tracker';

// Create a new inventory item
const createInventoryItem = async (req, res) => {
  try {
    const inventoryItemData = req.body;

    // Validate the provided data
    if (
      !inventoryItemData ||
      !inventoryItemData.name ||
      !inventoryItemData.quantity
    ) {
      return res.status(400).json({ error: 'Invalid inventory item data. Please complete the fields' });
    }
    const userId = req.user._id; // The user ID extracted from the token or session
    // Create a new instance of the InventoryItem model with the provided data and associate it with the user
    const inventoryItem = new InventoryItem({
      ...inventoryItemData,
      owner: userId,
    });

    // Validate the inventory item data
    const validationError = inventoryItem.validateSync();
    if (validationError) {
      // If validation fails, send an error response with the validation error messages
      return res.status(400).json({ error: validationError.message });
    }

    // Save the new inventory item to the database using insertOne
    const response = await initDb
      .getDb()
      .db(database)
      .collection(collection)
      .insertOne(inventoryItem);

    if (response.acknowledged) {
      // If the inventory item creation is successful, send the created inventory item as a JSON response with a status code of 201
      res.status(201).json(response);
    } else {
      // If the inventory item creation is not acknowledged, handle the error and send an appropriate error response
      res
        .status(500)
        .json(
          response.error ||
          'Some error occurred while creating the inventory item.'
        );
    }
  } catch (error) {
    // If any server error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all inventory items
const getAllInventoryItems = async (req, res) => {
  try {
    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Fetch all inventory items from the collection and convert the result to an array
    const inventoryItems = await db.collection(collection).find().toArray();

    // Send the retrieved inventory items as a JSON response
    res.json(inventoryItems);
  } catch (error) {
    // Handle errors and send an appropriate error response
    res.status(500).json({ error: 'Failed to fetch inventory items.' });
  }
};

// Get an inventory item by ID
const getInventoryItemById = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid inventory item ID.' });
    }

    // Fetch a specific inventory item by ID from the database
    const db = initDb.getDb().db(database);
    const inventoryItem = await db
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }

    // If the inventory item is found, send it as a JSON response with a 200 status message
    res.status(200).json(inventoryItem);
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to fetch inventory item.' });
  }
};

// Delete an inventory item by ID
const deleteInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid inventory item ID.' });
    }

    // Delete a specific inventory item by ID from the database
    const db = initDb.getDb().db(database);
    const response = await db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Inventory item deleted' });
    } else {
      res.status(404).json({ error: 'Inventory item not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete inventory item.' });
  }
};

// Update an inventory item by ID
const updateInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid inventory item ID.' });
    }

    const updatedInventoryItemData = req.body;

    // Check if the required data is provided
    if (!updatedInventoryItemData || !updatedInventoryItemData.name || !updatedInventoryItemData.quantity || !updatedInventoryItemData.unit) {
      return res.status(400).json({ error: 'Invalid inventory item data.' });
    }

    // Update the inventory item in the database
    const db = initDb.getDb().db(database);
    const inventoryItem = await db
      .collection(collection)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedInventoryItemData },
        { returnOriginal: false }
      );

    if (!inventoryItem.value) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }

    // If the inventory item is updated successfully, send it as a JSON response with a 200 status message
    res.status(200).json(inventoryItem.value);
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to update inventory item.' });
  }
};

// Export the functions so they can be used in other parts of the application
module.exports = {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  deleteInventoryItem,
  updateInventoryItem,
};
