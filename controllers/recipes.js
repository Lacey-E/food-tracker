const Recipe = require('../models/recipeModel');
const errorHandler = require('http-errors')
const validate = require('../models/Validation')

const createRecipe = async (req,res, next) => {
  try{
    const recipe = await req.body
    const createRecipe = new Recipe(recipe)
    const savedRecipe = await createRecipe.save()
    res.status(201).json(savedRecipe)
  }catch(err){
    if(err.name === 'ValidationError'){
      next(errorHandler(422, err.message));
      return;
  }
    next(err)
  }
}

const getAllRecipes = async (req, res, next) => {
  try{
    const recipe = await Recipe.find()
    res.status(201).json(recipe)
  }catch(err){
    res.status(500).json({message: err})
  }
}
const getRecipeById = async (req,res, next) => {
  try{
    const oneRecipe = await Recipe.findById(req.params.id)

    if(!oneRecipe) {
      throw errorHandler(404, 'Recipe list not found')
    }

    res.status(200).json(oneRecipe)
  }catch(err){
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid Recipe id"));
      return;
  }
    next(err)
  }
}
const updateRecipe = async (req,res, next) => {
  try{
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      {_id: req.params.id}, {$set: req.body}
    )

    if(!updatedRecipe) {
      throw errorHandler(404, 'Recipe does not exist')
    }
    res.status(204).json(updatedRecipe)
  }catch(err){
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid Recipe id"));
      return;
  }
    next(err)
  }
}
const deleteRecipe = async (req,res, next) => {
  try{
    const removeRecipe = await Recipe.findByIdAndDelete(
      req.params.id
    )

    if(!removeRecipe) {
      throw errorHandler(404, 'Recipe does not exist')
    }
    res.status(204).json(removeRecipe)
  }catch(err){
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid Recipe id"));
      return;
    }
    next(err)
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe
};


// const createInventoryItem = async (req, res) => {
//   try {
//     const inventoryItemData = req.body;

//     // Create a new instance of the InventoryItem model with the provided data
//     const inventoryItem = new InventoryItem(inventoryItemData);

//     // Save the new inventory item to the database using insertOne
//     const savedInventory = inventoryItem.save()

//     if (response.acknowledged) {
//       // If the inventory item creation is successful, send the created inventory item as a JSON response with a status code of 201
//       res.status(201).json(`Data saved: ${savedInventory}`)
//     } else {
//       // If the inventory item creation is not acknowledged, handle the error and send an appropriate error response
//       res
//         .status(500)
//         .json(response.error || 'Some error occurred while creating the inventory item.',
//         );
//     }
//   } catch (error) {
//     // If any server error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getAllInventoryItems = async (req, res) => {
//   try {
//     const inventoryItems = InventoryItem.find()
//     // Send the retrieved inventory items as a JSON response
//     res.json(inventoryItems);
//   } catch (error) {
//     // Handle errors and send an appropriate error response
//     res.status(500).json({ error: 'Failed to fetch inventory items.' });
//   }
// };

// const getInventoryItemById = async (req, res) => {
//   try {
//     const oneInventory = await InventoryItem.findById(req.params.id)

//     if (!oneInventory) {
//       return res.status(404).json({ error: 'Inventory item not found.' });
//     }

//     // If the inventory item is found, send it as a JSON response with a 200 status message
//     res.status(200).json(oneInventory);
//   } catch (error) {
//     // If any error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Failed to fetch inventory item.' });
//   }
// };

// //Delete an inventory item by id
// const deleteInventoryItem = async (req, res) => {
  
//   try {
//     const deleteInventory = await InventoryItem.findByIdAndDelete(req.params.id)

//     if (deleteInventory.deletedCount > 0) {
//       res.status(200).json({ message: 'Inventory item deleted' });
//     } else {
//       res.status(404).json({ error: 'Inventory item not found.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete inventory item.' });
//   }
// };

