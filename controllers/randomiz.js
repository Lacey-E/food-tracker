const faker = require('faker');
const initDb = require('../config/db');
const UserProfile = require('../models/userModel');
const InventoryItem = require('../models/inventoryModel');
const CustomRecipe = require('../models/recipeModel');
const ShoppingList = require('../models/shoppingListModel');

// Assuming you're using MongoDB and Mongoose
const insertDocument = async (collectionName, document) => {
  try {
    const db = initDb.getDb().db('food-tracker');
    const result = await db.collection(collectionName).insertOne(document);
    return { success: true, documentId: result.insertedId };
  } catch (error) {
    console.error('Failed to insert document:', error);
    return { success: false, message: 'Failed to insert document', error: error.message };
  }
};

// Generate fake user profiles
const generateUserProfiles = async (numProfiles) => {
  try {
    const userProfiles = [];

    for (let i = 0; i < numProfiles; i++) {
      const userProfileData = {
        // Generate user profile data
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dietaryPreferences: faker.random.words(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(),
        gender: faker.random.arrayElement(['Male', 'Female']),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        // Add any additional fields as per your model
      };

      const response = await insertDocument('userprofiles', userProfileData);
      console.log('Generated user profile:', response);
      userProfiles.push(response.documentId);
    }

    console.log('Generated user profiles:', userProfiles);
    return { success: true, message: 'User profiles generated successfully', data: userProfiles };
  } catch (error) {
    console.error('Error generating user profiles:', error);
    return { success: false, message: 'Failed to generate user profiles', error };
  }
};

// Generate fake inventory items
const generateInventoryItems = async (numItems) => {
  try {
    const inventoryItems = [];

    for (let i = 0; i < numItems; i++) {
      const inventoryItemData = {
        name: faker.commerce.productName(),
        quantity: faker.random.number(),
        expirationDate: faker.date.future(),
        owner: '6492d884bb86057a33b241a9', // Replace with an actual UserProfile ObjectId
        // Add any additional fields as per your model
      };

      const response = await insertDocument('inventory_items', inventoryItemData);
      console.log('Inserted inventory item:', response);
      inventoryItems.push(response.documentId);
    }

    console.log('Generated inventory items:', inventoryItems);
    return { success: true, message: 'Inventory items generated successfully', data: inventoryItems };
  } catch (error) {
    console.error('Error generating inventory items:', error);
    return { success: false, message: 'Failed to generate inventory items', error };
  }
};

// Generate fake recipes
const generateRecipes = async (numRecipes) => {
  try {
    const recipes = [];

    for (let i = 0; i < numRecipes; i++) {
      const recipeData = {
        recipeName: faker.random.words(),
        ingredients: [], // Populate with InventoryItem object IDs
        preparationSteps: faker.lorem.paragraph(),
        dietaryInformation: faker.random.words(),
        servingSize: faker.random.number(),
        cookingTime: faker.random.number(),
        difficultyLevel: faker.random.arrayElement(['easy', 'medium', 'hard']),
        cuisine: faker.random.word(),
        // Add any additional fields as per your model
      };

      // Add ingredients to the recipeData object
      const numIngredients = faker.random.number({ min: 1, max: 5 }); // Generate a random number of ingredients
      for (let j = 0; j < numIngredients; j++) {
        // Create a new inventory item and associate it with the recipe
        const inventoryItemData = {
          name: faker.commerce.productName(),
          quantity: faker.random.number(),
          expirationDate: faker.date.future(),
          owner: '6492d884bb86057a33b241a9', // Replace with an actual UserProfile ObjectId
          // Add any additional fields as per your model
        };

        const response = await insertDocument('inventory_items', inventoryItemData);
        console.log('Inserted inventory item:', response);
        recipeData.ingredients.push(response.documentId);
      }

      const response = await insertDocument('custom_recipes', recipeData);
      console.log('Generated recipe:', response);
      recipes.push(response.documentId);
    }

    console.log('Generated recipes:', recipes);
    return { success: true, message: 'Recipes generated successfully', data: recipes };
  } catch (error) {
    console.error('Error generating recipes:', error);
    return { success: false, message: 'Failed to generate recipes', error };
  }
};

// Generate fake shopping lists
const generateShoppingLists = async (numLists) => {
  try {
    const shoppingLists = [];

    for (let i = 0; i < numLists; i++) {
      const shoppingListData = {
        listName: faker.random.word(),
        userProfile: '6492d884bb86057a33b241a9', // Replace with an actual UserProfile ObjectId
        items: [], // Populate with InventoryItem object IDs
        dateCreated: faker.date.past(),
        isCompleted: faker.random.boolean(),
        priority: faker.random.arrayElement(['low', 'medium', 'high']),
        notes: faker.random.words(),
        // Add any additional fields as per your model
      };

      // Add items to the shopping list
      const numItems = faker.random.number({ min: 1, max: 10 }); // Generate a random number of items for each shopping list
      for (let j = 0; j < numItems; j++) {
        // Create a new inventory item and associate it with the shopping list
        const inventoryItemData = {
          name: faker.commerce.productName(),
          quantity: faker.random.number(),
          expirationDate: faker.date.future(),
          owner: '6492d884bb86057a33b241a9', // Replace with an actual UserProfile ObjectId
          // Add any additional fields as per your model
        };

        const response = await insertDocument('inventory_items', inventoryItemData);
        console.log('Inserted inventory item:', response);
        shoppingListData.items.push(response.documentId);
      }

      const response = await insertDocument('shopping_lists', shoppingListData);
      console.log('Generated shopping list:', response);
      shoppingLists.push(response.documentId);
    }

    console.log('Generated shopping lists:', shoppingLists);
    return { success: true, message: 'Shopping lists generated successfully', data: shoppingLists };
  } catch (error) {
    console.error('Error generating shopping lists:', error);
    return { success: false, message: 'Failed to generate shopping lists', error };
  }
};

module.exports = {
  generateUserProfiles,
  generateInventoryItems,
  generateRecipes,
  generateShoppingLists,
};
