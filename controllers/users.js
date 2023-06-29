const UserProfile = require('../models/userModel');
const initDb = require('../config/db');
const passwordUtil = require('../middlewares/passwordUtil');
const { ObjectId } = require('mongodb');
const collection = 'user_registry';
const database = 'food-tracker';

const createUserProfile = async (req, res) => {
  try {
    const userProfileData = req.body;

    // Validate password
    const passwordCheck = passwordUtil.passwordPass(userProfileData.password);
    if (passwordCheck.error) {
      return res.status(400).json({ error: passwordCheck.error });
    }

    // Create a new instance of the UserProfile model with the provided data
    const userProfile = new UserProfile(userProfileData);

    // Save the new user profile to the database using insertOne
    const response = await initDb
      .getDb()
      .db(database)
      .collection(collection)
      .insertOne(userProfile);

    if (response.acknowledged) {
      // If the user profile creation is successful, send the created user profile as a JSON response with a status code of 201
      res.status(201).json(response);
    } else {
      // If the user profile creation is not acknowledged, handle the error and send an appropriate error response
      res
        .status(500)
        .json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (error) {
    // If any server error occurs during the process, send a generic server error response
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllUserProfiles = async (req, res) => {
  try {
    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Fetch all user profiles from the collection and convert the result to an array
    const userProfiles = await db.collection(collection).find().toArray();

    // Send the retrieved user profiles as a JSON response
    res.status(200).json(userProfiles);
  } catch (error) {
    // Handle errors and send an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user profiles.' });
  }
};

const getUserProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user profile ID.' });
    }

    const db = initDb.getDb().db(database);
    const userProfile = await db
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    // If the user profile is found, send it as a JSON response with a 200 status message
    res.status(200).json(userProfile);
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    // Validate Id
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID' });
    }

    // Delete a specific User by ID from the database
    const response = await initDb
      .getDb()
      .db(database)
      .collection(collection)
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete User.' });
  }
};

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const updatedUserProfileData = req.body;

  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user profile ID.' });
    }

    // Validate password
    const passwordCheck = passwordUtil.passwordPass(
      updatedUserProfileData.password
    );
    if (passwordCheck.error) {
      return res.status(400).json({ error: passwordCheck.error });
    }

    // Update the user profile in the database
    const db = initDb.getDb().db(database);
    const updatedUserProfile = await db
      .collection(collection)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedUserProfileData },
        { returnOriginal: false }
      );

    if (!updatedUserProfile.value) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    // If the user profile is updated successfully, send it as a JSON response with a 200 status code
    res.status(200).json({
      message: 'User profile updated successfully.',
      userProfile: updatedUserProfile.value,
    });
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    console.error(error);
    res.status(500).json({ error: 'Failed to update user profile.' });
  }
};

module.exports = {
  createUserProfile,
  getAllUserProfiles,
  getUserProfileById,
  deleteUser,
  updateUserProfile,
};