// // Update an inventory item by ID
// const updateInventoryItem = async (req, res) => {
  
//   try {
//     const editInventory = await InventoryItem.findByIdAndUpdate(req.params.id)

//     if (!editInventory.value) {
//       return res.status(404).json({ error: 'Inventory item not found.' });
//     }

//     // If the inventory item is updated successfully, send it as a JSON response with a 200 status message
//     res.status(200).json(editInventory.value);
//   } catch (error) {
//     // If any error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Failed to update inventory item.' });
//   }
// };



// const createRecipe = async (req, res) => {
//   try {
//     const recipeData = req.body;

//     // Create a new instance of the Recipe model with the provided data
//     const recipe = new Recipe(recipeData);

//     // Save the new recipe to the database using insertOne
//     const savedRecipe = recipe.save()
    
//     if (savedRecipe.acknowledged) {
//       // If the recipe creation is not acknowledged, handle the error and send an appropriate error response
//       res.status(201).send(`Recipe created: ${savedRecipe}`)
//     }
    
//   } catch (error) {
//     // If any server error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getAllRecipes = async (req, res) => {
//   try {

//     // Fetch all recipes from the collection and convert the result to an array
//     const recipes = await Recipe.find()

//     // Send the retrieved recipes as a JSON response
//     res.json(recipes);
//   } catch (error) {
//     // Handle errors and send an appropriate error response
//     res.status(500).json({ error: 'Failed to fetch recipes.' });
//   }
// };

// const getRecipeById = async (req, res) => {
//   const { id } = req.params.id;
//   try {
//     // Validate the provided ID as a valid ObjectId
//      const oneRecipe = await Recipe.findById(id)

//     if (!oneRecipe) {
//       return res.status(404).json({ error: 'Recipe not found.' });
//     }

//     // If the recipe is found, send it as a JSON response with a 200 status message
//     res.status(200).json(oneRecipe);
//   } catch (error) {
//     // If any error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Failed to fetch recipe.' });
//   }
// };

// const deleteRecipe = async (req, res) => {
//   const { id } = req.params.id;
//   try {
//     // Validate Id
//     // if (!ObjectId.isValid(id)) {
//     //   return res.status(400).json({ error: 'Invalid Recipe Id' });
//     // }

//     // // Delete a specific recipe item by ID from the database
//     // const db = initDb.getDb().db(database);
//     // const response = await db
//     //   .collection(collection)
//     //   .deleteOne({ _id: new ObjectId(id) });

//     const deleteRecipe = await Recipe.findByIdAndDelete(id)

//     if (deleteRecipe.deletedCount > 0) {
//       res.status(200).json({ message: `Recipe deleted: ${deleteRecipe}` });
//     } else {
//       res.status(404).json({ error: `Recipe with id ${id} not found.` });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete recipe.' });
//   }
// };

// const updateRecipe = async (req, res) => {
//   const { id } = req.params.id;
//   try {
//     // Validate the provided ID as a valid ObjectId
//     // if (!ObjectId.isValid(id)) {
//     //   return res.status(400).json({ error: 'Invalid recipe ID.' });
//     // }

//     // const recipeData = req.body;

//     // // Update the recipe in the database
//     // const db = initDb.getDb().db(database);
//     // const updatedRecipe = await db
//     //   .collection(collection)
//     //   .updateOne({ _id: new ObjectId(id) }, { $set: recipeData });
//     const updateRecipe = await Recipe.findByIdAndUpdate(id)

//     if (updateRecipe.matchedCount > 0) {
//       // If the recipe is updated successfully, send a success response
//       res.status(200).json({ message: `Recipe with id ${id} updated successfully.` });
//     } else {
//       // If no recipe is found with the given ID, send a not found response
//       res.status(404).json({ error: 'Recipe not found.' });
//     }
//   } catch (error) {
//     // If any error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Failed to update recipe.' });
//   }
// };
