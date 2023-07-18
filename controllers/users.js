const UserProfile = require('../models/userModel')
const errorHandler = require('http-errors')
const validate = require('../models/Validation')
const mongoose = require('mongoose')

const createUserProfile = async (req, res, next) => {
  try {
    const user = await validate.validateAsync(req.body, {abortEarly: false})
    const addUser = new UserProfile(user)
    const savedUser = await addUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    console.log(err);
        if(err.name === 'ValidationError'){
            next(errorHandler(422, err.message));
            return;
        }
        next(err);
  }
};

const getAllUserProfiles = async (req, res, next) => {
  try {
    // Access the database using the custom method
    // const db = initDb.getDb().db(database);

    // Fetch all user profiles from the collection and convert the result to an array
    const userProfiles = await UserProfile.find()

    // Send the retrieved user profiles as a JSON response
    res.status(200).json(userProfiles);
  } catch (err) {
    // Handle errors and send an appropriate error response
    res.status(500).json({message: err})
  }
};

const getUserProfileById = async (req, res, next) => {

  try {
    // Validate the provided ID as a valid ObjectId
    // if (!ObjectId.isValid(id)) {
    //   return res.status(400).json({ error: 'Invalid user profile ID.' });
    // }

    const userProfile = await UserProfile.findById(req.params.id)
    if (!userProfile) {
      throw errorHandler(404, 'User profile not found.');
    }

    // If the user profile is found, send it as a JSON response with a 200 status message
    res.status(200).json(userProfile);
  } catch (err) {
    // If any error occurs during the process, send a generic server error response
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid user id"));
      return;
  }
  next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await UserProfile.findByIdAndDelete({_id: req.params.id})

    // Validate Id
    if (!deleteUser) {
      throw errorHandler(404, 'Invalid User ID' );
    }

    // Delete a specific User by ID from the database
    // const response = await UserProfile.findByIdAndDelete({_id: req.params.id})

    // if (response.deletedCount > 0) {
    //   res.status(200).json({ message: 'User deleted successfully.' });
    // } else {
    //   res.status(404).json({ error: 'User not found.' });
    // }
    console.log(deleteUser)
    res.json(deleteUser)
  } catch (err) {
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid user id"));
      return;
  }
  next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  // const { id } = req.params;

  try {
    // Validate the provided ID as a valid ObjectId
    // if (!ObjectId.isValid(id)) {
    //   return res.status(400).json({ error: 'Invalid user profile ID.' });
    // }


    // Update the user profile in the database
    const updatedUserProfile = await UserProfile.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: req.body
        // {
      //   username: req.body.username,
      //   email: req.body.email,
      //   password: req.body.password,
      //   dietaryPreferences: req.body.dietaryPreferences,
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName,
      //   age: req.body.age,
      //   gender: req.body.gender,
      //   address: req.body.address,
      //   phoneNumber: req.body.phoneNumber
      // }
      }
  );

    if (!updatedUserProfile) {
      throw errorHandler(404, 'User profile not found.');
    }

    // If the user profile is updated successfully, send it as a JSON response with a 200 status code
    res.status(204).json({
      message: 'User profile updated successfully. Information' + updatedUserProfile
    });
  } catch (err) {
    // If any error occurs during the process, send a generic server error response
    if(err instanceof mongoose.CastError){
      next(errorHandler(400, "Invalid user id"));
      return;
  }
  next(err);
  }
};

module.exports = {
  createUserProfile,
  getAllUserProfiles,
  getUserProfileById,
  deleteUser,
  updateUserProfile,
};
