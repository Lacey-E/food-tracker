const UserProfile = require('../models');
const initDb = require('../config/db');
const { ObjectId } = require('mongodb');
const collection = 'user_registry';
const database = 'food-tracker';

// Create a new user profile
const createUserProfile = async (req, res) => {
  try {
    const userProfileData = req.body;

    // Check if the required data is provided
    if (!userProfileData || !userProfileData.name || !userProfileData.email) {
      return res.status(400).json({ error: 'Invalid user profile data.' });
    }

    // Create a new instance of the UserProfile model with the provided data
    const userProfile = new UserProfile(userProfileData);

    // Validate the user profile data
    const validationError = userProfile.validateSync();
    if (validationError) {
      // If validation fails, send an error response with the validation error messages
      return res.status(400).json({ error: validationError.message });
    }

    // Check if the username is already taken
    const existingUser = await UserProfile.findOne({ username: userProfile.username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    // Save the new user profile to the database using insertOne
    const createdUserProfile = await initDb
      .getDb()
      .db(database)
      .collection(collection)
      .insertOne(userProfile);

    if (createdUserProfile.acknowledged) {
      // If the user profile creation is successful, send the created user profile as a JSON response with a status code of 201
      res.status(201).json(createdUserProfile);
    } else {
      // If the user profile creation is not acknowledged, handle the error and send an appropriate error response
      throw new Error('Some error occurred while creating the user.');
    }
  } catch (error) {
    // If any server error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to create user profile.' });
  }
};

// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Compare the provided password with the hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Generate a JWT
//     const token = jwt.sign({ userId: user._id }, secretKey);

//     // Send the token as a response
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to login' });
//   }
// };

// const logout = async (_, res) => {
//   try {

//     if (!req.user) {
//       return "Already logged out";
//     }

//     // Clear the session data
//     req.session.destroy();
//     res.json({ message: 'Logged out successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to logout' });
//   }
// };


// Get all user profiles
const getAllUserProfiles = async (req, res) => {
  try {
    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Fetch all user profiles from the collection and convert the result to an array
    const userProfiles = await db.collection(collection).find().toArray();

    // Send the retrieved user profiles as a JSON response with a status code of 200
    res.status(200).json(userProfiles);
  } catch (error) {
    // Handle errors and send an appropriate error response
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user profiles.' });
  }
};

// Get a user profile by ID
const getUserProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user profile ID.' });
    }

    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Find the user profile in the collection based on the ID
    const userProfile = await db
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });

    if (!userProfile) {
      // If the user profile is not found, send an appropriate error response with a status code of 404
      return res.status(404).json({ error: 'User profile not found.' });
    }

    // If the user profile is found, send it as a JSON response with a status code of 200
    res.status(200).json(userProfile);
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to retrieve user profile.' });
  }
};

// Delete a user profile by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user profile ID.' });
    }

    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Delete the user profile from the collection based on the ID
    const response = await db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount > 0) {
      // If the user profile is deleted successfully, send a success response with a status code of 200
      res.status(200).json('User deleted successfully.');
    } else {
      // If the user profile deletion is not acknowledged, handle the error and send an appropriate error response
      throw new Error('Some error occurred while deleting the user.');
    }
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

// Update a user profile by ID
const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const updatedUserProfileData = req.body;

  try {
    // Validate the provided ID as a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user profile ID.' });
    }

    // Access the database using the custom method
    const db = initDb.getDb().db(database);

    // Update the user profile in the collection based on the ID
    const updatedUserProfile = await db
      .collection(collection)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedUserProfileData },
        { returnOriginal: false }
      );

    if (!updatedUserProfile.value) {
      // If the user profile is not found, send an appropriate error response with a status code of 404
      return res.status(404).json({ error: 'User profile not found.' });
    }

    // If the user profile is updated successfully, send it as a JSON response with a status code of 200
    res.status(200).json(updatedUserProfile.value);
  } catch (error) {
    // If any error occurs during the process, send a generic server error response
    res.status(500).json({ error: 'Failed to update user profile.' });
  }
};

module.exports = {
  createUserProfile,
  // login,
  // logout,
  getAllUserProfiles,
  getUserProfileById,
  deleteUser,
  updateUserProfile,
};
