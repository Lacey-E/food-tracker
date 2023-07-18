const mongoose = require('mongoose');
const validator = require('validator');

const customRecipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    validate: {
      validator: validator.isLength,
      message: 'Recipe name must not be empty',
      arguments: [1],
    },
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InventoryItem',
    },
  ],
  preparationSteps: {
    type: String,
  },
  dietaryInformation: {
    type: String,
  },
  servingSize: {
    type: Number,
    validate: {
      validator: value => value > 0,
      message: 'Serving size must be a positive number',
    },
  },
  cookingTime: {
    type: Number,
    validate: {
      validator: value => value >= 0,
      message: 'Cooking time must be a non-negative number',
    },
  },
  difficultyLevel: {
    type: String,
    validate: {
      validator: value => ['easy', 'medium', 'hard'].includes(value),
      message: 'Difficulty level must be one of: easy, medium, hard',
    },
  },
  cuisine: {
    type: String,
  },
});

const CustomRecipe = mongoose.model('CustomRecipe', customRecipeSchema);

module.exports = CustomRecipe;
