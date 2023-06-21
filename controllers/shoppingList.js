const ShoppingList = require('../models/shoppingListModel');
const initDb = require('../config/db');
const { ObjectId } = require('mongoose').Types;
const collection = 'shopping_list_collection';
const database = 'food-tracker';

// Create a shopping list
const createShoppingList = async (req, res) => {
  try {
    const shoppingListData = req.body;

    // Create a new instance of the ShoppingList model with the provided data
    const shoppingList = new ShoppingList(shoppingListData);

    // Save the new shopping list to the database using insertOne
    const createdShoppingList = await initDb.getDb().db(database).collection(collection).insertOne(shoppingList);

    if (createdShoppingList.acknowledged) {
      // If the shopping list creation is successful, send the created shopping list as a JSON response with a status code of 201
      res.status(201).json(createdShoppingList);
    } else {
      // If the shopping list creation is not acknowledged, handle the error and send an appropriate error response
      res.status(500).json(createdShoppingList.error || 'Some error occurred while creating the shopping list.');
    }
  } catch (error) {
    // If any server error occurs during the process, send a generic server error response
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all shopping lists
const getAllShoppingLists = async (req, res) => {
  try {
    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Fetch all shopping lists from the collection and convert the result to an array
    const shoppingLists = await db.collection(collection).find().toArray();

    // Send the retrieved shopping lists as a JSON response
    res.json(shoppingLists);
  } catch (error) {
    // Handle errors and send an appropriate error response
    res.status(500).json({ error: 'Failed to fetch shopping lists.' });
  }
};

// Get a single shopping list by ID
const getShoppingListById = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid shopping list ID.' });
    }

    // Fetch a specific shopping list by ID from the database
    const db = initDb.getDb().db(database);
    const shoppingList = await db.collection(collection).findOne({ _id: new ObjectId(id) });

    if (!shoppingList) {
      return res.status(404).json({ error: 'Shopping list not found.' });
    }

    // If the shopping list is found, send it as a JSON response with a 200 status message
    res.status(200).json(shoppingList);
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to fetch shopping list.' });
  }
};

module.exports = {
  createShoppingList,
  getAllShoppingLists,
  getShoppingListById
};
