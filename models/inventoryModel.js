const mongoose = require('mongoose');
const validator = require('validator');

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= 0,
      message: 'Quantity must be a non-negative number',
    },
  },
  expirationDate: { type: Date },
  // additional relevant attributes
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
