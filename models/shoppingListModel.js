const mongoose = require('mongoose');
const validator = require('validator');

const shoppingListSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryItem',
  }],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    validate: {
      validator: (value) => validator.isIn(value, ['low', 'medium', 'high']),
      message: 'Invalid priority level',
    },
  },
  notes: {
    type: String,
    validate: {
      validator: (value) => validator.isLength(value, { max: 200 }),
      message: 'Notes must be less than or equal to 200 characters',
    },
  },
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = ShoppingList;
