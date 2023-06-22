const UserProfile = require('../models/userModel');
const initDb = require('../config/db');
const { ObjectId } = require('mongodb');
const collection = 'user_registry';
const database = 'food-tracker';

const createUserProfile = async (req, res) => {
  try {
    const userProfileData = req.body;

    // Check if the required data is provided
    if (!userProfileData || !userProfileData.name || !userProfileData.email) {
      return res.status(400).json({ error: 'Invalid user profile data.' });
    }

    // Create a new instance of the UserProfile model with the provided data
    const userProfile = new UserProfile(userProfileData);

    // Save the new user profile to the database using insertOne
    const createdUserProfile = await initDb.getDb().db(database).collection(collection).insertOne(userProfile);

    if (createdUserProfile.acknowledged) {
      // If the user profile creation is successful, send the created user profile as a JSON response with a status code of 201
      res.status(201).json(createdUserProfile);
    } else {
      // If the user profile creation is not acknowledged, handle the error and send an appropriate error response
      res.status(500).json(createdUserProfile.error || 'Some error occurred while creating the user.');
    }
  } catch (error) {
    // If any server error occurs during the process, send a generic server error response
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllUserProfiles = async (req, res) => {
  try {
    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Fetch all user profiles from the collection and convert the result to an array
    const userProfiles = await db.collection(collection).find().toArray();

    // Send the retrieved user profiles as a JSON response
    res.json(userProfiles);
  } catch (error) {
    // Handle errors and send an appropriate error response
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

    // Fetch a specific user profile by ID from the database
    const db = initDb.getDb().db(database);
    const userProfile = await db.collection(collection).findOne({ _id: new ObjectId(id) });

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    // If the user profile is found, send it as a JSON response with a 200 status message
    res.status(200).json(userProfile);
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
};

module.exports = { createUserProfile, getAllUserProfiles, getUserProfileById };
