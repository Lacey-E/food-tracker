// Import the database configuration module
const initDb = require('../config/db.js');

// Import the Mongoose library
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Create a database object to store references to the models
const db = {};

// Set the Mongoose instance to the db object
db.mongoose = mongoose;

// Set the database URL from the configuration module
db.url = initDb.url;

// Import and assign the models to the db object
db.inventory = require('./inventoryModel.js')(mongoose);
db.user = require('./userModel.js')(mongoose);
db.recipes = require('./recipeModel.js')(mongoose);
db.shoppingList = require('./shoppingListModel.js')(mongoose);

// Export the db object to be used by other modules
module.exports = db;
