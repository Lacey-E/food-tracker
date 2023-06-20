const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  listName: { type: String, required: true },
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }],
  dateCreated: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  priority: { type: String },
  notes: { type: String },
  // other fields if needed
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = ShoppingList;
