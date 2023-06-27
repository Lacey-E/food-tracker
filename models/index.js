const initDb = require('../config/db.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = initDb.url;
db.inventory = require('./inventoryModel.js')(mongoose);
db.user = require('./userModel.js')(mongoose);
db.recipes = require('./recipeModel.js')(mongoose);
db.shoppingList = require('./shoppingListModel.js')(mongoose);

module.exports = db;