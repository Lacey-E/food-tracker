const Recipe = require('../models/recipeModel');
const initDb = require('../config/db');
const { ObjectId } = require('mongoose').Types;
const collection = 'recipe_collection';
const database = 'food-tracker';

const createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;

    // Check if the required data is provided
    if (!recipeData || !recipeData.name || !recipeData.ingredients || !recipeData.instructions) {
      return res.status(400).json({ error: 'Invalid recipe data.' });
    }

    // Create a new instance of the Recipe model with the provided data
    const recipe = new Recipe(recipeData);

    // Save the new recipe to the database using insertOne
    const createdRecipe = await initDb.getDb().db(database).collection(collection).insertOne(recipe);

    if (createdRecipe.acknowledged) {
      // If the recipe creation is successful, send the created recipe as a JSON response with a status code of 201
      res.status(201).json(createdRecipe);
    } else {
      // If the recipe creation is not acknowledged, handle the error and send an appropriate error response
      res.status(500).json(createdRecipe.error || 'Some error occurred while creating the recipe.');
    }
  } catch (error) {
    // If any server error occurs during the process, send a generic server error response
    res.status(500).json({ message: 'Server error' });
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
    const recipe = await db.collection(collection).findOne({ _id: new ObjectId(id) });

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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById
};
