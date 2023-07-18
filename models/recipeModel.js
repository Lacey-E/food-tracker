
const mongoose = require('mongoose');

const customRecipeSchema = mongoose.Schema({
  recipeName: { type: String, required: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }],
  preparationSteps: { type: String },
  dietaryInformation: { type: String },
  servingSize: { type: Number },
  cookingTime: { type: Number },
  difficultyLevel: { type: String },
  cuisine: { type: String },
  // other relevant details
});

const CustomRecipe = mongoose.model('CustomRecipe', customRecipeSchema);

module.exports = CustomRecipe;
