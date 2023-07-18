const InventoryItem = require('../models/inventoryModel');
const validate = require('../models/Validation')
const errorHandler = require('http-errors')

const createInventoryItem = async (req, res, next) => {
  try{
    const inventoryItem = await req.body
    const createInventory = new InventoryItem(inventoryItem)
    const savedInventory = await createInventory.save()
    res.status(201).json(savedInventory)
  }catch(err){
    if(err.name === 'ValidationError'){
      next(errorHandler(422, err.message));
      return;
  }
  next(err);
  }
}

const getAllInventoryItems = async (req,res,next) => {
  try{
    const inventoryItems = await InventoryItem.find()
    res.status(200).json(inventoryItems)
  }catch(err){
    res.status(500).json({message: err})
  }
}
const getInventoryItemById = async (req,res, next) => {
  try{
    const oneInventory = await InventoryItem.findById(req.params.id)

    if(!oneInventory) {
      throw errorHandler(404, 'Inventory list not found')
    }

    res.status(200).json(oneInventory)
  }catch(err){
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid inventory id"));
      return;
  }
  next(err);
  }
}
const updateInventoryItem = async (req,res, next) => {
  try{
    const updateInventory = await InventoryItem.findByIdAndUpdate(
      {_id: req.params.id}, {$set: req.body}
    )

    if(!updateInventory) {
      throw errorHandler(404, 'Inventory does not exist')
    }
    res.status(204).json(updateInventory)
  }catch(err){
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid inventory id"));
      return;
  }
  next(err);
  }
}
const deleteInventoryItem = async (req, res, next) => {
  try{
    const deleteInventory = await ShoppingList.findByIdAndDelete(
      req.params.id
    )

    if(!deleteInventory) {
      throw errorHandler(404, 'Inventory does not exist')
    }
    res.status(204).json(deleteInventory)
  }catch(err){
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid inventory id"));
      return;
  }
  next(err);
  }
}
module.exports = {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  deleteInventoryItem,
  updateInventoryItem,
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

