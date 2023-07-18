const ShoppingList = require('../models/shoppingListModel');
const errorHandler = require('http-errors')
const validate = require('../models/Validation')

const createShoppingList = async (req, res, next) => {
  try{
    const shoppingListData = await req.body
    const shoppingList = new ShoppingList(shoppingListData)
    const savedShoppingList = await shoppingList.save()

    res.status(201).json(savedShoppingList)
  }catch(err){
    console.log(err)
    if(err.name === 'ValidationError'){
      next(errorHandler(422, err.message));
      return;
  }
  next(err);
  }
};

const getAllShoppingLists = async (req, res, next) => {
  try{

    const shoppingLists = await ShoppingList.find()
    res.status(200).json(shoppingLists)

  }catch(err) {
    res.status(500).json({message: err})
  }
}

const getOneShoppingList = async (req, res, next) => {
  try{

    const shoppingList = await ShoppingList.findById(req.params.id)

    if(!shoppingList) {
      throw errorHandler(404, 'SHopping list not found')
    }

    res.status(200).json(shoppingList)

  }catch(err) {
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid shooping list id"));
      return;
  }
  next(err)
  }
}

const updateShoppingList = async (req, res, next) => {
  try{
    const updateOneList = await ShoppingList.findByIdAndUpdate(
      {_id: req.params.id}, {$set: req.body}
    )

    if(!updateOneList) {
      throw errorHandler(404, 'List does not exist')
    }
    res.status(204).json(updateOneList)

  }catch(err) {
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid shooping list id"));
      return;
  }
  next(err)
  }
}

const deleteShoppingList = async (req, res, next) => {
  try{
    const deleteList = await ShoppingList.findByIdAndDelete(
      req.params.id
    )

    if(!deleteList) {
      throw errorHandler(404, 'List does not exist')
    }
    res.status(204).json(deleteList)

  }catch(err) {
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid shooping list id"));
      return;
  }
  next(err)
  }
}



module.exports = {
  createShoppingList,
  getAllShoppingLists,
  getOneShoppingList,
  deleteShoppingList,
  updateShoppingList
};

// // Create a shopping list
// const createShoppingList = async (req, res) => {
//   try {
//     const shoppingListData = req.body;

//     if (response.acknowledged) {
//       // If the shopping list creation is successful, send the created shopping list as a JSON response with a status code of 201
//       res.status(201).json(response);
//     } 

//     // Create a new instance of the ShoppingList model with the provided data
//     const shoppingList = new ShoppingList(shoppingListData);

//     // Save the new shopping list to the database using insertOne
//     const response = await shoppingList.save()
//     res.status(201).json(response)
//   } catch (error) {
//     // If any server error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Get all shopping lists
// const getAllShoppingLists = async (req, res) => {
//   try {
//     const shoppingList = await ShoppingList.find()
//     res.status(200).json(shoppingList)
//   } catch (error) {
//     // Handle errors and send an appropriate error response
//     res.status(500).json({ error: 'Failed to fetch shopping lists.' });
//   }
// };

// // Get a single shopping list by ID
// const getShoppingListById = async (req, res) => {

//   try {
//     // Validate the provided ID as a valid ObjectId
//     const shoppingList =  await ShoppingList.findById(req.params.id)
//     // Fetch a specific shopping list by ID from the database

//     if (!shoppingList) {
//       return res.status(404).json({ error: 'Shopping list not found.' });
//     }

//     // If the shopping list is found, send it as a JSON response with a 200 status message
//     res.status(200).json(shoppingList);
//   } catch (error) {
//     // If any error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Failed to fetch shopping list.' });
//   }
// };

// // Delete a shopping list by ID
// const deleteShoppingList = async (req, res) => {
  
//   try {
//     // Validate the provided ID as a valid ObjectId
//     const deleteShoppingList = await ShoppingList.findByIdAndDelete({_id: req.params.id})

//     // Delete a specific shopping list by ID from the database

//     if (!deleteShoppingList) {
//       res.status(404).json({ error: 'Shopping list not found.' });
//     }
//     res.send(deleteShoppingList)
//   } catch (error) {
//     // If any error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Failed to delete shopping list.' });
//   }
// };

// // Update a shopping list
// const updateShoppingList = async (req, res) => {
 
//   try {
//     const updateShoppingList = await ShoppingList.findOneAndUpdate(
//       {_id: req.params.id}, {$set: req.body}
//     )
//     // Validate the provided ID as a valid ObjectId
//     if(!updateShoppingList) {
//       res.status(404).json({error: 'Shopping list not found!'})
//     }

//     // Update the shopping list in the database
//     res.status(400).json(updateShoppingList)

//   } catch (error) {
//     // If any error occurs during the process, send a generic server error response
//     res.status(500).json({ error: 'Failed to update shopping list.' });
//   }
// };

