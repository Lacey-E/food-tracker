const Recipe = require('../models/recipeModel');
const initDb = require('../config/db');
const { ObjectId } = require('mongoose').Types;
const collection = 'recipes';
const database = 'food-tracker';

const createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;

    // Check if the required data is provided
    if (!recipeData || !recipeData.name || !recipeData.ingredients || !recipeData.instructions) {
      return res.status(400).json({ error: 'Invalid recipe data.' });
    }

    // Create an array to store the inventory item IDs associated with the recipe
    const ingredientIds = [];

    // Create a new instance of the Recipe model with the provided data
    const recipe = new Recipe({
      name: recipeData.name,
      instructions: recipeData.instructions,
    });

    // Validate the recipe data
    const validationError = recipe.validateSync();
    if (validationError) {
      // If validation fails, send an error response with the validation error message
      return res.status(400).json({ error: validationError.message });
    }

    // Save the new recipe to the database using insertOne
    const response = await initDb
      .getDb()
      .db(database)
      .collection(collection)
      .insertOne(recipe);

    if (!response.acknowledged) {
      // If the recipe creation is not acknowledged, handle the error and send an appropriate error response
      return res.status(500).json(response.error || 'Some error occurred while creating the recipe.');
    }

    // Associate the inventory items with the recipe
    for (const ingredientData of recipeData.ingredients) {
      // Create a new instance of the InventoryItem model with the provided data
      const inventoryItem = new InventoryItem({
        name: ingredientData.name,
        quantity: ingredientData.quantity,
        expirationDate: ingredientData.expirationDate,
        owner: response.insertedId, // Use the inserted recipe ID as the owner of the inventory item
      });

      // Validate the inventory item data
      const inventoryValidationError = inventoryItem.validateSync();
      if (inventoryValidationError) {
        // If validation fails, delete the created recipe and send an error response with the validation error message
        await initDb
          .getDb()
          .db(database)
          .collection(collection)
          .deleteOne({ _id: response.insertedId });

        return res.status(400).json({ error: inventoryValidationError.message });
      }

      // Save the new inventory item to the database using insertOne
      const inventoryResponse = await initDb
        .getDb()
        .db(database)
        .collection('inventory_items')
        .insertOne(inventoryItem);

      if (!inventoryResponse.acknowledged) {
        // If the inventory item creation is not acknowledged, delete the created recipe and send an appropriate error response
        await initDb
          .getDb()
          .db(database)
          .collection(collection)
          .deleteOne({ _id: response.insertedId });

        return res.status(500).json(
          inventoryResponse.error || 'Some error occurred while creating the inventory item.'
        );
      }

      // Add the created inventory item ID to the array for association with the recipe
      ingredientIds.push(inventoryResponse.insertedId);
    }

    // Update the recipe with the associated inventory item IDs
    await initDb
      .getDb()
      .db(database)
      .collection(collection)
      .updateOne({ _id: response.insertedId }, { $set: { ingredients: ingredientIds } });

    // If the recipe creation is successful, send the created recipe as a JSON response with a status code of 201
    res.status(201).json({ success: true, message: 'Recipe created successfully', data: response.insertedId });
  } catch (error) {
    // If any server error occurs during the process, send a generic server error response
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Fetch all recipes from the collection and convert the result to an array
    const recipes = await db.collection(collection).find().toArray();

    // Send the retrieved recipes as a JSON response
    res.json(recipes);
  } catch (error) {
    // Handle errors and send an appropriate error response
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID.' });
    }

    // Fetch a specific recipe by ID from the database
    const db = initDb.getDb().db(database);
    const recipe = await db
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }

    // If the recipe is found, send it as a JSON response with a 200 status message
    res.status(200).json(recipe);
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to fetch recipe.' });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID.' });
    }

    // Delete the recipe from the database
    const db = initDb.getDb().db(database);
    const response = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount > 0) {
      // If the recipe is deleted successfully, send a success response
      res.status(200).json({ message: 'Recipe deleted successfully.' });
    } else {
      // If no recipe is found with the given ID, send a not found response
      res.status(404).json({ error: 'Recipe not found.' });
    }
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    console.error(error);
    res.status(500).json({ error: 'Failed to delete recipe.' });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID.' });
    }

    const recipeData = req.body;

    // Check if the provided data includes ingredients
    if (recipeData.ingredients && !Array.isArray(recipeData.ingredients)) {
      return res.status(400).json({ error: 'Ingredients must be an array.' });
    }

    // Update the recipe in the database
    const db = initDb.getDb().db(database);

    // Find the existing recipe by ID
    const existingRecipe = await db.collection(collection).findOne({ _id: new ObjectId(id) });

    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }

    // Update the recipe fields
    const updatedRecipe = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: recipeData });

    if (updatedRecipe.matchedCount === 0) {
      return res.status(500).json({ error: 'Failed to update recipe.' });
    }

    // Update the associated inventory items
    if (recipeData.ingredients) {
      // Create an array to store the updated inventory item IDs associated with the recipe
      const updatedIngredientIds = [];

      for (const ingredientData of recipeData.ingredients) {
        // Check if the ingredientData has a valid ID
        if (!ingredientData._id || !ObjectId.isValid(ingredientData._id)) {
          return res.status(400).json({ error: 'Invalid inventory item ID.' });
        }

        // Update the inventory item in the database
        const updatedInventoryItem = await db.collection('inventory_items').updateOne(
          { _id: new ObjectId(ingredientData._id), owner: new ObjectId(id) },
          { $set: { name: ingredientData.name, quantity: ingredientData.quantity, expirationDate: ingredientData.expirationDate } }
        );

        if (updatedInventoryItem.matchedCount === 0) {
          return res.status(500).json({ error: 'Failed to update inventory item.' });
        }

        // Add the updated inventory item ID to the array for association with the recipe
        updatedIngredientIds.push(ingredientData._id);
      }

      // Update the recipe with the updated associated inventory item IDs
      await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: { ingredients: updatedIngredientIds } });
    }

    // If the recipe is updated successfully, send a success response
    res.status(200).json({ message: 'Recipe updated successfully.' });
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
};
