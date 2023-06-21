const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

// GET all recipes
router.get('/', recipeController.getAllRecipes);

//GET a specific recipe by ID
router.get('/:id', recipeController.getRecipeById);

// POST request to create a new recipe
router.post('/', recipeController.createRecipe);