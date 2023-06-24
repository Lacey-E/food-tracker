const faker = require('faker');
const connectDb = require('../config/db');
// const { collection } = require('../models/userModel');
// const UserProfile = require('../models/userModel');
// const InventoryItem = require('../models/inventoryModel');
// const Recipe = require('../models/recipeModel');
// const ShoppingList = require('../models/shoppingListModel');


// Assuming you're using MongoDB and Mongoose
const insertDocument = async (collectionName, document) => {
    try {
        const db = connectDb.getDb().db('food-tracker');
        const result = await db.collection(collectionName).insertOne(document);
        return { success: true, documentId: result.insertedId };
    } catch (error) {
        console.error('Failed to insert document:', error);
        return { success: false, message: 'Failed to insert document', error: error.message };
    }
};

// Generate fake user profiles
const generateUserProfiles = async (numProfiles, res) => {
    try {
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

            // Insert user profile document into 'user_registry' collection
            const response = await insertDocument('user_registry', userProfileData);
            console.log('Generated user profile:', response);
        }
    } catch (error) {
        console.error('Error generating user profiles:', error);
        if (error.errors) {
            // Handle Mongoose validation errors
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            res.status(500).json({ error: validationErrors });
        } else {
            res.status(500).json({ error: error.message || 'Error generating user profiles' });
        }
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
                owner: '6492d884bb86057a33b241a9', // Example owner ID, replace with an actual ID from 'UserProfile'
                // Add any additional fields as per your model
            };

            const response = await insertDocument('inventory_collection', inventoryItemData);
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
                difficultyLevel: faker.random.arrayElement(['Easy', 'Medium', 'Hard']),
                cuisine: faker.random.word(),
                // Add any additional fields as per your model
            };

            // Add ingredients to the recipeData object
            const numIngredients = faker.random.number({ min: 1, max: 5 }); // Generate a random number of ingredients
            for (let j = 0; j < numIngredients; j++) {
                const ingredient = await insertDocument('inventory_collection', {
                    name: faker.commerce.productName(),
                    quantity: faker.random.number(),
                    expirationDate: faker.date.future(),
                    owner: '6492f46b622a4942b7d86be7', // Example owner ID, replace with an actual ID from 'UserProfile'
                    // Add any additional fields as per your model
                });
                recipeData.ingredients.push(ingredient.documentId);
            }

            const response = await insertDocument('recipe_collection', recipeData);
            console.log('Inserted recipe:', response);
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
                userProfile: '6492f46b622a4942b7d86be7', // Example user profile ID, replace with an actual ID
                items: [], // Populate with InventoryItem object IDs
                dateCreated: faker.date.past(),
                isCompleted: faker.random.boolean(),
                priority: faker.random.word(),
                notes: faker.random.words(),
                // Add any additional fields as per your model
            };

            const numItems = faker.random.number({ min: 1, max: 10 }); // Generate a random number of items for each shopping list
            for (let j = 0; j < numItems; j++) {
                const item = await insertDocument('inventory_collection', {
                    name: faker.commerce.productName(),
                    quantity: faker.random.number(),
                    expirationDate: faker.date.future(),
                    owner: '6492f46b622a4942b7d86be7', // Example owner ID, replace with an actual ID from 'UserProfile'
                    // Add any additional fields as per your model
                });
                shoppingListData.items.push(item.documentId);
            }

            const response = await insertDocument('shopping_list_collection', shoppingListData);
            console.log('Inserted shopping list:', response);
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
